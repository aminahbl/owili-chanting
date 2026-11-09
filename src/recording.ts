// The user's audio file (spec 09, F11). The user adds their own copy of a
// recording and plays it in either view. In the slide view it can be linked to
// the slides. Linked with Timed advance and a timing from a file, the slides
// follow it: the current line is the last one whose start is not later than
// the playback time plus the lead time (spec 05, T12), and Start, Pause and
// moving to a line work on the audio. Linked otherwise, Start and Pause also
// play and pause it. Linked either way, the audio starts when the slides'
// count-in ends. src/audio-store.ts remembers the file per chant.
import type { LineClock } from './clock.ts';
import { nextStart, type Schedule } from './lrc.ts';

// The last step that starts at or before the time, or -1.
function lastStarted(starts: (number | null)[], time = Infinity): number {
  let found = -1;
  starts.forEach((start, i) => {
    if (start !== null && start <= time) found = i;
  });
  return found;
}

/** How the audio is linked to the slides: not at all, by Start and Pause only, or by its time. */
export type Link = 'off' | 'start' | 'follow';

/** Seconds of audio passed over per second while back or forward is held. */
const SCAN_SPEED = 5;

export class Recording {
  private audio = new Audio();
  private clock: LineClock;
  private onChange: (recording: Recording) => void;
  private schedule: Schedule | null = null;
  /** When the chant ends in the recording. */
  private end = 0;
  /** The step the audio last moved the clock to, so a move by the user can be told apart. */
  private followed = -1;
  private frame = 0;
  private scanning = 0;
  private link: Link = 'off';
  /** The chosen file's name, or empty. */
  name = '';

  constructor(clock: LineClock, onChange: (recording: Recording) => void) {
    this.clock = clock;
    this.onChange = onChange;
    this.audio.preload = 'auto';
    // Started or paused by other means, for example by headphone controls.
    this.audio.addEventListener('play', () => {
      if (this.clock.driven) this.pickUp();
      else if (this.startsWithClock && !this.clock.isRunning) this.clock.start(false);
      this.onChange(this);
    });
    this.audio.addEventListener('pause', () => {
      if ((this.clock.driven || this.startsWithClock) && this.clock.isRunning) this.clock.pause();
      this.onChange(this);
    });
    this.audio.addEventListener('ended', () => {
      if (this.clock.driven) this.clock.follow('end', false, false);
      this.onChange(this);
    });
  }

  get active(): boolean {
    return this.name !== '';
  }

  get playing(): boolean {
    return !this.audio.paused;
  }

  /** True when Start and Pause also play and pause the audio, without the slides following it. */
  get startsWithClock(): boolean {
    return this.link === 'start' && this.active;
  }

  /** Loads the user's audio file. Resolves with an error message if the browser cannot play it. */
  async load(file: File): Promise<string | null> {
    this.unload();
    const url = URL.createObjectURL(file);
    this.audio.src = url;
    const loaded = await new Promise<boolean>((resolve) => {
      this.audio.addEventListener('loadedmetadata', () => resolve(true), { once: true });
      this.audio.addEventListener('error', () => resolve(false), { once: true });
    });
    if (!loaded) {
      URL.revokeObjectURL(url);
      this.audio.removeAttribute('src');
      return 'This file cannot be played in this browser.';
    }
    this.name = file.name;
    this.followed = -1;
    this.drive();
    this.onChange(this);
    return null;
  }

  unload() {
    this.audio.pause();
    if (this.audio.src) URL.revokeObjectURL(this.audio.src);
    this.audio.removeAttribute('src');
    this.name = '';
    this.drive();
    this.onChange(this);
  }

  /** Plays or pauses the audio while it is not linked to the slides. */
  toggle() {
    if (!this.active) return;
    if (this.audio.paused) this.audio.play().catch(() => {});
    else this.audio.pause();
  }

  /** Pauses and goes back to the start of the file. */
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  /** Moves the audio by some seconds; slides that follow it move with it. */
  skip(seconds: number) {
    this.moveTo(this.audio.currentTime + seconds);
  }

  /** Moves through the audio, back or forward, until `stopScan`. */
  startScan(direction: 1 | -1) {
    this.stopScan();
    const from = this.audio.currentTime;
    const began = performance.now();
    this.scanning = window.setInterval(() => {
      this.moveTo(from + (direction * SCAN_SPEED * (performance.now() - began)) / 1000);
    }, 100);
  }

  stopScan() {
    clearInterval(this.scanning);
    this.scanning = 0;
  }

  private moveTo(time: number) {
    if (!this.active) return;
    const length = Number.isFinite(this.audio.duration) ? this.audio.duration : Infinity;
    this.audio.currentTime = Math.max(0, Math.min(length, time));
    if (this.clock.driven) this.follow();
  }

  /** Sets the timing to follow. `fallback` gives the length of a last line that no row ends. */
  use(schedule: Schedule, fallback: number[]) {
    this.schedule = schedule;
    const last = lastStarted(schedule.starts);
    this.end = schedule.ends[last] ?? (schedule.starts[last] ?? 0) + fallback[last];
  }

  setLink(link: Link) {
    this.link = link;
    this.drive();
  }

  // The audio keeps playing when the slides stop following it, and the slides
  // pick it up where it is when they start following it again.
  private drive() {
    this.clock.driven = this.link === 'follow' && this.active && this.schedule !== null;
    if (!this.clock.driven) this.stopLoop();
    else if (this.playing) this.pickUp();
  }

  private pickUp() {
    this.follow();
    this.loop();
  }

  /** Brings the audio in line with the clock after the user starts, pauses or moves. Called on every clock change. */
  sync(clock: LineClock) {
    if (this.startsWithClock) {
      if (clock.status === 'running' && this.audio.paused) this.audio.play().catch(() => clock.pause());
      else if (!clock.isRunning && !this.audio.paused) this.audio.pause();
      return;
    }
    if (!clock.driven || !this.schedule) return;
    if (clock.index !== this.followed || clock.status === 'idle') this.seek(clock.index);
    if (clock.status === 'running') {
      if (this.audio.paused) this.audio.play().catch(() => clock.pause());
      this.loop();
    } else if (!this.audio.paused) {
      this.audio.pause();
      this.stopLoop();
    }
  }

  // A left-out step has no start, so the audio goes to the next chanted line.
  private seek(index: number) {
    const start = this.schedule?.starts[index] ?? (this.schedule ? nextStart(this.schedule, index) : undefined);
    if (start !== undefined) this.audio.currentTime = start;
    this.followed = index;
  }

  private loop() {
    if (this.frame) return;
    const tick = () => {
      this.follow();
      this.frame = this.audio.paused ? 0 : requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  private stopLoop() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private follow() {
    const schedule = this.schedule;
    if (!schedule) return;
    const time = this.audio.currentTime + this.clock.lead;
    if (this.audio.currentTime >= this.end) {
      this.audio.pause();
      this.clock.follow('end', false, false);
      return;
    }
    let index = lastStarted(schedule.starts, time);
    if (index < 0) index = schedule.starts.findIndex((s) => s !== null);
    const lineEnd = schedule.ends[index];
    const next = nextStart(schedule, index);
    const resting = lineEnd !== undefined && next !== undefined && time >= lineEnd && time < next;
    this.followed = index;
    this.clock.follow(index, resting, !this.audio.paused);
  }
}

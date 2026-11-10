// The line clock (spec 05, T1) holds the current step and moves it. A step is
// one chanting of a line, so a line chanted three times has three steps. The
// clock is driven by the user (manual) or by a timer over each step's
// duration, scaled by a tempo (auto), or by a timer over durations from a
// timing file (timed). In timed advance the user's audio can drive it instead
// (spec 09, F11). The views only display its state.

export type Method = 'manual' | 'auto' | 'timed';
type Status = 'idle' | 'countin' | 'running' | 'paused' | 'ended';

export class LineClock {
  method: Method = 'manual';
  status: Status = 'idle';
  index = 0;
  count: number;
  /** Seconds left in the count-in, rounded up. */
  countIn = 0;
  tempo = 1;
  /** Seconds by which a line changes early (T12). */
  lead = 0.3;
  countInSeconds = 3;
  /** Each step's duration in seconds at a tempo of 1, for auto and timed advance. */
  durations: number[] = [];
  /** How much of each step's duration is a pause after its line, for timed advance (spec 09, F5). */
  pauses: number[] = [];
  /** The cue timed in each step's pause, if any. */
  cues: (number | null)[] = [];
  /** True during the pause after the current line. */
  resting = false;
  /** True while a recording drives the clock, so its own timer does not run. */
  driven = false;
  private onChange: (clock: LineClock) => void;
  private elapsed = 0;
  private countInLeft = 0;
  private frame = 0;
  private lastTime = 0;

  constructor(count: number, onChange: (clock: LineClock) => void) {
    this.count = count;
    this.onChange = onChange;
  }

  /** The cue to mark during the current pause, if any. */
  get restCue(): number | null {
    return this.resting ? (this.cues[this.index] ?? null) : null;
  }

  /** True while lines are moving on, or about to. */
  get isRunning(): boolean {
    return this.status === 'running' || this.status === 'countin';
  }

  setMethod(method: Method) {
    this.stopLoop();
    this.method = method;
    if (this.isRunning) this.status = 'paused';
    this.elapsed = 0;
    this.emit();
  }

  /** The tempo in use: a timing file sets its own pace. */
  private get rate(): number {
    return this.method === 'timed' ? 1 : this.tempo;
  }

  /** Seconds until the timer moves on, at the current tempo. */
  get timeLeft(): number {
    const duration = this.durations[this.index] ?? 1;
    return (duration - this.lead * this.rate - this.elapsed) / this.rate;
  }

  /**
   * Starts from the current step. Auto and timed advance begin with a count-in
   * (T13), also when a recording drives the clock; the recording starts when it
   * ends. `countIn` false leaves it out.
   */
  start(countIn = true) {
    if (this.status === 'ended') this.index = 0;
    this.elapsed = 0;
    this.resting = false;
    if (this.method === 'manual') {
      this.status = 'running';
    } else {
      this.status = countIn && this.countInSeconds > 0 ? 'countin' : 'running';
      this.countInLeft = this.countInSeconds;
      this.countIn = Math.ceil(this.countInLeft);
      this.loop();
    }
    this.emit();
  }

  pause() {
    this.stopLoop();
    if (this.isRunning) this.status = 'paused';
    this.emit();
  }

  toggle() {
    if (this.isRunning) this.pause();
    else this.start();
  }

  next() {
    if (this.index >= this.count - 1) {
      this.stopLoop();
      this.status = 'ended';
      this.emit();
      return;
    }
    this.goTo(this.index + 1);
  }

  /** From the end, back to the last step. */
  previous() {
    this.goTo(this.status === 'ended' ? this.index : this.index - 1);
  }

  /** Back to the state before the start: no current line, and the slide view shows the title. */
  reset() {
    this.stopLoop();
    this.status = 'idle';
    this.index = 0;
    this.elapsed = 0;
    this.resting = false;
    this.emit();
  }

  /** Moves to a step. While running, the timer restarts at that step (P7). */
  goTo(target: number) {
    this.index = Math.max(0, Math.min(this.count - 1, target));
    this.elapsed = 0;
    this.resting = false;
    if (this.status === 'ended' || this.status === 'idle') this.status = 'paused';
    this.emit();
  }

  /** Moves to the step and pause a recording has reached, or to the end, running while it plays. */
  follow(index: number | 'end', resting: boolean, playing: boolean) {
    if (index === 'end') {
      this.status = 'ended';
      this.resting = false;
    } else {
      const status = playing ? 'running' : 'paused';
      if (index === this.index && resting === this.resting && this.status === status) return;
      this.index = index;
      this.resting = resting;
      this.status = status;
    }
    this.emit();
  }

  private loop() {
    if (this.frame) return;
    this.lastTime = 0;
    const tick = (time: number) => {
      const seconds = this.lastTime ? (time - this.lastTime) / 1000 : 0;
      this.lastTime = time;
      this.advanceTimer(seconds);
      // A driven clock needs its own timer for the count-in only.
      const timing = this.status === 'countin' || (this.status === 'running' && !this.driven);
      this.frame = timing ? requestAnimationFrame(tick) : 0;
    };
    this.frame = requestAnimationFrame(tick);
  }

  private stopLoop() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private advanceTimer(seconds: number) {
    if (this.status === 'countin') {
      this.countInLeft -= seconds;
      const shown = Math.ceil(this.countInLeft);
      if (this.countInLeft <= 0) this.status = 'running';
      if (shown !== this.countIn || this.status === 'running') {
        this.countIn = Math.max(0, shown);
        this.emit();
      }
      return;
    }
    if (this.status !== 'running' || this.driven) return;
    this.elapsed += seconds * this.rate;
    const duration = this.durations[this.index] ?? 1;
    const pause = this.pauses[this.index] ?? 0;
    const resting = pause > 0 && this.elapsed >= duration - pause - this.lead * this.rate;
    if (resting !== this.resting) {
      this.resting = resting;
      this.emit();
    }
    if (this.index >= this.count - 1) {
      if (this.elapsed >= duration) {
        this.status = 'ended';
        this.emit();
      }
      return;
    }
    // The line changes `lead` seconds early, and the next step's timer starts
    // that much below zero, so the total time is unchanged.
    if (this.elapsed >= duration - this.lead * this.rate) {
      this.index += 1;
      this.elapsed -= duration;
      this.resting = false;
      // A line the timing leaves out lasts 0 seconds and is passed over.
      while (this.durations[this.index] === 0 && this.index < this.count - 1) this.index += 1;
      this.emit();
    }
  }

  private emit() {
    this.onChange(this);
  }
}

// The chant page: the line clock, the text and slide views, the settings
// popover and keyboard shortcuts. The popovers open and close through the HTML popover
// attribute, without this script.
import './icons/chevron-left.ts';
import './icons/chevron-right.ts';
import './icons/close.ts';
import './icons/forward.ts';
import './icons/hare.ts';
import './icons/home.ts';
import './icons/info.ts';
import './icons/lock.ts';
import './icons/lock-open.ts';
import './icons/minus.ts';
import './icons/command.ts';
import './icons/pause.ts';
import './icons/play.ts';
import './icons/plus.ts';
import './icons/rewind.ts';
import './icons/stop.ts';
import './icons/tortoise.ts';
import './icons/tune.ts';
import { LineClock, type Method } from './clock.ts';
import { SETTING_NAMES, writeChantSettings, writeSetting, type SettingName } from './settings.ts';
import { SlideView } from './slide-view.ts';
import { stepDurations, stepPauses } from './lrc.ts';
import { forgetAudio, keepsHandles, pickAudio, readAudio, saveAudio, type AudioHandle } from './audio-store.ts';
import { Recording, type Link } from './recording.ts';
import { rhythmDurations, Tempo } from './tempo.ts';
import { readSteps, TextView } from './text-view.ts';
import { Timing, type TimingPart } from './timing.ts';
import { keepScreenOn } from './wake-lock.ts';

const root = document.documentElement;
const article = document.querySelector<HTMLElement>('article.chant');
const form = document.querySelector<HTMLFormElement>('form.settings');
const info = document.querySelector<HTMLElement>('#info');
const settings = document.querySelector<HTMLElement>('#settings');
const shortcuts = document.querySelector<HTMLElement>('#shortcuts');
const slidesRoot = document.querySelector<HTMLElement>('#slides');
const back = document.querySelector<HTMLElement>('#back-to-line');
let afterSettingChange = () => {};

const isSetting = (name: string): name is SettingName => (SETTING_NAMES as readonly string[]).includes(name);

function apply(name: SettingName, value: string) {
  if (value) root.dataset[name] = value;
  else delete root.dataset[name];
  // The text view's size is a number, which the CSS cannot read from the attribute.
  if (name === 'size') root.style.setProperty('--pali-size', value ? `${value}rem` : '');
  writeSetting(name, value);
  afterSettingChange();
}

// A checkbox stores its value when checked and its data-unchecked value when
// cleared. A slider stores nothing at its default value.
function showCurrent(controls: HTMLFormElement) {
  for (const input of controls.querySelectorAll<HTMLInputElement>('input')) {
    if (!isSetting(input.name)) continue;
    const current = root.dataset[input.name] ?? '';
    if (input.type === 'range') input.value = Number(current) ? current : input.defaultValue;
    else input.checked = input.value === current;
  }
}

function toggleTranslation() {
  apply('translation', root.dataset.translation === 'off' ? '' : 'off');
  if (form) showCurrent(form);
}

function isTextField(target: EventTarget | null): boolean {
  if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return true;
  if (target instanceof HTMLInputElement) return !['checkbox', 'radio'].includes(target.type);
  return target instanceof HTMLElement && target.isContentEditable;
}

// Line keys are left to the control in focus inside a popover, and Space to a focused button or link.
function keepsKey(target: EventTarget | null, key: string): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest('[popover]')) return true;
  return key === ' ' && target.closest('button, a, input') !== null;
}

if (form) {
  showCurrent(form);
  form.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    if (!isSetting(input.name)) return;
    if (input.type === 'checkbox' && !input.checked) apply(input.name, input.dataset.unchecked ?? '');
    else if (input.type === 'range' && input.value === input.defaultValue) apply(input.name, '');
    else apply(input.name, input.value);
  });
}

const inSlides = () => root.dataset.view === 'slides';

const METHOD_LABELS: Record<Method, string> = { manual: 'Manual', auto: 'Auto', timed: 'Timed' };

// The text view has manual advance only.
function chosenMethod(): Method {
  if (!inSlides()) return 'manual';
  if (root.dataset.advance === 'auto') return 'auto';
  if (root.dataset.advance === 'timed') return 'timed';
  return 'manual';
}

function download(name: string, text: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}

function setUpLines(chant: HTMLElement, slidesEl: HTMLElement, backButton: HTMLElement) {
  const steps = readSteps(chant);
  const textView = new TextView(steps, backButton, document.querySelector('.chant-header'));
  const title = chant.querySelector('h1')?.textContent ?? '';
  const slideView = new SlideView(slidesEl, steps, title);
  const startButton = document.querySelector<HTMLButtonElement>('#slide-start');
  const trackButton = document.querySelector<HTMLButtonElement>('#track');
  const methodLabel = document.querySelector<HTMLElement>('.method-label');
  const tempoInput = document.querySelector<HTMLInputElement>('#tempo');
  const chantId = chant.dataset.chant ?? '';
  const slug = chant.dataset.slug ?? '';
  let savedIndex = -1;

  const clock = new LineClock(steps.length, (c) => {
    recording.sync(c);
    textView.show(c);
    slideView.show(c);
    if (startButton) {
      startButton.textContent = startLabel(c);
      startButton.classList.toggle('on', c.isRunning);
    }
    if (trackButton) {
      trackButton.classList.toggle('on', c.status !== 'idle');
      trackButton.setAttribute('aria-pressed', String(c.status !== 'idle'));
    }
    showMethod();
    keepScreenOn(c.isRunning);
    if (c.status !== 'idle' && c.index !== savedIndex) {
      savedIndex = c.index;
      const step = steps[c.index];
      const chantOfLine = step.line.closest<HTMLElement>('[data-chant]')?.dataset.chant ?? chantId;
      writeChantSettings(chantId, { position: { chant: chantOfLine, line: Number(step.line.dataset.line), repeat: step.repeat } });
    }
  });
  const tempo = new Tempo(clock, steps, chantId);
  // A set page has a block for each chant; a chant page is one block.
  const blocks = [...chant.querySelectorAll<HTMLElement>('.set-chant')];
  const parts: TimingPart[] = (blocks.length ? blocks : [chant]).map((block) => ({
    id: block.dataset.chant ?? '',
    slug: block.dataset.slug ?? '',
    steps: steps.filter((s) => block.contains(s.line)),
    cueIds: new Set([...block.querySelectorAll<HTMLElement>('.cue[data-cue]')].map((cue) => Number(cue.dataset.cue))),
  }));
  const recorded = document.querySelector('#recording-timing')?.textContent ?? null;
  const timing = new Timing(chantId, title, parts, recorded);
  const recording = new Recording(clock, () => showAudio());

  function startLabel(c: LineClock): string {
    if (c.status === 'countin') return String(c.countIn);
    return c.isRunning ? 'Pause' : 'Start';
  }

  function showMethod() {
    if (methodLabel) methodLabel.textContent = METHOD_LABELS[clock.method];
    if (tempoInput) tempoInput.value = String(clock.tempo);
  }

  function useTiming() {
    const schedule = timing.schedule();
    const fallback = rhythmDurations(steps);
    clock.durations = stepDurations(schedule, fallback);
    clock.pauses = stepPauses(schedule);
    clock.cues = schedule.cues;
    recording.use(schedule, fallback);
  }

  // In the slide view with Auto or Timed advance, the lock (closed unless opened)
  // ties the audio to the slides: in Timed advance with a timing from a file the
  // slides follow it, and otherwise Start and Pause also play and pause it.
  // Manual advance has no Start, so nothing to lock to.
  function linkFor(method: Method): Link {
    if (!inSlides() || method === 'manual' || root.dataset.link === 'off') return 'off';
    return method === 'timed' && timing.fromFile ? 'follow' : 'start';
  }

  // Set once the audio controls are ready.
  let showAudioControls = () => {};

  // The link is undone before the method changes, so the change leaves the audio playing.
  function useSettings() {
    const method = chosenMethod();
    recording.setLink('off');
    if (method !== clock.method) clock.setMethod(method);
    if (method === 'timed') useTiming();
    else {
      tempo.measure();
      clock.pauses = [];
      clock.cues = [];
    }
    recording.setLink(linkFor(method));
    slideView.refresh();
    showMethod();
    showAudioControls();
  }
  useSettings();
  slideView.show(clock);
  afterSettingChange = useSettings;

  // In the text view, a clock that has not started begins at the first line in view.
  const startIndex = () => (inSlides() ? clock.index : textView.firstVisible());

  function startOrPause() {
    if (clock.status === 'idle') clock.goTo(startIndex());
    clock.toggle();
  }

  // In the text view, tracking marks the current line; turning it off clears the clock.
  function toggleTracking() {
    if (clock.status !== 'idle') {
      clock.reset();
      return;
    }
    clock.goTo(startIndex());
    textView.follow();
  }

  // Moving to another line by hand resumes following. Before anything has
  // started, the first move forward only marks the line to begin at: the first
  // line in view in the text view, or the first line after the title slide.
  // On slides, going back from the first line shows the title.
  function move(direction: 1 | -1) {
    if (clock.status === 'idle') {
      if (direction === -1) return;
      if (clock.method === 'manual') clock.start();
      clock.goTo(startIndex());
    } else if (direction === 1) clock.next();
    else if (inSlides() && clock.index === 0) clock.reset();
    else clock.previous();
    textView.follow();
  }

  // Switching view keeps the position (P3); from the top of the text, slides open at the title.
  // The URL names the view, so a slide link can be shared.
  const switchButtons = [...document.querySelectorAll<HTMLButtonElement>('.view-switch button')];
  function showSwitch() {
    for (const b of switchButtons) b.setAttribute('aria-pressed', String((b.dataset.view === 'slides') === inSlides()));
  }
  function setView(view: string) {
    if (view === 'slides' && clock.status === 'idle' && textView.firstVisible() > 0) clock.goTo(textView.firstVisible());
    apply('view', view === 'slides' ? 'slides' : '');
    const url = new URL(location.href);
    if (view === 'slides') url.searchParams.set('view', 'slides');
    else url.searchParams.delete('view');
    history.replaceState(null, '', url);
    showSwitch();
    if (view !== 'slides') textView.follow();
  }
  showSwitch();
  for (const b of switchButtons) b.addEventListener('click', () => setView(b.dataset.view ?? 'text'));

  startButton?.addEventListener('click', startOrPause);
  trackButton?.addEventListener('click', toggleTracking);
  function changeTempo(faster: boolean) {
    if (faster) tempo.faster();
    else tempo.slower();
    showMethod();
  }
  tempoInput?.addEventListener('input', () => tempo.setTempo(Number(tempoInput.value)));
  document.querySelectorAll('.faster').forEach((b) => b.addEventListener('click', () => changeTempo(true)));
  document.querySelectorAll('.slower').forEach((b) => b.addEventListener('click', () => changeTempo(false)));
  document.querySelector('#slide-previous')?.addEventListener('click', () => move(-1));
  document.querySelector('#slide-next')?.addEventListener('click', () => move(1));
  document.querySelector('#back-to-start')?.addEventListener('click', () => clock.reset());

  // Entering a number in the slide bar's position moves to the first chanting of that line.
  const lineInput = document.querySelector<HTMLInputElement>('#slide-line');
  lineInput?.addEventListener('change', () => {
    const index = slideView.stepOfLine(Number.parseInt(lineInput.value, 10));
    if (index !== null) {
      if (clock.status === 'idle' && clock.method === 'manual') clock.start();
      clock.goTo(index);
    }
    lineInput.blur();
  });

  // Timed advance follows the imported timing, or the default (spec 09, F6).
  const timingName = document.querySelector<HTMLElement>('.timing-name');
  const timingError = document.querySelector<HTMLElement>('.timing-error');
  const timingImport = document.querySelector<HTMLInputElement>('#timing-import');
  const useDefaultButton = document.querySelector<HTMLButtonElement>('#timing-default');
  function showTiming(error = '') {
    if (timingName) timingName.textContent = `Timing: ${timing.name}`;
    if (useDefaultButton) useDefaultButton.hidden = !timing.isImported;
    if (timingError) timingError.textContent = error;
    useSettings();
  }
  showTiming();
  document.querySelector('#timing-export')?.addEventListener('click', () => download(`${slug}.lrc`, timing.lrc()));
  document.querySelector('#timing-import-button')?.addEventListener('click', () => timingImport?.click());
  timingImport?.addEventListener('change', async () => {
    const file = timingImport.files?.[0];
    timingImport.value = '';
    if (!file) return;
    showTiming(timing.import(file.name, await file.text()) ?? '');
  });
  useDefaultButton?.addEventListener('click', () => {
    timing.useDefault();
    showTiming();
  });

  // The user's audio file, in either view (F11). While it is linked to the
  // slides, Play does what Start does, and Stop also goes back to the title.
  const audioNote = document.querySelector<HTMLElement>('.audio-note');
  const audioName = document.querySelector<HTMLElement>('.audio-name');
  const audioError = document.querySelector<HTMLElement>('.audio-error');
  const audioInput = document.querySelector<HTMLInputElement>('#audio-file');
  const audioChoose = document.querySelector<HTMLButtonElement>('#audio-choose');
  const audioRestore = document.querySelector<HTMLButtonElement>('#audio-restore');
  const audioRemove = document.querySelector<HTMLButtonElement>('#audio-remove');
  const audioButtons = (action: string) => [...document.querySelectorAll<HTMLButtonElement>(`[data-audio="${action}"]`)];
  /** A remembered file the browser needs permission to read again. */
  let waiting: AudioHandle | null = null;
  function showAudio() {
    if (audioNote) audioNote.hidden = recording.active;
    if (audioName) {
      audioName.hidden = !recording.active;
      audioName.textContent = recording.name;
    }
    if (audioChoose) audioChoose.hidden = recording.active;
    if (audioRestore) {
      audioRestore.hidden = recording.active || !waiting;
      audioRestore.textContent = `Use ${waiting?.name ?? ''} again`;
    }
    if (audioRemove) audioRemove.hidden = !recording.active;
    for (const group of document.querySelectorAll<HTMLElement>('.audio-controls')) group.hidden = !recording.active;
    const label = recording.playing ? 'Pause' : 'Play';
    const linked = root.dataset.link !== 'off';
    for (const button of audioButtons('play')) {
      button.classList.toggle('on', recording.playing);
      button.disabled = linkedToClock() && button.closest('.slide-bar') !== null;
      button.title = button.disabled ? 'Locked: Start plays and pauses the audio' : label;
      const text = button.querySelector('.sr-only');
      if (text) text.textContent = label;
    }
    for (const button of audioButtons('link')) {
      button.hidden = !recording.active;
      button.classList.toggle('on', linked);
      button.setAttribute('aria-pressed', String(linked));
    }
  }
  showAudioControls = showAudio;
  const linkedToClock = () => clock.driven || recording.startsWithClock;
  const audioActions: Record<string, () => void> = {
    play: () => (linkedToClock() ? startOrPause() : recording.toggle()),
    stop: () => {
      if (linkedToClock()) clock.reset();
      if (!clock.driven) recording.stop();
    },
    link: () => {
      apply('link', root.dataset.link === 'off' ? '' : 'off');
      showAudio();
    },
  };
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-audio]')) {
    button.addEventListener('click', () => audioActions[button.dataset.audio ?? '']?.());
  }

  // A press on back or forward moves 3 seconds; holding it moves through the
  // audio until it is released. A click from the keyboard also moves 3 seconds.
  function holdToScan(button: HTMLButtonElement, direction: 1 | -1) {
    let timer = 0;
    let scanned = false;
    button.addEventListener('pointerdown', () => {
      scanned = false;
      timer = window.setTimeout(() => {
        scanned = true;
        recording.startScan(direction);
      }, 400);
    });
    for (const type of ['pointerup', 'pointerleave', 'pointercancel']) {
      button.addEventListener(type, () => {
        clearTimeout(timer);
        recording.stopScan();
      });
    }
    button.addEventListener('click', () => {
      if (!scanned) recording.skip(3 * direction);
      scanned = false;
    });
    button.addEventListener('contextmenu', (event) => event.preventDefault());
  }
  for (const button of audioButtons('back')) holdToScan(button, -1);
  for (const button of audioButtons('forward')) holdToScan(button, 1);

  // Resolves with whether the file plays.
  async function useAudio(file: File): Promise<boolean> {
    clock.pause();
    const error = await recording.load(file);
    if (audioError) audioError.textContent = error ?? '';
    if (!error) waiting = null;
    useSettings();
    showAudio();
    return !error;
  }
  async function useHandle(handle: AudioHandle): Promise<boolean> {
    try {
      return await useAudio(await handle.getFile());
    } catch {
      waiting = null;
      await forgetAudio(chantId);
      if (audioError) audioError.textContent = `${handle.name} can no longer be found. Please add it again.`;
      showAudio();
      return false;
    }
  }
  // A file the user chooses is remembered for the chant (src/audio-store.ts).
  // A restored file is not saved again: in Firefox, saving a kept copy again
  // while it is loaded makes the audio end as soon as it starts.
  async function restoreAudio() {
    const saved = await readAudio(chantId);
    if (!saved) return;
    if ('file' in saved) {
      await useAudio(saved.file);
      return;
    }
    if ((await saved.handle.queryPermission?.({ mode: 'read' })) === 'granted') {
      await useHandle(saved.handle);
      return;
    }
    waiting = saved.handle;
    showAudio();
  }
  audioChoose?.addEventListener('click', async () => {
    if (!keepsHandles) {
      audioInput?.click();
      return;
    }
    const handle = await pickAudio();
    if (handle && (await useHandle(handle))) await saveAudio(chantId, { handle });
  });
  audioInput?.addEventListener('change', async () => {
    const file = audioInput.files?.[0];
    audioInput.value = '';
    if (file && (await useAudio(file))) await saveAudio(chantId, { file });
  });
  audioRestore?.addEventListener('click', async () => {
    if (!waiting) return;
    if ((await waiting.requestPermission?.({ mode: 'read' })) === 'granted') await useHandle(waiting);
  });
  audioRemove?.addEventListener('click', async () => {
    recording.unload();
    await forgetAudio(chantId);
    useSettings();
    showAudio();
  });
  showAudio();
  void restoreAudio();

  // A click on a line makes it current, unless lines are moving on by themselves or text is being selected.
  chant.addEventListener('click', (event) => {
    const line = (event.target as Element).closest<HTMLElement>('.line');
    if (!line || (clock.isRunning && clock.method !== 'manual')) return;
    if (!getSelection()?.isCollapsed) return;
    clock.goTo(textView.indexOf(line));
    textView.follow();
  });

  // On a touch screen, a swipe across a slide moves a line. A click or tap does
  // nothing, so the text can be selected.
  let down: { x: number; y: number } | null = null;
  slideView.stage.addEventListener('pointerdown', (event) => {
    down = event.pointerType === 'touch' ? { x: event.clientX, y: event.clientY } : null;
  });
  slideView.stage.addEventListener('pointerup', (event) => {
    if (!down) return;
    const dx = event.clientX - down.x;
    const dy = event.clientY - down.y;
    down = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  });

  addEventListener('wheel', () => textView.stopFollowing(), { passive: true });
  addEventListener('touchmove', () => textView.stopFollowing(), { passive: true });

  return (event: KeyboardEvent): boolean => {
    if (keepsKey(event.target, event.key)) return false;
    if (event.key === ' ' && inSlides() && clock.method === 'manual') move(1);
    else if (event.key === ' ' && inSlides()) startOrPause();
    else if (event.key === ' ') toggleTracking();
    else if (event.key === 'ArrowRight' || event.key === 'PageDown') move(1);
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') move(-1);
    else if (event.key.toLowerCase() === 'v') setView(inSlides() ? 'text' : 'slides');
    else if (inSlides() && clock.method === 'auto' && ['+', '='].includes(event.key)) changeTempo(true);
    else if (inSlides() && clock.method === 'auto' && ['-', '−'].includes(event.key)) changeTempo(false);
    else if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      textView.stopFollowing();
      return false;
    } else return false;
    return true;
  };
}

const lineKeys = article && slidesRoot && back ? setUpLines(article, slidesRoot, back) : () => false;

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.altKey || event.metaKey || isTextField(event.target)) return;
  if (lineKeys(event)) {
    event.preventDefault();
    return;
  }
  const key = event.key.toLowerCase();
  if (key === 't' && form?.querySelector('[name="translation"]')) toggleTranslation();
  else if (key === 'i') info?.togglePopover();
  else if (key === 's') settings?.togglePopover();
  else if (key === '?') shortcuts?.togglePopover();
  else return;
  event.preventDefault();
});

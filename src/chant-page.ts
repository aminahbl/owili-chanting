// The chant page: the line clock, the text and slide views, the settings
// popover and keyboard shortcuts. The popovers open and close through the HTML popover
// attribute, without this script.
import './icons/close.ts';
import './icons/home.ts';
import './icons/info.ts';
import './icons/tune.ts';
import { LineClock } from './clock.ts';
import { SETTING_NAMES, writeChantSettings, writeSetting, type SettingName } from './settings.ts';
import { SlideView } from './slide-view.ts';
import { Tempo } from './tempo.ts';
import { readSteps, TextView } from './text-view.ts';
import { keepScreenOn } from './wake-lock.ts';

const root = document.documentElement;
const article = document.querySelector<HTMLElement>('article.chant');
const form = document.querySelector<HTMLFormElement>('form.settings');
const info = document.querySelector<HTMLElement>('#info');
const settings = document.querySelector<HTMLElement>('#settings');
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

function openShortcuts(popover: HTMLElement) {
  if (!popover.matches(':popover-open')) popover.showPopover();
  popover.querySelector('#shortcuts')?.scrollIntoView({ block: 'nearest' });
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

function setUpLines(chant: HTMLElement, slidesEl: HTMLElement, backButton: HTMLElement) {
  const steps = readSteps(chant);
  const textView = new TextView(steps, backButton, document.querySelector('.chant-header'));
  const slideView = new SlideView(slidesEl, steps, chant.querySelector('h1')?.textContent ?? '');
  const startButton = document.querySelector<HTMLButtonElement>('#slide-start');
  const trackButton = document.querySelector<HTMLButtonElement>('#track');
  const methodLabel = document.querySelector<HTMLElement>('.method-label');
  const tempoInput = document.querySelector<HTMLInputElement>('#tempo');
  const chantId = chant.dataset.chant ?? '';
  let savedIndex = -1;

  const clock = new LineClock(steps.length, (c) => {
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
      writeChantSettings(chantId, { position: { line: Number(step.line.dataset.line), repeat: step.repeat } });
    }
  });
  const tempo = new Tempo(clock, steps, chantId);

  function startLabel(c: LineClock): string {
    if (c.status === 'countin') return String(c.countIn);
    return c.isRunning ? 'Pause' : 'Start';
  }

  function showMethod() {
    if (methodLabel) methodLabel.textContent = clock.method === 'auto' ? 'Auto' : 'Manual';
    if (tempoInput) tempoInput.value = String(clock.tempo);
  }

  // The text view has manual advance only.
  function useSettings() {
    tempo.measure();
    const method = inSlides() && root.dataset.advance === 'auto' ? 'auto' : 'manual';
    if (method !== clock.method) clock.setMethod(method);
    slideView.refresh();
    showMethod();
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

  // A click on a line makes it current, unless lines are moving on by themselves or text is being selected.
  chant.addEventListener('click', (event) => {
    const line = (event.target as Element).closest<HTMLElement>('.line');
    if (!line || (clock.isRunning && clock.method !== 'manual')) return;
    if (!getSelection()?.isCollapsed) return;
    clock.goTo(textView.indexOf(line));
    textView.follow();
  });

  // On a slide, a swipe moves a line. A tap moves forward on the right two thirds and
  // back on the left third in manual advance, and pauses or resumes otherwise (P7).
  let down: { x: number; y: number } | null = null;
  slideView.stage.addEventListener('pointerdown', (event) => {
    down = { x: event.clientX, y: event.clientY };
  });
  slideView.stage.addEventListener('pointerup', (event) => {
    if (!down || (event.target as Element).closest('a, button')) return;
    const dx = event.clientX - down.x;
    const dy = event.clientY - down.y;
    down = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
    else if (Math.abs(dx) > 10 || Math.abs(dy) > 10) return;
    else if (clock.method !== 'manual') startOrPause();
    else {
      const box = slideView.stage.getBoundingClientRect();
      move(event.clientX - box.left > box.width / 3 ? 1 : -1);
    }
  });

  addEventListener('wheel', () => textView.stopFollowing(), { passive: true });
  addEventListener('touchmove', () => textView.stopFollowing(), { passive: true });

  return (event: KeyboardEvent): boolean => {
    if (keepsKey(event.target, event.key)) return false;
    if (event.key === ' ' && inSlides()) startOrPause();
    else if (event.key === ' ') toggleTracking();
    else if (event.key === 'ArrowRight' || event.key === 'PageDown') move(1);
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') move(-1);
    else if (event.key.toLowerCase() === 'v') setView(inSlides() ? 'text' : 'slides');
    else if (inSlides() && ['+', '='].includes(event.key)) changeTempo(true);
    else if (inSlides() && ['-', '−'].includes(event.key)) changeTempo(false);
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
  else if (key === '?' && settings) openShortcuts(settings);
  else return;
  event.preventDefault();
});

// The text view marks the clock's current step and keeps it about a third of
// the way down the screen (spec 04, P4). Scrolling by hand pauses following
// until the user presses "Back to current line" or moves to another line.
import type { LineClock } from './clock.ts';

export interface Step {
  line: HTMLElement;
  /** Which chanting of the line this is, from 1. */
  repeat: number;
  of: number;
}

export function readSteps(root: ParentNode): Step[] {
  return [...root.querySelectorAll<HTMLElement>('.line[data-line]')].flatMap((line) => {
    const of = Number(line.dataset.repeat ?? 1);
    return Array.from({ length: of }, (_, i) => ({ line, repeat: i + 1, of }));
  });
}

/** The text of the form in use, without the repeat count. */
export function visibleText(el: Element): string {
  const copy = el.cloneNode(true) as Element;
  const hidden = document.documentElement.dataset.form === 'women' ? '.form-men' : '.form-women';
  copy.querySelectorAll(`${hidden}, .repeat`).forEach((e) => e.remove());
  return copy.textContent ?? '';
}

/** True for the last chanting of the last line in its section. */
export function endsSection(step: Step): boolean {
  if (step.repeat < step.of) return false;
  let next = step.line.nextElementSibling;
  while (next && !next.matches('.line')) next = next.nextElementSibling;
  return next === null;
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

export class TextView {
  private steps: Step[];
  private back: HTMLElement;
  private header: HTMLElement | null;
  private current: Step | null = null;
  private following = true;

  constructor(steps: Step[], back: HTMLElement, header: HTMLElement | null) {
    this.steps = steps;
    this.back = back;
    this.header = header;
    back.addEventListener('click', () => this.follow());
  }

  show(clock: LineClock) {
    const step = clock.status === 'idle' ? null : this.steps[clock.index];
    if (step === this.current) return;
    if (this.current) this.mark(this.current, false);
    this.current = step;
    if (!step) {
      this.back.hidden = true;
      return;
    }
    this.mark(step, true);
    if (this.following) this.scrollToCurrent();
  }

  /** Resumes following and brings the current line into view. */
  follow() {
    this.following = true;
    this.back.hidden = true;
    this.scrollToCurrent();
  }

  /** Called when the user scrolls by hand. */
  stopFollowing() {
    if (!this.current) return;
    this.following = false;
    this.back.hidden = false;
  }

  /** The first step whose line is in view below the header, for starting where the user is reading. */
  firstVisible(): number {
    const top = this.header?.getBoundingClientRect().bottom ?? 0;
    const index = this.steps.findIndex((s) => s.line.getBoundingClientRect().top >= top);
    return Math.max(index, 0);
  }

  indexOf(line: HTMLElement): number {
    return this.steps.findIndex((s) => s.line === line);
  }

  // While a repeated line is current, its "×3" becomes "2 of 3".
  private mark(step: Step, on: boolean) {
    step.line.classList.toggle('current', on);
    const count = step.line.querySelector('.repeat [aria-hidden]');
    if (count) count.textContent = on ? `${step.repeat} of ${step.of}` : `×${step.of}`;
  }

  private scrollToCurrent() {
    if (!this.current || document.documentElement.dataset.view === 'slides') return;
    const top = this.current.line.getBoundingClientRect().top + scrollY - innerHeight / 3;
    scrollTo({ top, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  }
}

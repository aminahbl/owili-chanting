// The slide view (spec 04, P5 to P7) shows the chant a block of lines at a
// time. The block stays still and the accent bar moves down it. After the
// block, a smaller, fainter preview shows the next block's first line. When
// the current line passes the block's end, the page turns to the next block.
// Before the chant starts, the page shows only the title and the Pali title.
// The chant's notes are shown as cues above its first line. The lines, section
// titles, cues and solo labels are copied from the text view, so forms,
// translation and chanting follow the same settings. A leader line is marked by its curly
// brackets, so it has no label. During a timed pause after a line (spec 09, F5),
// the line is dimmed; a pause with a cue, such as a bow, shows the next line's
// block with the cue marked, since the cue stands above the line it comes before.
import type { LineClock } from './clock.ts';
import { escapeHtml } from './html.ts';
import { SIZE_RANGES } from './settings.ts';
import { chantedParts, type Part, type Step } from './text-view.ts';

const MAX_BLOCK_LINES = 4;
/** What the slide shows before the clock has started. */
const TITLE = -1;
const NOTHING = -2;
const TURN_MS = 300;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

interface Cue {
  id: string;
  html: string;
}

interface PageLine {
  /** The Pali & translation. */
  html: string;
  /** The first text chanted, for the preview. */
  preview: string;
  section: string;
  /** The cues between the line before and this one. */
  cues: Cue[];
  solo: boolean;
}

function part(root: HTMLElement, selector: string): HTMLElement {
  const el = root.querySelector<HTMLElement>(selector);
  if (!el) throw new Error(`Slide view: missing ${selector}`);
  return el;
}

// One of the line's texts, with its language, without its "×3", which the slide shows as "1 of 3".
function partHtml(line: HTMLElement, part: Part): string {
  const text = line.querySelector(`.${part}`)?.cloneNode(true) as HTMLElement | undefined;
  text?.querySelector('.repeat')?.remove();
  const lang = text?.lang ? ` lang="${text.lang}"` : '';
  return `<p class="${part}"${lang}>${text?.innerHTML ?? ''}</p>`;
}

// A section without a title continues the titled section before it. On a set
// page, the chant's title comes first, so each chant opens with its title.
function sectionTitle(line: HTMLElement): string {
  let title = '';
  for (let section = line.closest('.chant-section'); section && !title; section = section.previousElementSibling) {
    const heading = section.matches('.chant-section') ? section.querySelector('h2, h3') : null;
    title = heading?.textContent ?? '';
  }
  const chant = line.closest('.set-chant')?.querySelector('.set-chant-title')?.textContent ?? '';
  return [chant, title].filter(Boolean).join(' · ');
}

const lineHtml = (html: string) => `<div class="slide-page-line"><div class="slide-page-text">${html}</div></div>`;
const cueHtml = (cue: Cue) => `<p class="cue slide-page-cue" data-cue="${cue.id}">${cue.html}</p>`;

// Whether the line is the first of a titled section.
function opensSection(lines: PageLine[], i: number): boolean {
  return Boolean(lines[i]?.section) && lines[i].section !== lines[i - 1]?.section;
}

export class SlideView {
  readonly stage: HTMLElement;
  private root: HTMLElement;
  private page: HTMLElement;
  private section: HTMLElement;
  private lineInput: HTMLInputElement;
  private steps: Step[];
  private lines: HTMLElement[];
  private titleHtml: string;
  /** The step shown, or TITLE or NOTHING. */
  private shown = NOTHING;
  /** Changes whenever the lines' size or content may have changed. */
  private key = '';
  /** The first line of each block. */
  private starts: number[] = [];
  private shownBlock: number | null = null;
  /** Cues after the last line, shown below it. */
  private trailingCues: Cue[] = [];
  /** During a timed pause: the cue it times, or null for a pause without one. */
  private rest: number | null | undefined;
  private resizeFrame = 0;

  constructor(root: HTMLElement, steps: Step[], title: string, paliTitle: string) {
    this.root = root;
    this.steps = steps;
    this.lines = [...new Set(steps.map((s) => s.line))];
    const subtitle = paliTitle ? `<p class="slide-page-pali-title" lang="pi">${escapeHtml(paliTitle)}</p>` : '';
    this.titleHtml = `<p class="pali">${escapeHtml(title)}</p>${subtitle}`;
    this.stage = part(root, '.slide-stage');
    this.page = part(root, '.slide-page');
    this.section = part(root, '.slide-section');
    this.lineInput = part(root, '.slide-line') as HTMLInputElement;
    const total = String(this.lines.length);
    part(root, '.slide-total').textContent = total;
    this.lineInput.style.width = `${total.length + 0.5}ch`;
    // The field keeps what is typed until it loses focus; Escape discards it.
    this.lineInput.addEventListener('blur', () => this.showNumber());
    this.lineInput.addEventListener('focus', () => this.lineInput.select());
    this.lineInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      this.showNumber(true);
      this.lineInput.blur();
    });
    // A chant without section titles has no section row.
    this.section.hidden = !this.lines.some((line) => sectionTitle(line));
    addEventListener('resize', () => {
      cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = requestAnimationFrame(() => this.refresh());
    });
    document.fonts.ready.then(() => {
      this.key = '';
      this.refresh();
    });
  }

  show(clock: LineClock) {
    this.root.classList.toggle('ended', clock.status === 'ended');
    const target = clock.status === 'idle' ? TITLE : clock.index;
    const rest = clock.resting ? clock.restCue : undefined;
    if (target === this.shown && rest === this.rest) return;
    const animate = this.shown !== NOTHING && !reducedMotion.matches;
    this.shown = target;
    this.rest = rest;
    this.render(animate);
  }

  /** Redraws the current slide, for example after the form changes. */
  refresh() {
    if (this.shown !== NOTHING) this.render(false);
  }

  /** The first step of the line with this number, counted from 1, or null if there is no such number. */
  stepOfLine(number: number): number | null {
    if (!Number.isInteger(number)) return null;
    const line = this.lines[Math.max(1, Math.min(this.lines.length, number)) - 1];
    return this.steps.findIndex((step) => step.line === line);
  }

  private showNumber(whileTyping = false) {
    if (!whileTyping && document.activeElement === this.lineInput) return;
    const step = this.shown === TITLE || this.shown === NOTHING ? null : this.steps[this.shown];
    this.lineInput.value = step ? String(this.lines.indexOf(step.line) + 1) : '';
  }

  private render(animate: boolean) {
    const step = this.shown === TITLE ? null : this.steps[this.shown];
    const number = step ? this.lines.indexOf(step.line) : TITLE;
    this.showNumber();
    // The page has no size in the text view or on the end slide.
    if (!this.page.clientHeight) return;
    const lines = this.pageLines();
    const d = document.documentElement.dataset;
    const key = [this.page.clientWidth, this.page.clientHeight, d.form, d.translation, d.chanting, d.order, d.slideSize].join();
    if (key !== this.key) {
      this.key = key;
      this.fit(lines);
      this.shownBlock = null;
    }
    // A pause with a cue shows the block of the next line, where the cue stands.
    const cue = typeof this.rest === 'number' ? this.rest : null;
    const nextLine = step && cue !== null ? this.steps[this.shown + 1]?.line : undefined;
    const block = this.blockOf(nextLine ? this.lines.indexOf(nextLine) : number);
    // The row names the section only when the block does not start with its title.
    this.section.textContent = step && !opensSection(lines, this.starts[block]) ? sectionTitle(step.line) : '';
    if (block !== this.shownBlock) {
      if (animate && this.shownBlock !== null) this.turn();
      this.page.innerHTML = this.blockHtml(lines, block);
      this.shownBlock = block;
    }
    const count = step && step.of > 1 ? `${step.repeat} of ${step.of}` : '';
    this.page.classList.toggle('resting', this.rest !== undefined);
    for (const el of this.page.querySelectorAll<HTMLElement>('.slide-page-cue')) el.classList.toggle('current', el.dataset.cue === String(cue));
    if (nextLine) this.mark(-1, false, '', 'pali');
    else this.mark(block === TITLE ? 0 : number - this.starts[block], block !== TITLE, count, step?.part ?? 'pali');
  }

  private pageLines(): PageLine[] {
    const cuesBefore = new Map<HTMLElement, Cue[]>();
    let cues: Cue[] = [];
    for (const el of document.querySelectorAll<HTMLElement>('.chant .chant-notes p, .chant .cue, .chant .line')) {
      if (!el.matches('.line')) cues.push({ id: el.dataset.cue ?? '', html: el.innerHTML });
      else if (this.lines.includes(el)) {
        cuesBefore.set(el, cues);
        cues = [];
      }
    }
    this.trailingCues = cues;
    return this.lines.map((line) => {
      return {
        html: partHtml(line, 'pali') + partHtml(line, 'en'),
        preview: partHtml(line, chantedParts(line)[0]),
        section: sectionTitle(line),
        cues: cuesBefore.get(line) ?? [],
        solo: line.classList.contains('solo'),
      };
    });
  }

  // Blocks hold as many lines as fit at the chosen text size, up to four, and
  // end at a section's end. If a single line does not fit, the size is reduced.
  private fit(lines: PageLine[]) {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const chosen = Number(document.documentElement.dataset.slideSize) || SIZE_RANGES.slideSize.default;
    let size = chosen * rem;
    for (let most = MAX_BLOCK_LINES; most > 1; most -= 1) {
      this.divide(lines, most);
      if (this.tallest(lines, size) <= this.page.clientHeight) return;
    }
    this.divide(lines, 1);
    for (let tries = 0; tries < 6; tries += 1) {
      const tallest = this.tallest(lines, size);
      if (tallest <= this.page.clientHeight) return;
      size *= Math.min(0.95, this.page.clientHeight / tallest);
    }
  }

  // Measured by showing each block, and the title, in turn; render() then shows the right one.
  private tallest(lines: PageLine[], size: number): number {
    this.page.style.setProperty('--line-size', `${size}px`);
    let tallest = 0;
    for (const block of [TITLE, ...this.starts.keys()]) {
      this.page.innerHTML = this.blockHtml(lines, block);
      tallest = Math.max(tallest, this.page.scrollHeight);
    }
    return tallest;
  }

  private divide(lines: PageLine[], most: number) {
    this.starts = [];
    for (let i = 0; i < lines.length; ) {
      this.starts.push(i);
      let end = i + 1;
      while (end < lines.length && end - i < most && lines[end].section === lines[i].section) end += 1;
      i = end;
    }
  }

  private blockOf(line: number): number {
    if (line === TITLE) return TITLE;
    let block = 0;
    while (block + 1 < this.starts.length && this.starts[block + 1] <= line) block += 1;
    return block;
  }

  private blockHtml(lines: PageLine[], block: number): string {
    const start = block === TITLE ? 0 : this.starts[block];
    const end = block === TITLE ? 0 : (this.starts[block + 1] ?? lines.length);
    const items: string[] = [];
    if (block === TITLE) items.push(lineHtml(this.titleHtml));
    for (let i = start; i < end; i += 1) {
      const line = lines[i];
      if (opensSection(lines, i)) items.push(`<h2 class="slide-page-heading">${escapeHtml(line.section)}</h2>`);
      items.push(...line.cues.map(cueHtml));
      if (line.solo && (i === start || !lines[i - 1].solo)) items.push('<p class="role-label">Solo introduction</p>');
      items.push(lineHtml(line.html));
    }
    const preview = block === TITLE ? undefined : lines[end];
    if (preview) {
      const section = opensSection(lines, end) ? `<p class="slide-page-section">${escapeHtml(preview.section)}</p>` : '';
      items.push(`<div class="slide-page-preview">${section}${preview.preview}</div>`);
    } else if (block !== TITLE) {
      items.push(...this.trailingCues.map(cueHtml));
    }
    return `${items.join('')}<div class="slide-page-bar"></div><p class="slide-page-count"></p>`;
  }

  // The old page fades upwards while the new one fades in after it, so the two never overlap.
  private turn() {
    for (const earlier of this.stage.querySelectorAll('.slide-ghost')) earlier.remove();
    const old = this.page.cloneNode(true) as HTMLElement;
    old.classList.add('slide-ghost');
    old.setAttribute('aria-hidden', 'true');
    this.stage.append(old);
    const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
    old
      .animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-1rem)' }], { duration: TURN_MS, easing, fill: 'forwards' })
      .finished.then(
        () => old.remove(),
        () => old.remove(),
      );
    this.page.animate([{ opacity: 0, transform: 'translateY(1rem)' }, { opacity: 1 }], {
      duration: TURN_MS * 1.5,
      delay: TURN_MS * 0.7,
      easing,
      fill: 'backwards',
    });
  }

  /** Redraws the current slide after the lines' text changed, for example after a translation is imported. */
  relayout() {
    this.key = '';
    this.refresh();
  }

  // The bar and the full colour move to the current line; the title has no bar.
  // When both texts are chanted, the bar covers the one being chanted.
  private mark(index: number, isLine: boolean, count: string, part: Part) {
    const lines = [...this.page.querySelectorAll<HTMLElement>('.slide-page-line')];
    lines.forEach((line, i) => line.classList.toggle('current', i === index));
    for (const text of this.page.querySelectorAll('.current-part')) text.classList.remove('current-part');
    const line = lines[index];
    const bar = this.page.querySelector<HTMLElement>('.slide-page-bar');
    const label = this.page.querySelector<HTMLElement>('.slide-page-count');
    if (!bar || !label) return;
    bar.hidden = !isLine || !line;
    label.textContent = '';
    if (!line) return;
    const both = document.documentElement.dataset.chanting === 'both';
    const chanted = both ? line.querySelector<HTMLElement>(`.slide-page-text > .${part}:not(:empty)`) : null;
    chanted?.classList.add('current-part');
    bar.style.top = `${chanted?.offsetTop ?? line.offsetTop}px`;
    bar.style.height = `${chanted?.offsetHeight ?? line.querySelector('.slide-page-text')?.clientHeight ?? line.offsetHeight}px`;
    label.textContent = count;
    label.style.top = `${line.offsetTop}px`;
  }
}

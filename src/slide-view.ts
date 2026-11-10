// The slide view (spec 04, P5 to P7) shows the chant a block of lines at a
// time. The block stays still and the accent bar moves down it. After the
// block, a smaller, fainter preview shows the next block's first line. When
// the current line passes the block's end, the page turns to the next block.
// Before the chant starts, the page shows the title and the chant's notes,
// with the first line as the preview. The lines, section titles, cues and
// leader labels are copied from the text view, so forms and translation
// follow the same settings. During a timed pause after a line (spec 09, F5),
// the line is dimmed; a pause with a cue, such as a bow, shows the next line's
// block with the cue marked, since the cue stands above the line it comes before.
import type { LineClock } from './clock.ts';
import { escapeHtml } from './html.ts';
import { SIZE_RANGES } from './settings.ts';
import type { Step } from './text-view.ts';

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
  /** The Pali and translation. */
  html: string;
  /** The Pali alone, for the preview. */
  pali: string;
  section: string;
  /** The cues between the line before and this one. */
  cues: Cue[];
  leader: boolean;
}

function part(root: HTMLElement, selector: string): HTMLElement {
  const el = root.querySelector<HTMLElement>(selector);
  if (!el) throw new Error(`Slide view: missing ${selector}`);
  return el;
}

// The line's Pali without its "×3", which the slide shows as "1 of 3".
function paliHtml(line: HTMLElement): string {
  const pali = line.querySelector('.pali')?.cloneNode(true) as HTMLElement | undefined;
  pali?.querySelector('.repeat')?.remove();
  return pali?.innerHTML ?? '';
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
  private position: HTMLElement;
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

  constructor(root: HTMLElement, steps: Step[], title: string) {
    this.root = root;
    this.steps = steps;
    this.lines = [...new Set(steps.map((s) => s.line))];
    // A set's chants keep their notes in their own blocks.
    const notes = document.querySelector('article.chant > .chant-notes');
    this.titleHtml = `<p class="pali">${escapeHtml(title)}</p>${notes ? `<div class="slide-page-notes">${notes.innerHTML}</div>` : ''}`;
    this.stage = part(root, '.slide-stage');
    this.page = part(root, '.slide-page');
    this.section = part(root, '.slide-section');
    this.position = part(root, '.slide-position');
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

  private render(animate: boolean) {
    const step = this.shown === TITLE ? null : this.steps[this.shown];
    const number = step ? this.lines.indexOf(step.line) : TITLE;
    this.position.textContent = step ? `${number + 1} / ${this.lines.length}` : '';
    // The page has no size in the text view or on the end slide.
    if (!this.page.clientHeight) return;
    const lines = this.pageLines();
    const d = document.documentElement.dataset;
    const key = [this.page.clientWidth, this.page.clientHeight, d.form, d.translation, d.slideSize].join();
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
    if (nextLine) this.mark(-1, false, '');
    else this.mark(block === TITLE ? 0 : number - this.starts[block], block !== TITLE, count);
  }

  private pageLines(): PageLine[] {
    const cuesBefore = new Map<HTMLElement, Cue[]>();
    let cues: Cue[] = [];
    for (const el of document.querySelectorAll<HTMLElement>('.chant .cue, .chant .line')) {
      if (el.matches('.cue')) cues.push({ id: el.dataset.cue ?? '', html: el.innerHTML });
      else if (this.lines.includes(el)) {
        cuesBefore.set(el, cues);
        cues = [];
      }
    }
    this.trailingCues = cues;
    return this.lines.map((line) => {
      const pali = paliHtml(line);
      const en = line.querySelector('.en')?.innerHTML ?? '';
      return {
        html: `<p class="pali" lang="pi">${pali}</p><p class="en">${en}</p>`,
        pali,
        section: sectionTitle(line),
        cues: cuesBefore.get(line) ?? [],
        leader: line.classList.contains('leader'),
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
      if (line.leader && (i === start || !lines[i - 1].leader)) items.push('<p class="leader-label">Leader</p>');
      items.push(lineHtml(line.html));
    }
    const preview = lines[end];
    if (preview) {
      const section = opensSection(lines, end) ? `<p class="slide-page-section">${escapeHtml(preview.section)}</p>` : '';
      items.push(`<div class="slide-page-preview">${section}<p class="pali" lang="pi">${preview.pali}</p></div>`);
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

  // The bar and the full colour move to the current line; the title has no bar.
  private mark(index: number, isLine: boolean, count: string) {
    const lines = [...this.page.querySelectorAll<HTMLElement>('.slide-page-line')];
    lines.forEach((line, i) => line.classList.toggle('current', i === index));
    const line = lines[index];
    const bar = this.page.querySelector<HTMLElement>('.slide-page-bar');
    const label = this.page.querySelector<HTMLElement>('.slide-page-count');
    if (!bar || !label) return;
    bar.hidden = !isLine || !line;
    label.textContent = '';
    if (!line) return;
    bar.style.top = `${line.offsetTop}px`;
    bar.style.height = `${line.querySelector('.slide-page-text')?.clientHeight ?? line.offsetHeight}px`;
    label.textContent = count;
    label.style.top = `${line.offsetTop}px`;
  }
}

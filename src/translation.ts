// The translation on a chant or set page: the site's English, a published
// translation chosen in the settings, or a translation the user imported. The
// choice of published translation is a setting for every page, and a chant
// without that translation shows the site's English. An import is kept under
// each chant's own number, so it applies on every page that shows the chant,
// and takes the place of the choice. The text is escaped before it is placed in
// the page, so a file cannot add markup.
import { lineText, type Forms } from './line-text.ts';
import { readChantSettings, writeChantSettings, type ImportedTranslation } from './settings.ts';
import { visibleText } from './text-view.ts';
import { checkChant, parseTranslation, writeTranslation, type ExportChant, type PublishedTranslation } from './translation-file.ts';

/** One chant on the page: its number, its slug and the element that holds its lines. */
export interface TranslationPart {
  id: string;
  slug: string;
  block: HTMLElement;
}

const linesOf = (part: TranslationPart) => [...part.block.querySelectorAll<HTMLElement>('.line[data-line]')];

// The text as written in a file: leader brackets as { and }, without the repeat
// count. A whole line chanted by the leader is marked by the chant data, so its
// brackets are left out.
function fileText(el: Element, leaderLine: boolean, form?: 'men' | 'women'): string {
  const copy = el.cloneNode(true) as Element;
  copy.querySelectorAll('.repeat').forEach((e) => e.remove());
  if (form) copy.querySelectorAll(form === 'men' ? '.form-women' : '.form-men').forEach((e) => e.remove());
  for (const bracket of copy.querySelectorAll('.leader-bracket')) {
    if (leaderLine) bracket.remove();
    else bracket.textContent = bracket.classList.contains('leader-open') ? '{' : '}';
  }
  return (copy.textContent ?? '').trim();
}

function translationOf(line: HTMLElement): Forms | null {
  const en = line.querySelector('.en');
  if (!en?.textContent?.trim()) return null;
  const leader = line.classList.contains('leader');
  if (!en.querySelector('.form-men')) return fileText(en, leader);
  return { men: fileText(en, leader, 'men'), women: fileText(en, leader, 'women') };
}

function publishedOf(part: TranslationPart): PublishedTranslation[] {
  const data = part.block.querySelector('script.published-translations')?.textContent;
  return data ? (JSON.parse(data) as PublishedTranslation[]) : [];
}

export class Translations {
  private parts: TranslationPart[];
  /** Each line's English as built, to restore when an import is removed. */
  private site = new Map<HTMLElement, string>();
  private published = new Map<TranslationPart, PublishedTranslation[]>();

  constructor(parts: TranslationPart[]) {
    this.parts = parts;
    for (const line of parts.flatMap(linesOf)) this.site.set(line, line.querySelector('.en')?.innerHTML ?? '');
    for (const part of parts) this.published.set(part, publishedOf(part));
    this.show();
  }

  private imported(part: TranslationPart): ImportedTranslation | undefined {
    return readChantSettings(part.id).translation;
  }

  /** The published translators of the chants on the page. */
  get available(): string[] {
    return [...new Set(this.parts.flatMap((part) => this.published.get(part)!.map((t) => t.translator)))];
  }

  /** The published translator chosen in the settings, or '' for the site's English or a choice no chant on the page has. */
  get choice(): string {
    const chosen = document.documentElement.dataset.translator ?? '';
    return this.available.includes(chosen) ? chosen : '';
  }

  private chosen(part: TranslationPart): PublishedTranslation | undefined {
    const choice = this.choice;
    return choice ? this.published.get(part)!.find((t) => t.translator === choice) : undefined;
  }

  /** The translation a chant shows, or undefined for the site's English. */
  private inUse(part: TranslationPart): ImportedTranslation | undefined {
    return this.imported(part) ?? this.chosen(part);
  }

  /** Fills each line with the translation in use. */
  show() {
    for (const part of this.parts) {
      const translation = this.inUse(part);
      for (const line of linesOf(part)) {
        let en = line.querySelector<HTMLElement>('.en');
        if (!en) {
          en = document.createElement('p');
          en.className = 'en';
          line.append(en);
        }
        if (!translation) {
          en.innerHTML = this.site.get(line) ?? '';
          en.removeAttribute('lang');
          continue;
        }
        const text = translation.lines[line.dataset.line ?? ''];
        if (!text) {
          en.replaceChildren();
          en.removeAttribute('lang');
          continue;
        }
        const repeat = line.querySelector('.pali .repeat')?.outerHTML;
        en.innerHTML = lineText(text, line.classList.contains('leader')) + (repeat ? ` ${repeat}` : '');
        en.lang = translation.lang;
      }
    }
  }

  /** The names of the translations in use on the page, other than the site's English. */
  get names(): string[] {
    return [...new Set(this.parts.flatMap((part) => this.inUse(part)?.name ?? []))];
  }

  /**
   * A note for the settings: the imports in use, the chants that show the site's
   * English instead of the chosen translation, and the lines left without a translation.
   */
  get description(): string {
    const notes: string[] = [];
    const imported = [...new Set(this.parts.flatMap((part) => this.imported(part)?.name ?? []))];
    if (imported.length) notes.push(`Imported: ${imported.join(', ')}.`);
    const uncovered = this.choice ? this.parts.filter((part) => !this.inUse(part)).length : 0;
    if (uncovered) notes.push(`${uncovered === 1 ? '1 chant' : `${uncovered} chants`} without this translation ${uncovered === 1 ? 'shows' : 'show'} Site English.`);
    const missing = this.parts.filter((part) => this.inUse(part)).flatMap(linesOf).filter((line) => !translationOf(line)).length;
    if (missing) notes.push(`${missing === 1 ? '1 line has' : `${missing} lines have`} no translation.`);
    return notes.join(' ');
  }

  get isImported(): boolean {
    return this.parts.some((part) => this.imported(part));
  }

  /**
   * Stores the file's translation of each chant on the page, if every one fits.
   * Returns an error, or a note naming chants in the file that are not on the page.
   */
  import(fileName: string, text: string): { error: string } | { note: string } {
    const file = parseTranslation(text);
    if (typeof file === 'string') return { error: file };
    const untagged = file.chants.get('');
    if (untagged && this.parts.length > 1) return { error: 'This page has several chants. Name each with a [chant:<number>] tag.' };
    const found: [TranslationPart, ImportedTranslation][] = [];
    for (const part of this.parts) {
      const rows = file.chants.get(part.id) ?? untagged;
      if (!rows) continue;
      const lineIds = new Set(linesOf(part).map((line) => Number(line.dataset.line)));
      const cueIds = new Set([...part.block.querySelectorAll<HTMLElement>('.cue[data-cue]')].map((cue) => Number(cue.dataset.cue)));
      const lines = checkChant(rows, lineIds, cueIds);
      if (typeof lines === 'string') return { error: this.parts.length > 1 ? `${part.slug}: ${lines}` : lines };
      found.push([part, { name: file.tags.ti || fileName, lang: file.tags.lang, lines }]);
    }
    if (!found.length) return { error: 'The file has no rows for the chants on this page.' };
    for (const [part, translation] of found) writeChantSettings(part.id, { translation });
    this.show();
    const others = [...file.chants.keys()].filter((id) => id && !this.parts.some((part) => part.id === id));
    return { note: others.length ? `Not on this page, so not imported: ${others.join(', ')}.` : '' };
  }

  /** Removes the imports, so the translation chosen in the settings is used. */
  removeImports() {
    for (const part of this.parts) writeChantSettings(part.id, { translation: undefined });
    this.show();
  }

  /** The translation in use as a file, with each line's Pali as a comment, to edit and import. */
  export(): string {
    const first = this.parts.map((part) => this.inUse(part)).find(Boolean);
    const chants: ExportChant[] = this.parts.map((part) => ({
      id: part.id,
      slug: part.slug,
      lines: linesOf(part).map((line) => ({
        id: line.dataset.line ?? '',
        pali: visibleText(line.querySelector('.pali') ?? line).trim(),
        text: translationOf(line),
      })),
    }));
    const notices = [...new Set(this.parts.flatMap((part) => (this.imported(part) ? [] : (this.chosen(part)?.notice ?? []))))];
    return writeTranslation(this.names.join(', ') || 'Site English (LLM generated)', first?.lang ?? 'en', chants, notices);
  }
}

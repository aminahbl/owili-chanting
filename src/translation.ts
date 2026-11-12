// The translation on a chant or set page: the site's English, or a translation
// the user imported. An import is kept under each chant's own number, so it
// applies on every page that shows the chant. The text is escaped before it is
// placed in the page, so a file cannot add markup.
import { lineText, type Forms } from './line-text.ts';
import { readChantSettings, writeChantSettings, type ImportedTranslation } from './settings.ts';
import { visibleText } from './text-view.ts';
import { checkChant, parseTranslation, writeTranslation, type ExportChant } from './translation-file.ts';

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

export class Translations {
  private parts: TranslationPart[];
  /** Each line's English as built, to restore when an import is removed. */
  private site = new Map<HTMLElement, string>();

  constructor(parts: TranslationPart[]) {
    this.parts = parts;
    for (const line of parts.flatMap(linesOf)) this.site.set(line, line.querySelector('.en')?.innerHTML ?? '');
    this.show();
  }

  private imported(part: TranslationPart): ImportedTranslation | undefined {
    return readChantSettings(part.id).translation;
  }

  /** Fills each line with the translation in use, and names it in the info panel. */
  show() {
    for (const part of this.parts) {
      const imported = this.imported(part);
      for (const line of linesOf(part)) {
        let en = line.querySelector<HTMLElement>('.en');
        if (!en) {
          en = document.createElement('p');
          en.className = 'en';
          line.append(en);
        }
        if (!imported) {
          en.innerHTML = this.site.get(line) ?? '';
          en.removeAttribute('lang');
          continue;
        }
        const text = imported.lines[line.dataset.line ?? ''];
        if (!text) {
          en.replaceChildren();
          en.removeAttribute('lang');
          continue;
        }
        const repeat = line.querySelector('.pali .repeat')?.outerHTML;
        en.innerHTML = lineText(text, line.classList.contains('leader')) + (repeat ? ` ${repeat}` : '');
        en.lang = imported.lang;
      }
    }
    this.showInfo();
  }

  private showInfo() {
    const names = this.names;
    const term = document.querySelector('.translation-term');
    const site = document.querySelector<HTMLElement>('.translation-site');
    const imported = document.querySelector<HTMLElement>('.translation-imported');
    if (term) term.textContent = names.length ? 'Translation' : 'English';
    if (site) site.hidden = !this.parts.some((part) => !this.imported(part));
    if (imported) {
      imported.hidden = names.length === 0;
      imported.textContent = `${names.join(', ')}, imported.`;
    }
  }

  /** The names of the imported translations on the page. */
  get names(): string[] {
    return [...new Set(this.parts.flatMap((part) => this.imported(part)?.name ?? []))];
  }

  /** The translation in use, for the settings, with the number of lines an import leaves without one. */
  get description(): string {
    const names = this.names;
    if (!names.length) return 'Translation: Site English (LLM generated)';
    const missing = this.parts.filter((part) => this.imported(part)).flatMap(linesOf).filter((line) => !translationOf(line)).length;
    const lines = missing === 1 ? '1 line has' : `${missing} lines have`;
    return `Translation: ${names.join(', ')}${missing ? `. ${lines} no translation` : ''}`;
  }

  get isImported(): boolean {
    return this.names.length > 0;
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

  /** Removes the imports, so the site's English is used. */
  useSite() {
    for (const part of this.parts) writeChantSettings(part.id, { translation: undefined });
    this.show();
  }

  /** The translation in use as a file, with each line's Pali as a comment, to edit and import. */
  export(): string {
    const first = this.parts.map((part) => this.imported(part)).find(Boolean);
    const chants: ExportChant[] = this.parts.map((part) => ({
      id: part.id,
      slug: part.slug,
      lines: linesOf(part).map((line) => ({
        id: line.dataset.line ?? '',
        pali: visibleText(line.querySelector('.pali') ?? line).trim(),
        text: translationOf(line),
      })),
    }));
    return writeTranslation(this.names.join(', ') || 'Site English (LLM generated)', first?.lang ?? 'en', chants);
  }
}

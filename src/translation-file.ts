// Translation files, plain text in the style of the timing files. `[lang:<code>]`
// gives the language and is required; `[ti:<name>]` may name the translation.
// A `[chant:<number> <slug>]` tag starts each chant's rows, and a file without
// one is for the chant of the page. A row is a line ID and its text, and
// `<id>/men` and `<id>/women` give a line's two forms. A row with an ID and no
// text is passed over, and rows starting with # are comments. This module has
// no browser dependencies.
import type { Forms } from './line-text.ts';

const TAG = /^\[([a-z]+):(.*)\]$/i;
const ROW = /^(\d+)(?:\/(men|women))?(?:\s+(.*))?$/;

interface Row {
  /** The row's number in the file, from 1, for error messages. */
  number: number;
  id: number;
  form?: 'men' | 'women';
  text: string;
}

export interface TranslationFile {
  /** The tags other than chant tags, by lower-case name. */
  tags: Record<string, string>;
  /** Each chant's rows by its number; rows before any chant tag are under ''. */
  chants: Map<string, Row[]>;
}

/** The file's tags and rows, or an error message naming the row. */
export function parseTranslation(text: string): TranslationFile | string {
  const tags: Record<string, string> = {};
  const chants = new Map<string, Row[]>();
  let current = '';
  for (const [i, raw] of text.split(/\r?\n/).entries()) {
    const row = raw.trim();
    if (!row || row.startsWith('#')) continue;
    const tag = TAG.exec(row);
    if (tag?.[1].toLowerCase() === 'chant') current = tag[2].trim().split(/\s+/)[0];
    else if (tag) tags[tag[1].toLowerCase()] = tag[2].trim();
    else {
      const match = ROW.exec(row);
      if (!match) return `Row ${i + 1}: a row starts with a line number.`;
      const rowText = match[3]?.trim() ?? '';
      if (!rowText) continue;
      const rows = chants.get(current) ?? [];
      rows.push({ number: i + 1, id: Number(match[1]), form: match[2] as Row['form'], text: rowText });
      chants.set(current, rows);
    }
  }
  if (!tags.lang) return 'The file has no [lang:…] tag naming its language, such as [lang:de].';
  return { tags, chants };
}

/** One chant's lines by line ID, checked against the chant's line and cue IDs, or an error message naming the row. */
export function checkChant(rows: Row[], lineIds: Set<number>, cueIds: Set<number>): Record<string, Forms> | string {
  const given = new Map<number, { number: number; one?: string; men?: string; women?: string }>();
  for (const row of rows) {
    if (cueIds.has(row.id)) return `Row ${row.number}: ${row.id} is an instruction, which is not translated.`;
    if (!lineIds.has(row.id)) return `Row ${row.number}: the chant has no line ${row.id}.`;
    const entry = given.get(row.id) ?? { number: row.number };
    const taken = row.form ? entry.one !== undefined || entry[row.form] !== undefined : given.has(row.id);
    if (taken) return `Row ${row.number}: line ${row.id} is given twice.`;
    if (row.form) entry[row.form] = row.text;
    else entry.one = row.text;
    given.set(row.id, entry);
  }
  const lines: Record<string, Forms> = {};
  for (const [id, entry] of given) {
    if (entry.one !== undefined) lines[id] = entry.one;
    else if (entry.men !== undefined && entry.women !== undefined) lines[id] = { men: entry.men, women: entry.women };
    else return `Row ${entry.number}: line ${id} has one form only. Give both forms, or one row for both.`;
  }
  return lines;
}

/** A chant's lines for an export: each line's Pali, for a comment, and its translation, if it has one. */
export interface ExportChant {
  id: string;
  slug: string;
  lines: { id: string; pali: string; text: Forms | null }[];
}

export function writeTranslation(name: string, lang: string, chants: ExportChant[]): string {
  const rows = [
    `[lang:${lang}]`,
    `[ti:${name}]`,
    '# [lang] gives the language as a code, such as de, th or pt-BR.',
    '# Each row is a line ID and its translation. A row with no text is passed over.',
    '# A line with men’s and women’s forms can have two rows, such as 2/men and 2/women.',
    '# Words in curly brackets at the start of a row are chanted by the leader alone.',
    '# Rows starting with # are not read. The # row above each line gives its Pali.',
  ];
  for (const chant of chants) {
    rows.push('', `[chant:${chant.id} ${chant.slug}]`);
    for (const line of chant.lines) {
      rows.push(`# ${line.pali}`);
      if (line.text === null) rows.push(line.id);
      else if (typeof line.text === 'string') rows.push(`${line.id} ${line.text}`);
      else rows.push(`${line.id}/men ${line.text.men}`, `${line.id}/women ${line.text.women}`);
    }
  }
  return `${rows.join('\n')}\n`;
}

import { readdir, readFile } from 'node:fs/promises';
import type { CardData, SearchEntry } from '../src/card.ts';
import { readLrc } from '../src/lrc.ts';
import { normalise } from '../src/normalise.ts';
import { groups, type GroupId } from '../data/groups.ts';
import type { Chant, ChantingLine, Section, Text } from '../data/types.ts';

export interface Group {
  id: GroupId;
  title: string;
}

/** One chant in one group. A chant in two groups gives two entries. */
export interface Entry {
  group: Group;
  card: CardData;
}

export async function loadChants(): Promise<Chant[]> {
  const dir = new URL('../data/chants/texts/', import.meta.url);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.ts')).sort();
  return Promise.all(files.map(async (f) => ((await import(new URL(f, dir).href)) as { chant: Chant }).chant));
}

/**
 * The timing of a recording of the chant, from `data/chants/markers/<id>.lrc`,
 * if there is one. It is checked against the chant's lines, so the build stops
 * on a timing that no longer fits.
 */
export async function loadTiming(chant: Chant): Promise<string | null> {
  let lrc: string;
  try {
    lrc = await readFile(new URL(`../data/chants/markers/${chant.id}.lrc`, import.meta.url), 'utf8');
  } catch {
    return null;
  }
  const lines = chant.sections.flatMap((s) => s.lines);
  const lineIds = lines.flatMap((l) => ('pali' in l ? Array<number>(l.repeat ?? 1).fill(l.id) : []));
  const cueIds = new Set(lines.filter((l) => 'cue' in l).map((l) => l.id));
  const read = readLrc(lrc, chant.id, lineIds, cueIds, lineIds.map(() => 0));
  if (typeof read === 'string') throw new Error(`data/chants/markers/${chant.id}.lrc: ${read}`);
  // The timing is bundled inside a script element, which this would end.
  if (/<\/script/i.test(lrc)) throw new Error(`data/chants/markers/${chant.id}.lrc: contains "</script".`);
  return lrc;
}

// Cards use the men's form until the site has a setting for the form.
function firstForm(text: Text): string {
  return typeof text === 'string' ? text : text.men;
}

const chanting = (s: Section) => s.lines.filter((l): l is ChantingLine => 'pali' in l);

function card(chant: Chant): CardData {
  // The leader's introduction ("Handa mayaṁ …") is in the opening sections, which
  // hold only leader lines; a leader line after them may be the chant's first words.
  const opening = chant.sections.findIndex((s) => chanting(s).some((l) => !l.leader));
  const lines = chant.sections
    .slice(Math.max(opening, 0))
    .flatMap(chanting)
    .slice(0, 2)
    .map((l) => firstForm(l.pali).replace(/[[\]]/g, ''));
  // A Pali title that only repeats the first line adds nothing to the card.
  const repeatsLine = chant.paliTitle && normalise(lines[0] ?? '').startsWith(normalise(chant.paliTitle));
  const paliTitle = chant.paliTitle && chant.paliTitle !== chant.title && !repeatsLine ? chant.paliTitle : undefined;
  return { id: chant.id, title: chant.title, ...(paliTitle ? { paliTitle } : {}), lines };
}

/** Entries in display order: groups as listed in data/groups.ts, chants by their order in each. */
export function entries(chants: Chant[]): Entry[] {
  return groups.flatMap((group) =>
    chants
      .flatMap((chant) => chant.groups.filter((m) => m.group === group.id).map((m) => ({ chant, order: m.order })))
      .sort((a, b) => a.order - b.order)
      .map(({ chant }) => ({ group, card: card(chant) })),
  );
}

/** Search entries: each chant once, in the order of the list of all chants. */
export function searchIndex(chants: Chant[], list: Entry[]): SearchEntry[] {
  const byId = new Map(chants.map((c) => [c.id, c]));
  const seen = new Set<string>();
  return list.flatMap(({ card }) => {
    if (seen.has(card.id)) return [];
    seen.add(card.id);
    const chant = byId.get(card.id)!;
    const pali = chant.sections
      .flatMap((s) => s.lines)
      .flatMap((l) => ('pali' in l ? (typeof l.pali === 'string' ? [l.pali] : [l.pali.men, l.pali.women]) : []));
    const text = normalise([chant.title, chant.paliTitle ?? '', ...pali].join(' '));
    const groups = Object.fromEntries(chant.groups.map((m) => [m.group, m.order]));
    return [{ ...card, groups, text }];
  });
}

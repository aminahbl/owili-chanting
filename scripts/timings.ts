// Makes a timing file from a recording's pauses, as described in
// data/chants/timings/TIMINGS.md.
//
//   node scripts/timings.ts propose <pauses.txt> <chant number>... > <labels.txt>
//   node scripts/timings.ts lrc <labels.txt> [chant number] > <rows.lrc>
//   node scripts/timings.ts draft <pauses.txt> <text> <checked.txt> [minutes] > <labels.txt>
//   node scripts/timings.ts module <text> <checked.txt> <chant number> <slug> > <module.ts>
//
// <text> is a bilara root file (.json) or a plain text file of the chant.
import { readdir, readFile } from 'node:fs/promises';
import type { Chant, Text } from '../data/types.ts';
import { formatTime } from '../src/lrc.ts';
import { normalise } from '../src/normalise.ts';

interface Span {
  start: number;
  end: number;
}

/** One chanting of a line, in the order the chant page steps through them. */
interface Step {
  chant: Chant;
  line: number;
  text: string;
  syllables: number;
}

/** ffmpeg sometimes reports one pause as two, a fraction of a millisecond apart. */
const PAUSE_JOIN = 0.05;
/** An unpaired group before the first line or after the last costs as much as a line 15% off the pace. */
const SKIP_COST = Math.log(1.15) ** 2;
/** The most breath groups one line is allowed to take. */
const MAX_GROUPS = 8;
/** A line whose pace is further than this from the recording's is flagged for listening. */
const FLAG_RATIO = 1.25;

const textOf = (text: Text) => (typeof text === 'string' ? text : text.men);
const syllables = (text: string) => normalise(text).replace(/[^aeiou]/g, '').length;

async function loadChant(id: string): Promise<Chant> {
  const dir = new URL('../data/chants/texts/', import.meta.url);
  const file = (await readdir(dir)).find((f) => f.startsWith(`${id}-`) && f.endsWith('.ts'));
  if (!file) throw new Error(`No chant numbered ${id}.`);
  return ((await import(new URL(file, dir).href)) as { chant: Chant }).chant;
}

function stepsOf(chant: Chant): Step[] {
  const steps: Step[] = [];
  for (const section of chant.sections) {
    for (let pass = 0; pass < (section.repeat ?? 1); pass++) {
      for (const line of section.lines) {
        if (!('pali' in line)) continue;
        const text = textOf(line.pali);
        for (let i = 0; i < (line.repeat ?? 1); i++) steps.push({ chant, line: line.id, text, syllables: syllables(text) });
      }
    }
  }
  return steps;
}

/** The stretches of sound between the pauses in ffmpeg's silencedetect output. */
function breathGroups(output: string): Span[] {
  const starts = [...output.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
  const ends = [...output.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
  const pauses: Span[] = [];
  starts.forEach((start, i) => {
    const last = pauses.at(-1);
    if (last && start - last.end < PAUSE_JOIN) last.end = ends[i];
    else pauses.push({ start, end: ends[i] });
  });
  return pauses.slice(1).map((pause, i) => ({ start: pauses[i].end, end: pause.start }));
}

/**
 * Pairs each step with a run of consecutive breath groups. The best pairing is
 * the one whose lines keep closest to the recording's average syllables per
 * second. Groups before the first line or after the last may be left unpaired.
 * Returns, for each step, the index of its first and last group.
 */
function pair(groups: Span[], steps: Step[], pace: number): [number, number][] {
  const cost = (step: Step, first: number, last: number) =>
    Math.log((groups[last].end - groups[first].start) / (step.syllables / pace)) ** 2;
  // best[j][i]: the lowest cost of pairing the first j steps with groups before i.
  const best = steps.map(() => groups.map(() => Infinity)).concat([groups.map(() => Infinity)]);
  const from = steps.map(() => groups.map(() => -1));
  for (let i = 0; i < groups.length; i++) best[0][i] = i * SKIP_COST;
  best.forEach((row) => row.push(Infinity));
  best[0][groups.length] = groups.length * SKIP_COST;
  steps.forEach((step, j) => {
    for (let last = 0; last < groups.length; last++) {
      for (let first = Math.max(0, last - MAX_GROUPS + 1); first <= last; first++) {
        const total = best[j][first] + cost(step, first, last);
        if (total < best[j + 1][last + 1]) {
          best[j + 1][last + 1] = total;
          from[j][last] = first;
        }
      }
    }
  });
  let end = 0;
  best[steps.length].forEach((total, i) => {
    if (total + (groups.length - i) * SKIP_COST < best[steps.length][end] + (groups.length - end) * SKIP_COST) end = i;
  });
  const runs: [number, number][] = [];
  for (let j = steps.length - 1; j >= 0; j--) {
    const first = from[j][end - 1];
    runs.unshift([first, end - 1]);
    end = first;
  }
  return runs;
}

/** Audacity labels, one per step, and one for each group left unpaired. */
async function propose(pausesFile: string, chantIds: string[]) {
  const groups = breathGroups(await readFile(pausesFile, 'utf8'));
  const steps = (await Promise.all(chantIds.map(loadChant))).flatMap(stepsOf);
  if (groups.length < steps.length) {
    throw new Error(`${groups.length} breath groups for ${steps.length} lines. Every line needs a breath group of its own.`);
  }
  const sound = groups.reduce((sum, g) => sum + g.end - g.start, 0);
  const pace = steps.reduce((sum, s) => sum + s.syllables, 0) / sound;
  const runs = pair(groups, steps, pace);
  const labels: [number, number, string][] = steps.map((step, j) => {
    const start = groups[runs[j][0]].start;
    const end = groups[runs[j][1]].end;
    const ratio = step.syllables / (end - start) / pace;
    const flag = ratio > FLAG_RATIO || ratio < 1 / FLAG_RATIO ? ' ?' : '';
    return [start, end, `${step.chant.id}:${step.line} ${step.text.split(' ').slice(0, 3).join(' ')}${flag}`];
  });
  const paired = new Set(runs.flatMap(([first, last]) => Array.from({ length: last - first + 1 }, (_, k) => first + k)));
  groups.forEach((g, i) => {
    if (!paired.has(i)) labels.push([g.start, g.end, `? group ${i + 1}: no line`]);
  });
  labels.sort((a, b) => a[0] - b[0]);
  for (const [start, end, text] of labels) console.log(`${start.toFixed(3)}\t${end.toFixed(3)}\t${text}`);
  console.error(`${groups.length} breath groups, ${steps.length} lines, ${pace.toFixed(2)} syllables a second.`);
}

interface Word {
  text: string;
  /** The word in lower case without punctuation, for finding checked lines' words again. */
  key: string;
  syllables: number;
  /** Whether the word ends a segment: a bilara segment, or a line of a plain text file. */
  endsSegment: boolean;
  /** The section the word belongs to: a bilara paragraph, or a plain text file's block of lines. */
  section: string;
  /** The SuttaCentral text ID, from a bilara segment ID. */
  uid?: string;
}

interface Label {
  start: number;
  end: number;
  text: string;
}

/** Shorter stretches of sound are clicks or breaths, not chanting. */
const SHORTEST_GROUP = 0.4;
/** The most words one line is allowed to hold, and the most breath groups it may take. */
const MAX_WORDS = 40;
const DRAFT_GROUPS = 3;
/** Ending a line after punctuation costs as much as a line 10% off the pace; inside a clause, 40%; inside a checked line's words, 60%. */
const PUNCTUATION_BREAK = Math.log(1.1) ** 2;
const CLAUSE_BREAK = Math.log(1.4) ** 2;
const PHRASE_BREAK = Math.log(1.6) ** 2;
/** A break that splits a doubled word, or leaves a quotation's first word at a line's end. */
const NEVER_BREAK = 10;
/** Each group after a line's first costs as much as a line 50% off the pace, as does a group with no words. */
const EXTRA_GROUP = Math.log(1.5) ** 2;
const EMPTY_GROUP = Math.log(1.5) ** 2;

const wordKey = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{M}]/gu, '');

/**
 * The words of the chant's text. A bilara root file (.json) leaves out headings,
 * whose segment IDs start with "0." or end in ".0" or ".0.<n>". A plain text file
 * gives one segment per line and starts a section at each blank line.
 */
async function wordsOf(file: string): Promise<Word[]> {
  const raw = await readFile(file, 'utf8');
  let segments: { text: string; section: string; uid?: string }[];
  if (file.endsWith('.json')) {
    const root = JSON.parse(raw) as Record<string, string>;
    segments = Object.entries(root)
      .filter(([id]) => !/:0\.|\.0$|\.0\.\d+$/.test(id))
      .map(([id, text]) => ({ text, section: id.slice(0, id.lastIndexOf('.')), uid: id.split(':')[0] }));
  } else {
    let section = 0;
    segments = [];
    for (const line of raw.split(/\r?\n/)) {
      if (!line.trim()) section += 1;
      else segments.push({ text: line, section: String(section) });
    }
  }
  return segments.flatMap(({ text, section, uid }) => {
    const words = text.trim().split(/\s+/);
    return words.map((word, i) => ({ text: word, key: wordKey(word), syllables: syllables(word), endsSegment: i === words.length - 1, section, uid }));
  });
}

/** Stops unless the checked labels hold the text's first words, in order. Returns how many words they hold. */
function checkedWords(words: Word[], checked: Label[]): number {
  const done = checked.flatMap((label) => label.text.split(/\s+/).map(wordKey));
  done.forEach((key, i) => {
    if (key !== words[i]?.key) throw new Error(`Checked word ${i + 1} is "${key}", but the text has "${words[i]?.key}".`);
  });
  return done.length;
}

/** Audacity labels holding the chant's words, leaving out labels for groups with no words, which start with "?". */
function labelsOf(text: string): Label[] {
  return text
    .split(/\r?\n/)
    .map((row) => row.split('\t'))
    .filter(([, , label]) => label && !label.trim().startsWith('?'))
    .map(([start, end, label]) => ({ start: Number(start), end: Number(end), text: label.replace(/ \?$/, '').trim() }));
}

/**
 * The cost of ending a line before each word, and whether that break falls
 * inside a checked line's words where they recur.
 */
function breakCosts(words: Word[], checked: Label[]): { cost: number[]; inPhrase: boolean[] } {
  const keys = words.map((w) => w.key);
  const edges = new Set<number>();
  const inside = new Set<number>();
  for (const phrase of new Set(checked.map((label) => label.text.split(/\s+/).map(wordKey).join(' ')))) {
    const parts = phrase.split(' ');
    for (let i = 0; i + parts.length <= keys.length; i++) {
      if (!parts.every((key, j) => keys[i + j] === key)) continue;
      edges.add(i);
      edges.add(i + parts.length);
      for (let j = 1; j < parts.length; j++) inside.add(i + j);
    }
  }
  const inPhrase = words.map((_, i) => inside.has(i) && !edges.has(i));
  const cost = words.map((word, i) => {
    const last = words[i - 1];
    if (!last || last.endsSegment || edges.has(i)) return 0;
    if (word.key === last.key || (/^[‘“]/.test(last.text) && !/[,;:.?!—…’”]$/.test(last.text))) return NEVER_BREAK;
    if (inside.has(i)) return PHRASE_BREAK;
    return /[,;:.?!—…’”]$/.test(last.text) ? PUNCTUATION_BREAK : CLAUSE_BREAK;
  });
  return { cost, inPhrase };
}

/**
 * Divides the words among the breath groups. A line takes one to three
 * consecutive groups, and a group may hold no words. The best division keeps
 * each line close to the pace and ends lines where a break costs least. The
 * words need not all be used. Returns, for each line, its first and last group
 * and its first and last word plus one; a group with no words has no words.
 */
function divide(groups: Span[], words: Word[], breakCost: number[], pace: number) {
  const G = groups.length;
  const W = Math.min(words.length, G * MAX_WORDS);
  const before = [0];
  for (const word of words) before.push(before.at(-1)! + word.syllables);
  // best[g * (W + 1) + w]: the lowest cost of dividing the first w words among the first g groups.
  const best = new Float64Array((G + 1) * (W + 1)).fill(Infinity);
  const fromGroup = new Int32Array((G + 1) * (W + 1));
  const fromWord = new Int32Array((G + 1) * (W + 1));
  const at = (g: number, w: number) => g * (W + 1) + w;
  best[at(0, 0)] = 0;
  for (let g = 0; g < G; g++) {
    for (let w = 0; w <= W; w++) {
      const cost = best[at(g, w)];
      if (cost === Infinity) continue;
      if (w > 0 && cost + EMPTY_GROUP < best[at(g + 1, w)]) {
        best[at(g + 1, w)] = cost + EMPTY_GROUP;
        fromGroup[at(g + 1, w)] = g;
        fromWord[at(g + 1, w)] = -1;
      }
      let sound = 0;
      for (let k = 1; k <= DRAFT_GROUPS && g + k <= G; k++) {
        sound += groups[g + k - 1].end - groups[g + k - 1].start;
        for (let end = w + 1; end <= Math.min(W, w + MAX_WORDS); end++) {
          const length = Math.log(sound / ((before[end] - before[w]) / pace)) ** 2;
          const total = cost + length + (breakCost[end] ?? 0) + (k - 1) * EXTRA_GROUP;
          if (total < best[at(g + k, end)]) {
            best[at(g + k, end)] = total;
            fromGroup[at(g + k, end)] = g;
            fromWord[at(g + k, end)] = w;
          }
        }
      }
    }
  }
  let w = 0;
  for (let i = 1; i <= W; i++) if (best[at(G, i)] < best[at(G, w)]) w = i;
  const lines: { first: number; last: number; words: [number, number] | null }[] = [];
  for (let g = G; g > 0; ) {
    const first = fromGroup[at(g, w)];
    const firstWord = fromWord[at(g, w)];
    lines.unshift({ first, last: g - 1, words: firstWord < 0 ? null : [firstWord, w] });
    if (firstWord >= 0) w = firstWord;
    g = first;
  }
  return { lines, before };
}

/**
 * Drafts the lines of a chant for the next stretch of a recording, as
 * Audacity labels holding each line's words. The labels already checked give
 * the starting point, the pace, and the phrases that recur in the text.
 */
async function draft(pausesFile: string, textFile: string, checkedFile: string, minutes: number) {
  const allGroups = breathGroups(await readFile(pausesFile, 'utf8')).filter((g) => g.end - g.start >= SHORTEST_GROUP);
  const words = await wordsOf(textFile);
  const checked = labelsOf(await readFile(checkedFile, 'utf8'));
  if (!checked.length) throw new Error(`${checkedFile} has no labels. Label the first lines by listening.`);
  const done = checkedWords(words, checked);
  const from = checked[0].start;
  const to = checked.at(-1)!.end;
  const sound = allGroups.filter((g) => g.start >= from - 1 && g.end <= to + 0.01).reduce((sum, g) => sum + g.end - g.start, 0);
  const pace = words.slice(0, done).reduce((sum, w) => sum + w.syllables, 0) / sound;

  const groups = allGroups.filter((g) => g.start > to && g.start < to + minutes * 60);
  const rest = words.slice(done);
  const breaks = breakCosts(words, checked);
  const { lines, before } = divide(groups, rest, breaks.cost.slice(done), pace);
  for (const { first, last, words: span } of lines) {
    const times = `${groups[first].start.toFixed(3)}\t${groups[last].end.toFixed(3)}`;
    if (!span) {
      console.log(`${times}\t? no words`);
      continue;
    }
    const [a, b] = span;
    const lineSound = groups.slice(first, last + 1).reduce((sum, g) => sum + g.end - g.start, 0);
    const ratio = (before[b] - before[a]) / lineSound / pace;
    const flagged = ratio > FLAG_RATIO || ratio < 1 / FLAG_RATIO || breaks.inPhrase[done + b];
    console.log(`${times}\t${rest.slice(a, b).map((x) => x.text).join(' ')}${flagged ? ' ?' : ''}`);
  }
  console.error(`${done} words checked, ${pace.toFixed(2)} syllables a second of sound, ${rest.length} words left.`);
}

/**
 * Timing rows from checked labels, ending with a row that ends the last line.
 * Labels name their chant and line, for example "0051:14". Given a chant
 * number, labels holding a line's words are that chant's lines in order, and
 * the lines after the last label get rows with no time. Other labels are left out.
 */
async function lrc(labelsFile: string, chantId?: string) {
  const rows: string[] = [];
  const chants = new Map<string, Chant>();
  let current = '';
  let lastEnd = 0;
  const ordered = chantId ? stepsOf(await loadChant(chantId)) : [];
  let next = 0;
  for (const row of (await readFile(labelsFile, 'utf8')).split(/\r?\n/)) {
    const [start, end, label = ''] = row.split('\t');
    const match = /^(\d{4}):(\d+)\b(.*)$/.exec(label.trim());
    let line: number;
    let text: string;
    let leftOut = false;
    let id: string;
    if (match) {
      id = match[1];
      if (!chants.has(id)) chants.set(id, await loadChant(id));
      const step = stepsOf(chants.get(id)!).find((s) => s.line === Number(match[2]));
      if (!step) throw new Error(`Chant ${id} has no line ${match[2]} to chant.`);
      [line, text, leftOut] = [step.line, step.text, /left out/.test(match[3])];
    } else if (chantId && label.trim() && !label.trim().startsWith('?')) {
      const step = ordered[next++];
      if (!step) throw new Error(`Chant ${chantId} has fewer lines than ${labelsFile} has labels.`);
      [id, line, text] = [chantId, step.line, step.text];
    } else continue;
    if (id !== current) {
      const chant = chants.get(id) ?? (await loadChant(id));
      rows.push('', `[chant:${chant.id} ${chant.slug}]`);
      current = id;
    }
    rows.push(`${leftOut ? '' : formatTime(Number(start))}${line} ${text}`);
    if (!leftOut) lastEnd = Number(end);
  }
  rows.push(formatTime(lastEnd));
  for (const step of ordered.slice(next)) rows.push(`${step.line} ${step.text}`);
  console.log(rows.join('\n').trimStart());
}

/**
 * A chant module from the checked labels, one line for each label, then one
 * line for each segment of the text after the last label, to be divided by
 * hand. Each line goes in the section where its first word is. The title, the
 * source and the refs are left for the editor to fill in.
 */
async function module(textFile: string, checkedFile: string, chantId: string, slug: string) {
  const words = await wordsOf(textFile);
  const checked = labelsOf(await readFile(checkedFile, 'utf8'));
  checkedWords(words, checked);
  const spans: [number, number][] = [];
  let at = 0;
  for (const label of checked) {
    const count = label.text.split(/\s+/).length;
    spans.push([at, at + count]);
    at += count;
  }
  for (let start = at; start < words.length; ) {
    let end = start + 1;
    while (!words[end - 1].endsSegment) end += 1;
    spans.push([start, end]);
    start = end;
  }
  const q = (text: string) => JSON.stringify(text);
  const uid = words[0]?.uid;
  const out = [
    "import type { Chant } from '../../types.ts';",
    '',
    'export const chant = {',
    `  id: ${q(chantId)},`,
    `  slug: ${q(slug)},`,
    '  draft: true,',
    '  title: "",',
    uid ? `  paliSource: { label: "SuttaCentral, Mahāsaṅgīti edition", url: ${q(`https://suttacentral.net/${uid}/pli/ms`)} },` : '  paliSource: { label: "" },',
    '  sections: [',
  ];
  let section = '';
  spans.forEach(([a, b], i) => {
    if (words[a].section !== section) {
      if (section) out.push('      ],', '    },');
      out.push('    {', '      lines: [');
      section = words[a].section;
    }
    out.push(`        { id: ${i + 1}, pali: ${q(words.slice(a, b).map((w) => w.text).join(' '))} },`);
  });
  out.push('      ],');
  if (uid) out.push(`      refs: [{ label: "", uid: ${q(uid)} }],`);
  out.push('    },', '  ],', '} satisfies Chant;');
  console.log(out.join('\n'));
  console.error(`${checked.length} lines from the labels, ${spans.length - checked.length} lines after them.`);
}

const [command, file, ...rest] = process.argv.slice(2);
if (command === 'propose' && file && rest.length) await propose(file, rest);
else if (command === 'lrc' && file && rest.length <= 1) await lrc(file, rest[0]);
else if (command === 'draft' && file && (rest.length === 2 || rest.length === 3)) await draft(file, rest[0], rest[1], Number(rest[2] ?? 7));
else if (command === 'module' && file && rest.length === 3) await module(file, rest[0], rest[1], rest[2]);
else
  console.error(
    'Usage: node scripts/timings.ts propose <pauses.txt> <chant number>... | lrc <labels.txt> [chant number] | draft <pauses.txt> <text> <checked.txt> [minutes] | module <text> <checked.txt> <chant number> <slug>',
  );

// Makes a timing file from a recording's pauses, as described in
// data/chants/markers/MARKERS.md.
//
//   node scripts/markers.ts propose <pauses.txt> <chant number>... > <labels.txt>
//   node scripts/markers.ts lrc <labels.txt> > <rows.lrc>
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

/**
 * Timing rows from checked labels, ending with a row that ends the last line.
 * Labels that do not start with a chant and line number are left out.
 */
async function lrc(labelsFile: string) {
  const rows: string[] = [];
  const chants = new Map<string, Chant>();
  let current = '';
  let lastEnd = 0;
  for (const row of (await readFile(labelsFile, 'utf8')).split(/\r?\n/)) {
    const [start, end, label = ''] = row.split('\t');
    const match = /^(\d{4}):(\d+)\b(.*)$/.exec(label.trim());
    if (!match) continue;
    const [, chantId, line, rest] = match;
    if (!chants.has(chantId)) chants.set(chantId, await loadChant(chantId));
    const chant = chants.get(chantId)!;
    if (chantId !== current) {
      rows.push('', `[chant:${chant.id} ${chant.slug}]`);
      current = chantId;
    }
    const step = stepsOf(chant).find((s) => s.line === Number(line));
    if (!step) throw new Error(`Chant ${chantId} has no line ${line} to chant.`);
    const leftOut = /left out/.test(rest);
    rows.push(`${leftOut ? '' : formatTime(Number(start))}${line} ${step.text}`);
    if (!leftOut) lastEnd = Number(end);
  }
  rows.push(formatTime(lastEnd));
  console.log(rows.join('\n').trimStart());
}

const [command, file, ...chantIds] = process.argv.slice(2);
if (command === 'propose' && file && chantIds.length) await propose(file, chantIds);
else if (command === 'lrc' && file) await lrc(file);
else console.error('Usage: node scripts/markers.ts propose <pauses.txt> <chant number>... | lrc <labels.txt>');

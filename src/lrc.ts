// Timing files in LRC, the plain text format for timed lyrics (spec 09). A
// file follows one recording, which can hold several chants: a
// `[chant:<number> <slug>]` tag starts each chant's rows. The number names the
// chant; the slug is there for the reader and may be left out. A row is
// "[minutes:seconds]" followed by a line ID and the line's Pali, which is there for the reader and not read
// back. A row with a cue's ID or no text marks a pause, which is added to the
// line before it. A row with a line ID and no time marks a line the recording
// leaves out. This module has no browser dependencies, so the build uses it too.

const TIME_ROW = /^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/;
const TAG = /^\[([a-z]+):(.*)\]$/i;
const LEFT_OUT = /^(\d+)(?:\s|$)/;

interface Row {
  /** The row's number in the file, from 1, for error messages. */
  number: number;
  /** Null for a line the recording leaves out. */
  time: number | null;
  id: number | null;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = (seconds - minutes * 60).toFixed(2).padStart(5, '0');
  return `[${String(minutes).padStart(2, '0')}:${rest}]`;
}

const tagOf = (row: string) => (TIME_ROW.test(row) ? null : TAG.exec(row));

const rowTime = (timed: RegExpExecArray) => Number(timed[1]) * 60 + Number(timed[2]);

/** The tags before the first chant tag, such as `ti`, `ar` and `place`, by lower-case name. */
export function lrcTags(text: string): Record<string, string> {
  const tags: Record<string, string> = {};
  for (const raw of text.split(/\r?\n/)) {
    const tag = tagOf(raw.trim());
    if (tag?.[1].toLowerCase() === 'chant') break;
    if (tag) tags[tag[1].toLowerCase()] = tag[2].trim();
  }
  return tags;
}

/** A chant tag's value: the chant's number, then its slug, which may be left out. */
export interface ChantTag {
  id: string;
  slug?: string;
}

function chantTag(value: string): ChantTag {
  const [id, slug] = value.trim().split(/\s+/);
  return slug ? { id, slug } : { id };
}

/** The chants a file names, in order of first appearance. */
export function lrcChants(text: string): ChantTag[] {
  const named = new Map<string, ChantTag>();
  for (const raw of text.split(/\r?\n/)) {
    const tag = tagOf(raw.trim());
    if (tag?.[1].toLowerCase() !== 'chant') continue;
    const chant = chantTag(tag[2]);
    if (!named.has(chant.id)) named.set(chant.id, chant);
  }
  return [...named.values()];
}

/**
 * One chant's part of a file, as a file of its own: the file's opening tags,
 * the chant's rows, and an empty row at the next later time after each run of
 * them, which ends the run's last line. A chant chanted in two parts has two
 * runs, and two chants may share a stretch of the recording. Null if the file
 * names other chants only; a file that names no chant is taken as it is.
 */
export function chantPart(text: string, chantId: string): string | null {
  const rows = text.split(/\r?\n/);
  if (lrcChants(text).length === 0) return text;
  const out: string[] = [];
  let current: string | null = null;
  let ended = true;
  let last = -Infinity;
  for (const raw of rows) {
    const row = raw.trim();
    const tag = tagOf(row);
    if (tag?.[1].toLowerCase() === 'chant') {
      current = chantTag(tag[2]).id;
      if (current === chantId) out.push(row);
      continue;
    }
    if (current === null) {
      out.push(row);
      continue;
    }
    const timed = TIME_ROW.exec(row);
    if (current === chantId) {
      out.push(row);
      if (timed) last = rowTime(timed);
      ended = false;
      continue;
    }
    if (timed && !ended && rowTime(timed) > last) {
      out.push(`[${timed[1]}:${timed[2]}]`);
      ended = true;
    }
  }
  return out.some((row) => tagOf(row)?.[1].toLowerCase() === 'chant') ? `${out.join('\n')}\n` : null;
}

/** One chant's timing, step by step. */
export interface Schedule {
  /** When each step starts; null for a step the recording leaves out. */
  starts: (number | null)[];
  /** When each step's line ends: the time of the first row after it, if there is one. */
  ends: (number | undefined)[];
  /** The cue timed in the pause after each step's line, if there is one. */
  cues: (number | null)[];
}

/**
 * One chant's timing, or an error message naming the row. `lineIds` has the
 * line ID of each step, so a line chanted three times appears three times.
 */
export function readLrc(text: string, chantId: string, lineIds: number[], cueIds: Set<number>): Schedule | string {
  const named = lrcChants(text);
  const name = (c: ChantTag) => c.slug ?? c.id;
  if (named.length > 1) return `This timing has more than one chant (${named.map(name).join(', ')}).`;
  if (named.length === 1 && named[0].id !== chantId) return `This timing is for another chant (${name(named[0])}).`;
  const rows: Row[] = [];
  for (const [i, raw] of text.split(/\r?\n/).entries()) {
    const row = raw.trim();
    const timed = TIME_ROW.exec(row);
    const leftOut = timed ? null : LEFT_OUT.exec(row);
    if (timed) {
      const id = /^\d+/.exec(timed[3].trim());
      rows.push({ number: i + 1, time: rowTime(timed), id: id ? Number(id[0]) : null });
    } else if (leftOut) rows.push({ number: i + 1, time: null, id: Number(leftOut[1]) });
  }
  if (!rows.some((row) => row.time !== null && row.id !== null)) return 'The file has no timed rows.';

  const schedule: Schedule = { starts: [], ends: [], cues: [] };
  // The step whose line is being chanted, and the last chanted step, whose pause a cue row times.
  let open: number | null = null;
  let last: number | null = null;
  let before: number | null = null;
  for (const row of rows) {
    const isCue = row.time !== null && row.id !== null && cueIds.has(row.id);
    if (row.time !== null) {
      if (before !== null && row.time <= before) return `Row ${row.number}: the time is not later than the row before.`;
      before = row.time;
      if (open !== null) schedule.ends[open] = row.time;
      open = null;
      if (isCue && last !== null && schedule.cues[last] === null) schedule.cues[last] = row.id;
    }
    if (row.id === null || isCue) continue;
    const step = schedule.starts.length;
    const expected = lineIds[step];
    if (expected === undefined) return `Row ${row.number}: the chant has only ${lineIds.length} lines to chant, counting repeats.`;
    if (row.id !== expected) return `Row ${row.number}: line ${expected} was expected here, but the row has ${row.id}.`;
    schedule.starts.push(row.time);
    schedule.ends.push(undefined);
    schedule.cues.push(null);
    if (row.time !== null) {
      open = step;
      last = step;
    }
  }
  const count = schedule.starts.length;
  if (count < lineIds.length) return `The file has rows for ${count} lines, but the chant has ${lineIds.length}, counting repeats.`;
  return schedule;
}

/** When the next chanted line after a step starts, if there is one. */
export function nextStart(schedule: Schedule, step: number): number | undefined {
  return schedule.starts.slice(step + 1).find((s): s is number => s !== null);
}

/**
 * Each step's length up to the next chanted line, so a pause after a line is
 * part of it. A left-out step lasts 0 seconds. `fallback` gives the length of
 * a last step that no row ends.
 */
export function stepDurations(schedule: Schedule, fallback: number[]): number[] {
  return schedule.starts.map((start, i) => {
    if (start === null) return 0;
    const next = nextStart(schedule, i) ?? schedule.ends[i];
    return next === undefined ? fallback[i] : next - start;
  });
}

/** How much of each step's length is a pause after its line: from the row that ends the line to the next line. */
export function stepPauses(schedule: Schedule): number[] {
  return schedule.starts.map((start, i) => {
    const end = schedule.ends[i];
    const next = nextStart(schedule, i);
    return start === null || end === undefined || next === undefined ? 0 : Math.max(0, next - end);
  });
}

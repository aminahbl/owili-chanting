// Timing files in LRC, the plain text format for timed lyrics (spec 09). Each
// row is "[minutes:seconds]" followed by a line ID and the line's Pali, which is
// there for the reader and not read back. A row with a cue's ID or no text
// marks a pause, which is added to the line before it. This module has no
// browser dependencies, so the build checks the marker files with it.

const TIME_ROW = /^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/;
const TAG = /^\[([a-z]+):(.*)\]$/i;

interface Row {
  /** The row's number in the file, from 1, for error messages. */
  number: number;
  time: number;
  id: number | null;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = (seconds - minutes * 60).toFixed(2).padStart(5, '0');
  return `[${String(minutes).padStart(2, '0')}:${rest}]`;
}

/** The file's tags, such as `ti`, `ar` and `place`, by lower-case name. */
export function lrcTags(text: string): Record<string, string> {
  const tags: Record<string, string> = {};
  for (const raw of text.split(/\r?\n/)) {
    const tag = TAG.exec(raw.trim());
    if (tag && !TIME_ROW.test(raw.trim())) tags[tag[1].toLowerCase()] = tag[2].trim();
  }
  return tags;
}

/**
 * The step durations in a timing file, or an error message naming the row.
 * `lineIds` has the line ID of each step, so a line chanted three times appears
 * three times; `fallback` gives the last step's duration if no row ends it.
 */
export function readLrc(text: string, chantId: string, lineIds: number[], cueIds: Set<number>, fallback: number[]): number[] | string {
  const named = lrcTags(text).chant;
  if (named && named !== chantId) return `This timing is for another chant (${named}).`;
  const rows: Row[] = [];
  for (const [i, raw] of text.split(/\r?\n/).entries()) {
    const timed = TIME_ROW.exec(raw.trim());
    if (!timed) continue;
    const id = /^\d+/.exec(timed[3].trim());
    rows.push({ number: i + 1, time: Number(timed[1]) * 60 + Number(timed[2]), id: id ? Number(id[0]) : null });
  }
  if (rows.length === 0) return 'The file has no timed rows.';

  const starts: number[] = [];
  const ends: number[] = [];
  let before: Row | null = null;
  for (const row of rows) {
    if (before && row.time <= before.time) return `Row ${row.number}: the time is not later than the row before.`;
    before = row;
    // A line row or a pause ends the step before it.
    if (starts.length > ends.length) ends.push(row.time);
    if (row.id === null || cueIds.has(row.id)) continue;
    const expected = lineIds[starts.length];
    if (expected === undefined) return `Row ${row.number}: the chant has only ${lineIds.length} lines to chant, counting repeats.`;
    if (row.id !== expected) return `Row ${row.number}: line ${expected} was expected here, but the row has ${row.id}.`;
    starts.push(row.time);
  }
  if (starts.length < lineIds.length) return `The file times ${starts.length} lines, but the chant has ${lineIds.length}, counting repeats.`;

  // Each step lasts until the next line starts, so a pause after a line is part of it.
  return starts.map((start, i) => {
    const next = starts[i + 1] ?? ends[i];
    return next === undefined ? fallback[i] : next - start;
  });
}

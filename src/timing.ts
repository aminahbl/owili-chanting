// The page's timing for Timed advance (spec 09). The default is the timing of
// a recording, where a marker file covers the chant or set, and otherwise the
// rhythm model's. The user can export the timing in use, edit it and import it
// again. A set page holds several chants, and a timing file gives each chant
// its own `[chant:…]` block: each block is read against its chant's lines,
// because line and cue numbers repeat between chants, and the results are
// joined in page order. A chant page is the case of one chant.
import { chantPart, formatTime, lrcTags, readLrc, type Schedule } from './lrc.ts';
import { readChantSettings, writeChantSettings } from './settings.ts';
import { rhythmDurations } from './tempo.ts';
import { visibleText, type Step } from './text-view.ts';

/** One chant on the page: its number and slug, its steps and its cues' line numbers. */
export interface TimingPart {
  id: string;
  slug: string;
  steps: Step[];
  cueIds: Set<number>;
}

/** The rhythm model's timing, as LRC, with one block per chant. */
function rhythmLrc(title: string, parts: TimingPart[]): string {
  const rows = [
    `[ti:${title}]`,
    '# Default timing from the rhythm model at the natural speed.',
    '# Each row: [minutes:seconds] when the line starts, its ID, then its Pali, which is not read on import.',
    '# A row with a time and no text ends the line before it.',
  ];
  let time = 0;
  for (const part of parts) {
    rows.push(`[chant:${part.id} ${part.slug}]`);
    const durations = rhythmDurations(part.steps);
    part.steps.forEach((step, i) => {
      const pali = visibleText(step.line.querySelector('.pali') ?? step.line).trim();
      rows.push(`${formatTime(time)}${step.line.dataset.line} ${pali}`);
      time += durations[i];
    });
  }
  rows.push(formatTime(time));
  return `${rows.join('\n')}\n`;
}

export class Timing {
  /** The page's number, a chant's or a set's, under which an imported timing is kept. */
  private pageId: string;
  private title: string;
  private parts: TimingPart[];
  /** The recording's timing bundled with the page, if there is one. */
  private recorded: string | null;

  constructor(pageId: string, title: string, parts: TimingPart[], recorded: string | null) {
    this.pageId = pageId;
    this.title = title;
    this.parts = parts;
    this.recorded = recorded;
  }

  private get imported() {
    return readChantSettings(this.pageId).timing;
  }

  get name(): string {
    if (this.imported) return this.imported.name;
    if (!this.recorded) return 'Default (rhythm model)';
    const tags = lrcTags(this.recorded);
    const by = tags.place ?? tags.performers;
    return by ? `Default (${by} recording)` : 'Default (recording)';
  }

  get isImported(): boolean {
    return this.imported !== undefined;
  }

  // Each chant's block, read against the chant's own lines. On a set page, an
  // error names the chant.
  private read(lrc: string): Schedule | string {
    const joined: Schedule = { starts: [], ends: [], cues: [] };
    const named = (message: string, part: TimingPart) => (this.parts.length > 1 ? `${part.slug}: ${message}` : message);
    for (const part of this.parts) {
      const block = chantPart(lrc, part.id);
      if (block === null) return named('This timing has no rows for this chant.', part);
      const lineIds = part.steps.map((s) => Number(s.line.dataset.line));
      const read = readLrc(block, part.id, lineIds, part.cueIds);
      if (typeof read === 'string') return named(read, part);
      joined.starts.push(...read.starts);
      joined.ends.push(...read.ends);
      joined.cues.push(...read.cues);
    }
    return joined;
  }

  // The file in use, read. The build checks the bundled timing, so only a stored
  // file can fail to fit, for example after the text changed; it then gives way
  // to the default. Null means the rhythm model.
  private inUse(): { lrc: string; schedule: Schedule } | null {
    for (const lrc of [this.imported?.lrc, this.recorded]) {
      if (!lrc) continue;
      const read = this.read(lrc);
      if (typeof read !== 'string') return { lrc, schedule: read };
    }
    return null;
  }

  /** The timing in use, step by step; the rhythm model's runs from 0 with no pauses. */
  schedule(): Schedule {
    const file = this.inUse();
    if (file) return file.schedule;
    const durations = rhythmDurations(this.parts.flatMap((p) => p.steps));
    let time = 0;
    const starts = durations.map((d) => {
      const start = time;
      time += d;
      return start;
    });
    return { starts, ends: durations.map(() => undefined), cues: durations.map(() => null) };
  }

  /** True when the timing in use comes from a file, so it can follow the user's audio. */
  get fromFile(): boolean {
    return this.inUse() !== null;
  }

  lrc(): string {
    return this.imported?.lrc ?? this.recorded ?? rhythmLrc(this.title, this.parts);
  }

  /** Stores the file as imported if it fits every chant on the page; otherwise returns the reason it does not. */
  import(name: string, text: string): string | null {
    const read = this.read(text);
    if (typeof read === 'string') return read;
    writeChantSettings(this.pageId, { timing: { name, lrc: text } });
    return null;
  }

  useDefault() {
    writeChantSettings(this.pageId, { timing: undefined });
  }
}

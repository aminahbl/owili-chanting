// The chant's timing for Timed advance (spec 09). The default is the timing of
// a recording, where a marker file covers the chant, and otherwise the rhythm
// model's. The user can export the timing in use, edit it and import it again.
import { chantPart, formatTime, lrcTags, readLrc, type Schedule } from './lrc.ts';
import { readChantSettings, writeChantSettings } from './settings.ts';
import { rhythmDurations } from './tempo.ts';
import { visibleText, type Step } from './text-view.ts';

/** The rhythm model's timing, as LRC. */
function rhythmLrc(title: string, chantId: string, slug: string, steps: Step[]): string {
  const durations = rhythmDurations(steps);
  const rows = [
    `[ti:${title}]`,
    `[chant:${chantId} ${slug}]`,
    '# Default timing from the rhythm model at the natural speed.',
    '# Each row: [minutes:seconds] when the line starts, its ID, then its Pali, which is not read on import.',
    '# A row with a time and no text ends the line before it.',
  ];
  let time = 0;
  steps.forEach((step, i) => {
    const pali = visibleText(step.line.querySelector('.pali') ?? step.line).trim();
    rows.push(`${formatTime(time)}${step.line.dataset.line} ${pali}`);
    time += durations[i];
  });
  rows.push(formatTime(time));
  return `${rows.join('\n')}\n`;
}

export class Timing {
  private steps: Step[];
  private chantId: string;
  private slug: string;
  private title: string;
  private cueIds: Set<number>;
  /** The recording's timing bundled with the page, if the chant has one. */
  private recorded: string | null;

  constructor(steps: Step[], chantId: string, slug: string, title: string, cueIds: Set<number>, recorded: string | null) {
    this.steps = steps;
    this.chantId = chantId;
    this.slug = slug;
    this.title = title;
    this.cueIds = cueIds;
    this.recorded = recorded;
  }

  private get imported() {
    return readChantSettings(this.chantId).timing;
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

  private read(lrc: string): Schedule | string {
    const lineIds = this.steps.map((s) => Number(s.line.dataset.line));
    return readLrc(lrc, this.chantId, lineIds, this.cueIds);
  }

  // The file in use, read. The build checks the bundled timing, so only a stored
  // file can fail to fit, for example after the chant's text changed; it then
  // gives way to the default. Null means the rhythm model.
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
    const durations = rhythmDurations(this.steps);
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
    return this.imported?.lrc ?? this.recorded ?? rhythmLrc(this.title, this.chantId, this.slug, this.steps);
  }

  /** Stores the chant's part of the file if it fits the chant; otherwise returns the reason it does not. */
  import(name: string, text: string): string | null {
    const lrc = chantPart(text, this.chantId);
    if (lrc === null) return 'This timing has no rows for this chant.';
    const read = this.read(lrc);
    if (typeof read === 'string') return read;
    writeChantSettings(this.chantId, { timing: { name, lrc } });
    return null;
  }

  useDefault() {
    writeChantSettings(this.chantId, { timing: undefined });
  }
}

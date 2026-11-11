// The page's timing for Timed advance (spec 09). The default is the timing of
// a recording, where a marker file covers the chant or set, and otherwise the
// rhythm model's. The user can export the timing in use, edit it and import it
// again. A set page holds several chants, and a timing file gives each chant
// its own `[chant:…]` block: each block is read against its chant's lines,
// because line and cue numbers repeat between chants, and the results are
// joined in page order. A chant page is the case of one chant. A file fits
// one order of chanting, named by its `chanting` tag (see chantingOrder); a
// file without the tag, such as a recording's, is for the Pali.
import { chantPart, formatTime, lrcTags, readLrc, type Schedule } from './lrc.ts';
import { readChantSettings, writeChantSettings } from './settings.ts';
import { rhythmDurations } from './tempo.ts';
import { chantingOrder, stepText, type Step } from './text-view.ts';

const ORDER_NAMES: Record<string, string> = {
  pali: 'chanting the Pali',
  translation: 'chanting the translation',
  'pali-translation': 'chanting the Pali, then the translation',
  'translation-pali': 'chanting the translation, then the Pali',
};

const orderOf = (lrc: string) => lrcTags(lrc).chanting ?? 'pali';
const fitsChanting = (lrc: string) => orderOf(lrc) === chantingOrder();

/** One chant on the page: its number and slug, its steps and its cues' line numbers. */
export interface TimingPart {
  id: string;
  slug: string;
  steps: Step[];
  cueIds: Set<number>;
}

/** The rhythm model's timing, as LRC, with one block per chant. */
function rhythmLrc(title: string, parts: TimingPart[]): string {
  const order = chantingOrder();
  const rows = [
    `[ti:${title}]`,
    ...(order === 'pali' ? [] : [`[chanting:${order}]`]),
    '# Default timing from the rhythm model at the natural speed.',
    '# Each row: [minutes:seconds] when the line starts, its ID, then the text chanted, which is not read on import.',
    '# A row with a time and no text ends the line before it.',
  ];
  let time = 0;
  for (const part of parts) {
    rows.push(`[chant:${part.id} ${part.slug}]`);
    const durations = rhythmDurations(part.steps);
    part.steps.forEach((step, i) => {
      rows.push(`${formatTime(time)}${step.line.dataset.line} ${stepText(step)}`);
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

  /** The recording's timing, while the Pali alone is chanted. */
  private get recordedInUse(): string | null {
    return this.recorded && fitsChanting(this.recorded) ? this.recorded : null;
  }

  get name(): string {
    const imported = this.imported;
    if (imported && fitsChanting(imported.lrc)) return imported.name;
    const recorded = this.recordedInUse;
    const by = recorded ? (lrcTags(recorded).place ?? lrcTags(recorded).performers) : undefined;
    let name = 'Default (rhythm model)';
    if (recorded) name = by ? `Default (${by} recording)` : 'Default (recording)';
    if (!imported) return name;
    return `${name}. The imported ${imported.name} is set aside: it is for ${ORDER_NAMES[orderOf(imported.lrc)] ?? orderOf(imported.lrc)}`;
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
    for (const lrc of [this.imported?.lrc, this.recordedInUse]) {
      if (!lrc || !fitsChanting(lrc)) continue;
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

  /** The file in use, or the rhythm model's timing. */
  lrc(): string {
    return this.inUse()?.lrc ?? rhythmLrc(this.title, this.parts);
  }

  /** Stores the file as imported if it fits every chant on the page; otherwise returns the reason it does not. */
  import(name: string, text: string): string | null {
    if (!fitsChanting(text)) {
      return `This timing is for ${ORDER_NAMES[orderOf(text)] ?? orderOf(text)}, but the settings are for ${ORDER_NAMES[chantingOrder()]}.`;
    }
    const read = this.read(text);
    if (typeof read === 'string') return read;
    writeChantSettings(this.pageId, { timing: { name, lrc: text } });
    return null;
  }

  useDefault() {
    writeChantSettings(this.pageId, { timing: undefined });
  }
}

// Auto advance (spec 05, T7, T8 and T11): step durations from the rhythm
// model, and a tempo stored per chant that scales them.
import type { LineClock } from './clock.ts';
import { lineSeconds } from './rhythm.ts';
import { readChantSettings, TEMPO_RANGE, writeChantSettings } from './settings.ts';
import { endsSection, visibleText, type Step } from './text-view.ts';

const clamp = (tempo: number) => Math.min(TEMPO_RANGE.max, Math.max(TEMPO_RANGE.min, tempo));

/** Each step's duration from the text, in the form in use, at a tempo of 1. */
export function rhythmDurations(steps: Step[]): number[] {
  return steps.map((s) => lineSeconds(visibleText(s.line.querySelector('.pali') ?? s.line), endsSection(s)));
}

export class Tempo {
  private clock: LineClock;
  private steps: Step[];
  private chantId: string;

  constructor(clock: LineClock, steps: Step[], chantId: string) {
    this.clock = clock;
    this.steps = steps;
    this.chantId = chantId;
    clock.tempo = clamp(readChantSettings(chantId).tempo ?? TEMPO_RANGE.default);
    this.measure();
  }

  /** Sets each step's duration from the text, in the form in use. */
  measure() {
    this.clock.durations = rhythmDurations(this.steps);
  }

  setTempo(tempo: number) {
    const rounded = Math.round(clamp(tempo) * 100) / 100;
    this.clock.tempo = rounded;
    writeChantSettings(this.chantId, { tempo: rounded });
  }

  faster() {
    this.setTempo(this.clock.tempo + TEMPO_RANGE.step);
  }

  slower() {
    this.setTempo(this.clock.tempo - TEMPO_RANGE.step);
  }
}

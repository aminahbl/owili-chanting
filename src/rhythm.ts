// The rhythm model (spec 05, T8). From the Bhikkhu Manual's chanting
// technique: a syllable ending in short a, i or u is one beat, and every other
// syllable is two beats. A line takes its beats times the beat length, plus a
// fixed time for the breath at the line end.

export const BEAT_SECONDS = 0.3;
export const LINE_SECONDS = 0.6;
export const SECTION_END_SECONDS = 1.2;

const VOWELS = new Set(['a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'o']);
const LONG_VOWELS = new Set(['ā', 'ī', 'ū', 'e', 'o']);
const ASPIRATES = new Set(['kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh']);

type Unit = { kind: 'vowel'; letter: string } | { kind: 'consonant' } | { kind: 'niggahita' };

function soundUnits(text: string): Unit[] {
  const chars = Array.from(text.normalize('NFC').toLowerCase().replace(/[^\p{Ll}]/gu, ''));
  const units: Unit[] = [];
  for (let i = 0; i < chars.length; i += 1) {
    const c = chars[i];
    if (VOWELS.has(c)) units.push({ kind: 'vowel', letter: c });
    else if (c === 'ṁ' || c === 'ṃ') units.push({ kind: 'niggahita' });
    else {
      // An aspirated consonant such as bh counts as one.
      if (ASPIRATES.has(c + (chars[i + 1] ?? ''))) i += 1;
      units.push({ kind: 'consonant' });
    }
  }
  return units;
}

export function lineBeats(text: string): number {
  const units = soundUnits(text);
  let beats = 0;
  units.forEach((unit, i) => {
    if (unit.kind !== 'vowel') return;
    let consonants = 0;
    let niggahita = false;
    let j = i + 1;
    for (; j < units.length && units[j].kind !== 'vowel'; j += 1) {
      if (units[j].kind === 'niggahita') niggahita = true;
      else consonants += 1;
    }
    // A syllable is closed by ṁ, by a double consonant, or by a final consonant.
    const closed = niggahita || consonants >= 2 || (j >= units.length && consonants >= 1);
    beats += LONG_VOWELS.has(unit.letter) || closed ? 2 : 1;
  });
  return beats;
}

/** A line's duration in seconds at a tempo of 1. */
export function lineSeconds(text: string, sectionEnd: boolean): number {
  return lineBeats(text) * BEAT_SECONDS + LINE_SECONDS + (sectionEnd ? SECTION_END_SECONDS : 0);
}

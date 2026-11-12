// The rhythm model. From the Bhikkhu Manual's chanting
// technique: a syllable ending in short a, i or u is one beat, and every other
// syllable is two beats. A line takes its beats times the beat length, plus a
// fixed time for the breath at the line end.

const BEAT_SECONDS = 0.3;
const LINE_SECONDS = 0.6;
const SECTION_END_SECONDS = 1.2;

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

// A translation's line is timed at one even beat per syllable. A syllable is a
// run of vowel letters, which suits languages in the Latin alphabet; text with
// no such vowels, as in most other scripts, counts one beat for every two
// letters. Both are first estimates, not yet checked against a recording.
const TRANSLATION_BEAT_SECONDS = 0.35;

export function translationBeats(text: string): number {
  const plain = text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  const syllables = plain.match(/[aeiouy]+/g)?.length ?? 0;
  if (syllables > 0) return syllables;
  return Math.ceil((plain.match(/\p{L}/gu)?.length ?? 0) / 2);
}

/** A translation line's duration in seconds at a tempo of 1. */
export function translationSeconds(text: string, sectionEnd: boolean): number {
  return translationBeats(text) * TRANSLATION_BEAT_SECONDS + LINE_SECONDS + (sectionEnd ? SECTION_END_SECONDS : 0);
}

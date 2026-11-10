import type { Chant } from '../../types.ts';

export const chant = {
  id: "0034",
  slug: "mettapharana",
  title: "Reflection on Universal Well-Being",
  paliTitle: "Mettāpharaṇa",
  groups: [{ group: "reflections", order: 70 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#mettapharana", categories: [{ category: "Reflections", order: 7 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [2], note: "English to review: *homi* is literally \"I am\"; as in most chanting translations it is read as a wish, \"may I be\"." },
    { status: "open", lines: [9], note: "English to review: over 100 characters; the Pali line is also long." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayam mettāpharaṇaṁ karomase", en: "Now let us chant the suffusion with warmth.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "[Ahaṁ sukhito homi] niddukkho homi, avero homi, abyāpajjho homi, anīgho homi,", en: "May I be happy, free from suffering, free from enmity, free from ill will, free from distress;" },
        { id: 3, pali: "sukhī attānaṁ pariharāmi", en: "may I look after myself with ease." },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Sabbe sattā sukhitā hontu, sabbe sattā averā hontu,", en: "May all beings be happy; may all beings be free from enmity;" },
        { id: 5, pali: "sabbe sattā abyāpajjhā hontu, sabbe sattā anīghā hontu,", en: "may all beings be free from ill will; may all beings be free from distress;" },
        { id: 6, pali: "sabbe sattā sukhī attānaṁ pariharantu", en: "may all beings look after themselves with ease." },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Sabbe sattā sabbadukkhā pamuccantu", en: "May all beings be released from all suffering." },
      ],
    },
    {
      lines: [
        { id: 8, pali: "Sabbe sattā laddha-sampattito mā vigacchantu", en: "May all beings not lose the good fortune they have gained." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Sabbe sattā kammassakā kammadāyādā kammayonī kammabandhū kammapaṭisaraṇā,", en: "All beings are the owners of their actions, heirs to them, born of them, bound to them, with them as their refuge;" },
        { id: 10, pali: "yaṁ kammaṁ karissanti, kalyāṇaṁ vā pāpakaṁ vā, tassa dāyādā bhavissanti", en: "whatever they do, good or bad, of that they will be the heirs." },
      ],
      refs: [{ label: "MN 41", uid: "mn41" }, { label: "AN 10.48", uid: "an10.48" }],
    },
  ],
} satisfies Chant;

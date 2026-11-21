import type { Chant } from '../../types.ts';

export const chant = {
  id: "0034",
  slug: "mettapharana",
  title: "Reflection on Universal Well-Being",
  paliTitle: "Mettāpharaṇa",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/reflections-and-recollections-p1.tex#L248", categories: [{ category: "Reflections & Recollections", order: 4 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [1, 2, 3, 4, 5], note: "English to review: *homi* is literally \"I am\"; as in most chanting translations it is read as a wish, \"may I be\"." },
    { status: "open", lines: [14], note: "English to review: over 100 characters; the Pali line is also long." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Ahaṁ sukhito homi", en: "May I be happy,", leader: true },
        { id: 2, pali: "Niddukkho homi,", en: "free from suffering," },
        { id: 3, pali: "Avero homi,", en: "free from enmity," },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Abyāpajjho homi,", en: "free from ill will," },
        { id: 5, pali: "Anīgho homi,", en: "free from distress;" },
        { id: 6, pali: "Sukhī attānaṁ pariharāmi", en: "may I look after myself with ease." },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Sabbe sattā sukhitā hontu,", en: "May all beings be happy;" },
        { id: 8, pali: "Sabbe sattā averā hontu,", en: "may all beings be free from enmity;" },
        { id: 9, pali: "Sabbe sattā abyāpajjhā hontu,", en: "may all beings be free from ill will;" },
      ],
    },
    {
      lines: [
        { id: 10, pali: "Sabbe sattā anīghā hontu,", en: "may all beings be free from distress;" },
        { id: 11, pali: "Sabbe sattā sukhī attānaṁ pariharantu", en: "may all beings look after themselves with ease." },
      ],
    },
    {
      lines: [
        { id: 12, pali: "Sabbe sattā sabbadukkhā pamuccantu", en: "May all beings be released from all suffering." },
      ],
    },
    {
      lines: [
        { id: 13, pali: "Sabbe sattā laddha-sampattito mā vigacchantu", en: "May all beings not lose the good fortune they have gained." },
      ],
    },
    {
      lines: [
        { id: 14, pali: "Sabbe sattā kammassakā kammadāyādā kammayonī kammabandhū kammapaṭisaraṇā,", en: "All beings are the owners of their actions, heirs to them, born of them, bound to them, with them as their refuge;" },
        { id: 15, pali: "Yaṁ kammaṁ karissanti,", en: "whatever they do," },
        { id: 16, pali: "Kalyāṇaṁ vā pāpakaṁ vā,", en: "good or bad," },
        { id: 17, pali: "Tassa dāyādā bhavissanti", en: "of that they will be the heirs." },
      ],
      refs: [{ label: "MN 41", uid: "mn41" }, { label: "AN 10.48", uid: "an10.48" }],
    },
  ],
} satisfies Chant;

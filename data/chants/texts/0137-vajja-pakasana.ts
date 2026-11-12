import type { Chant } from '../../types.ts';

export const chant = {
  id: "0137",
  slug: "vajja-pakasana",
  title: "Asking for Pardon",
  paliTitle: "Vajjapakāsanaṁ",
  paliSource: { label: "Ancient Buddhist Texts, Daily Chanting", url: "https://ancient-buddhist-texts.net/Texts-and-Translations/Daily-Chanting/03-Wednesday.htm" },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The source gives each verse as two lines; each is split into four, as in The Aspirations (0095), which has the first verse." },
    { status: "open", lines: [12], note: "The London Buddhist Vihara text (retired chant 0027) has *Supaṭipanno anuttaro* where this source has *puññakkhetta anuttara*. Check against the LBV recording." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Kāyena vācā cittena", en: "By body, speech or mind," },
        { id: 2, pali: "pamādena mayā kataṁ,", en: "whatever wrong I have done through heedlessness:" },
        { id: 3, pali: "accayaṁ khama me bhante,", en: "pardon me this fault, Venerable Sir," },
        { id: 4, pali: "bhūripañña Tathāgata.", en: "Tathāgata of vast wisdom." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Kāyena vācā cittena", en: "By body, speech or mind," },
        { id: 6, pali: "pamādena mayā kataṁ,", en: "whatever wrong I have done through heedlessness:" },
        { id: 7, pali: "accayaṁ khama me Dhamma", en: "pardon me this fault, Dhamma," },
        { id: 8, pali: "sandiṭṭhika, akālika.", en: "visible here and now, timeless." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Kāyena vācā cittena", en: "By body, speech or mind," },
        { id: 10, pali: "pamādena mayā kataṁ,", en: "whatever wrong I have done through heedlessness:" },
        { id: 11, pali: "accayaṁ khama me Saṅgha,", en: "pardon me this fault, Saṅgha," },
        { id: 12, pali: "puññakkhetta anuttara.", en: "unsurpassed field of goodness." },
      ],
    },
  ],
} satisfies Chant;

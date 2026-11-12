import type { Chant } from '../../types.ts';

export const chant = {
  id: "0136",
  slug: "offering-of-medicine",
  title: "Offering of Medicine",
  paliSource: { label: "Ancient Buddhist Texts, Daily Chanting", url: "https://ancient-buddhist-texts.net/Texts-and-Translations/Daily-Chanting/03-Wednesday.htm" },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The source gives the verse as two lines; it is split into four, like the other offering verses." },
    { status: "open", lines: [1], note: "The London Buddhist Vihara text (retired chant 0027) has *Adhivāsetu no bhante* where this source has *Bhesajjehi samāyuttaṁ*. Check against the LBV recording." },
    { status: "open", lines: [2], note: "English to review: *gilāna-paccaya* is literally \"requisite for the sick\"; in the evening offering it names the drink offered." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Bhesajjehi samāyuttaṁ", en: "Together with medicines," },
        { id: 2, pali: "gilānapaccayaṁ imaṁ,", en: "this requisite for the sick," },
        { id: 3, pali: "anukampaṁ upādāya,", en: "out of care for us," },
        { id: 4, pali: "paṭiggaṇhātu-m-uttama!", en: "Supreme One, please accept." },
      ],
    },
  ],
} satisfies Chant;

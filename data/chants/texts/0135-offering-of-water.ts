import type { Chant } from '../../types.ts';

export const chant = {
  id: "0135",
  slug: "offering-of-water",
  title: "Offering of Water",
  paliSource: { label: "Ancient Buddhist Texts, Daily Chanting", url: "https://ancient-buddhist-texts.net/Texts-and-Translations/Daily-Chanting/03-Wednesday.htm" },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The source gives the verse as two lines; it is split into four, like the other offering verses." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Sugandhaṁ sītalaṁ kappaṁ,", en: "Fragrant, cool, fitting," },
        { id: 2, pali: "pasannamadhuraṁ subhaṁ,", en: "clear, sweet and lovely:" },
        { id: 3, pali: "pānīyam-etaṁ Bhagavā,", en: "this drinking water, Gracious One," },
        { id: 4, pali: "paṭiggaṇhātu-m-uttama!", en: "Supreme One, please accept." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0142",
  slug: "dhammacakkappavattana-sutta-introduction",
  title: "Introduction to Setting in Motion the Wheel of Dhamma",
  paliTitle: "Anuttaraṁ abhisambodhiṁ",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/suttas.html#dhammacakkappavattana", categories: [{ category: "Suttas", order: 1 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [1, 2, 3, 4, 5, 6, 7, 8], note: "English to review: the introduction is a later verse composition; the draft follows the commentarial reading." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Anuttaraṁ abhisambodhiṁ sambujjhitvā tathāgato", en: "Having awakened to unsurpassed full awakening, the Tathāgata", solo: true },
        { id: 2, pali: "Pathamaṁ yaṁ adesesi dhammacakkaṁ anuttaraṁ", en: "first taught the unsurpassed wheel of Dhamma,", solo: true },
        { id: 3, pali: "Sammadeva pavattento loke appativattiyaṁ", en: "rightly setting it rolling, which none in the world can turn back,", solo: true },
        { id: 4, pali: "Yatthākkhātā ubho antā paṭipatti ca majjhimā", en: "in which both extremes are explained, and the middle practice,", solo: true },
        { id: 5, pali: "Catūsvāriyasaccesu visuddhaṁ ñāṇadassanaṁ", en: "and the purified knowledge and vision of the four noble truths:", solo: true },
        { id: 6, pali: "Desitaṁ dhammarājena sammāsambodhikittanaṁ", en: "taught by the King of Dhamma, proclaiming his perfect self-awakening,", solo: true },
        { id: 7, pali: "Nāmena vissutaṁ suttaṁ dhammacakkappavattanaṁ", en: "the discourse renowned by the name 'Setting in Motion the Wheel of Dhamma':", solo: true },
        { id: 8, pali: "Veyyākaraṇapāthena saṅgītantam bhaṇāma se", en: "as it was recited in the form of an exposition, let us chant it.", solo: true },
      ],
    },
  ],
} satisfies Chant;

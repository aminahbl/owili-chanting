import type { Chant } from '../types.ts';

export const chant = {
  id: "sangaha-vatthu-gatha",
  title: "Verses on the Ways of Supporting Others",
  paliTitle: "Saṅgaha-vatthu-gāthā",
  groups: [{ group: "anumodana", order: 11 }],
  paliSource: { label: "Bhikkhu Manual, Anumodanā", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#sangaha" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Dānañ-ca peyya-vajjañ-ca", en: "Giving, kindly speech," },
        { id: 2, pali: "attha-cariyā ca yā idha", en: "helpful conduct here," },
        { id: 3, pali: "Samānattatā ca dhammesu", en: "and impartiality in all things," },
        { id: 4, pali: "tattha tattha yathā'rahaṁ", en: "in each case as is fitting:" },
        { id: 5, pali: "Ete kho saṅgahā loke", en: "these are the ways of supporting others in the world," },
        { id: 6, pali: "rathass'āṇīva yāyato", en: "like the linchpin of a moving chariot." },
        { id: 7, pali: "Ete ca saṅgahā nāssu", en: "If these ways of supporting did not exist," },
        { id: 8, pali: "na mātā putta-kāraṇā", en: "a mother would not, because of her child," },
        { id: 9, pali: "Labhetha mānaṁ pūjaṁ vā", en: "receive respect or honour," },
        { id: 10, pali: "pitā vā putta-kāraṇā", en: "nor would a father because of his child." },
        { id: 11, pali: "Yasmā ca saṅgahā ete", en: "But because these ways of supporting" },
        { id: 12, pali: "samavekkhanti paṇḍitā", en: "are regarded well by the wise," },
        { id: 13, pali: "Tasmā mahattaṁ papponti", en: "they attain greatness" },
        { id: 14, pali: "pāsaṁsā ca bhavanti te'ti", en: "and are praised." },
      ],
      refs: [{ label: "AN 4.32", uid: "an4.32" }],
    },
  ],
} satisfies Chant;

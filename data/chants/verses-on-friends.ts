import type { Chant } from '../types.ts';

export const chant = {
  id: "verses-on-friends",
  title: "Verses on Friends",
  groups: [{ group: "reflections", order: 17 }],
  paliSource: { label: "Bhikkhu Manual, Reflections", url: "https://bhikkhu-manual.github.io/chants/reflections.html#friends" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Aññadatthu haro mitto", en: "The friend who only takes," },
        { id: 2, pali: "Yo ca mitto vacī-paramo,", en: "the friend who is all words," },
        { id: 3, pali: "Anupiyañ-ca yo āhu,", en: "the one who flatters," },
        { id: 4, pali: "Apāyesu ca yo sakhā:", en: "and the companion in squandering:" },
        { id: 5, pali: "Ete amitte cattāro iti viññāya paṇḍito", en: "knowing these four as false friends, the wise" },
        { id: 6, pali: "Ārakā parivajjeyya", en: "should keep far away from them," },
        { id: 7, pali: "Maggaṁ paṭibhayaṁ yathā.", en: "as from a dangerous road." },
        { id: 8, pali: "Upakāro ca yo mitto,", en: "The friend who helps," },
        { id: 9, pali: "Sukha-dukkho ca yo sakhā,", en: "the companion in good times and bad," },
        { id: 10, pali: "Atthakkhāyī ca yo mitto,", en: "the friend who gives good advice," },
        { id: 11, pali: "Yo ca mittānukampako:", en: "and the friend who cares:" },
        { id: 12, pali: "Etepi mitte cattāro iti viññāya paṇḍito.", en: "knowing these four as true friends, the wise" },
        { id: 13, pali: "Sakkaccaṁ payirupāseyya,", en: "should attend to them with devotion," },
        { id: 14, pali: "Mātā puttaṁ va orasaṁ.", en: "as a mother to her own child." },
      ],
    },
  ],
} satisfies Chant;

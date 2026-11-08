import type { Chant } from '../types.ts';

export const chant = {
  id: "salutation-to-the-bodhi-tree",
  title: "Salutation to the Bodhi-Tree",
  groups: [{ group: "sri-lanka", subgroup: "Devotional Chants", order: 2 }],
  paliSource: { label: "Bhikkhu Manual, Chants Used in Sri Lanka", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#bodhi-tree" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Yassa mūle nissino va", en: "At whose foot, seated," },
        { id: 2, pali: "sabbāri vijayaṁ akā,", en: "he won victory over all his foes," },
        { id: 3, pali: "Patto sabbaññutaṁ Satthā", en: "and the Teacher reached omniscience:" },
        { id: 4, pali: "vande taṁ Bodhi-pādapaṁ.", en: "I revere that Bodhi tree." },
        { id: 5, pali: "Ime ete Mahā-Bodhi", en: "These great Bodhi trees" },
        { id: 6, pali: "loka-nāthena pūjitā,", en: "were honoured by the Lord of the World;" },
        { id: 7, pali: "Aham-pi te namassāmi", en: "I too pay homage to you:" },
        { id: 8, pali: "bodhi-Rājā nam'atthu te!", en: "king of Bodhi trees, homage to you!" },
      ],
    },
  ],
} satisfies Chant;

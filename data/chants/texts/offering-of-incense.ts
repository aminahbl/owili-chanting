import type { Chant } from '../../types.ts';

export const chant = {
  id: "offering-of-incense",
  title: "Offering of Incense",
  groups: [{ group: "sri-lanka", subgroup: "Devotional Chants", order: 4 }],
  paliSource: { label: "Bhikkhu Manual, Chants Used in Sri Lanka", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#incense" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Gandha-sambhāra-yuttena", en: "With incense made of fragrant things," },
        { id: 2, pali: "Dhūpenāhaṁ sugandhinā", en: "sweet-smelling, I" },
        { id: 3, pali: "Pūjaye pūjaneyyan-taṁ", en: "honour the one worthy of honour," },
        { id: 4, pali: "Pūjā-bhājanam-uttamaṁ.", en: "the supreme recipient of honour." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0024",
  slug: "offering-of-incense",
  title: "Offering of Incense",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#incense", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 4 }] },
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

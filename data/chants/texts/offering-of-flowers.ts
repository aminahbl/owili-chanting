import type { Chant } from '../../types.ts';

export const chant = {
  id: "offering-of-flowers",
  title: "Offering of Flowers",
  groups: [{ group: "sri-lanka", subgroup: "Devotional Chants", order: 5 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#flowers", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 5 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Vaṇṇa-gandha-guṇopetaṁ", en: "Endowed with colour, scent and quality," },
        { id: 2, pali: "Etaṁ kusuma-santatiṁ.", en: "this mass of flowers" },
        { id: 3, pali: "Pūjayāmi munindassa", en: "I offer to the Lord of Sages," },
        { id: 4, pali: "Sirīpāda-saroruhe.", en: "at his glorious lotus feet." },
        { id: 5, pali: "Pūjemi Buddhaṁ kusumena'nena", en: "I honour the Buddha with these flowers;" },
        { id: 6, pali: "Puññenam-etena ca hotu mokkhaṁ", en: "by this goodness may there be release." },
        { id: 7, pali: "Pupphaṁ milāyāti yathā idaṁ me", en: "As these flowers of mine wither," },
        { id: 8, pali: "Kāyo tathā yāti vināsa-bhāvaṁ.", en: "so my body goes to destruction." },
      ],
    },
  ],
} satisfies Chant;

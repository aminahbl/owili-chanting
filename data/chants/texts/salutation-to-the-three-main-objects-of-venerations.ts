import type { Chant } from '../../types.ts';

export const chant = {
  id: "salutation-to-the-three-main-objects-of-venerations",
  title: "Salutation to the Three Main Objects of Venerations",
  groups: [{ group: "sri-lanka", subgroup: "Devotional Chants", order: 1 }],
  paliSource: { label: "Bhikkhu Manual, Chants Used in Sri Lanka", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#three-main-objects" },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [3], note: "The manual has *Sārīrīka*, a misspelling; corrected to *Sārīrika*." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Vandāmi cetiyaṁ sabbaṁ", en: "I revere every shrine" },
        { id: 2, pali: "Sabba-ṭhānesu patiṭṭhitaṁ", en: "established in every place," },
        { id: 3, pali: "Sārīrika-dhātu-Mahā-bodhiṁ", en: "the bodily relics, the Great Bodhi tree," },
        { id: 4, pali: "Buddha-rūpaṁ sakalaṁ sadā.", en: "and every image of the Buddha, always." },
      ],
    },
  ],
} satisfies Chant;

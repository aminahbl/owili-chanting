import type { Chant } from '../../types.ts';

export const chant = {
  id: "0023",
  slug: "offering-of-lights",
  title: "Offering of Lights",
  groups: [{ group: "reverence", order: 230 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#lights", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 3 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [3], note: "*Tīloka-dīpam*: possibly a misprint for *Tiloka-*, which the [Mahamevnawa chanting book](https://banaenglish.org/wp-content/uploads/2021/05/Trilinnear-A5-Vandana-Kotte-August2020.pdf) has. Needs a second source before any change." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Ghana-sārappadittena", en: "With a lamp blazing with camphor," },
        { id: 2, pali: "Dīpena tama-dhaṁsinā", en: "dispelling darkness," },
        { id: 3, pali: "Tīloka-dīpam sambuddhaṁ", en: "the Awakened One, light of the three worlds," },
        { id: 4, pali: "Pūjayāmi tamo-nudaṁ.", en: "dispeller of darkness, I honour." },
      ],
    },
  ],
} satisfies Chant;

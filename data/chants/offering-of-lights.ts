import type { Chant } from '../types.ts';

export const chant = {
  id: "offering-of-lights",
  title: "Offering of Lights",
  groups: [{ group: "sri-lanka", subgroup: "Devotional Chants", order: 3 }],
  paliSource: { label: "Bhikkhu Manual, Chants Used in Sri Lanka", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#lights" },
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

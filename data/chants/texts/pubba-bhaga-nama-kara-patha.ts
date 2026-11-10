import type { Chant } from '../../types.ts';

export const chant = {
  id: "pubba-bhaga-nama-kara-patha",
  title: "Preliminary Homage",
  paliTitle: "Pubba-bhāga-nama-kāra-pāṭha",
  groups: [{ group: "parittas", order: 30 }, { group: "reverence", order: 10 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#namo-tassa", categories: [{ category: "Parittas", subcategory: "Introductory Chants", order: 3 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened." },
        { id: 2, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened." },
        { id: 3, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened." },
      ],
    },
  ],
} satisfies Chant;

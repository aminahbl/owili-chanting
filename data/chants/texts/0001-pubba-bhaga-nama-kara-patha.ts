import type { Chant } from '../../types.ts';

export const chant = {
  id: "0001",
  slug: "pubba-bhaga-nama-kara-patha",
  title: "Preliminary Homage",
  paliTitle: "Pubba-bhāga-nama-kāra-pāṭha",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#namo-tassa", categories: [{ category: "Parittas", subcategory: "Introductory Chants", order: 3 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened.", repeat: 3 },
      ],
    },
  ],
} satisfies Chant;

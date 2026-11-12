import type { Chant } from '../../types.ts';

export const chant = {
  id: "0158",
  slug: "vandana-short",
  title: "Homage (short)",
  paliTitle: "Vandanā (short)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#namo-tassa", categories: [{ category: "Parittas", subcategory: "Introductory Chants", order: 3 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The manual's line chanted once, where *vandana* chants it three times." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened." },
      ],
    },
  ],
} satisfies Chant;

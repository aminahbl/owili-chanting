import type { Chant } from '../../types.ts';

export const chant = {
  id: "0158",
  slug: "vandana-short",
  title: "Homage (short)",
  paliTitle: "Vandanā (short)",
  paliSource: { label: "Community Chanting Book, Volume Two", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/parittas.tex#L37", categories: [{ category: "Parittas", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The chanting book's line chanted once, where *vandana* chants it three times." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened." },
      ],
    },
  ],
} satisfies Chant;

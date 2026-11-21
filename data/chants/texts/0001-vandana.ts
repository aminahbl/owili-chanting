import type { Chant } from '../../types.ts';

export const chant = {
  id: "0001",
  slug: "vandana",
  title: "Homage",
  paliTitle: "Vandanā",
  paliSource: { label: "Community Chanting Book, Volume Two", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/parittas.tex#L37", categories: [{ category: "Parittas", order: 2 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened.", repeat: 3 },
      ],
    },
  ],
} satisfies Chant;

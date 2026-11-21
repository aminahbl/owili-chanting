import type { Chant } from '../../types.ts';

export const chant = {
  id: "0012",
  slug: "recollection-of-the-dhamma",
  title: "Recollection of the Dhamma",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/evening-chanting.tex#L175", categories: [{ category: "Evening Chanting", order: 5 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Svākkhāto bhagavatā dhammo", en: "The Dhamma is well taught by the Gracious One," },
        { id: 2, pali: "Sandiṭṭhiko akāliko ehipassiko", en: "visible here and now, timeless, inviting all to come and see," },
        { id: 3, pali: "Opanayiko paccattaṁ veditabbo viññūhī'ti", en: "leading onward, to be known by the wise for themselves." },
      ],
    },
  ],
} satisfies Chant;

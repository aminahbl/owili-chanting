import type { Chant } from '../../types.ts';

export const chant = {
  id: "0006",
  slug: "homage-to-the-dhamma",
  title: "Homage to the Dhamma",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/morning-chanting.tex#L210", categories: [{ category: "Morning Chanting", order: 4 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Yo so svākkhāto bhagavatā dhammo", en: "The Dhamma, well taught by the Gracious One," },
        { id: 2, pali: "Sandiṭṭhiko,", en: "visible here and now," },
        { id: 3, pali: "Akāliko,", en: "timeless," },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Ehipassiko,", en: "inviting all to come and see," },
        { id: 5, pali: "Opanayiko", en: "leading onward," },
        { id: 6, pali: "Paccattaṁ veditabbo viññūhi", en: "to be known by the wise for themselves:" },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Tam-ahaṁ dhammaṁ abhipūjayāmi tam-ahaṁ dhammaṁ sirasā namāmi", en: "I honour the Dhamma, I bow my head to the Dhamma." },
      ],
    },
  ],
} satisfies Chant;

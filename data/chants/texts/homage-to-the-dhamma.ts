import type { Chant } from '../../types.ts';

export const chant = {
  id: "homage-to-the-dhamma",
  title: "Homage to the Dhamma",
  groups: [{ group: "morning", order: 4 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#dhamma-pali", categories: [{ category: "Morning Chanting", order: 4 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ dhammābhitthutiṁ karomase", en: "Now let us chant in praise of the Dhamma.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Yo so svākkhāto bhagavatā dhammo", en: "The Dhamma, well taught by the Gracious One," },
        { id: 3, pali: "Sandiṭṭhiko, akāliko, ehipassiko, opanayiko", en: "visible here and now, timeless, inviting all to come and see, leading onward," },
        { id: 4, pali: "Paccattaṁ veditabbo viññūhi", en: "to be known by the wise for themselves:" },
        { id: 5, pali: "Tam-ahaṁ dhammaṁ abhipūjayāmi tam-ahaṁ dhammaṁ sirasā namāmi", en: "I honour the Dhamma, I bow my head to the Dhamma." },
      ],
    },
  ],
} satisfies Chant;

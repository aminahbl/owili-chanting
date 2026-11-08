import type { Chant } from '../types.ts';

export const chant = {
  id: "sarana-gamana-patha",
  title: "Going for Refuge",
  paliTitle: "Saraṇa-gamana-pāṭha",
  groups: [{ group: "parittas", subgroup: "Introductory Chants", order: 4 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#buddham-saranam" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Buddhaṁ saraṇaṁ gacchāmi", en: "I go to the Buddha for refuge." },
        { id: 2, pali: "Dhammaṁ saraṇaṁ gacchāmi", en: "I go to the Dhamma for refuge." },
        { id: 3, pali: "Saṅghaṁ saraṇaṁ gacchāmi", en: "I go to the Saṅgha for refuge." },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Dutiyam pi buddhaṁ saraṇaṁ gacchāmi", en: "For the second time, I go to the Buddha for refuge." },
        { id: 5, pali: "Dutiyam pi dhammaṁ saraṇaṁ gacchāmi", en: "For the second time, I go to the Dhamma for refuge." },
        { id: 6, pali: "Dutiyam pi saṅghaṁ saraṇaṁ gacchāmi", en: "For the second time, I go to the Saṅgha for refuge." },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Tatiyam pi buddhaṁ saraṇaṁ gacchāmi", en: "For the third time, I go to the Buddha for refuge." },
        { id: 8, pali: "Tatiyam pi dhammaṁ saraṇaṁ gacchāmi", en: "For the third time, I go to the Dhamma for refuge." },
        { id: 9, pali: "Tatiyam pi saṅghaṁ saraṇaṁ gacchāmi", en: "For the third time, I go to the Saṅgha for refuge." },
      ],
    },
  ],
} satisfies Chant;

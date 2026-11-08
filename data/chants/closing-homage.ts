import type { Chant } from '../types.ts';

export const chant = {
  id: "closing-homage",
  title: "Closing Homage",
  groups: [{ group: "morning", order: 7 }],
  paliSource: { label: "Bhikkhu Manual, Morning Chanting", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#closing-pali" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "[Arahaṁ] sammāsambuddho bhagavā", en: "Worthy, perfectly self-awakened, the Gracious One:" },
        { id: 2, pali: "Buddhaṁ bhagavantaṁ abhivādemi", en: "I pay respect to the Buddha, the Gracious One." },
      ],
    },
    {
      lines: [
        { id: 3, pali: "[Svākkhāto] bhagavatā dhammo", en: "The Dhamma, well taught by the Gracious One:" },
        { id: 4, pali: "Dhammaṁ namassāmi", en: "I pay homage to the Dhamma." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "[Supaṭipanno] bhagavato sāvakasaṅgho", en: "The Gracious One's Saṅgha of disciples, practising well:" },
        { id: 6, pali: "Saṅghaṁ namāmi", en: "I bow to the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

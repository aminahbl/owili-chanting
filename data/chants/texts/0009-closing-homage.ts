import type { Chant } from '../../types.ts';

export const chant = {
  id: "0009",
  slug: "closing-homage",
  title: "Closing Homage",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/morning-chanting.tex#L746", categories: [{ category: "Morning Chanting", order: 7 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "{Arahaṁ} sammāsambuddho bhagavā", en: "{Worthy,} perfectly self-awakened, the Gracious One:" },
        { id: 2, pali: "Buddhaṁ bhagavantaṁ abhivādemi", en: "I pay respect to the Buddha, the Gracious One." },
      ],
    },
    {
      lines: [
        { id: 3, pali: "{Svākkhāto} bhagavatā dhammo", en: "{The Dhamma,} well taught by the Gracious One:" },
        { id: 4, pali: "Dhammaṁ namassāmi", en: "I pay homage to the Dhamma." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "{Supaṭipanno} bhagavato sāvakasaṅgho", en: "{The Gracious One's Saṅgha} of disciples, practising well:" },
        { id: 6, pali: "Saṅghaṁ namāmi", en: "I bow to the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

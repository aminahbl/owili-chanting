import type { Chant } from '../../types.ts';

export const chant = {
  id: "homage-to-the-buddha",
  title: "Homage to the Buddha",
  groups: [{ group: "morning", order: 3 }],
  paliSource: { label: "Bhikkhu Manual, Morning Chanting", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#buddha-pali" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ buddhābhitthutiṁ karomase", en: "Now let us chant in praise of the Buddha.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Yo so tathāgato arahaṁ sammāsambuddho", en: "The Tathāgata, worthy, perfectly self-awakened," },
        { id: 3, pali: "Vijjācaraṇa-sampanno, sugato, lokavidū", en: "accomplished in knowledge and conduct, well-gone, knower of the worlds," },
        { id: 4, pali: "Anuttaro purisadamma-sārathi", en: "unsurpassed guide of those ready to be trained," },
        { id: 5, pali: "Satthā deva-manussānaṁ, buddho bhagavā.", en: "teacher of devas and humans, awakened, the Gracious One;" },
      ],
    },
    {
      lines: [
        { id: 6, pali: "Yo imaṁ lokaṁ sadevakaṁ samārakaṁ sabrahmakaṁ", en: "who made known this world with its devas, Māras and Brahmās," },
        { id: 7, pali: "Sassamaṇa-brāhmaṇiṁ pajaṁ sadeva-manussaṁ sayaṁ abhiññā sacchikatvā pavedesi", en: "its ascetics and brahmins, its devas and humans, having realised it by his own direct knowledge;" },
        { id: 8, pali: "Yo dhammaṁ desesi ādi-kalyāṇaṁ majjhe-kalyāṇaṁ pariyosāna-kalyāṇaṁ", en: "who taught the Dhamma, good in the beginning, good in the middle, good in the end," },
        { id: 9, pali: "Sātthaṁ sabyañjanaṁ kevala-paripuṇṇaṁ parisuddhaṁ brahma-cariyaṁ pakāsesi", en: "and made clear the holy life, complete and pure, in its meaning and its words:" },
        { id: 10, pali: "Tam-ahaṁ bhagavantaṁ abhipūjayāmi tam-ahaṁ bhagavantaṁ sirasā namāmi", en: "I honour the Gracious One, I bow my head to the Gracious One." },
      ],
    },
  ],
} satisfies Chant;

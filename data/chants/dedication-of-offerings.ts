import type { Chant } from '../types.ts';

export const chant = {
  id: "dedication-of-offerings",
  title: "Dedication of Offerings",
  groups: [{ group: "morning", order: 1 }],
  paliSource: { label: "Bhikkhu Manual, Morning Chanting", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#yo-so-bhagava" },
  translation: "draft",
  editorial: [
    { status: "open", lines: [6], note: "English to review: a long line; the sentence runs over lines 6 to 9, as in the Pali." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "[Yo so] bhagavā arahaṁ sammāsambuddho", en: "To the Gracious One, worthy and perfectly self-awakened," },
        { id: 2, pali: "Svākkhāto yena bhagavatā dhammo", en: "to the Dhamma, well taught by the Gracious One," },
        { id: 3, pali: "Supaṭipanno yassa bhagavato sāvakasaṅgho", en: "to the Gracious One's Saṅgha of disciples, practising well," },
        { id: 4, pali: "Tam-mayaṁ bhagavantaṁ sadhammaṁ sasaṅghaṁ", en: "to the Gracious One, with the Dhamma and the Saṅgha," },
        { id: 5, pali: "Imehi sakkārehi yathārahaṁ āropitehi abhipūjayāma", en: "we pay honour with these offerings, duly set out." },
        { id: 6, pali: "Sādhu no bhante bhagavā sucira-parinibbutopi", en: "It is well for us, Venerable Lord, that though long since passed into final nibbana," },
        { id: 7, pali: "Pacchimā-janatānukampa-mānasā", en: "with a heart of care for later generations," },
        { id: 8, pali: "Ime sakkāre duggata-paṇṇākāra-bhūte paṭiggaṇhātu", en: "you accept these offerings, humble gifts though they are," },
        { id: 9, pali: "Amhākaṁ dīgharattaṁ hitāya sukhāya", en: "for our long-lasting welfare and happiness." },
        { id: 10, pali: "Arahaṁ sammāsambuddho bhagavā", en: "Worthy, perfectly self-awakened, the Gracious One:" },
        { id: 11, pali: "Buddhaṁ bhagavantaṁ abhivādemi", en: "I pay respect to the Buddha, the Gracious One." },
        { id: 12, pali: "[Svākkhāto] bhagavatā dhammo", en: "The Dhamma, well taught by the Gracious One:" },
        { id: 13, pali: "Dhammaṁ namassāmi", en: "I pay homage to the Dhamma." },
        { id: 14, pali: "[Supaṭipanno] bhagavato sāvakasaṅgho", en: "The Gracious One's Saṅgha of disciples, practising well:" },
        { id: 15, pali: "Saṅghaṁ namāmi", en: "I bow to the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

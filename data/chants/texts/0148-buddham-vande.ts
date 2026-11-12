import type { Chant } from '../../types.ts';

export const chant = {
  id: "0148",
  slug: "buddham-vande",
  title: "Reverence to the Triple Gem",
  paliTitle: "Buddhaṁ Vande",
  paliSource: { label: "Spirit Rock Meditation Center, Buddhist Mantras", url: "https://www.spiritrock.org/uploads/practice-texts/SR-scroll-PracticeTexts-Mantras-Sanskrit-Chinese-Pali-English.pdf" },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The source writes *Buddham*, *Dhammam* and *Sangham*. Written here as *Buddhaṁ*, *Dhammaṁ* and *Saṅghaṁ*, as elsewhere on the site." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Buddhaṁ, Buddhaṁ, Buddhaṁ vande", en: "I revere the Buddha, the Buddha, the Buddha" },
        { id: 2, pali: "Dhammaṁ, Dhammaṁ, Dhammaṁ vande", en: "I revere the Dhamma, the Dhamma, the Dhamma" },
        { id: 3, pali: "Saṅghaṁ, Saṅghaṁ, Saṅghaṁ vande", en: "I revere the Saṅgha, the Saṅgha, the Saṅgha" },
        { id: 4, pali: "Buddhaṁ, Dhammaṁ, Saṅghaṁ vande", en: "I revere the Buddha, the Dhamma and the Saṅgha" },
      ],
    },
  ],
} satisfies Chant;

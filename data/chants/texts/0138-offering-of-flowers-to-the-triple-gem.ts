import type { Chant } from '../../types.ts';

export const chant = {
  id: "0138",
  slug: "offering-of-flowers-to-the-triple-gem",
  title: "Offering of Flowers to the Triple Gem",
  paliSource: { label: "London Buddhist Vihara" },
  translation: "draft",
  links: [{ text: "Pali-Rezitation (excerpt of a German chanting book)", href: "https://www.dhammazentrum.at/wp-content/uploads/2025/04/Pali-Rezitation.pdf" }],
  editorial: [
    { status: "changed", note: "Taken from the retired chant 0027, where the Buddha verse (*Pujemi buddham kusumenanena / Punnena methena ca hotu mokkham / …*) was replaced by the Bhikkhu Manual's text of the same verse, as in Offering of Flowers (0025). The Dhamma and Saṅgha verses follow the same text." },
    { status: "open", lines: [6, 10, 14], note: "The Pali-Rezitation excerpt has *puññena-metena labhāmi mokkhaṁ* where this has *Puññenam-etena ca hotu mokkhaṁ*. Check against the LBV recording." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Vaṇṇa-gandha-guṇopetaṁ", en: "Endowed with colour, scent and quality," },
        { id: 2, pali: "Etaṁ kusuma-santatiṁ.", en: "this mass of flowers" },
        { id: 3, pali: "Pūjayāmi munindassa", en: "I offer to the Lord of Sages," },
        { id: 4, pali: "Sirīpāda-saroruhe.", en: "at his glorious lotus feet." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Pūjemi Buddhaṁ kusumena'nena", en: "I honour the Buddha with these flowers;" },
        { id: 6, pali: "Puññenam-etena ca hotu mokkhaṁ", en: "by this goodness may there be release." },
        { id: 7, pali: "Pupphaṁ milāyāti yathā idaṁ me", en: "As these flowers of mine wither," },
        { id: 8, pali: "Kāyo tathā yāti vināsa-bhāvaṁ.", en: "so my body goes to destruction." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Pūjemi Dhammaṁ kusumena'nena", en: "I honour the Dhamma with these flowers;" },
        { id: 10, pali: "Puññenam-etena ca hotu mokkhaṁ", en: "by this goodness may there be release." },
        { id: 11, pali: "Pupphaṁ milāyāti yathā idaṁ me", en: "As these flowers of mine wither," },
        { id: 12, pali: "Kāyo tathā yāti vināsa-bhāvaṁ.", en: "so my body goes to destruction." },
      ],
    },
    {
      lines: [
        { id: 13, pali: "Pūjemi Saṅghaṁ kusumena'nena", en: "I honour the Saṅgha with these flowers;" },
        { id: 14, pali: "Puññenam-etena ca hotu mokkhaṁ", en: "by this goodness may there be release." },
        { id: 15, pali: "Pupphaṁ milāyāti yathā idaṁ me", en: "As these flowers of mine wither," },
        { id: 16, pali: "Kāyo tathā yāti vināsa-bhāvaṁ.", en: "so my body goes to destruction." },
      ],
    },
  ],
} satisfies Chant;

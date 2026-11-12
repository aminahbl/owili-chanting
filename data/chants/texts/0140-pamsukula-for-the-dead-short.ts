import type { Chant } from '../../types.ts';

export const chant = {
  id: "0140",
  slug: "pamsukula-for-the-dead-short",
  title: "Verses for the rag-robe Offering (for the dead, short)",
  paliTitle: "Paṁsukūla (for the dead, short)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#pamsukula" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Aniccā vata saṅkhārā", en: "Impermanent indeed are conditioned things," },
        { id: 2, pali: "Uppāda-vaya-dhammino", en: "their nature is to arise and pass away." },
        { id: 3, pali: "Uppajjitvā nirujjhanti", en: "Having arisen, they cease." },
        { id: 4, pali: "Tesaṁ vūpasamo sukho.", en: "Their stilling is happiness." },
      ],
      repeat: 3,
    },
  ],
} satisfies Chant;

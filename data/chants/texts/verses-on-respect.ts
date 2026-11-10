import type { Chant } from '../../types.ts';

export const chant = {
  id: "0084",
  slug: "verses-on-respect",
  title: "Verses on Respect",
  groups: [{ group: "parittas", order: 430 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#respect", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 43 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Satthu-garu dhamma-garu,", en: "Respecting the Teacher, respecting the Dhamma," },
        { id: 2, pali: "Saṅghe ca tibba-gāravo,", en: "with deep reverence for the Saṅgha," },
        { id: 3, pali: "Samādhi-garu ātāpī,", en: "respecting samadhi, ardent," },
        { id: 4, pali: "Sikkhāya tibba-gāravo,", en: "with deep reverence for the training," },
        { id: 5, pali: "Appamāda-garu bhikkhu,", en: "the bhikkhu who respects heedfulness" },
        { id: 6, pali: "Paṭisanthāra-gāravo:", en: "and honours a kindly welcome" },
        { id: 7, pali: "Abhabbo parihānāya,", en: "cannot fall away," },
        { id: 8, pali: "Nibbānasseva santike.", en: "and is close to nibbana." },
      ],
      refs: [{ label: "AN 7.32", uid: "an7.32" }],
    },
  ],
} satisfies Chant;

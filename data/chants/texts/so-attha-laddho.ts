import type { Chant } from '../../types.ts';

export const chant = {
  id: "0068",
  slug: "so-attha-laddho",
  title: "Blessing for a Man",
  paliTitle: "So attha-laddho",
  groups: [{ group: "parittas", order: 270 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#so-attha-laddho", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 27 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "So attha-laddho sukhito", en: "Having gained the good, happy," },
        { id: 2, pali: "viruḷho buddha-sāsane", en: "flourishing in the Buddha's teaching," },
        { id: 3, pali: "Arogo sukhito hohi", en: "may you be healthy and happy" },
        { id: 4, pali: "saha sabbehi ñātibhi", en: "together with all your relatives.", repeat: 3 },
      ],
    },
  ],
} satisfies Chant;

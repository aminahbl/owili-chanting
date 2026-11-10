import type { Chant } from '../../types.ts';

export const chant = {
  id: "sa-attha-laddha",
  title: "Blessing for a Woman",
  paliTitle: "Sā attha-laddhā",
  groups: [{ group: "parittas", subgroup: "Closing Sequence", order: 28 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#sa-attha-laddha", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 28 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Sā attha-laddhā sukhitā", en: "Having gained the good, happy," },
        { id: 2, pali: "viruḷhā buddha-sāsane", en: "flourishing in the Buddha's teaching," },
        { id: 3, pali: "Arogā sukhitā hohi", en: "may you be healthy and happy" },
        { id: 4, pali: "saha sabbehi ñātibhi", en: "together with all your relatives.", repeat: 3 },
      ],
    },
  ],
} satisfies Chant;

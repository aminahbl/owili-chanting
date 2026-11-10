import type { Chant } from '../../types.ts';

export const chant = {
  id: "nakkhattayakkha",
  title: "Protection from Stars, Yakkhas and Spirits",
  paliTitle: "Nakkhattayakkha",
  groups: [{ group: "parittas", order: 420 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#nakkhattayakkha", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 42 }] },
  translation: "draft",
  notes: [
    "The paritta chanting may be closed with the following:",
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Nakkhatta-yakkha-bhūtānaṁ", en: "Of stars, yakkhas and spirits," },
        { id: 2, pali: "Pāpa-ggaha-nivāraṇā", en: "warding off evil planets:" },
        { id: 3, pali: "Parittassānubhāvena", en: "by the power of the protection," },
        { id: 4, pali: "Hantvā tesaṁ upaddave", en: "destroying the harm they bring." },
      ],
    },
    {
      lines: [
        { id: 5, cue: "Three times" },
      ],
    },
  ],
} satisfies Chant;

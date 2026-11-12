import type { Chant } from '../../types.ts';

export const chant = {
  id: "0121",
  slug: "yamaka",
  title: "Opening of the Yamaka",
  paliTitle: "Yamaka",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#yamaka", categories: [{ category: "Funeral Chants", order: 7 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [3, 4], note: "English to review: *kusalamūlena ekamūlā* is \"having one root with the skilful root\"; the sense is technical and the draft keeps it literal." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Ye keci kusalā dhammā, sabbe te kusalamūlā.", en: "Whatever states are skilful, all of them have skilful roots." },
        { id: 2, pali: "Ye vā pana kusalamūlā, sabbe te dhammā kusalā.", en: "Or whatever are skilful roots, all those states are skilful." },
        { id: 3, pali: "Ye keci kusalā dhammā, sabbe te kusalamūlena ekamūlā.", en: "Whatever states are skilful, all of them share one root with the skilful root." },
        { id: 4, pali: "Ye vā pana kusalamūlena ekamūlā, sabbe te dhammā kusalā.", en: "Or whatever share one root with the skilful root, all those states are skilful." },
      ],
      refs: [{ label: "Ya 1.1.1", uid: "ya1.1.1" }],
    },
  ],
} satisfies Chant;

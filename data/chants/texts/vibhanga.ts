import type { Chant } from '../../types.ts';

export const chant = {
  id: "vibhanga",
  title: "Opening of the Vibhaṅga",
  paliTitle: "Vibhaṅga",
  groups: [{ group: "funeral", order: 30 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#vibhanga", categories: [{ category: "Funeral Chants", order: 3 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Pañcakkhandhā rūpakkhandho, vedanākkhandho, saññākkhandho, saṅkhārakkhandho,", en: "The five aggregates: the aggregate of form, of feeling, of perception, of formations," },
        { id: 2, pali: "viññāṇakkhandho.", en: "of consciousness." },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Tattha katamo rūpakkhandho.", en: "Of these, what is the aggregate of form?" },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Yaṁ kiñci rūpaṁ atītānāgata-paccuppannaṁ ajjhattaṁ vā bahiddhā vā oḷārikaṁ", en: "Whatever form, past, future or present, internal or external, gross" },
        { id: 5, pali: "vā sukhumaṁ vā hīnaṁ vā paṇītaṁ vā yaṁ dūre santike vā,", en: "or subtle, inferior or superior, far or near:" },
        { id: 6, pali: "tad ekajjhaṁ abhisaññūhitvā abhisaṅkhipitvā, ayaṁ vuccati rūpakkhandho.", en: "taking all of it together and in brief, this is called the aggregate of form." },
      ],
      refs: [{ label: "Vb 1", uid: "vb1" }],
    },
  ],
} satisfies Chant;

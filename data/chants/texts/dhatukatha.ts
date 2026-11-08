import type { Chant } from '../../types.ts';

export const chant = {
  id: "dhatukatha",
  title: "Opening of the Dhātukathā",
  paliTitle: "Dhātukathā",
  groups: [{ group: "funeral", order: 4 }],
  paliSource: { label: "Bhikkhu Manual, Funeral Chants", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#dhatukatha" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Saṅgaho asaṅgaho,", en: "Inclusion and non-inclusion," },
        { id: 2, pali: "saṅgahitena asaṅgahitaṁ,", en: "what is not included by what is included," },
        { id: 3, pali: "asaṅgahitena saṅgahitaṁ,", en: "what is included by what is not included," },
        { id: 4, pali: "saṅgahitena saṅgahitaṁ,", en: "what is included by what is included," },
        { id: 5, pali: "asaṅgahitena asaṅgahitaṁ,", en: "what is not included by what is not included;" },
        { id: 6, pali: "sampayogo vippayogo,", en: "association and dissociation," },
        { id: 7, pali: "sampayuttena vippayuttaṁ,", en: "what is dissociated from what is associated," },
        { id: 8, pali: "vippayuttena sampayuttaṁ,", en: "what is associated with what is dissociated," },
        { id: 9, pali: "asaṅgahitaṁ.", en: "what is not included." },
      ],
      refs: [{ label: "Dt 1.1", uid: "dt1.1" }],
    },
  ],
} satisfies Chant;

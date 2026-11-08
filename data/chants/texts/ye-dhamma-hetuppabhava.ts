import type { Chant } from '../../types.ts';

export const chant = {
  id: "ye-dhamma-hetuppabhava",
  title: "Arising From a Cause",
  paliTitle: "Ye dhammā hetuppabhavā",
  groups: [{ group: "parittas", subgroup: "Closing Sequence", order: 41 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#hetuppabhava" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Ye dhammā hetuppabhavā", en: "Of those things that arise from a cause," },
        { id: 2, pali: "Tesaṁ hetuṁ tathāgato āha", en: "the Tathāgata has told the cause," },
        { id: 3, pali: "Tesañca yo nirodho", en: "and also their cessation:" },
        { id: 4, pali: "Evaṁ-vādī mahāsamaṇo'ti", en: "such is the teaching of the Great Ascetic." },
      ],
      refs: [{ label: "Kd 1", uid: "pli-tv-kd1" }],
    },
  ],
} satisfies Chant;

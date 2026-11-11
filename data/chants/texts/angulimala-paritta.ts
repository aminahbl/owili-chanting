import type { Chant } from '../../types.ts';

export const chant = {
  id: "0062",
  slug: "angulimala-paritta",
  title: "Aṅgulimāla's Protection",
  paliTitle: "Aṅgulimāla-paritta",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#yato-ham-bhagini", categories: [{ category: "Parittas", subcategory: "Core Sequence", order: 21 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [3], note: "MN 86 has *gabbhassā* where the manual has *gabbhassa*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Yato'haṁ bhagini ariyāya jātiyā jāto", en: "Sister, since I was born with the noble birth," },
        { id: 2, pali: "Nābhijānāmi sañcicca pāṇaṁ jīvitā voropetā", en: "I do not recall intentionally taking the life of any living being." },
        { id: 3, pali: "Tena saccena sotthi te hotu sotthi gabbhassa", en: "By this truth, may you be safe, and may the child in your womb be safe." },
      ],
      refs: [{ label: "MN 86", uid: "mn86" }],
    },
    {
      lines: [
        { id: 4, cue: "Three times" },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "sacca-kiriya-gatha",
  title: "The Act of Truth",
  paliTitle: "Sacca-kiriyā-gāthā",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 18 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#natthi-me", categories: [{ category: "Parittas", subcategory: "Core Sequence", order: 18 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [2, 4, 6], note: "The alternatives for the people addressed (*te/me*) are kept as printed; the chanter picks one. The English follows the first form." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Natthi me saraṇaṁ aññaṁ buddho me saraṇaṁ varaṁ", en: "I have no other refuge; the Buddha is my excellent refuge." },
        { id: 2, pali: "Etena sacca-vajjena sotthi te/me hotu sabbadā", en: "By the speaking of this truth, may you always be safe." },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Natthi me saraṇaṁ aññaṁ dhammo me saraṇaṁ varaṁ", en: "I have no other refuge; the Dhamma is my excellent refuge." },
        { id: 4, pali: "Etena sacca-vajjena sotthi te/me hotu sabbadā", en: "By the speaking of this truth, may you always be safe." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Natthi me saraṇaṁ aññaṁ saṅgho me saraṇaṁ varaṁ", en: "I have no other refuge; the Saṅgha is my excellent refuge." },
        { id: 6, pali: "Etena sacca-vajjena sotthi te/me hotu sabbadā", en: "By the speaking of this truth, may you always be safe." },
      ],
    },
  ],
} satisfies Chant;

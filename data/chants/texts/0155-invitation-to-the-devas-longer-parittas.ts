import type { Chant } from '../../types.ts';

export const chant = {
  id: "0155",
  slug: "invitation-to-the-devas-longer-parittas",
  title: "Invitation to the Devas (Samantā…)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#devas", categories: [{ category: "Parittas", subcategory: "Invitations", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "Part C of the manual's Invitation to the Devas, which gives parts A to F with instructions on when each is chanted. Each part is a chant of its own here." },
     { status: "changed", note: "Commentarial lifted: In Thai custom, these lines are chanted before the longer sipsong tamnaan set of parittas, in place of Invitation to the Devas (shorter parittas)." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Samantā cakka-vāḷesu", en: "From the world-systems all around," },
        { id: 2, pali: "Atr'āgacchantu devatā", en: "may the devas come here" },
        { id: 3, pali: "Saddhammaṁ muni-rājassa", en: "to hear the true Dhamma of the King of Sages," },
        { id: 4, pali: "Suṇantu sagga-mokkha-daṁ", en: "which brings heaven and release." },
      ],
    },
  ],
} satisfies Chant;

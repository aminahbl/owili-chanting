import type { Chant } from '../../types.ts';

export const chant = {
  id: "0153",
  slug: "invitation-to-the-devas-royal-ceremonies",
  title: "Invitation to the Devas (royal ceremonies)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#devas", categories: [{ category: "Parittas", subcategory: "Invitations", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "Part A of the manual's Invitation to the Devas, which gives parts A to F with instructions on when each is chanted. Each part is a chant of its own here." },
    { status: "changed", note: "Commentarial lifted: In Thai custom, the invitation to the devas starts with these lines before royal ceremonies." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Sarajjaṁ sasenaṁ sabandhuṁ nar'indaṁ", en: "The ruler, with his kingdom, his army and his kin:" },
        { id: 2, pali: "Paritt'ānubhāvo sadā rakkhatū'ti", en: "may the power of the protection always protect him." },
      ],
    },
  ],
} satisfies Chant;

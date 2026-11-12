import type { Chant } from '../../types.ts';

export const chant = {
  id: "0154",
  slug: "invitation-to-the-devas-shorter-parittas",
  title: "Invitation to the Devas (shorter parittas)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#devas", categories: [{ category: "Parittas", subcategory: "Invitations", order: 2 }] },
  translation: "draft",
  notes: [
    "In Thai custom, these lines are chanted before the shorter jet tamnaan set of parittas, in place of Invitation to the Devas (longer parittas).",
  ],
  editorial: [
    { status: "changed", note: "Part B of the manual's Invitation to the Devas, which gives parts A to F with instructions on when each is chanted. Each part is a chant of its own here." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Pharitvāna mettaṁ samettā bhadantā", en: "Having spread warmth, warm-hearted, venerable ones," },
        { id: 2, pali: "Avikkhitta-cittā parittaṁ bhaṇantu", en: "with undistracted minds, please chant the protection." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0156",
  slug: "invitation-to-the-devas-closing",
  title: "Invitation to the Devas (Dhammassavana…)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#devas", categories: [{ category: "Parittas", subcategory: "Invitations", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "Part E of the manual's Invitation to the Devas, which gives parts A to F with instructions on when each is chanted. Each part is a chant of its own here." },
    { status: "changed", note: "Commentarial lifted:  In Thai custom, the invitation to the devas ends with this line when chanting outside the monastery. At the monastery it ends with this line or with Invitation to the Devas (closing at the monastery)." },
    { status: "open", lines: [1], note: "English to review: *bhadantā* addresses the devas and the assembly, so the draft has \"honoured ones\" rather than \"venerable ones\", which *Invitation to the Devas (shorter parittas)* uses for the monks." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Dhammassavana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for listening to the Dhamma.", repeat: 3 },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0157",
  slug: "invitation-to-the-devas-buddha-dassana",
  title: "Invitation to the Devas (Buddha-dassana…)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#devas", categories: [{ category: "Parittas", subcategory: "Invitations", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "Part F of the manual's Invitation to the Devas, which gives parts A to F with instructions on when each is chanted. Each part is a chant of its own here." },
    { status: "changed", note: "Commentarial lifted: In Thai custom, the invitation to the devas can end with these lines when chanting at the monastery." },
    { status: "open", lines: [1, 2, 3], note: "English to review: *bhadantā* addresses the devas and the assembly, so the draft has \"honoured ones\" rather than \"venerable ones\", which *Invitation to the Devas (shorter parittas)* uses for the monks." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Buddha-dassana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for seeing the Buddha." },
        { id: 2, pali: "Dhammassavana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for listening to the Dhamma." },
        { id: 3, pali: "Saṅgha-payirūpāsana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for attending on the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

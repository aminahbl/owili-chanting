import type { Chant } from '../../types.ts';

export const chant = {
  id: "0050",
  slug: "invitation-to-the-devas",
  title: "Invitation to the Devas (main verses)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#devas", categories: [{ category: "Parittas", subcategory: "Invitations", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "Part D of the manual's Invitation to the Devas, which gives parts A to F with instructions on when each is chanted. Each part is a chant of its own here." },
    { status: "changed", note: "Commentarial lifted: In Thai custom, these verses are always part of the invitation to the devas. The third monk in seniority chants the invitation, holding his hands in añjali and lifting up the ceremonial string. The string is wound up at the beginning of the last chant, Mahā-kāruṇiko nātho or Bhavatu sabba-maṅgalaṁ, which should be kept in mind by the last bhikkhu or sāmaṇera." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Sagge kāme ca rūpe", en: "In the heavens of sense and of form," },
        { id: 2, pali: "Giri-sikhara-taṭe c'antalikkhe vimāne", en: "on mountain peaks and slopes, in the sky, in celestial mansions," },
        { id: 3, pali: "Dīpe raṭṭhe ca gāme", en: "on islands, in countries and in villages," },
        { id: 4, pali: "Taru-vana-gahane geha-vatthumhi khette", en: "in trees, forests and thickets, in houses and in fields:" },
        { id: 5, pali: "Bhummā c'āyantu devā", en: "may the earth devas come too," },
        { id: 6, pali: "Jala-thala-visame yakkha-gandhabba-nāgā", en: "and the yakkhas, gandhabbas and nāgas of water, land and rough ground." },
        { id: 7, pali: "Tiṭṭhantā santike yaṁ", en: "Standing near," },
        { id: 8, pali: "Muni-vara-vacanaṁ sādhavo me suṇantu", en: "may the good ones hear from me the word of the excellent Sage." },
      ],
    },
  ],
} satisfies Chant;

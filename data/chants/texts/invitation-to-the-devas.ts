import type { Chant } from '../../types.ts';

export const chant = {
  id: "0050",
  slug: "invitation-to-the-devas",
  title: "Invitation to the Devas",
  groups: [{ group: "parittas", order: 20 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#devas", categories: [{ category: "Parittas", subcategory: "Invitations", order: 2 }] },
  translation: "draft",
  notes: [
    "In Thai custom, the third monk in seniority invites the devas, holding his hands in añjali, and lifting up the ceremonial string.",
    "The string is wound up at the beginning of the last chant, Mahā-kāruṇiko nātho or Bhavatu sabba-maṅgalaṁ, which should be kept in mind by the last bhikkhu or sāmaṇera.",
    "Before royal ceremonies, the invitation starts with A.",
    "Before the shorter jet tamnaan set of parittas, B is used and C is omitted. Before the longer sipsong tamnaan set of parittas, B is omitted and C is used.",
    "The verses at D are always chanted.",
    "When chanting outside the monastery, the invitation is concluded with E. When chanting at the monastery, the invitation is concluded with either E or F.",
    "With hands joined in añjali, recite the following",
  ],
  editorial: [
    { status: "open", lines: [22, 25, 26, 27], note: "English to review: *bhadantā* addresses the devas and the assembly, so the draft has \"honoured ones\" rather than \"venerable ones\", which line 5 uses for the monks." },
  ],
  sections: [
    {
      lines: [
        { id: 1, cue: "A." },
        { id: 2, pali: "Sarajjaṁ sasenaṁ sabandhuṁ nar'indaṁ", en: "The ruler, with his kingdom, his army and his kin:" },
        { id: 3, pali: "Paritt'ānubhāvo sadā rakkhatū'ti", en: "may the power of the protection always protect him." },
      ],
    },
    {
      lines: [
        { id: 4, cue: "B." },
        { id: 5, pali: "Pharitvāna mettaṁ samettā bhadantā", en: "Having spread warmth, warm-hearted, venerable ones," },
        { id: 6, pali: "Avikkhitta-cittā parittaṁ bhaṇantu", en: "with undistracted minds, please chant the protection." },
      ],
    },
    {
      lines: [
        { id: 7, cue: "C." },
        { id: 8, pali: "Samantā cakka-vāḷesu", en: "From the world-systems all around," },
        { id: 9, pali: "Atr'āgacchantu devatā", en: "may the devas come here" },
        { id: 10, pali: "Saddhammaṁ muni-rājassa", en: "to hear the true Dhamma of the King of Sages," },
        { id: 11, pali: "Suṇantu sagga-mokkha-daṁ", en: "which brings heaven and release." },
      ],
    },
    {
      lines: [
        { id: 12, cue: "D." },
        { id: 13, pali: "Sagge kāme ca rūpe", en: "In the heavens of sense and of form," },
        { id: 14, pali: "Giri-sikhara-taṭe c'antalikkhe vimāne", en: "on mountain peaks and slopes, in the sky, in celestial mansions," },
        { id: 15, pali: "Dīpe raṭṭhe ca gāme", en: "on islands, in countries and in villages," },
        { id: 16, pali: "Taru-vana-gahane geha-vatthumhi khette", en: "in trees, forests and thickets, in houses and in fields:" },
        { id: 17, pali: "Bhummā c'āyantu devā", en: "may the earth devas come too," },
        { id: 18, pali: "Jala-thala-visame yakkha-gandhabba-nāgā", en: "and the yakkhas, gandhabbas and nāgas of water, land and rough ground." },
        { id: 19, pali: "Tiṭṭhantā santike yaṁ", en: "Standing near," },
        { id: 20, pali: "Muni-vara-vacanaṁ sādhavo me suṇantu", en: "may the good ones hear from me the word of the excellent Sage." },
      ],
    },
    {
      lines: [
        { id: 21, cue: "E." },
        { id: 22, pali: "Dhammassavana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for listening to the Dhamma.", repeat: 3 },
      ],
    },
    {
      lines: [
        { id: 23, cue: "Or, end with:" },
        { id: 24, cue: "F." },
        { id: 25, pali: "Buddha-dassana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for seeing the Buddha." },
        { id: 26, pali: "Dhammassavana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for listening to the Dhamma." },
        { id: 27, pali: "Saṅgha-payirūpāsana-kālo ayam-bhadantā", en: "Honoured ones, this is the time for attending on the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../types.ts';

export const chant = {
  id: "invitation-for-paritta-chanting",
  title: "Invitation for Paritta Chanting",
  groups: [{ group: "parittas", subgroup: "Invitations", order: 1 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#invitation" },
  translation: "draft",
  notes: [
    "After bowing three times, with hands joined in añjali, recite the following",
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Vipatti-paṭibāhāya sabba-sampatti-siddhiyā", en: "To ward off misfortune, for the success of all good fortune," },
        { id: 2, pali: "Sabbadukkha-vināsāya", en: "for the destruction of all suffering," },
        { id: 3, pali: "Parittaṁ brūtha maṅgalaṁ", en: "please chant the protection that brings blessing." },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Vipatti-paṭibāhāya sabba-sampatti-siddhiyā", en: "To ward off misfortune, for the success of all good fortune," },
        { id: 5, pali: "Sabbabhaya-vināsāya", en: "for the destruction of all fear," },
        { id: 6, pali: "Parittaṁ brūtha maṅgalaṁ", en: "please chant the protection that brings blessing." },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Vipatti-paṭibāhāya sabba-sampatti-siddhiyā", en: "To ward off misfortune, for the success of all good fortune," },
        { id: 8, pali: "Sabbaroga-vināsāya", en: "for the destruction of all illness," },
        { id: 9, pali: "Parittaṁ brūtha maṅgalaṁ", en: "please chant the protection that brings blessing." },
      ],
    },
    {
      lines: [
        { id: 10, cue: "Bow three times" },
      ],
    },
  ],
} satisfies Chant;

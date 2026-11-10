import type { Chant } from '../../types.ts';

export const chant = {
  id: "sabbe-satta-sada-hontu",
  title: "May All Beings Share",
  paliTitle: "Sabbe sattā sadā hontu",
  groups: [{ group: "reflections", order: 12 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#sabbe-satta", categories: [{ category: "Reflections", order: 12 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Sabbe sattā sadā hontu", en: "May all beings always be" },
        { id: 2, pali: "Averā sukha-jīvino", en: "free from enmity, living happily." },
        { id: 3, pali: "Kataṁ puñña-phalaṁ mayhaṁ", en: "In the fruit of the goodness I have made" },
        { id: 4, pali: "Sabbe bhāgī bhavantu te", en: "may they all have a share." },
      ],
    },
  ],
} satisfies Chant;

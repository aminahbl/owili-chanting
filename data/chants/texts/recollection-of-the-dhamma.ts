import type { Chant } from '../../types.ts';

export const chant = {
  id: "recollection-of-the-dhamma",
  title: "Recollection of the Dhamma",
  groups: [{ group: "reverence", order: 120 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/evening-chanting.html#d-sati-pli", categories: [{ category: "Evening Chanting", order: 5 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ dhammānussatinayaṁ karomase", en: "Now let us chant the recollection of the Dhamma.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Svākkhāto bhagavatā dhammo", en: "The Dhamma is well taught by the Gracious One," },
        { id: 3, pali: "Sandiṭṭhiko akāliko ehipassiko", en: "visible here and now, timeless, inviting all to come and see," },
        { id: 4, pali: "Opanayiko paccattaṁ veditabbo viññūhī'ti", en: "leading onward, to be known by the wise for themselves." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "preliminary-homage",
  title: "Preliminary Homage",
  groups: [{ group: "morning", order: 2 }],
  paliSource: { label: "Bhikkhu Manual, Morning Chanting", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#homage-pali" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ buddhassa bhagavato pubbabhāga-namakāraṁ karomase", en: "Now let us pay preliminary homage to the Buddha, the Gracious One.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Namo tassa bhagavato arahato sammāsambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened.", repeat: 3 },
      ],
    },
  ],
} satisfies Chant;

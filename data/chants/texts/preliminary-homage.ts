import type { Chant } from '../../types.ts';

export const chant = {
  id: "0004",
  slug: "preliminary-homage",
  title: "Preliminary Homage",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#homage-pali", categories: [{ category: "Morning Chanting", order: 2 }, { category: "Evening Chanting", order: 2 }] },
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

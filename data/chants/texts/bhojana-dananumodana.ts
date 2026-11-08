import type { Chant } from '../../types.ts';

export const chant = {
  id: "bhojana-dananumodana",
  title: "Rejoicing in a Gift of Food",
  paliTitle: "Bhojana-dānānumodanā",
  groups: [{ group: "anumodana", order: 3 }],
  paliSource: { label: "Bhikkhu Manual, Anumodanā", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#bhojana" },
  translation: "draft",
  links: [{ text: "Word-by-word analysis", href: "https://pali-sutta-readings.github.io/readings/2025-02-19/" }],
  editorial: [
    { status: "changed", lines: [2], note: "The manual has *paṭibhāṇa*, a misspelling; corrected to *paṭibhāna*." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Āyu-do bala-do dhīro", en: "The wise one who gives long life, strength," },
        { id: 2, pali: "vaṇṇa-do paṭibhāna-do", en: "beauty and quick wit," },
        { id: 3, pali: "Sukhassa dātā medhāvī", en: "the intelligent giver of happiness," },
        { id: 4, pali: "sukhaṁ so adhigacchati", en: "attains happiness in turn." },
        { id: 5, pali: "Āyuṁ datvā balaṁ vaṇṇaṁ", en: "Having given long life, strength, beauty," },
        { id: 6, pali: "sukhañ-ca paṭibhāna-do", en: "happiness and quick wit," },
        { id: 7, pali: "Dīgh'āyu yasavā hoti", en: "they have long life and renown" },
        { id: 8, pali: "yattha yatthūpapajjatī'ti", en: "wherever they are reborn." },
      ],
      refs: [{ label: "AN 5.37", uid: "an5.37" }],
    },
  ],
} satisfies Chant;

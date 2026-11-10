import type { Chant } from '../../types.ts';

export const chant = {
  id: "0105",
  slug: "adasi-me-adi-gatha",
  title: "Giving for the Departed",
  paliTitle: "Adāsi-me ādi-gāthā",
  groups: [{ group: "joy-and-ceremony", order: 140 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#adasi-me", categories: [{ category: "Anumodanā", order: 5 }] },
  translation: "draft",
  links: [{ text: "Word-by-word analysis", href: "https://pali-sutta-readings.github.io/readings/2025-04-16/" }],
  sections: [
    {
      lines: [
        { id: 1, pali: "Adāsi me akāsi me", en: "'They gave to me, they worked for me," },
        { id: 2, pali: "ñāti-mittā sakhā ca me", en: "they were my relatives, friends and companions':" },
        { id: 3, pali: "Petānaṁ dakkhiṇaṁ dajjā", en: "one should give offerings for the departed," },
        { id: 4, pali: "pubbe katam-anussaraṁ", en: "remembering what they did in the past." },
        { id: 5, pali: "Na hi ruṇṇaṁ vā soko vā", en: "For weeping, sorrow" },
        { id: 6, pali: "yā v'aññā paridevanā", en: "or any other lamentation" },
        { id: 7, pali: "Na taṁ petānam-atthāya", en: "is of no benefit to the departed" },
        { id: 8, pali: "evaṁ tiṭṭhanti ñātayo", en: "when the relatives carry on in this way." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Ayañ-ca kho dakkhiṇā dinnā", en: "But this offering that has been given," },
        { id: 10, pali: "Saṅghamhi supatiṭṭhitā", en: "well established in the Saṅgha," },
        { id: 11, pali: "Dīgha-rattaṁ hitāy'assa", en: "for their long-term welfare" },
        { id: 12, pali: "Ṭhānaso upakappati", en: "benefits them at once." },
        { id: 13, pali: "So ñāti-dhammo ca ayaṁ nidassito", en: "This duty to relatives has been shown," },
        { id: 14, pali: "Petāna'pūjā ca katā uḷārā", en: "great honour has been done to the departed," },
        { id: 15, pali: "Balañ-ca bhikkhūnam-anuppadinnaṁ", en: "the bhikkhus have been given strength," },
        { id: 16, pali: "Tumhehi puññaṁ pasutaṁ anappakan'ti.", en: "and you have made no little goodness." },
      ],
      refs: [{ label: "Kp 7:10–13", uid: "kp7" }],
    },
  ],
} satisfies Chant;

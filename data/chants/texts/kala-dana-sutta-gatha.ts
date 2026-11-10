import type { Chant } from '../../types.ts';

export const chant = {
  id: "kala-dana-sutta-gatha",
  title: "Verses on Timely Giving",
  paliTitle: "Kāla-dāna-sutta-gāthā",
  groups: [{ group: "joy-and-ceremony", order: 150 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#kala-dana", categories: [{ category: "Anumodanā", order: 6 }] },
  translation: "draft",
  links: [{ text: "Word-by-word analysis", href: "https://pali-sutta-readings.github.io/readings/2025-09-30/" }],
  sections: [
    {
      lines: [
        { id: 1, pali: "Kāle dadanti sapaññā", en: "The wise give at the right time," },
        { id: 2, pali: "vadaññū vīta-maccharā", en: "generous and free from meanness." },
        { id: 3, pali: "Kālena dinnaṁ ariyesu", en: "Given at the right time to the noble ones," },
        { id: 4, pali: "uju-bhūtesu tādisu", en: "upright and steadfast," },
        { id: 5, pali: "Vippasanna-manā tassa", en: "with a mind of clear confidence," },
        { id: 6, pali: "vipulā hoti dakkhiṇā", en: "the offering becomes abundant." },
        { id: 7, pali: "Ye tattha anumodanti", en: "Those who rejoice in it there" },
        { id: 8, pali: "veyyāvaccaṁ karonti vā", en: "or who give help" },
        { id: 9, pali: "Na tena dakkhiṇā onā", en: "do not make that offering less;" },
        { id: 10, pali: "te pi puññassa bhāgino", en: "they too share in the goodness." },
        { id: 11, pali: "Tasmā dade appaṭivāna-citto", en: "Therefore, with an unhesitating mind, one should give" },
        { id: 12, pali: "yattha dinnaṁ mahapphalaṁ", en: "where a gift bears great fruit." },
        { id: 13, pali: "Puññāni para-lokasmiṁ", en: "Goodness, in the world beyond," },
        { id: 14, pali: "patiṭṭhā honti pāṇinan'ti", en: "is the support of living beings." },
      ],
      refs: [{ label: "AN 5.36", uid: "an5.36" }],
    },
  ],
} satisfies Chant;

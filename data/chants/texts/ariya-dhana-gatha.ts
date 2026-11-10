import type { Chant } from '../../types.ts';

export const chant = {
  id: "ariya-dhana-gatha",
  title: "Verses on the Riches of a Noble One",
  paliTitle: "Ariya-dhana-gāthā",
  groups: [{ group: "joy-and-ceremony", order: 220 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#ariya-dhana", categories: [{ category: "Anumodanā", order: 13 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Yassa saddhā tathāgate", en: "Whoever has faith in the Tathāgata," },
        { id: 2, pali: "acalā supatiṭṭhitā", en: "unshakeable and well established," },
        { id: 3, pali: "Sīlañ-ca yassa kalyāṇaṁ", en: "and good virtue," },
        { id: 4, pali: "ariya-kantaṁ pasaṁsitaṁ", en: "loved and praised by the noble ones," },
        { id: 5, pali: "Saṅghe pasādo yass'atthi", en: "who has confidence in the Saṅgha" },
        { id: 6, pali: "uju-bhūtañ-ca dassanaṁ", en: "and whose view is straight:" },
        { id: 7, pali: "Adaliddo-ti taṁ āhu", en: "they are called 'not poor';" },
        { id: 8, pali: "amoghaṁ tassa jīvitaṁ", en: "their life is not in vain." },
        { id: 9, pali: "Tasmā saddhañ-ca sīlañ-ca", en: "Therefore faith and virtue," },
        { id: 10, pali: "pasādaṁ dhamma-dassanaṁ", en: "confidence and seeing the Dhamma," },
        { id: 11, pali: "Anuyuñjetha medhāvī", en: "the wise should pursue," },
        { id: 12, pali: "saraṁ buddhāna sāsanan'ti", en: "remembering the Buddhas' teaching." },
      ],
      refs: [{ label: "AN 5.47", uid: "an5.47" }],
    },
  ],
} satisfies Chant;

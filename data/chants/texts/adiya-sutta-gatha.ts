import type { Chant } from '../../types.ts';

export const chant = {
  id: "adiya-sutta-gatha",
  title: "Verses on the Uses of Wealth",
  paliTitle: "Ādiya-sutta-gāthā",
  groups: [{ group: "anumodana", order: 12 }],
  paliSource: { label: "Bhikkhu Manual, Anumodanā", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#adiya-sutta" },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [1], note: "The manual has *bhaṭā bhaccā*, a misspelling; corrected to *bhatā bhaccā*." },
    { status: "kept", lines: [7], note: "AN 5.41 has *bhogaṁ-iccheyya* where the manual has *bhogam-iccheyya*. Kept as the manual prints it." },
    { status: "open", lines: [4], note: "English to review: the five offerings (*pañca balī*) are to relatives, guests, the departed, the king and the devas. A short note would help users." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Bhuttā bhogā bhatā bhaccā", en: "My wealth has been enjoyed, my dependants supported," },
        { id: 2, pali: "vitiṇṇā āpadāsu me", en: "I have come through misfortunes with it," },
        { id: 3, pali: "Uddhaggā dakkhiṇā dinnā", en: "I have given offerings that lead upwards," },
        { id: 4, pali: "atho pañca balī katā", en: "and made the five offerings." },
        { id: 5, pali: "Upaṭṭhitā sīlavanto", en: "I have supported the virtuous," },
        { id: 6, pali: "saññatā brahma-cārino", en: "the restrained who live the holy life." },
        { id: 7, pali: "Yad-atthaṁ bhogam-iccheyya", en: "The purpose for which a wise person" },
        { id: 8, pali: "paṇḍito gharam-āvasaṁ", en: "living at home would wish for wealth," },
        { id: 9, pali: "So me attho anuppatto", en: "that purpose I have reached;" },
        { id: 10, pali: "kataṁ ananutāpiyaṁ", en: "I have done what brings no regret." },
        { id: 11, pali: "Etaṁ anussaraṁ macco", en: "A mortal who remembers this," },
        { id: 12, pali: "ariya-dhamme ṭhito naro", en: "a person firm in the noble Dhamma," },
        { id: 13, pali: "Idh'eva naṁ pasaṁsanti", en: "is praised here in this life," },
        { id: 14, pali: "pecca sagge ca pamodatī'ti.", en: "and after death rejoices in heaven." },
      ],
      refs: [{ label: "AN 5.41", uid: "an5.41" }],
    },
  ],
} satisfies Chant;

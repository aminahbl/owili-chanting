import type { Chant } from '../../types.ts';

export const chant = {
  id: "namo-kara-atthaka",
  title: "The Homage Octet",
  paliTitle: "Namo-kāra-aṭṭhaka",
  groups: [{ group: "parittas", subgroup: "Introductory Chants", order: 7 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#namo-arahato", categories: [{ category: "Parittas", subcategory: "Introductory Chants", order: 7 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [7, 9], note: "English to review: *omāty-āraddhassa* and *omakātītassa* play on *om* and *omaka* (low). The draft follows the usual reading; the wordplay cannot be kept in English." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Namo arahato sammā", en: "Homage to the worthy, perfectly" },
        { id: 2, pali: "Sambuddhassa mahesino", en: "self-awakened great sage." },
        { id: 3, pali: "Namo uttama-dhammassa", en: "Homage to the supreme Dhamma," },
        { id: 4, pali: "Svākkhātass'eva ten'idha", en: "so well taught by him here." },
        { id: 5, pali: "Namo mahā-saṅghassāpi", en: "Homage to the great Saṅgha too," },
        { id: 6, pali: "Visuddha-sīla-diṭṭhino", en: "of pure virtue and view." },
        { id: 7, pali: "Namo omāty-āraddhassa", en: "Homage, begun with 'Om'," },
        { id: 8, pali: "Ratanattayassa sādhukaṁ", en: "rightly paid to the Triple Gem." },
        { id: 9, pali: "Namo omakātītassa", en: "Homage to what has gone beyond the low," },
        { id: 10, pali: "Tassa vatthuttayassa-pi", en: "to that threefold object too." },
        { id: 11, pali: "Namo-kārappabhāvena", en: "By the influence of this homage," },
        { id: 12, pali: "Vigacchantu upaddavā", en: "may all misfortunes go away." },
        { id: 13, pali: "Namo-kārānubhāvena", en: "By the power of this homage," },
        { id: 14, pali: "Suvatthi hotu sabbadā", en: "may there always be safety." },
        { id: 15, pali: "Namo-kārassa tejena", en: "By the might of this homage," },
        { id: 16, pali: "Vidhimhi homi tejavā", en: "may I be mighty in what I undertake." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "the-aspirations",
  title: "The Aspirations",
  groups: [{ group: "joy-and-ceremony", order: 40 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#aspirations", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 9 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Iminā puññakammena", en: "By this act of goodness," },
        { id: 2, pali: "mā me bāla-samāgamo,", en: "may I not meet with fools;" },
        { id: 3, pali: "Sataṁ samāgamo hotu,", en: "may I meet with the good" },
        { id: 4, pali: "yāva nibbāna-pattiyā.", en: "until I reach nibbana." },
        { id: 5, pali: "Kāyena vācā-cittena", en: "By body, speech or mind," },
        { id: 6, pali: "pamādena mayā kataṁ", en: "whatever wrong I have done through heedlessness:" },
        { id: 7, pali: "Accayaṁ khama me bhante", en: "pardon me this fault, Venerable Sir," },
        { id: 8, pali: "bhūri-pañña Tathāgata.", en: "Tathāgata of vast wisdom." },
      ],
    },
  ],
} satisfies Chant;

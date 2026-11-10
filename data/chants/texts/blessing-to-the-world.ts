import type { Chant } from '../../types.ts';

export const chant = {
  id: "blessing-to-the-world",
  title: "Blessing to the World",
  groups: [{ group: "sri-lanka", subgroup: "Devotional Chants", order: 7 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#the-world", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 7 }] },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [4], note: "The manual has *Rajā*, a misspelling; corrected to *Rājā*, as in the same verse in Blessing and Protection." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Devo vassatu kālena", en: "May the rain fall in its season" },
        { id: 2, pali: "Sassa-sampatti-hetu ca", en: "for the success of the crops;" },
        { id: 3, pali: "Phīto bhavatu loko ca", en: "may the world be prosperous," },
        { id: 4, pali: "Rājā bhavatu dhammiko.", en: "and the king be righteous." },
      ],
    },
  ],
} satisfies Chant;

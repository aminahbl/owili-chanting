import type { Chant } from '../../types.ts';

export const chant = {
  id: "0094",
  slug: "transference-of-merits-to-departed-ones",
  title: "Transference of Merits to Departed Ones",
  groups: [{ group: "joy-and-ceremony", order: 30 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#merits-to-departed", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 8 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [1], note: "The alternatives for the people addressed (*te/vo/no/me*) are kept as printed; the chanter picks one. The English follows the first form." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Idaṁ te/vo/no/me ñātīnaṁ hotu", en: "May this be for your relatives;" },
        { id: 2, pali: "sukhitā hontu ñātayo.", en: "may the relatives be happy.", repeat: 3 },
      ],
    },
    {
      lines: [
        { id: 3, cue: "When chanting for one person use 'te'; when for laypeople use 'vo'; when chanting together in a group use 'no'; when alone use 'me'." },
      ],
    },
  ],
} satisfies Chant;

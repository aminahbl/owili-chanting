import type { Chant } from '../../types.ts';

export const chant = {
  id: "0071",
  slug: "bhavatu-sabba-mangalam",
  title: "May There Be Every Blessing",
  paliTitle: "Bhavatu sabba-maṅgalaṁ",
  groups: [{ group: "parittas", order: 300 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#bhavatu", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 30 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Bhavatu sabba-maṅgalaṁ rakkhantu sabba-devatā", en: "May there be every blessing; may all the devas protect you." },
        { id: 2, pali: "Sabba-buddhānubhāvena sadā sotthī bhavantu te", en: "By the power of all the Buddhas, may you always be safe." },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Bhavatu sabba-maṅgalaṁ rakkhantu sabba-devatā", en: "May there be every blessing; may all the devas protect you." },
        { id: 4, pali: "Sabba-dhammānubhāvena sadā sotthī bhavantu te", en: "By the power of all the Dhamma, may you always be safe." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Bhavatu sabba-maṅgalaṁ rakkhantu sabba-devatā", en: "May there be every blessing; may all the devas protect you." },
        { id: 6, pali: "Sabba-saṅghānubhāvena sadā sotthī bhavantu te", en: "By the power of all the Saṅgha, may you always be safe." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0080",
  slug: "pathama-buddha-bhasita-gatha",
  title: "Verses on the Buddha's First Exclamation",
  paliTitle: "Paṭhama-buddha-bhāsita-gāthā",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#pathama-buddha", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 39 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Aneka-jāti-saṁsāraṁ", en: "Through many births in the round" },
        { id: 2, pali: "sandhāvissaṁ anibbisaṁ", en: "I have wandered without finding," },
        { id: 3, pali: "Gaha-kāraṁ gavesanto", en: "seeking the house-builder:" },
        { id: 4, pali: "dukkhā jāti punappunaṁ", en: "painful is birth again and again." },
        { id: 5, pali: "Gaha-kāraka diṭṭho'si", en: "House-builder, you are seen!" },
        { id: 6, pali: "puna gehaṁ na kāhasi", en: "You will not build a house again." },
        { id: 7, pali: "Sabbā te phāsukā bhaggā", en: "All your rafters are broken," },
        { id: 8, pali: "gaha-kūṭaṁ visaṅkhataṁ", en: "the ridgepole is destroyed." },
        { id: 9, pali: "Visaṅkhāra-gataṁ cittaṁ", en: "The mind has gone to the unconditioned;" },
        { id: 10, pali: "taṇhānaṁ khayam-ajjhagā", en: "it has reached the end of cravings." },
      ],
      refs: [{ label: "Dhp 153–154", uid: "dhp146-156" }],
    },
  ],
} satisfies Chant;

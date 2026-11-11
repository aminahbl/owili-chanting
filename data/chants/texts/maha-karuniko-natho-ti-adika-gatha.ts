import type { Chant } from '../../types.ts';

export const chant = {
  id: "0072",
  slug: "maha-karuniko-natho-ti-adika-gatha",
  title: "The Great Compassionate Protector",
  paliTitle: "Mahā-kāruṇiko nātho'ti ādikā gāthā",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#atthaya", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 31 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Mahā-kāruṇiko nātho", en: "The great compassionate Protector," },
        { id: 2, pali: "Atthāya sabba-pāṇinaṁ", en: "for the good of all living beings," },
        { id: 3, pali: "Hitāya sabba-pāṇinaṁ", en: "for the welfare of all living beings," },
        { id: 4, pali: "Sukhāya sabba-pāṇinaṁ", en: "for the happiness of all living beings," },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Pūretvā pāramī sabbā", en: "fulfilled all the perfections" },
        { id: 6, pali: "Patto sambodhim-uttamaṁ", en: "and reached supreme awakening." },
        { id: 7, pali: "Etena sacca-vajjena", en: "By the speaking of this truth," },
        { id: 8, pali: "Mā hontu sabb'upaddavā", en: "may there be no misfortunes at all." },
      ],
    },
  ],
} satisfies Chant;

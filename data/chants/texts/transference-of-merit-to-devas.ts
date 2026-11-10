import type { Chant } from '../../types.ts';

export const chant = {
  id: "0092",
  slug: "transference-of-merit-to-devas",
  title: "Transference of Merit to Devas",
  groups: [{ group: "joy-and-ceremony", order: 10 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#merit-to-devas", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 6 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [9], note: "The alternatives for the people addressed (*devā/ bhūtā/ sattā*) are kept as printed; the chanter picks one. The English follows the first form." },
    { status: "open", lines: [4], note: "English to review: the bracketed *[loka]* is optional in the Pali and is left out of the English." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Ākāsatthā ca bhummatthā", en: "Dwelling in the sky and on the earth," },
        { id: 2, pali: "Devā nāgā mah'iddhikā", en: "devas and nāgas of great power," },
        { id: 3, pali: "Puññaṁ taṁ anumoditvā", en: "having rejoiced in this goodness," },
        { id: 4, pali: "Ciraṁ rakkhantu [loka] sāsanaṁ", en: "may they long protect the teaching;" },
        { id: 5, pali: "Ciraṁ rakkhantu desanaṁ", en: "may they long protect the Dhamma that is taught;" },
        { id: 6, pali: "Ciraṁ rakkhantu maṁ paraṁ", en: "may they long protect me and others." },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Ettāvatā ca amhehi", en: "In all that we have gathered so far," },
        { id: 8, pali: "Sambhataṁ puñña-sampadaṁ", en: "this wealth of goodness," },
        { id: 9, pali: "Sabbe devā/ bhūtā/ sattā anumodantu", en: "may all the devas rejoice," },
        { id: 10, pali: "Sabba-sampatti siddhiyā.", en: "for the success of every good fortune." },
      ],
    },
  ],
} satisfies Chant;

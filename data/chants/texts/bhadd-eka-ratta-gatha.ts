import type { Chant } from '../../types.ts';

export const chant = {
  id: "bhadd-eka-ratta-gatha",
  title: "Verses on a Shining Night of Prosperity",
  paliTitle: "Bhadd'eka-ratta-gāthā",
  groups: [{ group: "parittas", subgroup: "Closing Sequence", order: 36 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#bhadd-eka-ratta", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 36 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [7], note: "MN 131 has *Asaṁhīraṁ* where the manual has *Asaṁhiraṁ*. Kept as the manual prints it." },
    { status: "kept", lines: [13], note: "MN 131 has *vihāriṁ-ātāpiṁ* where the manual has *vihārim-ātāpiṁ*. Kept as the manual prints it." },
    { status: "open", lines: [15], note: "English to review: *bhadd'eka-ratta* is read in several ways (\"one excellent night\", \"an auspicious night\"). The chant's English title, \"a shining night of prosperity\", is a further rendering." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Atītaṁ nānvāgameyya", en: "Do not run back to the past," },
        { id: 2, pali: "nappaṭikaṅkhe anāgataṁ", en: "nor long for the future." },
        { id: 3, pali: "Yad'atītaṁ pahīnan-taṁ", en: "What is past is left behind," },
        { id: 4, pali: "appattañca anāgataṁ", en: "and the future has not come." },
        { id: 5, pali: "Paccuppannañca yo dhammaṁ", en: "Whoever sees present phenomena" },
        { id: 6, pali: "tattha tattha vipassati", en: "with insight, each as it arises," },
        { id: 7, pali: "Asaṁhiraṁ asaṅkuppaṁ", en: "unshaken, unmoved," },
        { id: 8, pali: "taṁ viddhām-anubrūhaye", en: "knowing that, should develop it." },
        { id: 9, pali: "Ajj'eva kiccam-ātappaṁ", en: "Do today what should be done with ardour;" },
        { id: 10, pali: "ko jaññā maraṇaṁ suve", en: "who knows whether death will come tomorrow?" },
        { id: 11, pali: "Na hi no saṅgaran-tena", en: "For there is no bargaining" },
        { id: 12, pali: "mahā-senena maccunā", en: "with Death and his great army." },
        { id: 13, pali: "Evaṁ vihārim-ātāpiṁ", en: "One who dwells thus, ardent," },
        { id: 14, pali: "aho-rattam-atanditaṁ", en: "day and night, untiring:" },
        { id: 15, pali: "Taṁ ve bhadd'eka-ratto'ti", en: "such a one has an excellent night," },
        { id: 16, pali: "santo ācikkhate muni", en: "so the peaceful sage declares." },
      ],
      refs: [{ label: "MN 131", uid: "mn131" }],
    },
  ],
} satisfies Chant;

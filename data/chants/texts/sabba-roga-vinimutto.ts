import type { Chant } from '../../types.ts';

export const chant = {
  id: "sabba-roga-vinimutto",
  title: "Freed from Every Illness",
  paliTitle: "Sabba-roga-vinimutto",
  groups: [{ group: "joy-and-ceremony", order: 110 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#sabba-roga", categories: [{ category: "Anumodanā", order: 2 }] },
  translation: "draft",
  notes: [
    "This shorter form is sometimes used instead of 'Yathā...'",
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Sabba-roga-vinimutto", en: "Freed from every illness," },
        { id: 2, pali: "sabba-santāpa-vajjito", en: "untouched by every torment," },
        { id: 3, pali: "Sabba-veram-atikkanto", en: "having gone beyond all enmity," },
        { id: 4, pali: "nibbuto ca tuvam-bhava", en: "may you be cool and at peace." },
        { id: 5, pali: "Sabb'ītiyo vivajjantu", en: "May all calamities be avoided," },
        { id: 6, pali: "sabba-rogo vinassatu", en: "may every illness be destroyed," },
        { id: 7, pali: "Mā te bhavatv-antarāyo", en: "may no obstacles come to you," },
        { id: 8, pali: "sukhī dīgh'āyuko bhava", en: "may you be happy and live long." },
        { id: 9, pali: "Abhivādana-sīlissa", en: "For one in the habit of showing respect," },
        { id: 10, pali: "niccaṁ vuḍḍhāpacāyino", en: "who always honours the elders," },
        { id: 11, pali: "Cattāro dhammā vaḍḍhanti", en: "four things increase:" },
        { id: 12, pali: "āyu vaṇṇo sukhaṁ balaṁ", en: "long life, beauty, happiness and strength." },
      ],
      refs: [{ label: "Dhp 109", uid: "dhp100-115" }],
    },
  ],
} satisfies Chant;

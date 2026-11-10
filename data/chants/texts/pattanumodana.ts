import type { Chant } from '../../types.ts';

export const chant = {
  id: "pattanumodana",
  title: "Sharing Merits",
  paliTitle: "Pattanumodana",
  groups: [{ group: "sri-lanka", subgroup: "Devotional Chants", order: 12 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#pattanumodana", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Devotional Chants", order: 12 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [1, 14], note: "The alternatives for the people addressed (*te/vo/no/me*) are kept as printed; the chanter picks one. The English follows the first form." },
    { status: "open", note: "The reference *Petavatthu pp. 19–31* is not confirmed and is shown without a link." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Idaṁ te/vo/no/me ñātīnaṁ hotu", en: "May this be for your relatives;" },
        { id: 2, pali: "Sukhitā hontu ñātayo", en: "may the relatives be happy.", repeat: 3 },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Yathā vāri-vahā pūrā", en: "Just as rivers full of water" },
        { id: 4, pali: "paripūrenti sāgaraṁ,", en: "fill the ocean," },
        { id: 5, pali: "Evaṁ eva ito dinnaṁ", en: "so may what is given here" },
        { id: 6, pali: "petānaṁ upakappatu.", en: "benefit the departed." },
        { id: 7, pali: "Unname udakaṁ vattaṁ", en: "Just as water rained on high ground" },
        { id: 8, pali: "yathā ninnaṁ pavattati,", en: "flows down to the low," },
        { id: 9, pali: "Evaṁ eva ito dinnaṁ", en: "so may what is given here" },
        { id: 10, pali: "petānaṁ upakappatu.", en: "benefit the departed." },
        { id: 11, pali: "Āyūr-arogya-sampatti", en: "Long life, health, success," },
        { id: 12, pali: "sagga-sampattiṁ eva ca,", en: "and the attainment of heaven," },
        { id: 13, pali: "Atho nibbāna-sampatti", en: "and the attainment of nibbana:" },
        { id: 14, pali: "iminā te/vo/no/me samijjhatu.", en: "by this, may these be yours." },
        { id: 15, pali: "Icchitaṁ patthitaṁ tuyhaṁ", en: "Whatever you wish or hope for," },
        { id: 16, pali: "sabbam-eva samijjhatu,", en: "may it all be fulfilled;" },
        { id: 17, pali: "Pūrentu citta-saṅkappā", en: "may your heart's wishes be fulfilled," },
        { id: 18, pali: "maṇi-joti-raso yathā.", en: "as by a radiant gem." },
        { id: 19, pali: "Icchitaṁ patthitaṁ tuyhaṁ", en: "Whatever you wish or hope for," },
        { id: 20, pali: "sabbam-eva samijjhatu,", en: "may it all be fulfilled;" },
        { id: 21, pali: "Pūrentu citta-saṅkappā", en: "may your heart's wishes be fulfilled," },
        { id: 22, pali: "cando paṇṇa-rasī yathā.", en: "as the moon on the fifteenth day." },
        { id: 23, pali: "Icchitaṁ patthitaṁ tuyhaṁ", en: "Whatever you wish or hope for," },
        { id: 24, pali: "khippam-eva samijjhatu,", en: "may it quickly be fulfilled;" },
        { id: 25, pali: "Sabbe pūrentu saṅkappā", en: "may all your wishes be fulfilled," },
        { id: 26, pali: "cando paṇṇa-rasī yathā.", en: "as the moon on the fifteenth day." },
      ],
      refs: [{ label: "Petavatthu pp. 19–31" }, { label: "Kp-a 206–215" }],
    },
  ],
} satisfies Chant;

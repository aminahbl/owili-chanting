import type { Chant } from '../../types.ts';

export const chant = {
  id: "0079",
  slug: "dhamma-garav-adi-gatha",
  title: "Verses on Respect for the Dhamma",
  paliTitle: "Dhamma-gārav'ādi-gāthā",
  groups: [{ group: "parittas", order: 380 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#dhamma-garav-adi", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 38 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [18], note: "Thag 4.10 has *sukham-āvahati* where the manual has *sukham-āvahāti*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Ye ca atītā sambuddhā", en: "The Awakened Ones of the past," },
        { id: 2, pali: "ye ca buddhā anāgatā", en: "the Buddhas of the future," },
        { id: 3, pali: "Yo c'etarahi sambuddho", en: "and the Awakened One of the present," },
        { id: 4, pali: "bahunnaṁ soka-nāsano", en: "who dispels the sorrow of many:" },
        { id: 5, pali: "Sabbe saddhamma-garuno", en: "all held the true Dhamma in reverence;" },
        { id: 6, pali: "vihariṁsu viharanti ca", en: "they lived so, and they live so," },
        { id: 7, pali: "Atho pi viharissanti", en: "and they will live so too:" },
        { id: 8, pali: "esā buddhāna dhammatā", en: "this is the nature of Buddhas." },
        { id: 9, pali: "Tasmā hi atta-kāmena", en: "Therefore one who cares for their own good" },
        { id: 10, pali: "mahattam-abhikaṅkhatā", en: "and longs for greatness" },
        { id: 11, pali: "Saddhammo garu-kātabbo", en: "should revere the true Dhamma," },
        { id: 12, pali: "saraṁ buddhāna sāsanaṁ", en: "remembering the Buddhas' teaching." },
      ],
      refs: [{ label: "SN 6.2", uid: "sn6.2" }],
    },
    {
      lines: [
        { id: 13, pali: "Na hi dhammo adhammo ca", en: "For Dhamma and what is not Dhamma" },
        { id: 14, pali: "Ubho sama-vipākino", en: "do not bear the same result:" },
        { id: 15, pali: "Adhammo nirayaṁ neti", en: "what is not Dhamma leads to hell;" },
        { id: 16, pali: "Dhammo pāpeti suggatiṁ", en: "the Dhamma brings one to a good destination." },
        { id: 17, pali: "Dhammo have rakkhati dhamma-cāriṁ", en: "The Dhamma truly protects the one who lives by the Dhamma;" },
        { id: 18, pali: "Dhammo suciṇṇo sukham-āvahāti", en: "the Dhamma well practised brings happiness:" },
        { id: 19, pali: "Esānisaṁso dhamme suciṇṇe", en: "this is the benefit of the Dhamma well practised." },
      ],
      refs: [{ label: "Thag 4.10", uid: "thag4.10" }],
    },
  ],
} satisfies Chant;

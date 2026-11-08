import type { Chant } from '../../types.ts';

export const chant = {
  id: "pabbatopama-gatha",
  title: "Verses on Mountains",
  paliTitle: "Pabbatopama-gāthā",
  groups: [{ group: "parittas", subgroup: "Closing Sequence", order: 33 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#pabbatopama" },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [22], note: "SN 3.25 has *pamodatī* where the manual has *pamodati*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Yathā pi selā vipulā", en: "Just as huge mountains of rock," },
        { id: 2, pali: "nabhaṁ āhacca pabbatā", en: "reaching up to the sky," },
        { id: 3, pali: "Samantā anupariyeyyuṁ", en: "might close in from all sides," },
        { id: 4, pali: "nippothentā catuddisā", en: "crushing everything in the four directions," },
        { id: 5, pali: "Evaṁ jarā ca maccu ca", en: "so ageing and death" },
        { id: 6, pali: "adhivattanti pāṇino", en: "roll over living beings:" },
        { id: 7, pali: "Khattiye brāhmaṇe vesse", en: "nobles, brahmins, merchants," },
        { id: 8, pali: "sudde caṇḍāla-pukkuse", en: "workers, outcastes and scavengers." },
        { id: 9, pali: "Na kiñci parivajjeti", en: "They spare no one;" },
        { id: 10, pali: "sabbam-evābhimaddati", en: "they crush everything." },
        { id: 11, pali: "Na tattha hatthīnaṁ bhūmi", en: "There is no ground there for elephants," },
        { id: 12, pali: "na rathānaṁ na pattiyā", en: "nor for chariots, nor for foot soldiers," },
        { id: 13, pali: "Na cāpi manta-yuddhena", en: "nor can they be conquered by spells" },
        { id: 14, pali: "sakkā jetuṁ dhanena vā", en: "or bought off with wealth." },
        { id: 15, pali: "Tasmā hi paṇḍito poso", en: "Therefore a person who is wise," },
        { id: 16, pali: "sampassaṁ attham-attano", en: "seeing what is for their own good," },
        { id: 17, pali: "Buddhe dhamme ca saṅghe ca", en: "in the Buddha, the Dhamma and the Saṅgha" },
        { id: 18, pali: "dhīro saddhaṁ nivesaye", en: "should firmly set their faith." },
        { id: 19, pali: "Yo dhamma-cārī kāyena", en: "One who lives by the Dhamma in body," },
        { id: 20, pali: "vācāya uda cetasā", en: "speech or mind" },
        { id: 21, pali: "Idh'eva naṁ pasaṁsanti", en: "is praised here in this life," },
        { id: 22, pali: "pecca sagge pamodati", en: "and after death rejoices in heaven." },
      ],
      refs: [{ label: "SN 3.25", uid: "sn3.25" }],
    },
  ],
} satisfies Chant;

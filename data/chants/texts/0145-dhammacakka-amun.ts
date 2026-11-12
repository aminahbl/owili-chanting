import type { Chant } from '../../types.ts';

export const chant = {
  id: "0145",
  slug: "dhammacakka-amun",
  title: "Introduction to Setting in Motion the Wheel of Dhamma (Burmese)",
  paliTitle: "Dhammacakka Amun",
  paliSource: { label: "Dhammacakkappavattana Sutta, Pali–Myanmar–English (dhammadata.com)", url: "https://www.dhammadata.com/viewer/%E1%80%93%E1%80%99%E1%80%B9%E1%80%99%E1%80%85%E1%80%80%E1%80%BC%E1%80%AC%20%E1%80%95%E1%80%AB%E1%80%A0%E1%80%AD%20%E1%80%99%E1%80%BC%E1%80%94%E1%80%BA%E1%80%99%E1%80%AC%20%E1%80%A1%E1%80%84%E1%80%BA%E1%80%B9%E1%80%82%E1%80%9C%E1%80%AD%E1%80%95%E1%80%BA%20DhammaCakka/Dhammacakka_Sutta_(Pali-Myanmar-Eng)" },
  translation: "draft",
  notes: [
    "Pāpaka in nibbānapāpakaṁ means \"that brings to\", from pāpeti, not \"evil\".",
  ],
  editorial: [
    { status: "changed", note: "The source prints the Pali in Burmese script, on printed page 4 (page 5 of the PDF), headed ဓမ္မစကြာအမွှန်း. It is romanised here, with *ṁ* for the niggahita as elsewhere on the site." },
    { status: "open", note: "English to review: the source's Burmese paraphrase was used to check the sense. Whether the verses are chanted by one chanter or a leader is not known; the source marks the start of each stanza with an asterisk." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Bhikkhūnaṁ pañcavaggīnaṁ, Isipatana nāmake.", en: "To the group of five bhikkhus, at the place called Isipatana," },
        { id: 2, pali: "Migadāye dhammavaraṁ, yaṁ taṁ nibbānapāpakaṁ.", en: "in the Deer Park, the excellent Dhamma that leads to nibbana," },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Sahampati nāmakena, Mahābrahmena yācito.", en: "requested by the Great Brahmā named Sahampati," },
        { id: 4, pali: "Catusaccaṁ pakāsento, Lokanātho adesayi.", en: "making known the four truths, the Protector of the World taught." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Nanditaṁ sabbadevehi, sabbasampattisādhakaṁ.", en: "Rejoiced in by all the devas, bringing about every good fortune," },
        { id: 6, pali: "Sabbalokahitatthāya, Dhammacakkaṁ bhaṇāma he.", en: "for the welfare of all the world, let us chant the wheel of Dhamma." },
      ],
    },
  ],
} satisfies Chant;

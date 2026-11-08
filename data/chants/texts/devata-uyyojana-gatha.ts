import type { Chant } from '../../types.ts';

export const chant = {
  id: "devata-uyyojana-gatha",
  title: "Verses on Sending Off the Devatā",
  paliTitle: "Devatā-uyyojana-gāthā",
  groups: [{ group: "parittas", subgroup: "Closing Sequence", order: 24 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#dukkhappatta" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Dukkhappattā ca niddukkhā", en: "May those who suffer be free from suffering," },
        { id: 2, pali: "bhayappattā ca nibbhayā", en: "those in fear be free from fear," },
        { id: 3, pali: "Sokappattā ca nissokā", en: "those in sorrow be free from sorrow:" },
        { id: 4, pali: "hontu sabbe pi pāṇino", en: "may all living beings be so." },
        { id: 5, pali: "Ettāvatā ca amhehi", en: "In all that we have gathered so far," },
        { id: 6, pali: "sambhataṁ puñña-sampadaṁ", en: "this wealth of goodness," },
        { id: 7, pali: "Sabbe devānumodantu", en: "may all the devas rejoice," },
        { id: 8, pali: "sabba-sampatti-siddhiyā", en: "for the success of every good fortune." },
        { id: 9, pali: "Dānaṁ dadantu saddhāya", en: "May they give gifts with faith," },
        { id: 10, pali: "sīlaṁ rakkhantu sabbadā", en: "always keep virtue," },
        { id: 11, pali: "Bhāvanābhiratā hontu", en: "and delight in meditation." },
        { id: 12, pali: "gacchantu devatā-gatā", en: "May the devas who have come now go." },
        { id: 13, pali: "[Sabbe buddhā] balappattā", en: "All the Buddhas have attained power," },
        { id: 14, pali: "paccekānañ-ca yaṁ balaṁ", en: "and by the power of the solitary Buddhas" },
        { id: 15, pali: "Arahantānañ-ca tejena", en: "and the might of the worthy ones" },
        { id: 16, pali: "rakkhaṁ bandhāmi sabbaso", en: "I bind this protection in every way." },
      ],
    },
  ],
} satisfies Chant;

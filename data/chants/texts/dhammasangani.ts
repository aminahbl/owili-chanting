import type { Chant } from '../../types.ts';

export const chant = {
  id: "dhammasangani",
  title: "Opening of the Dhammasaṅgaṇī",
  paliTitle: "Dhammasaṅgaṇī",
  groups: [{ group: "funeral", order: 20 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#dhammasangani", categories: [{ category: "Funeral Chants", order: 2 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Kusalā dhammā, akusalā dhammā, abyākatā dhammā.", en: "Skilful states, unskilful states, indeterminate states." },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Katame dhammā kusalā.", en: "Which states are skilful?" },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Yasmiṁ samaye kāmāvacaraṁ kusalaṁ cittaṁ uppannaṁ hoti,", en: "At a time when a skilful mind of the sense sphere has arisen," },
        { id: 4, pali: "somanassa-sahagataṁ ñāṇa-sampayuttaṁ,", en: "accompanied by gladness, associated with knowledge," },
        { id: 5, pali: "rūpārammaṇaṁ vā saddārammaṇaṁ vā gandhārammaṇaṁ vā rasārammaṇaṁ", en: "with a form, a sound, an odour or a flavour" },
        { id: 6, pali: "vā phoṭṭhabbārammaṇaṁ vā dhammārammaṇaṁ vā,", en: "or a tangible or a mental object as its object," },
        { id: 7, pali: "yaṁ yaṁ vā panārabbha, tasmiṁ samaye phasso hoti, avikkhepo hoti,", en: "or whatever it takes up, at that time there is contact … there is non-distraction;" },
        { id: 8, pali: "ye vā pana tasmiṁ samaye aññe pi atthi paṭicca-samuppannā arūpino dhammā,", en: "or whatever other immaterial states there are at that time, arisen in dependence:" },
        { id: 9, pali: "ime dhammā kusalā.", en: "these states are skilful." },
      ],
      refs: [{ label: "Ds 2.1.1", uid: "ds2.1.1" }],
    },
  ],
} satisfies Chant;

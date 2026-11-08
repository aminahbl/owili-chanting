import type { Chant } from '../../types.ts';

export const chant = {
  id: "kathavatthu",
  title: "Opening of the Kathāvatthu",
  paliTitle: "Kathāvatthu",
  groups: [{ group: "funeral", order: 6 }],
  paliSource: { label: "Bhikkhu Manual, Funeral Chants", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#kathavatthu" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Puggalo upalabbhati saccikaṭṭha-paramatthenā'ti.", en: "Is a person found as a real and ultimate fact?" },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Āmantā.", en: "Yes." },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Yo saccikaṭṭho paramattho,", en: "In the way that a real and ultimate fact is found," },
        { id: 4, pali: "tato so puggalo upalabbhati saccikaṭṭha-paramatthenā'ti.", en: "is that person found as a real and ultimate fact?" },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Na h'evaṁ vattabbe.", en: "That should not be said." },
      ],
    },
    {
      lines: [
        { id: 6, pali: "Ājānāhi niggahaṁ.", en: "Acknowledge your refutation:" },
        { id: 7, pali: "Hañci puggalo upalabbhati saccikaṭṭha-paramatthena, tena vata re vattabbe.", en: "if a person is found as a real and ultimate fact, then indeed you should say:" },
      ],
    },
    {
      lines: [
        { id: 8, pali: "Yo saccikaṭṭho paramattho,", en: "'In the way that a real and ultimate fact is found," },
        { id: 9, pali: "tato so puggalo upalabbhati saccikaṭṭha-paramatthenā'ti micchā.", en: "that person is found as a real and ultimate fact.' That is wrong." },
      ],
      refs: [{ label: "Kv 1.1", uid: "kv1.1" }],
    },
  ],
} satisfies Chant;

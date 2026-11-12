import type { Chant } from '../../types.ts';

export const chant = {
  id: "0162",
  slug: "confession-with-a-good-friend",
  title: "Confession with a Good Friend",
  paliSource: { label: "Clear Mountain Monastery, Upāsakā Guide", url: "https://www.clearmountain.org/visitors-practitioners/#upasaka" },
  translation: "draft",
  notes: [
    "Two lay followers go before a Buddha image and take turns confessing and listening. What is said is kept confidential.",
  ],
  editorial: [
    { status: "changed", note: "From the confession session in Clear Mountain's Confession Guide for Upāsakā. The guide's instructions are shortened into cues, ṃ is written ṁ, and the listener's long reply is divided into four lines. The English is our own; the guide's English was read for reference." },
  ],
  sections: [
    {
      lines: [
        { id: 1, cue: "Bow to the Buddha image." },
        { id: 2, pali: "Namo tassa bhagavato arahato sammā-sambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened.", repeat: 3 },
      ],
    },
    {
      lines: [
        { id: 3, cue: "The one confessing names where they slipped recently: in the precepts, in practice or in daily life. The listener may offer encouragement or advice if asked." },
        { id: 4, cue: "The one confessing" },
        { id: 5, pali: "Accayā maṁ, kalyāṇamitta, accagamaṁsu.", en: "Lapses overcame me, good friend." },
        { id: 6, pali: "Tassa me, kalyāṇamitta, accaye accayato paṭiggaṇhātu āyatiṁ saṁvarāya.", en: "Good friend, please accept my lapses as lapses, for the sake of restraint in future." },
      ],
    },
    {
      lines: [
        { id: 7, cue: "The listener" },
        { id: 8, pali: "Passasi, kalyāṇamitta.", en: "Do you see them, good friend?" },
      ],
    },
    {
      lines: [
        { id: 9, cue: "The one confessing" },
        { id: 10, pali: "Āma, kalyāṇamitta, passāmi.", en: "Yes, good friend, I see them." },
      ],
    },
    {
      lines: [
        { id: 11, cue: "The listener" },
        { id: 12, pali: "Vuddhi hesā, kalyāṇamitta, ariyassa vinaye,", en: "Good friend, it is growth in the discipline of the noble ones" },
        { id: 13, pali: "yo accaye accayato disvā yathādhammaṁ paṭikaroti", en: "when one sees lapses as lapses and makes amends as is right," },
        { id: 14, pali: "āyatiṁ saṁvaraṁ āpajjati.", en: "and undertakes restraint in future." },
        { id: 15, pali: "Āyatiṁ, kalyāṇamitta, saṁvareyyāsi.", en: "In future, good friend, you should be restrained." },
      ],
    },
    {
      lines: [
        { id: 16, cue: "The one confessing" },
        { id: 17, pali: "Sādhu suṭṭhu, kalyāṇamitta, saṁvarissāmi.", en: "Very well, good friend, I will be restrained.", repeat: 3 },
      ],
    },
    {
      lines: [
        { id: 18, cue: "The listener" },
        { id: 19, pali: "Sādhu! Sādhu! Sādhu!", en: "Excellent! Excellent! Excellent!" },
      ],
    },
    {
      lines: [
        { id: 20, cue: "The one confessing then speaks of what went well in the same weeks and what they are grateful for, and both rejoice in it. The two then change roles and go through the confession again." },
        { id: 21, cue: "The session ends with going for refuge, the five precepts and a bow to the Buddha image." },
      ],
    },
  ],
} satisfies Chant;

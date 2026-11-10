import type { Chant } from '../../types.ts';

export const chant = {
  id: "five-precepts",
  title: "Five Precepts",
  groups: [{ group: "joy-and-ceremony", order: 90 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#five-precepts", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Uposatha-day for Lay-followers", order: 17 }] },
  translation: "draft",
  notes: [
    "With hands in añjali, the laypeople recite the following request:",
  ],
  editorial: [
    { status: "changed", note: "The manual's speaker labels are written as cues (*Bhikkhu*, *Laypeople*), and the manual's English glosses under the Pali lines are left out. The glosses can be read at the Pali source link." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "'Sādhu!", en: "'Excellent!" },
        { id: 2, pali: "Sādhu!", en: "Excellent!" },
        { id: 3, pali: "Sādhu!", en: "Excellent!" },
        { id: 4, pali: "Okāsa ahaṁ bhante tisaraṇena saddhiṁ pañca-sīlaṁ dhammaṁ yācāmi,", en: "Venerable Sir, with your leave, I ask for the five precepts together with the three refuges;" },
        { id: 5, pali: "anuggahaṁ katvā sīlaṁ detha me bhante.", en: "out of kindness, please give me the precepts, Venerable Sir." },
        { id: 6, pali: "Dutiyam-pi okāsa...", en: "For the second time, with your leave…" },
        { id: 7, pali: "Tatiyam-pi okāsa...'", en: "For the third time, with your leave…'" },
      ],
    },
    {
      lines: [
        { id: 8, cue: "Bhikkhu" },
        { id: 9, pali: "'Yaṁ ahaṁ vadāmi taṁ vadetha.'", en: "'Repeat what I say.'" },
      ],
    },
    {
      lines: [
        { id: 10, cue: "Laypeople" },
        { id: 11, pali: "'Āma, bhante.'", en: "'Yes, Venerable Sir.'" },
      ],
    },
    {
      lines: [
        { id: 12, cue: "Bhikkhu" },
        { id: 13, pali: "'Namo...'", en: "'Homage…'", repeat: 3 },
      ],
    },
    {
      lines: [
        { id: 14, cue: "Laypeople" },
        { id: 15, cue: "Repeat" },
      ],
    },
    {
      lines: [
        { id: 16, cue: "Bhikkhu" },
        { id: 17, pali: "'Saraṇagamanaṁ sampuṇṇaṁ.'", en: "'The going for refuge is complete.'" },
      ],
    },
    {
      lines: [
        { id: 18, cue: "Laypeople" },
        { id: 19, pali: "'Āma, bhante.'", en: "'Yes, Venerable Sir.'" },
      ],
    },
    {
      lines: [
        { id: 20, cue: "Then the bhikkhu recites, with the laypeople repeating line by line:" },
        { id: 21, pali: "Pāṇātipātā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from killing living beings." },
        { id: 22, pali: "Adinnādānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from taking what is not given." },
        { id: 23, pali: "Kāmesu micchā-cārā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from sexual misconduct." },
        { id: 24, pali: "Musā-vādā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from false speech." },
        { id: 25, pali: "Surā-meraya-majja-pamādaṭṭhānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from liquor, wine and intoxicants that cause heedlessness." },
      ],
    },
    {
      lines: [
        { id: 26, cue: "Bhikkhu" },
      ],
    },
    {
      lines: [
        { id: 27, pali: "'Tisaraṇena saddhiṁ pañcasīlaṁ dhammaṁ sādhukaṁ", en: "'Keep the five precepts with the three refuges well," },
        { id: 28, pali: "surakkhitaṁ katvā appamādena sampādetha.'", en: "carefully guarded, and strive on with heedfulness.'" },
      ],
    },
    {
      lines: [
        { id: 29, cue: "Laypeople" },
        { id: 30, pali: "'Āma, bhante.'", en: "'Yes, Venerable Sir.'" },
      ],
    },
    {
      lines: [
        { id: 31, cue: "Bhikkhu" },
      ],
    },
    {
      lines: [
        { id: 32, pali: "'Sīlena sugatiṁ yanti", en: "'Through virtue they go to a good destination," },
        { id: 33, pali: "Sīlena bhoga-sampadā,", en: "through virtue comes wealth," },
        { id: 34, pali: "Sīlena nibbutiṁ yanti,", en: "through virtue they reach peace;" },
        { id: 35, pali: "Tasmā sīlaṁ visodhaye.'", en: "therefore purify your virtue.'" },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0098",
  slug: "formula-for-same-base-offences",
  title: "Formula for same base offences",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#same-base-offences", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Offences", order: 14 }] },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [4], note: "The manual has *āpaṭṭiṁ*, a misspelling; corrected to *āpattiṁ*." },
    { status: "changed", note: "The manual's speaker labels are written as cues (*Junior bhikkhu*, *Senior bhikkhu*), and the manual's English glosses under the Pali lines are left out. The glosses can be read at the Pali source link." },
    { status: "open", note: "The reference *Vin II 102* is not confirmed and is shown without a link." },
    { status: "open", lines: [2], note: "English to review: *desanā-dukkaṭa* is the offence of wrong-doing incurred by confessing offences of the same base together; a short note would help users." },
  ],
  sections: [
    {
      lines: [
        { id: 1, cue: "Junior bhikkhu" },
        { id: 2, pali: "Okāsa ahaṁ bhante, desanādukkaṭāpattiṁ āpajjiṁ, taṁ tumha-mūle paṭidesemi.", en: "Venerable Sir, with your leave: I have fallen into the offence of wrong-doing in confession; I confess it in your presence." },
      ],
    },
    {
      lines: [
        { id: 3, cue: "Senior bhikkhu" },
        { id: 4, pali: "Passasi āvuso taṁ āpattiṁ?", en: "Do you see that offence, friend?" },
      ],
    },
    {
      lines: [
        { id: 5, cue: "Junior bhikkhu" },
        { id: 6, pali: "Āma bhante passāmi.", en: "Yes, Venerable Sir, I see it." },
      ],
    },
    {
      lines: [
        { id: 7, cue: "Senior bhikkhu" },
        { id: 8, pali: "Āyatiṁ āvuso saṁvareyyāsi.", en: "In future, friend, you should be restrained." },
      ],
    },
    {
      lines: [
        { id: 9, cue: "Junior bhikkhu" },
        { id: 10, pali: "Sādhu suṭṭhu bhante āyatiṁ saṁvarissāmi.", en: "Very well, Venerable Sir, in future I will be restrained." },
        { id: 11, pali: "Dutiyam-pi sādhu suṭṭhu ...", en: "For the second time: very well…" },
        { id: 13, pali: "Tatiyam-pi ... saṁvarissāmi.", en: "For the third time… I will be restrained." },
      ],
    },
    {
      lines: [
        { id: 15, cue: "Senior bhikkhu" },
        { id: 16, pali: "Sādhu, sādhu.", en: "Excellent, excellent." },
      ],
      refs: [{ label: "Vin II 102" }],
    },
  ],
} satisfies Chant;

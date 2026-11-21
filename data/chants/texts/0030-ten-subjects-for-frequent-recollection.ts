import type { Chant } from '../../types.ts';

export const chant = {
  id: "0030",
  slug: "ten-subjects-for-frequent-recollection",
  title: "Ten Subjects for Frequent Recollection",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#dasa-ime-bhikkhave", categories: [{ category: "Reflections", order: 3 }] },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [2], note: "The manual has *ajjhūpagato*, a misspelling; corrected to *ajjhupagato*." },
    { status: "open", lines: [2], note: "English to review: *vevaṇṇiya* is literally \"being without colour\", that is, without caste or social status." },
    { status: "open", lines: [19], note: "English to review: *suññāgāra* is literally \"an empty house\"; \"solitude\" gives the sense." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "{Dasa ime bhikkhave} dhammā pabbajitena abhiṇhaṁ paccavekkhitabbā, katame dasa", en: "{These ten things, bhikkhus,} one gone forth should often recollect. What ten?" },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Vevaṇṇiyamhi ajjhupagato'ti", en: "'I have left social standing behind':" },
        { id: 3, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Parapaṭibaddhā me jīvikā'ti", en: "'My living depends on others':" },
        { id: 5, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 6, pali: "Añño me ākappo karaṇīyo'ti", en: "'My conduct must be different':" },
        { id: 7, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 8, pali: "Kacci nu kho me attā sīlato na upavadatī'ti", en: "'Can I find fault with my own virtue?'" },
        { id: 9, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "So one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 10, pali: "Kacci nu kho maṁ anuvicca viññū sabrahmacārī sīlato na upavadantī'ti", en: "'Would the wise, my companions in the holy life, on examining me, find fault with my virtue?'" },
        { id: 11, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "So one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 12, pali: "Sabbehi me piyehi manāpehi nānābhāvo vinābhāvo'ti", en: "'I will be parted and separated from all that is dear and pleasing to me':" },
        { id: 13, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 14, pali: "Kammassakomhi kammadāyādo kammayoni kammabandhu kammapaṭisaraṇo,", en: "'I am the owner of my actions, heir to them, born of them, bound to them, with them as my refuge;" },
        { id: 15, pali: "yaṁ kammaṁ karissāmi, kalyāṇaṁ vā pāpakaṁ vā, tassa dāyādo bhavissāmī'ti", en: "whatever I do, good or bad, of that I will be the heir':" },
        { id: 16, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 17, pali: "'Kathambhūtassa me rattindivā vītipatantī'ti", en: "'As the days and nights go by, what am I becoming?'" },
        { id: 18, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "So one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 19, pali: "Kacci nu kho'haṁ suññāgāre abhiramāmī'ti", en: "'Do I delight in solitude?':" },
        { id: 20, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 21, pali: "Atthi nu kho me uttari-manussa-dhammā alamariya-ñāṇa-dassana-viseso adhigato,", en: "'Have I attained a state beyond the human, a distinction in knowledge and vision worthy of the noble ones," },
        { id: 22, pali: "so'haṁ pacchime kāle sabrahmacārīhi puṭṭho na maṅku bhavissāmī'ti", en: "so that, when my companions in the holy life ask me in my last days, I will not be at a loss?':" },
        { id: 23, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
      ],
    },
    {
      lines: [
        { id: 24, pali: "Ime kho bhikkhave dasa dhammā pabbajitena abhiṇhaṁ paccavekkhitabbā'ti", en: "These, bhikkhus, are the ten things that one gone forth should often recollect." },
      ],
      refs: [{ label: "AN 10.48", uid: "an10.48" }],
    },
  ],
} satisfies Chant;

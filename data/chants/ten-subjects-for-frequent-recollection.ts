import type { Chant } from '../types.ts';

export const chant = {
  id: "ten-subjects-for-frequent-recollection",
  title: "Ten Subjects for Frequent Recollection",
  groups: [{ group: "reflections", order: 3 }],
  paliSource: { label: "Bhikkhu Manual, Reflections", url: "https://bhikkhu-manual.github.io/chants/reflections.html#dasa-ime-bhikkhave" },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [3], note: "The manual has *ajjhūpagato*, a misspelling; corrected to *ajjhupagato*." },
    { status: "open", lines: [3], note: "English to review: *vevaṇṇiya* is literally \"being without colour\", that is, without caste or social status." },
    { status: "open", lines: [17], note: "English to review: *suññāgāra* is literally \"an empty house\"; \"solitude\" gives the sense." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ pabbajita-abhiṇha-paccavekkhaṇa-pāṭhaṁ bhaṇāmase", en: "Now let us chant the passage for frequent recollection by those gone forth.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "[Dasa ime bhikkhave] dhammā pabbajitena abhiṇhaṁ paccavekkhitabbā, katame dasa", en: "These ten things, bhikkhus, one gone forth should often recollect. What ten?" },
        { id: 3, pali: "Vevaṇṇiyamhi ajjhupagato'ti pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "'I have left social standing behind': so one gone forth should often recollect." },
        { id: 4, pali: "Parapaṭibaddhā me jīvikā'ti pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "'My living depends on others': so one gone forth should often recollect." },
        { id: 5, pali: "Añño me ākappo karaṇīyo'ti pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "'My conduct must be different': so one gone forth should often recollect." },
        { id: 6, pali: "Kacci nu kho me attā sīlato na upavadatī'ti", en: "'Can I find fault with my own virtue?'" },
        { id: 7, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "So one gone forth should often recollect." },
        { id: 8, pali: "Kacci nu kho maṁ anuvicca viññū sabrahmacārī sīlato na", en: "'Would the wise, my companions in the holy life, on examining me, find fault" },
        { id: 9, pali: "upavadantī'ti pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "with my virtue?' So one gone forth should often recollect." },
        { id: 10, pali: "Sabbehi me piyehi manāpehi nānābhāvo vinābhāvo'ti", en: "'I will be parted and separated from all that is dear and pleasing to me':" },
        { id: 11, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "so one gone forth should often recollect." },
        { id: 12, pali: "Kammassakomhi kammadāyādo kammayoni kammabandhu kammapaṭisaraṇo,", en: "'I am the owner of my actions, heir to them, born of them, bound to them, with them as my refuge;" },
        { id: 13, pali: "yaṁ kammaṁ karissāmi, kalyāṇaṁ vā pāpakaṁ vā,", en: "whatever I do, good or bad," },
        { id: 14, pali: "tassa dāyādo bhavissāmī'ti pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "of that I will be the heir': so one gone forth should often recollect." },
        { id: 15, pali: "'Kathambhūtassa me rattindivā vītipatantī'ti", en: "'As the days and nights go by, what am I becoming?'" },
        { id: 16, pali: "pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "So one gone forth should often recollect." },
        { id: 17, pali: "Kacci nu kho'haṁ suññāgāre abhiramāmī'ti pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "'Do I delight in solitude?': so one gone forth should often recollect." },
        { id: 18, pali: "Atthi nu kho me uttari-manussa-dhammā alamariya-ñāṇa-dassana-viseso adhigato,", en: "'Have I attained a state beyond the human, a distinction in knowledge and vision worthy of the noble ones," },
        { id: 19, pali: "so'haṁ pacchime kāle sabrahmacārīhi puṭṭho na maṅku", en: "so that, when my companions in the holy life ask me in my last days, I will not be" },
        { id: 20, pali: "bhavissāmī'ti pabbajitena abhiṇhaṁ paccavekkhitabbaṁ", en: "at a loss?': so one gone forth should often recollect." },
        { id: 21, pali: "Ime kho bhikkhave dasa dhammā pabbajitena abhiṇhaṁ paccavekkhitabbā'ti", en: "These, bhikkhus, are the ten things that one gone forth should often recollect." },
      ],
      refs: [{ label: "AN 10.48", uid: "an10.48" }],
    },
  ],
} satisfies Chant;

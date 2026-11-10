import type { Chant } from '../../types.ts';

export const chant = {
  id: "aranne-rukkha-mule-va",
  title: "In the Forest, at the Foot of a Tree",
  paliTitle: "Araññe rukkha-mūle vā",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 16 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#aranne", categories: [{ category: "Parittas", subcategory: "Core Sequence", order: 16 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [13], note: "SN 11.3 has *Evaṁ-buddhaṁ* where the manual has *Evam-buddhaṁ*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Araññe rukkha-mūle vā", en: "In the forest, at the foot of a tree," },
        { id: 2, pali: "Suññāgāre va bhikkhavo", en: "or in an empty hut, bhikkhus," },
        { id: 3, pali: "Anussaretha sambuddhaṁ", en: "recollect the Awakened One," },
        { id: 4, pali: "Bhayaṁ tumhāka no siyā", en: "and no fear will come to you." },
        { id: 5, pali: "No ce buddhaṁ sareyyātha", en: "If you do not recollect the Buddha," },
        { id: 6, pali: "Loka-jeṭṭhaṁ nar'āsabhaṁ", en: "the chief of the world, the noblest of humans," },
        { id: 7, pali: "Atha dhammaṁ sareyyātha", en: "then recollect the Dhamma," },
        { id: 8, pali: "Niyyānikaṁ sudesitaṁ", en: "leading out, well taught." },
        { id: 9, pali: "No ce dhammaṁ sareyyātha", en: "If you do not recollect the Dhamma," },
        { id: 10, pali: "Niyyānikaṁ sudesitaṁ", en: "leading out, well taught," },
        { id: 11, pali: "Atha saṅghaṁ sareyyātha", en: "then recollect the Saṅgha," },
        { id: 12, pali: "Puññakkhettaṁ anuttaraṁ", en: "the unsurpassed field of goodness." },
        { id: 13, pali: "Evam-buddhaṁ sarantānaṁ", en: "For those who recollect the Buddha," },
        { id: 14, pali: "Dhammaṁ saṅghañ-ca bhikkhavo", en: "the Dhamma and the Saṅgha, bhikkhus," },
        { id: 15, pali: "Bhayaṁ vā chambhitattaṁ vā", en: "fear, trembling" },
        { id: 16, pali: "Loma-haṁso na hessatī'ti.", en: "or hair standing on end will not arise." },
      ],
      refs: [{ label: "SN 11.3", uid: "sn11.3" }],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "vattaka-paritta",
  title: "The Quail's Protection",
  paliTitle: "Vaṭṭaka-paritta",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 14 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#atthi-loke", categories: [{ category: "Parittas", subcategory: "Core Sequence", order: 14 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [15], note: "English to review: a *karīsa* is a measure of land; \"sixteen lengths\" gives the sense without the unit." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Atthi loke sīla-guṇo", en: "There is in the world the quality of virtue," },
        { id: 2, pali: "saccaṁ soceyy'anuddayā", en: "truth, purity and kindness;" },
        { id: 3, pali: "Tena saccena kāhāmi", en: "by that truth I will make" },
        { id: 4, pali: "sacca-kiriyam-anuttaraṁ", en: "an unsurpassed act of truth." },
        { id: 5, pali: "Āvajjitvā dhamma-balaṁ", en: "Reflecting on the power of the Dhamma," },
        { id: 6, pali: "saritvā pubbake jine", en: "remembering the Victors of the past," },
        { id: 7, pali: "Sacca-balam-avassāya", en: "relying on the power of truth," },
        { id: 8, pali: "sacca-kiriyam-akās'ahaṁ", en: "I made an act of truth:" },
        { id: 9, pali: "Santi pakkhā apattanā", en: "'There are wings that cannot fly," },
        { id: 10, pali: "santi pādā avañcanā", en: "there are feet that cannot walk;" },
        { id: 11, pali: "Mātā pitā ca nikkhantā", en: "mother and father have gone away:" },
        { id: 12, pali: "jāta-veda paṭikkama", en: "fire, go back!'" },
        { id: 13, pali: "Saha sacce kate mayhaṁ", en: "As soon as I had made this act of truth," },
        { id: 14, pali: "mahā-pajjalito sikhī", en: "the great blazing fire" },
        { id: 15, pali: "Vajjesi soḷasa karīsāni", en: "kept sixteen lengths away," },
        { id: 16, pali: "udakaṁ patvā yathā sikhī", en: "like a fire that has met water." },
        { id: 17, pali: "Saccena me samo n'atthi", en: "There is none equal to my truth:" },
        { id: 18, pali: "esā me sacca-pāramī'ti", en: "this is my perfection of truth." },
      ],
      refs: [{ label: "Cp 29", uid: "cp29" }],
    },
  ],
} satisfies Chant;

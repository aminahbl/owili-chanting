import type { Chant } from '../types.ts';

export const chant = {
  id: "mora-paritta",
  title: "The Peacock's Protection",
  paliTitle: "Mora-paritta",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 13 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#udetayan-cakkhuma" },
  translation: "draft",
  notes: [
    "a.m.",
  ],
  editorial: [
    { status: "open", lines: [1, 12], note: "English to review: \"the one with vision, the sole king\" is the sun. A short note would help users." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Udet'ayañ-cakkhumā eka-rājā", en: "There rises the one with vision, the sole king," },
        { id: 2, pali: "Harissa-vaṇṇo paṭhavippabhāso", en: "golden, shining on the earth." },
        { id: 3, pali: "Taṁ taṁ namassāmi harissa-vaṇṇaṁ paṭhavippabhāsaṁ", en: "I pay homage to you, golden, shining on the earth;" },
        { id: 4, pali: "Tay'ajja guttā viharemu divasaṁ", en: "guarded by you today, may we pass the day." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Ye brāhmaṇā vedagu sabba-dhamme", en: "Those brahmins who have mastered all things:" },
        { id: 6, pali: "Te me namo te ca maṁ pālayantu", en: "to them my homage; may they protect me." },
        { id: 7, pali: "Nam'atthu Buddhānaṁ nam'atthu bodhiyā", en: "Homage to the Buddhas, homage to awakening;" },
        { id: 8, pali: "Namo vimuttānaṁ namo vimuttiyā", en: "homage to the released, homage to release." },
        { id: 9, pali: "Imaṁ so parittaṁ katvā", en: "Having made this protection," },
        { id: 10, pali: "Moro carati esanā'ti", en: "the peacock goes about in search of food." },
      ],
    },
    {
      lines: [
        { id: 11, cue: "p.m." },
        { id: 12, pali: "Apet'ayañ-cakkhumā eka-rājā", en: "There sets the one with vision, the sole king," },
        { id: 13, pali: "Harissa-vaṇṇo paṭhavippabhāso", en: "golden, shining on the earth." },
        { id: 14, pali: "Taṁ taṁ namassāmi harissa-vaṇṇaṁ paṭhavippabhāsaṁ", en: "I pay homage to you, golden, shining on the earth;" },
        { id: 15, pali: "Tay'ajja guttā viharemu rattiṁ", en: "guarded by you today, may we pass the night." },
      ],
    },
    {
      lines: [
        { id: 16, pali: "Ye brāhmaṇā vedagu sabba-dhamme", en: "Those brahmins who have mastered all things:" },
        { id: 17, pali: "Te me namo te ca maṁ pālayantu", en: "to them my homage; may they protect me." },
        { id: 18, pali: "Nam'atthu Buddhānaṁ nam'atthu bodhiyā", en: "Homage to the Buddhas, homage to awakening;" },
        { id: 19, pali: "Namo vimuttānaṁ namo vimuttiyā", en: "homage to the released, homage to release." },
        { id: 20, pali: "Imaṁ so parittaṁ katvā", en: "Having made this protection," },
        { id: 21, pali: "Moro vāsam-akappayī'ti", en: "the peacock settled down to rest." },
      ],
      refs: [{ label: "Ja 159", uid: "ja159" }],
    },
  ],
} satisfies Chant;

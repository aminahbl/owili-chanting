import type { ChantSet } from '../types.ts';

export const set = {
  id: "0127",
  slug: "amaravati-twelve-parittas",
  title: "Twelve Parittas",
  place: "amaravati",
  order: 30,
  chants: [
    "0001", // pubba-bhaga-nama-kara-patha
    "0002", // sarana-gamana-patha
    "0017", // nama-kara-siddhi-gatha
    "0018", // namo-kara-atthaka
    "0051", // mangala-sutta
    "0052", // ratana-sutta
    "0053", // karaniya-metta-sutta
    "0054", // khandha-paritta
    "0019", // buddha-dhamma-sangha-guna
    "0020", // atanatiya-paritta-short
    "0064", // abhaya-paritta
    "0065", // devata-uyyojana-gatha
    "0066", // jaya-mangala-attha-gatha
    "0067", // jaya-paritta
  ],
  anchorRecording: { label: "Amaravati recording, Twelve Parittas", url: "https://amaravati.org/audio/twelve-parittas/" },
} satisfies ChantSet;

import type { ChantSet } from '../types.ts';

export const set = {
  id: "0125",
  slug: "amaravati-evening-chanting",
  title: "Evening chanting",
  chanter: "amaravati",
  chants: [
    "0003", // dedication-of-offerings
    "0004", // preliminary-homage
    "0010", // recollection-of-the-buddha
    "0011", // supreme-praise-of-the-buddha
    "0012", // recollection-of-the-dhamma
    "0013", // supreme-praise-of-the-dhamma
    "0014", // recollection-of-the-sangha
    "0015", // supreme-praise-of-the-sangha
    "0009", // closing-homage
  ],
  anchorRecording: { label: "Amaravati evening chanting", url: "https://amaravati.org/audio/evening-chanting-pali-page-20-26/", date: "2014-10-11" },
} satisfies ChantSet;

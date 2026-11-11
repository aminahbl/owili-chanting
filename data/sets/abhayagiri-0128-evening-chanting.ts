import type { ChantSet } from '../types.ts';

export const set = {
  id: "0128",
  slug: "abhayagiri-evening-chanting",
  title: "Evening chanting",
  place: "abhayagiri",
  order: 20,
  chants: [
    "0003", // dedication-of-offerings
    "0004", // preliminary-homage
    "0010", // recollection-of-the-buddha
    "0011", // supreme-praise-of-the-buddha
    "0012", // recollection-of-the-dhamma
    "0013", // supreme-praise-of-the-dhamma
    "0014", // recollection-of-the-sangha
    "0015", // supreme-praise-of-the-sangha
  ],
  anchorRecording: { label: "Abhayagiri evening chanting", url: "https://www.abhayagiri.org/talks/5330-evening-chanting-pali", date: "2009-09-02" },
} satisfies ChantSet;

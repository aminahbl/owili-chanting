import type { ChantSet } from '../types.ts';

export const set = {
  id: "0151",
  slug: "karuna-morning-chanting",
  title: "Morning chanting",
  chanter: "karuna",
  chants: [
    "0003", // dedication-of-offerings
    "0164", // prelude-preliminary-homage
    "0004", // preliminary-homage
    "0165", // prelude-homage-to-the-buddha
    "0005", // homage-to-the-buddha
    "0166", // prelude-homage-to-the-dhamma
    "0006", // homage-to-the-dhamma
    "0167", // prelude-homage-to-the-sangha
    "0007", // homage-to-the-sangha
  ],
  anchorRecording: {
    label: "Morning Chanting in Pali (Chant Along)",
    url: "https://dharmaseed.org/talks/67114/",
    performers: "Ayya Santussika and Ayya Cittananda",
    date: "2021-06-06",
  },
} satisfies ChantSet;

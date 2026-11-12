import type { ChantSet } from '../types.ts';

export const set = {
  id: "0147",
  slug: "wat-marp-jan-morning-chanting",
  title: "Morning chanting",
  chanter: "wat-marp-jan",
  chants: [
    "0003", // dedication-of-offerings
    "0004", // preliminary-homage
    "0005", // homage-to-the-buddha
    "0006", // homage-to-the-dhamma
    "0007", // homage-to-the-sangha
    "0008", // salutation-to-the-triple-gem
    "0009", // closing-homage
  ],
  anchorRecording: {
    label: "Buddhist Chanting – Morning & Evening Puja: 1554-Morning-Chanting-in-Pāli-1",
    url: "https://watmarpjan.org/en/teachings/dhamma-cds/",
    performers: "Ajahn Anan Akincaño and the Wat Marp Jan sangha",
  },
} satisfies ChantSet;

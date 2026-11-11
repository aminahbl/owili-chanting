import type { ChantSet } from '../types.ts';

export const set = {
  id: "0125",
  slug: "amaravati-morning-chanting",
  title: "Morning chanting",
  place: "amaravati",
  order: 10,
  chants: [
    "0003", // dedication-of-offerings
    "0004", // preliminary-homage
    "0005", // homage-to-the-buddha
    "0006", // homage-to-the-dhamma
    "0007", // homage-to-the-sangha
    "0008", // salutation-to-the-triple-gem
    "0009", // closing-homage
  ],
  anchorRecording: { label: "To be confirmed" },
} satisfies ChantSet;

import type { ChantSet } from '../types.ts';

export const set = {
  id: "0128",
  slug: "amaravati-funeral-chanting",
  title: "Funeral chanting",
  place: "amaravati",
  order: 40,
  chants: [
    "0115", // dhamma-sangani-matika
    "0122", // patthana-matika-patha
    "0123", // vipassana-bhumi-patha
    "0124", // pamsukula
  ],
  anchorRecording: { label: "To be confirmed" },
} satisfies ChantSet;

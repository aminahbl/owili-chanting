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
  source: { label: "Amaravati Chanting Book Volume Two", url: "https://amaravati.org/dhamma-books/chanting-book-volume-two/" },
} satisfies ChantSet;

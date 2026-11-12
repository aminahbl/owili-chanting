import type { ChantSet } from '../types.ts';

export const set = {
  id: "0130",
  slug: "lbv-evening-puja",
  title: "Daily Evening Puja",
  chanter: "lbv",
  chants: [
    "0001", // vandana
    "0132", // buddha-guna-vandana
    "0133", // dhamma-guna-vandana
    "0134", // sangha-guna-vandana
    "0138", // offering-of-flowers-to-the-triple-gem
    "0023", // offering-of-lights
    "0024", // offering-of-incense
    "0135", // offering-of-water
    "0136", // offering-of-medicine
    "0021", // salutation-to-the-three-main-objects-of-venerations
    "0137", // vajja-pakasana
  ],
  anchorRecording: { label: "LBV daily evening puja", url: "https://www.youtube.com/watch?v=6nSH13s1o40", date: "2026-07-19" },
} satisfies ChantSet;

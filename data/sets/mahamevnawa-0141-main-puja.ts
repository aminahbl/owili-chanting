import type { ChantSet } from '../types.ts';

export const set = {
  id: "0141",
  slug: "mahamevnawa-main-puja",
  title: "Main Puja",
  chanter: "mahamevnawa",
  chants: [
    "0001", // vandana
    "0002", // sarana-gamana-patha
    "0019", // buddha-dhamma-sangha-guna
    "0020", // atanatiya-paritta-short
  ],
  anchorRecording: { label: "Mahamevnawa Puja in Pali", url: "https://soundcloud.com/mahamevnawalk/01-puja-in-pali" },
  links: [{ text: "Main Puja text on the Mahamevnawa website", href: "https://mahamevnawa.org/portfolio-items/main-puja/" }],
} satisfies ChantSet;

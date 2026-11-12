import type { ChantSet } from '../types.ts';

export const set = {
  id: "0160",
  slug: "u-pannanda-paritta-preliminaries",
  title: "Paritta preliminaries",
  chanter: "u-pannanda",
  chants: [
    "0158", // vandana-short
    "0155", // invitation-to-the-devas-longer-parittas
    "0156", // invitation-to-the-devas-closing
    "0001", // vandana
    "0159", // paritta-parikamma
  ],
  anchorRecording: {
    label: "Paritta Chanting",
    url: "https://mega.nz/file/LbxmmTSb#GYqbA2p7DTKVwrkhenH9Lq3xanbkwYA1Z5C7cC5KHH4",
    performers: "Sayadaw U Pannanda",
  },
  links: [{ text: "Pali chantings on the Malaysian Buddhist Meditation Centre website", href: "https://www.mbmcmalaysia.org/p/pali-chantings.html" }],
} satisfies ChantSet;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0070",
  slug: "te-attha-laddha-sukhita",
  title: "Blessing for a Group",
  paliTitle: "Te attha-laddhā sukhitā",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#te-attha-laddha", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 29 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [4], note: "AN 3.155 has *ñātibhī* where the manual has *ñātibhi*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Te attha-laddhā sukhitā", en: "Having gained the good, happy," },
        { id: 2, pali: "viruḷhā buddha-sāsane", en: "flourishing in the Buddha's teaching," },
        { id: 3, pali: "Arogā sukhitā hotha", en: "may you be healthy and happy" },
        { id: 4, pali: "saha sabbehi ñātibhi", en: "together with all your relatives.", repeat: 3 },
      ],
      refs: [{ label: "AN 3.155", uid: "an3.155" }],
    },
  ],
} satisfies Chant;

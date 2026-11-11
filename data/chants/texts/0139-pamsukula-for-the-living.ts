import type { Chant } from '../../types.ts';

export const chant = {
  id: "0139",
  slug: "pamsukula-for-the-living",
  title: "Verses for the rag-robe Offering (for the living)",
  paliTitle: "Paṁsukūla (for the living)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#pamsukula", categories: [{ category: "Funeral Chants", order: 10 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [2], note: "Dhp 41 has *Pathaviṁ* where the manual has *Paṭhaviṁ*. Kept as the manual prints it." },
    { status: "kept", lines: [3], note: "Dhp 41 has *Chuddho* where the manual has *Chuḍḍho*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Aciraṁ vat'ayaṁ kāyo", en: "Before long, alas, this body" },
        { id: 2, pali: "Paṭhaviṁ adhisessati", en: "will lie on the earth," },
        { id: 3, pali: "Chuḍḍho apeta-viññāṇo", en: "cast aside, without consciousness," },
        { id: 4, pali: "Niratthaṁ va kaliṅgaraṁ.", en: "useless, like a log." },
      ],
      refs: [{ label: "Dhp 41", uid: "dhp33-43" }],
    },
  ],
} satisfies Chant;

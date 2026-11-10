import type { Chant } from '../../types.ts';

export const chant = {
  id: "chaddanta-paritta",
  title: "The Great Elephant Protection",
  paliTitle: "Chaddanta-paritta",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 12 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#vadhissamenanti", categories: [{ category: "Parittas", subcategory: "Core Sequence", order: 12 }] },
  translation: "draft",
  editorial: [
    { status: "open", note: "English to review: the verses tell the story of the elephant Chaddanta, who spared the hunter because he wore the ochre robe. A short note on the story would help users follow lines 1 to 6." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Vadhissamenanti parāmasanto", en: "Seizing him, thinking, 'I will kill him'," },
        { id: 2, pali: "Kāsāvamaddakkhi dhajaṁ isīnaṁ", en: "he saw the ochre robe, the banner of the sages." },
        { id: 3, pali: "Dukkhena phuṭṭhassudapādi saññā", en: "Though struck by pain, the thought arose in him:" },
        { id: 4, pali: "Arahaddhajo sabbhi avajjharūpo", en: "'The banner of the worthy ones must not be harmed by the good.'" },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Sallena viddho byathitopi santo", en: "Pierced by the arrow, though in agony," },
        { id: 6, pali: "Kāsāvavatthamhi manaṁ na dussayi", en: "he did not let his mind turn against the ochre robe." },
        { id: 7, pali: "Sace imaṁ nāgavarena saccaṁ", en: "If this is the truth of the noblest of elephants," },
        { id: 8, pali: "Mā maṁ vane bālamigā agañchunti", en: "may the foolish beasts of the forest not come upon me." },
      ],
    },
  ],
} satisfies Chant;

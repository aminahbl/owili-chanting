import type { Chant } from '../types.ts';

export const chant = {
  id: "pasanna-hontu-sabbe-pi",
  title: "May All Beings Have Faith",
  paliTitle: "Pasannā hontu sabbe pi",
  groups: [{ group: "reflections", order: 16 }],
  paliSource: { label: "Bhikkhu Manual, Reflections", url: "https://bhikkhu-manual.github.io/chants/reflections.html#pasanna-hontu" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Pasannā hontu sabbe pi", en: "May all beings have faith" },
        { id: 2, pali: "Pāṇino Buddha-sāsane.", en: "in the Buddha's teaching." },
        { id: 3, pali: "Sammā-dhāraṁ pavecchanto", en: "Pouring down in good measure," },
        { id: 4, pali: "Kāle devo pavassatu.", en: "may the rain fall in its season." },
        { id: 5, pali: "Vuḍḍhi-bhāvāya sattānaṁ", en: "For the growth of beings," },
        { id: 6, pali: "Samiddhaṁ netu medaniṁ.", en: "may it bring the earth to plenty." },
        { id: 7, pali: "Mātā-pitā ca atra-jaṁ", en: "As mother and father" },
        { id: 8, pali: "Niccaṁ rakkhanti puttakaṁ.", en: "always protect their own child," },
        { id: 9, pali: "Evaṁ dhammena rājāno", en: "so may rulers, by the Dhamma," },
        { id: 10, pali: "Pajaṁ rakkhantu sabbadā.", en: "always protect their people." },
      ],
    },
  ],
} satisfies Chant;

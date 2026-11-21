import type { Chant } from '../../types.ts';

export const chant = {
  id: "0081",
  slug: "pacchima-ovada-gatha",
  title: "Verses on the Last Instructions",
  paliTitle: "Pacchima-ovāda-gāthā",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/reflections-and-recollections-p2.tex#L850", categories: [{ category: "Reflections & Recollections", order: 23 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa dāni bhikkhave āmantayāmi vo", en: "Now, bhikkhus, I address you:" },
        { id: 2, pali: "Vaya-dhammā saṅkhārā", en: "all conditioned things are of the nature to pass away;" },
        { id: 3, pali: "Appamādena sampādethā'ti", en: "strive on with heedfulness." },
        { id: 4, pali: "Ayaṁ tathāgatassa pacchimā vācā", en: "These were the Tathāgata's last words." },
      ],
      refs: [{ label: "DN 16", uid: "dn16" }],
    },
  ],
} satisfies Chant;

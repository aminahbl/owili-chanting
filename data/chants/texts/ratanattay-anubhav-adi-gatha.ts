import type { Chant } from '../../types.ts';

export const chant = {
  id: "ratanattay-anubhav-adi-gatha",
  title: "By the Power of the Triple Gem",
  paliTitle: "Ratanattay'ānubhāv'ādi-gāthā",
  groups: [{ group: "anumodana", order: 7 }],
  paliSource: { label: "Bhikkhu Manual, Anumodanā", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#ratanattaya" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Ratanattay'ānubhāvena", en: "By the power of the Triple Gem," },
        { id: 2, pali: "ratanattaya-tejasā", en: "by the might of the Triple Gem," },
        { id: 3, pali: "Dukkha-roga-bhayā verā", en: "suffering, illness, fear, enmity," },
        { id: 4, pali: "sokā sattu c'upaddavā", en: "sorrow, enemies and misfortunes," },
        { id: 5, pali: "Anekā antarāyā pi", en: "and the many obstacles too:" },
        { id: 6, pali: "vinassantu asesato", en: "may they be destroyed without remainder." },
        { id: 7, pali: "Jaya-siddhi dhanaṁ lābhaṁ", en: "Victory, success, wealth, gain," },
        { id: 8, pali: "sotthi bhāgyaṁ sukhaṁ balaṁ", en: "safety, good fortune, happiness, strength," },
        { id: 9, pali: "Siri āyu ca vaṇṇo ca", en: "glory, long life and beauty," },
        { id: 10, pali: "bhogaṁ vuḍḍhī ca yasavā", en: "riches, growth and renown," },
        { id: 11, pali: "Sata-vassā ca āyu ca", en: "a life of a hundred years" },
        { id: 12, pali: "jīva-siddhī bhavantu te", en: "and success in life: may these be yours." },
      ],
    },
  ],
} satisfies Chant;

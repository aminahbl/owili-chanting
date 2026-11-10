import type { Chant } from '../../types.ts';

export const chant = {
  id: "reflection-on-impermanence",
  title: "Reflection on Impermanence",
  groups: [{ group: "reflections", order: 180 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#impermanence", categories: [{ category: "Reflections", order: 18 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ aniccānussati-pāṭhaṁ bhaṇāmase", en: "Now let us chant the passage for recollecting impermanence.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Sabbe saṅkhārā aniccā", en: "All conditioned things are impermanent.", leader: true },
        { id: 3, pali: "Sabbe saṅkhārā dukkhā", en: "All conditioned things are suffering." },
        { id: 4, pali: "Sabbe dhammā anattā", en: "All things are not-self." },
        { id: 5, pali: "Addhuvaṁ jīvitaṁ", en: "Life is uncertain." },
        { id: 6, pali: "Dhuvaṁ maraṇaṁ", en: "Death is certain." },
        { id: 7, pali: "Avassaṁ mayā maritabbaṁ", en: "I will surely die." },
        { id: 8, pali: "Maraṇa-pariyosānaṁ me jīvitaṁ", en: "My life ends in death." },
        { id: 9, pali: "Jīvitaṁ me aniyataṁ", en: "My life is uncertain." },
        { id: 10, pali: "Maraṇaṁ me niyataṁ", en: "My death is certain." },
        { id: 11, pali: "Vata", en: "Alas," },
        { id: 12, pali: "Ayaṁ kāyo", en: "this body," },
        { id: 13, pali: "Aciraṁ", en: "before long," },
        { id: 14, pali: "Apeta-viññāṇo", en: "without consciousness," },
        { id: 15, pali: "Chuddho", en: "cast aside," },
        { id: 16, pali: "Adhisessati", en: "will lie" },
        { id: 17, pali: "Paṭhaviṁ", en: "on the earth," },
        { id: 18, pali: "Kaliṅgaraṁ iva", en: "like a log," },
        { id: 19, pali: "Niratthaṁ", en: "useless." },
        { id: 20, pali: "Aniccā vata saṅkhārā", en: "Impermanent indeed are conditioned things," },
        { id: 21, pali: "Uppāda-vaya-dhammino", en: "their nature is to arise and pass away." },
        { id: 22, pali: "Uppajjitvā nirujjhanti", en: "Having arisen, they cease." },
        { id: 23, pali: "Tesaṁ vūpasamo sukho", en: "Their stilling is happiness." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../types.ts';

export const chant = {
  id: "patthana-matika-patha",
  title: "The Matrix of the Paṭṭhāna",
  paliTitle: "Paṭṭhāna-mātikā-pāṭha",
  groups: [{ group: "funeral", order: 8 }],
  paliSource: { label: "Bhikkhu Manual, Funeral Chants", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#patthana" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Hetu-paccayo, ārammaṇa-paccayo,", en: "Root condition, object condition," },
        { id: 2, pali: "adhipati-paccayo, anantara-paccayo,", en: "predominance condition, proximity condition," },
        { id: 3, pali: "samanantara-paccayo, saha-jāta-paccayo,", en: "contiguity condition, co-nascence condition," },
        { id: 4, pali: "aññam-añña-paccayo, nissaya-paccayo,", en: "mutuality condition, support condition," },
        { id: 5, pali: "upanissaya-paccayo, pure-jāta-paccayo,", en: "decisive support condition, pre-nascence condition," },
        { id: 6, pali: "pacchā-jāta-paccayo, āsevana-paccayo,", en: "post-nascence condition, repetition condition," },
        { id: 7, pali: "kamma-paccayo, vipāka-paccayo,", en: "action condition, result condition," },
        { id: 8, pali: "āhāra-paccayo, indriya-paccayo,", en: "nutriment condition, faculty condition," },
        { id: 9, pali: "jhāna-paccayo, magga-paccayo,", en: "jhana condition, path condition," },
        { id: 10, pali: "sampayutta-paccayo, vippayutta-paccayo,", en: "association condition, dissociation condition," },
        { id: 11, pali: "atthi-paccayo, n'atthi-paccayo,", en: "presence condition, absence condition," },
        { id: 12, pali: "vigata-paccayo, avigata-paccayo.", en: "disappearance condition, non-disappearance condition." },
      ],
      refs: [{ label: "Paṭṭh 1.1", uid: "patthana1.1" }],
    },
  ],
} satisfies Chant;

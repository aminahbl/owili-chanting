import type { Chant } from '../../types.ts';

export const chant = {
  id: "0124",
  slug: "pamsukula-for-the-dead",
  title: "Verses for the rag-robe Offering (for the dead)",
  paliTitle: "Paṁsukūla (for the dead)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#pamsukula", categories: [{ category: "Funeral Chants", order: 10 }] },
  translation: "draft",
  notes: [
    "The verses are often repeated three times.",
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Aniccā vata saṅkhārā", en: "Impermanent indeed are conditioned things," },
        { id: 2, pali: "Uppāda-vaya-dhammino", en: "their nature is to arise and pass away." },
        { id: 3, pali: "Uppajjitvā nirujjhanti", en: "Having arisen, they cease." },
        { id: 4, pali: "Tesaṁ vūpasamo sukho.", en: "Their stilling is happiness." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Sabbe sattā maranti ca", en: "All beings die," },
        { id: 6, pali: "Mariṁsu ca marissare", en: "have died and will die." },
        { id: 7, pali: "Tath'evāhaṁ marissāmi", en: "In the same way I will die;" },
        { id: 8, pali: "N'atthi me ettha saṁsayo.", en: "of this I have no doubt." },
      ],
      refs: [{ label: "DN 16", uid: "dn16" }, { label: "SN 1.11", uid: "sn1.11" }],
    },
    {
      lines: [
        { id: 9, pali: "Addhuvaṁ jīvitaṁ", en: "Life is uncertain." },
        { id: 10, pali: "Dhuvaṁ maraṇaṁ", en: "Death is certain." },
        { id: 11, pali: "Avassaṁ mayā maritabbaṁ", en: "I will surely die." },
        { id: 12, pali: "Maraṇapariyosānaṁ me jīvitaṁ", en: "My life ends in death." },
        { id: 13, pali: "Jīvitaṁ me aniyataṁ", en: "My life is uncertain." },
        { id: 14, pali: "Maraṇaṁ me niyataṁ.", en: "My death is certain." },
      ],
      refs: [{ label: "Dhp-a III 170" }],
    },
  ],
} satisfies Chant;

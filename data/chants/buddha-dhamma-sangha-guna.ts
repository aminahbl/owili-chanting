import type { Chant } from '../types.ts';

export const chant = {
  id: "buddha-dhamma-sangha-guna",
  title: "The Qualities of the Buddha, the Dhamma and the Saṅgha",
  paliTitle: "Buddha-dhamma-saṅgha-guṇā",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 15 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#iti-pi-so" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Iti pi so bhagavā arahaṁ sammā-sambuddho", en: "Such indeed is the Gracious One: worthy, perfectly self-awakened," },
        { id: 2, pali: "Vijjā-caraṇa-sampanno sugato loka-vidū", en: "accomplished in knowledge and conduct, well-gone, knower of the worlds," },
        { id: 3, pali: "Anuttaro purisa-damma-sārathi", en: "unsurpassed guide of those ready to be trained," },
        { id: 4, pali: "Satthā devamanussānaṁ buddho bhagavā'ti", en: "teacher of devas and humans, awakened, the Gracious One." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Svākkhāto bhagavatā dhammo sandiṭṭhiko", en: "The Dhamma is well taught by the Gracious One, visible here and now," },
        { id: 6, pali: "akāliko ehi-passiko opanayiko", en: "timeless, inviting all to come and see, leading onward," },
        { id: 7, pali: "paccattaṁ veditabbo viññūhī'ti", en: "to be known by the wise for themselves." },
      ],
    },
    {
      lines: [
        { id: 8, pali: "Supaṭipanno bhagavato sāvaka-saṅgho", en: "The Gracious One's Saṅgha of disciples is practising well," },
        { id: 9, pali: "Uju-paṭipanno bhagavato sāvaka-saṅgho", en: "the Gracious One's Saṅgha of disciples is practising straightforwardly," },
        { id: 10, pali: "Ñāya-paṭipanno bhagavato sāvaka-saṅgho", en: "the Gracious One's Saṅgha of disciples is practising the true way," },
        { id: 11, pali: "Sāmīci-paṭipanno bhagavato sāvaka-saṅgho", en: "the Gracious One's Saṅgha of disciples is practising properly," },
        { id: 12, pali: "Yad-idaṁ cattāri purisa-yugāni aṭṭha purisa-puggalā", en: "that is, the four pairs of persons, the eight kinds of individuals:" },
        { id: 13, pali: "Esa bhagavato sāvaka-saṅgho", en: "this is the Gracious One's Saṅgha of disciples," },
        { id: 14, pali: "Āhuneyyo pāhuneyyo dakkhiṇeyyo añjali-karaṇīyo", en: "worthy of gifts, of hospitality, of offerings, of reverence with joined palms," },
        { id: 15, pali: "Anuttaraṁ puññakkhettaṁ lokassā'ti", en: "the unsurpassed field of goodness for the world." },
      ],
    },
  ],
} satisfies Chant;

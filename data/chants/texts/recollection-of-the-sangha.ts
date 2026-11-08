import type { Chant } from '../../types.ts';

export const chant = {
  id: "recollection-of-the-sangha",
  title: "Recollection of the Saṅgha",
  groups: [{ group: "evening", order: 5 }],
  paliSource: { label: "Bhikkhu Manual, Evening Chanting", url: "https://bhikkhu-manual.github.io/chants/evening-chanting.html#s-sati-pli" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ saṅghānussatinayaṁ karomase", en: "Now let us chant the recollection of the Saṅgha.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Supaṭipanno bhagavato sāvakasaṅgho", en: "The Gracious One's Saṅgha of disciples is practising well," },
        { id: 3, pali: "Ujupaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples is practising straightforwardly," },
        { id: 4, pali: "Ñāyapaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples is practising the true way," },
        { id: 5, pali: "Sāmīcipaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples is practising properly," },
        { id: 6, pali: "Yadidaṁ cattāri purisayugāni aṭṭha purisapuggalā", en: "that is, the four pairs of persons, the eight kinds of individuals:" },
        { id: 7, pali: "Esa bhagavato sāvakasaṅgho", en: "this is the Gracious One's Saṅgha of disciples," },
        { id: 8, pali: "Āhuneyyo pāhuneyyo dakkhiṇeyyo añjali-karaṇīyo", en: "worthy of gifts, of hospitality, of offerings, of reverence with joined palms," },
        { id: 9, pali: "Anuttaraṁ puññakkhettaṁ lokassā'ti", en: "the unsurpassed field of goodness for the world." },
      ],
    },
  ],
} satisfies Chant;

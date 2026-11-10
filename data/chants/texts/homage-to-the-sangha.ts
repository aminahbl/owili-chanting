import type { Chant } from '../../types.ts';

export const chant = {
  id: "homage-to-the-sangha",
  title: "Homage to the Saṅgha",
  groups: [{ group: "reverence", order: 70 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#sangha-pali", categories: [{ category: "Morning Chanting", order: 5 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ saṅghābhitthutiṁ karomase", en: "Now let us chant in praise of the Saṅgha.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Yo so supaṭipanno bhagavato sāvakasaṅgho", en: "The Gracious One's Saṅgha of disciples, practising well," },
        { id: 3, pali: "Ujupaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples, practising straightforwardly," },
        { id: 4, pali: "Ñāyapaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples, practising the true way," },
        { id: 5, pali: "Sāmīcipaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples, practising properly," },
        { id: 6, pali: "Yadidaṁ cattāri purisayugāni aṭṭha purisapuggalā", en: "that is, the four pairs of persons, the eight kinds of individuals:" },
        { id: 7, pali: "Esa bhagavato sāvakasaṅgho", en: "this is the Gracious One's Saṅgha of disciples," },
        { id: 8, pali: "Āhuneyyo, pāhuneyyo, dakkhiṇeyyo, añjali-karaṇīyo", en: "worthy of gifts, of hospitality, of offerings, of reverence with joined palms," },
        { id: 9, pali: "Anuttaraṁ puññakkhettaṁ lokassa", en: "the unsurpassed field of goodness for the world:" },
        { id: 10, pali: "Tam-ahaṁ saṅghaṁ abhipūjayāmi tam-ahaṁ saṅghaṁ sirasā namāmi", en: "I honour the Saṅgha, I bow my head to the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

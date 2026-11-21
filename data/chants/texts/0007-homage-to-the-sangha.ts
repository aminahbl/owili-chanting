import type { Chant } from '../../types.ts';

export const chant = {
  id: "0007",
  slug: "homage-to-the-sangha",
  title: "Homage to the Saṅgha",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/morning-chanting.tex#L266", categories: [{ category: "Morning Chanting", order: 5 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Yo so supaṭipanno bhagavato sāvakasaṅgho", en: "The Gracious One's Saṅgha of disciples, practising well," },
        { id: 2, pali: "Ujupaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples, practising straightforwardly," },
        { id: 3, pali: "Ñāyapaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples, practising the true way," },
        { id: 4, pali: "Sāmīcipaṭipanno bhagavato sāvakasaṅgho", en: "the Gracious One's Saṅgha of disciples, practising properly," },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Yadidaṁ cattāri purisayugāni aṭṭha purisapuggalā", en: "that is, the four pairs of persons, the eight kinds of individuals:" },
        { id: 6, pali: "Esa bhagavato sāvakasaṅgho", en: "this is the Gracious One's Saṅgha of disciples," },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Āhuneyyo,", en: "worthy of gifts," },
        { id: 8, pali: "Pāhuneyyo,", en: "worthy of hospitality," },
        { id: 9, pali: "Dakkhiṇeyyo,", en: "worthy of offerings," },
        { id: 10, pali: "Añjali-karaṇīyo", en: "worthy of reverence with joined palms," },
      ],
    },
    {
      lines: [
        { id: 11, pali: "Anuttaraṁ puññakkhettaṁ lokassa", en: "the unsurpassed field of goodness for the world:" },
        { id: 12, pali: "Tam-ahaṁ saṅghaṁ abhipūjayāmi tam-ahaṁ saṅghaṁ sirasā namāmi", en: "I honour the Saṅgha, I bow my head to the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0015",
  slug: "supreme-praise-of-the-sangha",
  title: "Supreme Praise of the Saṅgha",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/evening-chanting.tex#L275", categories: [{ category: "Evening Chanting", order: 8 }] },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [7, 10, 13], note: "The chanting book prints the men's and women's forms inline (*dāso/dāsī*, *Vandanto/Vandantī*, *vandamānena/vandamānāya*); here they are split into the two forms." },
    { status: "open", lines: [18], note: "English to review: *paṭiggaṇhātu accayaṁ* is literally \"accept the transgression\". The idiom means to accept a confession, so the draft has \"pardon this fault\"." },
    { status: "open", lines: [7], note: "English to review: *dāsa* is a servant or slave. \"Servant\" keeps the devotion without the harshness." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Saddhammajo supaṭipatti-guṇādiyutto", en: "Born of the true Dhamma, endowed with the qualities of good practice," },
        { id: 2, pali: "Yo'ṭṭhabbidho ariyapuggala-saṅgha-seṭṭho", en: "the supreme Saṅgha of the eight kinds of noble individuals," },
        { id: 3, pali: "Sīlādidhamma-pavarāsaya-kāya-citto", en: "whose body and mind rest on virtue and other excellent qualities:" },
        { id: 4, pali: "Vandām'ahaṁ tam-ariyāna-gaṇaṁ susuddhaṁ", en: "I revere that community of noble ones, wholly pure." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Saṅgho yo sabba-pāṇīnaṁ saraṇaṁ khemam-uttamaṁ", en: "The Saṅgha, the safe and supreme refuge of all beings," },
        { id: 6, pali: "Tatiyānussatiṭṭhānaṁ vandāmi taṁ siren'ahaṁ", en: "the third object of recollection, I revere with bowed head." },
      ],
    },
    {
      lines: [
        { id: 7, pali: { men: "Saṅghass'āhasmi dāso va saṅgho me sāmi-kissaro", women: "Saṅghass'āhasmi dāsī va saṅgho me sāmi-kissaro" }, en: "I am the Saṅgha's servant; the Saṅgha is my lord and master." },
        { id: 8, pali: "Saṅgho dukkhassa ghātā ca vidhātā ca hitassa me", en: "The Saṅgha removes my suffering and provides for my welfare." },
        { id: 9, pali: "Saṅghass'āhaṁ niyyādemi sarīrañ-jīvitañ-cidaṁ", en: "To the Saṅgha I dedicate this body and this life." },
        { id: 10, pali: { men: "Vandanto'haṁ carissāmi saṅghassopaṭipannataṁ", women: "Vandantī'haṁ carissāmi saṅghassopaṭipannataṁ" }, en: "In reverence I will follow the Saṅgha's good practice." },
      ],
    },
    {
      lines: [
        { id: 11, pali: "Natthi me saraṇaṁ aññaṁ saṅgho me saraṇaṁ varaṁ", en: "I have no other refuge; the Saṅgha is my excellent refuge." },
        { id: 12, pali: "Etena sacca-vajjena vaḍḍheyyaṁ satthu-sāsane", en: "By the speaking of this truth, may I grow in the Teacher's way." },
        { id: 13, pali: { men: "Saṅghaṁ me vandamānena yaṁ puññaṁ pasutaṁ idha", women: "Saṅghaṁ me vandamānāya yaṁ puññaṁ pasutaṁ idha" }, en: "By the goodness I have made here in revering the Saṅgha," },
        { id: 14, pali: "Sabbepi antarāyā me māhesuṁ tassa tejasā", en: "by its power, may no obstacles come to me." },
      ],
    },
    {
      lines: [
        { id: 15, cue: "Bowing" },
        { id: 16, pali: "Kāyena vācāya va cetasā vā", en: "By body, by speech, or by mind," },
        { id: 17, pali: "Saṅghe kukammaṁ pakataṁ mayā yaṁ", en: "whatever wrong I have done towards the Saṅgha," },
        { id: 18, pali: "Saṅgho paṭiggaṇhātu accayantaṁ", en: "may the Saṅgha pardon this fault," },
        { id: 19, pali: "Kālantare saṁvarituṁ va saṅghe", en: "so that in future I may restrain myself towards the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

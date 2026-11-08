import type { Chant } from '../../types.ts';

export const chant = {
  id: "supreme-praise-of-the-sangha",
  title: "Supreme Praise of the Saṅgha",
  groups: [{ group: "evening", order: 6 }],
  paliSource: { label: "Bhikkhu Manual, Evening Chanting", url: "https://bhikkhu-manual.github.io/chants/evening-chanting.html#s-bhi-pli" },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [8, 11, 14], note: "The manual prints the men's and women's forms inline (*dāso/dāsī*, *Vandanto/Vandantī*, *vandamānena/vandamānāya*); here they are split into the two forms." },
    { status: "open", lines: [19], note: "English to review: *paṭiggaṇhātu accayaṁ* is literally \"accept the transgression\". The idiom means to accept a confession, so the draft has \"pardon this fault\"." },
    { status: "open", lines: [8], note: "English to review: *dāsa* is a servant or slave. \"Servant\" keeps the devotion without the harshness." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ saṅghābhigītiṁ karomase", en: "Now let us chant the supreme praise of the Saṅgha.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Saddhammajo supaṭipatti-guṇādiyutto", en: "Born of the true Dhamma, endowed with the qualities of good practice," },
        { id: 3, pali: "Yo'ṭṭhabbidho ariyapuggala-saṅgha-seṭṭho", en: "the supreme Saṅgha of the eight kinds of noble individuals," },
        { id: 4, pali: "Sīlādidhamma-pavarāsaya-kāya-citto", en: "whose body and mind rest on virtue and other excellent qualities:" },
        { id: 5, pali: "Vandām'ahaṁ tam-ariyāna-gaṇaṁ susuddhaṁ", en: "I revere that community of noble ones, wholly pure." },
        { id: 6, pali: "Saṅgho yo sabba-pāṇīnaṁ saraṇaṁ khemam-uttamaṁ", en: "The Saṅgha, the safe and supreme refuge of all beings," },
        { id: 7, pali: "Tatiyānussatiṭṭhānaṁ vandāmi taṁ siren'ahaṁ", en: "the third object of recollection, I revere with bowed head." },
        { id: 8, pali: { men: "Saṅghass'āhasmi dāso va saṅgho me sāmi-kissaro", women: "Saṅghass'āhasmi dāsī va saṅgho me sāmi-kissaro" }, en: "I am the Saṅgha's servant; the Saṅgha is my lord and master." },
        { id: 9, pali: "Saṅgho dukkhassa ghātā ca vidhātā ca hitassa me", en: "The Saṅgha removes my suffering and provides for my welfare." },
        { id: 10, pali: "Saṅghass'āhaṁ niyyādemi sarīrañ-jīvitañ-cidaṁ", en: "To the Saṅgha I dedicate this body and this life." },
        { id: 11, pali: { men: "Vandanto'haṁ carissāmi saṅghassopaṭipannataṁ", women: "Vandantī'haṁ carissāmi saṅghassopaṭipannataṁ" }, en: "In reverence I will follow the Saṅgha's good practice." },
        { id: 12, pali: "Natthi me saraṇaṁ aññaṁ saṅgho me saraṇaṁ varaṁ", en: "I have no other refuge; the Saṅgha is my excellent refuge." },
        { id: 13, pali: "Etena sacca-vajjena vaḍḍheyyaṁ satthu-sāsane", en: "By the speaking of this truth, may I grow in the Teacher's way." },
        { id: 14, pali: { men: "Saṅghaṁ me vandamānena yaṁ puññaṁ pasutaṁ idha", women: "Saṅghaṁ me vandamānāya yaṁ puññaṁ pasutaṁ idha" }, en: "By the goodness I have made here in revering the Saṅgha," },
        { id: 15, pali: "Sabbepi antarāyā me māhesuṁ tassa tejasā", en: "by its power, may no obstacles come to me." },
      ],
    },
    {
      lines: [
        { id: 16, cue: "Bowing" },
        { id: 17, pali: "Kāyena vācāya va cetasā vā", en: "By body, by speech, or by mind," },
        { id: 18, pali: "Saṅghe kukammaṁ pakataṁ mayā yaṁ", en: "whatever wrong I have done towards the Saṅgha," },
        { id: 19, pali: "Saṅgho paṭiggaṇhātu accayantaṁ", en: "may the Saṅgha pardon this fault," },
        { id: 20, pali: "Kālantare saṁvarituṁ va saṅghe", en: "so that in future I may restrain myself towards the Saṅgha." },
      ],
    },
  ],
} satisfies Chant;

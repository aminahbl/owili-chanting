import type { Chant } from '../../types.ts';

export const chant = {
  id: "0011",
  slug: "supreme-praise-of-the-buddha",
  title: "Supreme Praise of the Buddha",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/evening-chanting.tex#L105", categories: [{ category: "Evening Chanting", order: 4 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [1], note: "Possibly a misprint: other chanting books have *Buddhavārahanta-* for *Buddh'vārahanta-*. Needs a second source before any change; the English of this line depends on the reading." },
    { status: "changed", lines: [7, 10, 13], note: "The chanting book prints the men's and women's forms inline (*dāso/dāsī*, *Vandanto/Vandantī*, *vandamānena/vandamānāya*); here they are split into the two forms." },
    { status: "open", lines: [18], note: "English to review: *paṭiggaṇhātu accayaṁ* is literally \"accept the transgression\". The idiom means to accept a confession, so the draft has \"pardon this fault\"." },
    { status: "open", lines: [7], note: "English to review: *dāsa* is a servant or slave. \"Servant\" keeps the devotion without the harshness." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Buddh'vārahanta-varatādiguṇābhiyutto", en: "The Buddha, endowed with excellent qualities such as worthiness," },
        { id: 2, pali: "Suddhābhiñāṇa-karuṇāhi samāgatatto", en: "whose being is joined with purity, profound knowledge and compassion," },
        { id: 3, pali: "Bodhesi yo sujanataṁ kamalaṁ va sūro", en: "who awakened good people as the sun awakens the lotus:" },
        { id: 4, pali: "Vandām'ahaṁ tam-araṇaṁ sirasā jinendaṁ", en: "I revere with bowed head that peaceful one, lord of conquerors." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Buddho yo sabba-pāṇīnaṁ saraṇaṁ khemam-uttamaṁ", en: "The Buddha, the safe and supreme refuge of all beings," },
        { id: 6, pali: "Paṭhamānussatiṭṭhānaṁ vandāmi taṁ siren'ahaṁ", en: "the first object of recollection, I revere with bowed head." },
      ],
    },
    {
      lines: [
        { id: 7, pali: { men: "Buddhassāh'asmi dāso va buddho me sāmi-kissaro", women: "Buddhassāh'asmi dāsī va buddho me sāmi-kissaro" }, en: "I am the Buddha's servant; the Buddha is my lord and master." },
        { id: 8, pali: "Buddho dukkhassa ghātā ca vidhātā ca hitassa me", en: "The Buddha removes my suffering and provides for my welfare." },
        { id: 9, pali: "Buddhass'āhaṁ niyyādemi sarīrañ-jīvitañ-cidaṁ", en: "To the Buddha I dedicate this body and this life." },
        { id: 10, pali: { men: "Vandanto'haṁ carissāmi buddhass'eva subodhitaṁ", women: "Vandantī'haṁ carissāmi buddhass'eva subodhitaṁ" }, en: "In reverence I will follow the Buddha's true awakening." },
      ],
    },
    {
      lines: [
        { id: 11, pali: "Natthi me saraṇaṁ aññaṁ buddho me saraṇaṁ varaṁ", en: "I have no other refuge; the Buddha is my excellent refuge." },
        { id: 12, pali: "Etena sacca-vajjena vaḍḍheyyaṁ satthu-sāsane", en: "By the speaking of this truth, may I grow in the Teacher's way." },
        { id: 13, pali: { men: "Buddhaṁ me vandamānena yaṁ puññaṁ pasutaṁ idha", women: "Buddhaṁ me vandamānāya yaṁ puññaṁ pasutaṁ idha" }, en: "By the goodness I have made here in revering the Buddha," },
        { id: 14, pali: "Sabbepi antarāyā me māhesuṁ tassa tejasā", en: "by its power, may no obstacles come to me." },
      ],
    },
    {
      lines: [
        { id: 15, cue: "Bowing" },
        { id: 16, pali: "Kāyena vācāya va cetasā vā", en: "By body, by speech, or by mind," },
        { id: 17, pali: "Buddhe kukammaṁ pakataṁ mayā yaṁ", en: "whatever wrong I have done towards the Buddha," },
        { id: 18, pali: "Buddho paṭiggaṇhātu accayantaṁ", en: "may the Buddha pardon this fault," },
        { id: 19, pali: "Kālantare saṁvarituṁ va buddhe", en: "so that in future I may restrain myself towards the Buddha." },
      ],
    },
  ],
} satisfies Chant;

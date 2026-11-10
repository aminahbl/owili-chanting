import type { Chant } from '../../types.ts';

export const chant = {
  id: "supreme-praise-of-the-dhamma",
  title: "Supreme Praise of the Dhamma",
  groups: [{ group: "evening", order: 4 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/evening-chanting.html#d-bhi-pali", categories: [{ category: "Evening Chanting", order: 6 }] },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [8, 11, 14], note: "The manual prints the men's and women's forms inline (*dāso/dāsī*, *Vandanto/Vandantī*, *vandamānena/vandamānāya*); here they are split into the two forms." },
    { status: "open", lines: [19], note: "English to review: *paṭiggaṇhātu accayaṁ* is literally \"accept the transgression\". The idiom means to accept a confession, so the draft has \"pardon this fault\"." },
    { status: "open", lines: [8], note: "English to review: *dāsa* is a servant or slave. \"Servant\" keeps the devotion without the harshness." },
    { status: "open", lines: [4], note: "English to review: *tada-dhāri-dhārī* is compressed; the draft reads it as \"holding up those who hold to it\"." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ dhammābhigītiṁ karomase", en: "Now let us chant the supreme praise of the Dhamma.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Svākkhātat'ādiguṇa-yoga-vasena seyyo", en: "Excellent through its qualities, such as being well taught," },
        { id: 3, pali: "Yo magga-pāka-pariyatti-vimokkha-bhedo", en: "divided into path and fruit, learning and liberation," },
        { id: 4, pali: "Dhammo kuloka-patanā tada-dhāri-dhārī", en: "the Dhamma keeps those who hold to it from falling into the bad worlds:" },
        { id: 5, pali: "Vandām'ahaṁ tama-haraṁ vara-dhammam-etaṁ", en: "I revere this excellent Dhamma, which dispels darkness." },
        { id: 6, pali: "Dhammo yo sabba-pāṇīnaṁ saraṇaṁ khemam-uttamaṁ", en: "The Dhamma, the safe and supreme refuge of all beings," },
        { id: 7, pali: "Dutiyānussatiṭṭhānaṁ vandāmi taṁ siren'ahaṁ", en: "the second object of recollection, I revere with bowed head." },
        { id: 8, pali: { men: "Dhammassāh'asmi dāso va dhammo me sāmi-kissaro", women: "Dhammassāh'asmi dāsī va dhammo me sāmi-kissaro" }, en: "I am the Dhamma's servant; the Dhamma is my lord and master." },
        { id: 9, pali: "Dhammo dukkhassa ghātā ca vidhātā ca hitassa me", en: "The Dhamma removes my suffering and provides for my welfare." },
        { id: 10, pali: "Dhammass'āhaṁ niyyādemi sarīrañ-jīvitañ-cidaṁ", en: "To the Dhamma I dedicate this body and this life." },
        { id: 11, pali: { men: "Vandantohaṁ carissāmi dhammass'eva sudhammataṁ", women: "Vandantīhaṁ carissāmi dhammass'eva sudhammataṁ" }, en: "In reverence I will follow the excellence of the Dhamma." },
        { id: 12, pali: "Natthi me saraṇaṁ aññaṁ dhammo me saraṇaṁ varaṁ", en: "I have no other refuge; the Dhamma is my excellent refuge." },
        { id: 13, pali: "Etena sacca-vajjena vaḍḍheyyaṁ satthu-sāsane", en: "By the speaking of this truth, may I grow in the Teacher's way." },
        { id: 14, pali: { men: "Dhammaṁ me vandamānena yaṁ puññaṁ pasutaṁ idha", women: "Dhammaṁ me vandamānāya yaṁ puññaṁ pasutaṁ idha" }, en: "By the goodness I have made here in revering the Dhamma," },
        { id: 15, pali: "Sabbepi antarāyā me māhesuṁ tassa tejasā", en: "by its power, may no obstacles come to me." },
      ],
    },
    {
      lines: [
        { id: 16, cue: "Bowing" },
        { id: 17, pali: "Kāyena vācāya va cetasā vā", en: "By body, by speech, or by mind," },
        { id: 18, pali: "Dhamme kukammaṁ pakataṁ mayā yaṁ", en: "whatever wrong I have done towards the Dhamma," },
        { id: 19, pali: "Dhammo paṭiggaṇhātu accayantaṁ", en: "may the Dhamma pardon this fault," },
        { id: 20, pali: "Kālantare saṁvarituṁ va dhamme", en: "so that in future I may restrain myself towards the Dhamma." },
      ],
    },
  ],
} satisfies Chant;

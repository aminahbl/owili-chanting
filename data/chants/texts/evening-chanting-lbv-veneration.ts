import type { Chant } from '../../types.ts';

export const chant = {
  id: "0027",
  slug: "evening-chanting-lbv-veneration",
  title: "Evening Chanting (LBV) – Veneration",
  groups: [{ group: "reverence", order: 270 }],
  paliSource: { label: "London Buddhist Vihara" },
  translation: "draft",
  links: [{ text: "Mahamevnawa chanting book", href: "https://banaenglish.org/wp-content/uploads/2021/05/Trilinnear-A5-Vandana-Kotte-August2020.pdf" }, { text: "Gandhajāta Sutta (AN 3.79), on the fragrance of virtue", href: "https://suttacentral.net/an3.79" }],
  editorial: [
    { status: "open", lines: [60], note: "*Tīloka-dīpam*: possibly a misprint for *Tiloka-*, which the [Mahamevnawa chanting book](https://banaenglish.org/wp-content/uploads/2021/05/Trilinnear-A5-Vandana-Kotte-August2020.pdf) has. Needs a second source before any change." },
    { status: "changed", note: "Diacritics were restored from the current site data:\n\n- *Araham*, *Vijjācarana*, *Sanditthika* → *Arahaṁ*, *Vijjācaraṇa*, *Sandiṭṭhika*.\n- *pādapāṁsu-varuttamaṁ* → *pādapaṁsu-varuttamaṁ*.\n- The flower verses (*Pujemi buddham kusumenanena / Punnena methena ca hotu mokkham / …*) are replaced by the Bhikkhu Manual's text of the same verses.\n- The water offering is in standard spelling (*Paṭiggaṇhātu-m-uttama*, *Adhivāsetu no bhante*). The Mahamevnawa book confirms the wording.\n- The three *Namo tassa* lines are one line chanted three times." },
    { status: "open", lines: [25, 40], note: "English to review: the Dhamma and Saṅgha verses repeat *pādapaṁsu* (dust of the feet) from the Buddha verse; the English has \"his feet\" in all three." },
    { status: "open", lines: [71], note: "English to review: *gilāna-paccaya* is literally \"requisite for the sick\"; here it names the drink offered in the evening." },
  ],
  sections: [
    {
      title: "Preliminary Homage",
      lines: [
        { id: 1, pali: "Namo tassa bhagavato arahato sammāsambuddhassa", en: "Homage to the Gracious One, the worthy, the perfectly self-awakened.", repeat: 3 },
      ],
    },
    {
      title: "Nine Virtues of the Buddha (Nava Buddhaguṇā)",
      lines: [
        { id: 2, pali: "Itipi so Bhagavā Arahaṁ Sammāsambuddho", en: "Such indeed is the Gracious One: worthy, perfectly self-awakened," },
        { id: 3, pali: "Vijjācaraṇa-sampanno", en: "accomplished in knowledge and conduct," },
        { id: 4, pali: "Sugato", en: "well-gone," },
        { id: 5, pali: "Lokavidū", en: "knower of the worlds," },
        { id: 6, pali: "Anuttaro purisadamma-sārathi", en: "unsurpassed guide of those ready to be trained," },
        { id: 7, pali: "Satthā deva-manussānaṁ", en: "teacher of devas and humans," },
        { id: 8, pali: "Buddho bhagavā", en: "awakened, the Gracious One." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Buddhaṁ jīvitaṁ pariyantaṁ saraṇaṁ gacchāmi.", en: "For as long as I live, I go to the Buddha for refuge." },
        { id: 10, pali: "Ye ca Buddhā atītā ca, ye ca Buddhā anāgatā,", en: "The Buddhas of the past, the Buddhas of the future," },
        { id: 11, pali: "Paccuppannā ca ye Buddhā, ahaṁ vandāmi sabbadā.", en: "and the Buddhas of the present: I revere them always." },
        { id: 12, pali: "Natthi me saraṇaṁ aññaṁ, Buddho me saraṇaṁ varaṁ.", en: "I have no other refuge; the Buddha is my excellent refuge." },
        { id: 13, pali: "Etena saccavajjena hotu me jaya-maṅgalaṁ.", en: "By the speaking of this truth, may I have the blessing of victory." },
        { id: 14, pali: "Uttamaṅgena vandehaṁ pādapaṁsu-varuttamaṁ,", en: "With bowed head I revere the supreme dust of his feet;" },
        { id: 15, pali: "Buddhe yo khalito doso, Buddho khamatu taṁ mamaṁ.", en: "whatever fault I have committed against the Buddha, may the Buddha pardon me for it." },
      ],
    },
    {
      title: "Six Virtues of the Dhamma (Cha Dhammaguṇā)",
      lines: [
        { id: 16, pali: "Svākkhāto Bhagavatā Dhammo,", en: "The Dhamma is well taught by the Gracious One," },
        { id: 17, pali: "sandiṭṭhiko akāliko ehi-passiko,", en: "visible here and now, timeless, inviting all to come and see," },
        { id: 18, pali: "opanayiko,", en: "leading onward," },
        { id: 19, pali: "paccattaṁ veditabbo viññūhīti.", en: "to be known by the wise for themselves." },
      ],
    },
    {
      lines: [
        { id: 20, pali: "Dhammaṁ jīvitaṁ pariyantaṁ saraṇaṁ gacchāmi.", en: "For as long as I live, I go to the Dhamma for refuge." },
        { id: 21, pali: "Ye ca Dhammā atītā ca, ye ca Dhammā anāgatā,", en: "The Dhamma of the past, the Dhamma of the future," },
        { id: 22, pali: "Paccuppannā ca ye Dhammā, ahaṁ vandāmi sabbadā.", en: "and the Dhamma of the present: I revere it always." },
        { id: 23, pali: "Natthi me saraṇaṁ aññaṁ, Dhammo me saraṇaṁ varaṁ.", en: "I have no other refuge; the Dhamma is my excellent refuge." },
        { id: 24, pali: "Etena saccavajjena hotu me jaya-maṅgalaṁ.", en: "By the speaking of this truth, may I have the blessing of victory." },
        { id: 25, pali: "Uttamaṅgena vandehaṁ pādapaṁsu-varuttamaṁ,", en: "With bowed head I revere the supreme dust of his feet;" },
        { id: 26, pali: "Dhamme yo khalito doso, Dhammo khamatu taṁ mamaṁ.", en: "whatever fault I have committed against the Dhamma, may the Dhamma pardon me for it." },
      ],
    },
    {
      title: "Nine Virtues of the Saṅgha (Nava Saṅghaguṇā)",
      lines: [
        { id: 27, pali: "Supaṭipanno Bhagavato sāvaka-saṅgho,", en: "The Gracious One's Saṅgha of disciples is practising well," },
        { id: 28, pali: "Uju-paṭipanno Bhagavato sāvaka-saṅgho,", en: "the Gracious One's Saṅgha of disciples is practising straightforwardly," },
        { id: 29, pali: "Ñāya-paṭipanno Bhagavato sāvaka-saṅgho,", en: "the Gracious One's Saṅgha of disciples is practising the true way," },
        { id: 30, pali: "Sāmīci-paṭipanno Bhagavato sāvaka-saṅgho,", en: "the Gracious One's Saṅgha of disciples is practising properly," },
        { id: 31, pali: "Yadidaṁ cattāri purisa-yugāni aṭṭha purisa-puggalā,", en: "that is, the four pairs of persons, the eight kinds of individuals:" },
        { id: 32, pali: "Esa Bhagavato sāvaka-saṅgho", en: "this is the Gracious One's Saṅgha of disciples," },
        { id: 33, pali: "Āhuneyyo, pāhuneyyo, dakkhiṇeyyo, añjali-karaṇīyo,", en: "worthy of gifts, of hospitality, of offerings, of reverence with joined palms," },
        { id: 34, pali: "Anuttaraṁ puñña-khettaṁ lokassāti.", en: "the unsurpassed field of goodness for the world." },
      ],
    },
    {
      lines: [
        { id: 35, pali: "Saṅghaṁ jīvitaṁ pariyantaṁ saraṇaṁ gacchāmi.", en: "For as long as I live, I go to the Saṅgha for refuge." },
        { id: 36, pali: "Ye ca Saṅghā atītā ca, ye ca Saṅghā anāgatā,", en: "The Saṅgha of the past, the Saṅgha of the future," },
        { id: 37, pali: "Paccuppannā ca ye Saṅghā, ahaṁ vandāmi sabbadā.", en: "and the Saṅgha of the present: I revere it always." },
        { id: 38, pali: "Natthi me saraṇaṁ aññaṁ, Saṅgho me saraṇaṁ varaṁ.", en: "I have no other refuge; the Saṅgha is my excellent refuge." },
        { id: 39, pali: "Etena saccavajjena hotu me jaya-maṅgalaṁ.", en: "By the speaking of this truth, may I have the blessing of victory." },
        { id: 40, pali: "Uttamaṅgena vandehaṁ pādapaṁsu-varuttamaṁ,", en: "With bowed head I revere the supreme dust of his feet;" },
        { id: 41, pali: "Saṅghe yo khalito doso, Saṅgho khamatu taṁ mamaṁ.", en: "whatever fault I have committed against the Saṅgha, may the Saṅgha pardon me for it." },
      ],
    },
    {
      title: "Offering flowers",
      lines: [
        { id: 42, pali: "Vaṇṇa-gandha-guṇopetaṁ", en: "Endowed with colour, scent and quality," },
        { id: 43, pali: "Etaṁ kusuma-santatiṁ.", en: "this mass of flowers" },
        { id: 44, pali: "Pūjayāmi munindassa", en: "I offer to the Lord of Sages," },
        { id: 45, pali: "Sirīpāda-saroruhe.", en: "at his glorious lotus feet." },
      ],
    },
    {
      lines: [
        { id: 46, pali: "Pūjemi Buddhaṁ kusumena'nena", en: "I honour the Buddha with these flowers;" },
        { id: 47, pali: "Puññenam-etena ca hotu mokkhaṁ", en: "by this goodness may there be release." },
        { id: 48, pali: "Pupphaṁ milāyāti yathā idaṁ me", en: "As these flowers of mine wither," },
        { id: 49, pali: "Kāyo tathā yāti vināsa-bhāvaṁ.", en: "so my body goes to destruction." },
      ],
    },
    {
      lines: [
        { id: 50, pali: "Pūjemi Dhammaṁ kusumena'nena", en: "I honour the Dhamma with these flowers;" },
        { id: 51, pali: "Puññenam-etena ca hotu mokkhaṁ", en: "by this goodness may there be release." },
        { id: 52, pali: "Pupphaṁ milāyāti yathā idaṁ me", en: "As these flowers of mine wither," },
        { id: 53, pali: "Kāyo tathā yāti vināsa-bhāvaṁ.", en: "so my body goes to destruction." },
      ],
    },
    {
      lines: [
        { id: 54, pali: "Pūjemi Saṅghaṁ kusumena'nena", en: "I honour the Saṅgha with these flowers;" },
        { id: 55, pali: "Puññenam-etena ca hotu mokkhaṁ", en: "by this goodness may there be release." },
        { id: 56, pali: "Pupphaṁ milāyāti yathā idaṁ me", en: "As these flowers of mine wither," },
        { id: 57, pali: "Kāyo tathā yāti vināsa-bhāvaṁ.", en: "so my body goes to destruction." },
      ],
    },
    {
      title: "Offering lights",
      lines: [
        { id: 58, pali: "Ghana-sārappadittena", en: "With a lamp blazing with camphor," },
        { id: 59, pali: "Dīpena tama-dhaṁsinā", en: "dispelling darkness," },
        { id: 60, pali: "Tīloka-dīpam sambuddhaṁ", en: "the Awakened One, light of the three worlds," },
        { id: 61, pali: "Pūjayāmi tamo-nudaṁ.", en: "dispeller of darkness, I honour." },
      ],
    },
    {
      title: "Offering incense",
      lines: [
        { id: 62, pali: "Gandha-sambhāra-yuttena", en: "With incense made of fragrant things," },
        { id: 63, pali: "Dhūpenāhaṁ sugandhinā", en: "sweet-smelling, I" },
        { id: 64, pali: "Pūjaye pūjaneyyan-taṁ", en: "honour the one worthy of honour," },
        { id: 65, pali: "Pūjā-bhājanam-uttamaṁ.", en: "the supreme recipient of honour." },
      ],
    },
    {
      title: "Offering water",
      lines: [
        { id: 66, pali: "Sugandhaṁ sītalaṁ kappaṁ", en: "Fragrant, cool, fitting," },
        { id: 67, pali: "Pasanna-madhuraṁ subhaṁ", en: "clear, sweet and lovely:" },
        { id: 68, pali: "Pānīyam-etaṁ bhagavā", en: "this drinking water, Gracious One," },
        { id: 69, pali: "Paṭiggaṇhātu-m-uttama", en: "Supreme One, please accept." },
      ],
    },
    {
      lines: [
        { id: 70, pali: "Adhivāsetu no bhante", en: "Venerable Sir, please consent to" },
        { id: 71, pali: "gilāna-paccayaṁ imaṁ", en: "this requisite for the sick," },
        { id: 72, pali: "anukampaṁ upādāya", en: "out of care for us;" },
        { id: 73, pali: "paṭiggaṇhātu-m-uttama", en: "Supreme One, please accept." },
      ],
    },
    {
      title: "Salutation to the Three Main Objects of Veneration",
      lines: [
        { id: 74, pali: "Vandāmi cetiyaṁ sabbaṁ", en: "I revere every shrine" },
        { id: 75, pali: "Sabba-ṭhānesu patiṭṭhitaṁ", en: "established in every place," },
        { id: 76, pali: "Sārīrika-dhātu-Mahā-bodhiṁ", en: "the bodily relics, the Great Bodhi tree," },
        { id: 77, pali: "Buddha-rūpaṁ sakalaṁ sadā.", en: "and every image of the Buddha, always." },
      ],
    },
    {
      title: "Asking for Forgiveness",
      lines: [
        { id: 78, pali: "Kāyena vācā-cittena", en: "By body, speech or mind," },
        { id: 79, pali: "Pamādena mayā kataṁ", en: "whatever wrong I have done through heedlessness:" },
        { id: 80, pali: "Accayaṁ khama me bhante", en: "pardon me this fault, Venerable Sir," },
        { id: 81, pali: "bhūri-pañña Tathāgata", en: "Tathāgata of vast wisdom." },
      ],
    },
    {
      lines: [
        { id: 82, pali: "Kāyena vācā-cittena", en: "By body, speech or mind," },
        { id: 83, pali: "Pamādena mayā kataṁ", en: "whatever wrong I have done through heedlessness:" },
        { id: 84, pali: "Accayaṁ khama me dhamma", en: "pardon me this fault, Dhamma," },
        { id: 85, pali: "Sandiṭṭhika akālika", en: "visible here and now, timeless." },
      ],
    },
    {
      lines: [
        { id: 86, pali: "Kāyena vācā-cittena", en: "By body, speech or mind," },
        { id: 87, pali: "Pamādena mayā kataṁ", en: "whatever wrong I have done through heedlessness:" },
        { id: 88, pali: "Accayaṁ khama me saṅgha", en: "pardon me this fault, Saṅgha," },
        { id: 89, pali: "Supaṭipanno anuttaro", en: "practising well, unsurpassed." },
      ],
    },
  ],
} satisfies Chant;

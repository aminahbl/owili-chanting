import type { Chant } from '../../types.ts';

export const chant = {
  id: "uddissanadhitthana-gatha",
  title: "Verses of Sharing and Aspiration",
  paliTitle: "Uddissanādhiṭṭhāna-gāthā",
  groups: [{ group: "reflections", order: 11 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#imina-punna", categories: [{ category: "Reflections", order: 11 }] },
  translation: "draft",
  links: [{ text: "Word-by-word analysis", href: "https://pali-sutta-readings.github.io/readings/2025-12-10/" }],
  editorial: [
    { status: "changed", lines: [18], note: "The manual prints this line in brackets, and the import read it as a leader line. The cue at the end says some monasteries include the last line in brackets, so the brackets mark an optional line; it is no longer marked as a leader line." },
    { status: "open", lines: [18], note: "English to review: *dasa-puñña* is read as the ten kinds of goodness (*dasa puñña-kiriya-vatthu*), not the ten perfections." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ uddissanādhiṭṭhāna-gāthāyo bhaṇāmase", en: "Now let us chant the verses of sharing and aspiration.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "[Iminā puññakammena] upajjhāyā guṇuttarā", en: "Through this act of goodness, may my preceptors, supreme in virtue," },
        { id: 3, pali: "Ācariyūpakārā ca mātāpitā ca ñātakā", en: "my teachers and helpers, my mother, father and relatives," },
        { id: 4, pali: "Suriyo candimā rājā guṇavantā narāpi ca", en: "the sun, the moon, the king, and people of virtue," },
        { id: 5, pali: "Brahma-mārā ca indā ca lokapālā ca devatā", en: "the Brahmās, Māras and Indras, the world guardians and devas," },
        { id: 6, pali: "Yamo mittā manussā ca majjhattā verikāpi ca", en: "Yama, friends and people, the neutral and the hostile:" },
        { id: 7, pali: "Sabbe sattā sukhī hontu puññāni pakatāni me", en: "may all beings be happy. May the goodness I have done" },
        { id: 8, pali: "Sukhañca tividhaṁ dentu khippaṁ pāpetha vomataṁ", en: "give them threefold happiness; may you quickly reach the Deathless." },
        { id: 9, pali: "Iminā puññakammena iminā uddissena ca", en: "Through this act of goodness, and through this dedication," },
        { id: 10, pali: "Khipp'āhaṁ sulabhe ceva taṇhūpādāna-chedanaṁ", en: "may I quickly attain the cutting off of craving and clinging." },
        { id: 11, pali: "Ye santāne hīnā dhammā yāva nibbānato mamaṁ", en: "Whatever base states are in my mind, until I reach nibbana," },
        { id: 12, pali: "Nassantu sabbadā yeva yattha jāto bhave bhave", en: "may they always be destroyed, wherever I am born, in life after life." },
        { id: 13, pali: "Ujucittaṁ satipaññā sallekho viriyamhinā", en: "With an upright mind, mindfulness and wisdom, effacement and energy," },
        { id: 14, pali: "Mārā labhantu nokāsaṁ kātuñca viriyesu me", en: "may Māras find no opportunity to hinder my efforts." },
        { id: 15, pali: "Buddhādhipavaro nātho dhammo nātho varuttamo", en: "The Buddha is my excellent protector, the Dhamma my supreme protector," },
        { id: 16, pali: "Nātho paccekabuddho ca saṅgho nāthottaro mamaṁ", en: "the solitary Buddha is a protector, and the Saṅgha my highest protector." },
        { id: 17, pali: "Tesottamānubhāvena mārokāsaṁ labhantu mā", en: "By their supreme power, may Māras find no opportunity." },
        { id: 18, pali: "Dasapuññānubhāvena mārokāsaṁ labhantu mā", en: "By the power of the ten kinds of goodness, may Māras find no opportunity." },
      ],
    },
    {
      lines: [
        { id: 19, cue: "This chant is a short excerpt from a longer composition. Some monasteries include the last line in brackets." },
      ],
    },
  ],
} satisfies Chant;

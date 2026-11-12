import type { Chant } from '../../types.ts';

export const chant = {
  id: "0159",
  slug: "paritta-parikamma",
  title: "Preliminary to the Protections",
  paliTitle: "Parittaparikamma",
  paliSource: { label: "Pāḷi Chanting, 5th edition, compiled by Dhamma Earth", url: "https://tusitainternational-archive.dhammaearth.org/medias/pdf/''P%C4%81%E1%B8%B7i%20Chanting%20%E3%80%90P%C4%81%E1%B8%B7i-Eng-Chi%E3%80%91%20v5.0''%20compiled%20by%20Dhamma%20Earth.pdf#page=12" },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [1, 2, 3, 4, 5, 6, 7, 8], note: "The source breaks the first verse into short lines unevenly. Here each quarter-verse is split after its seventh syllable, as in *Invitation to the Devas (main verses)*, which has the same metre." },
    { status: "changed", lines: [31, 32], note: "The source wraps the long compound over three lines. Here it is split over two." },
    { status: "open", lines: [6, 7, 8], note: "English to review: *vasanto* and *santo* are singular; the draft follows the source's English, which reads them as plural." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Ye santā santacittā,", en: "Those who are peaceful, with peaceful minds," },
        { id: 2, pali: "tisaraṇasaraṇā, ettha lokantare vā,", en: "who have gone to the three refuges, whether here or in another world," },
        { id: 3, pali: "bhummābhummā ca devā,", en: "devas of the earth and of the sky," },
        { id: 4, pali: "guṇagaṇagahaṇabyāvaṭā sabbakālaṁ,", en: "always intent on gathering a wealth of virtues;" },
        { id: 5, pali: "ete āyantu devā,", en: "may these devas come," },
        { id: 6, pali: "varakanakamaye, Merurāje vasanto,", en: "and those who dwell on Meru, king of mountains, made of fine gold," },
        { id: 7, pali: "santo santosahetuṁ,", en: "the good ones, to hear the cause of happiness," },
        { id: 8, pali: "Munivaravacanaṁ, sotumaggaṁ samaggaṁ.", en: "the excellent Sage's supreme word, all together." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Sabbesu cakkavāḷesu,", en: "In all the world-systems," },
        { id: 10, pali: "yakkhā devā ca brahmano,", en: "may the yakkhas, devas and Brahmās," },
        { id: 11, pali: "yaṁ amhehi kataṁ puññaṁ,", en: "the goodness that we have done," },
        { id: 12, pali: "sabbasampattisādhakaṁ,", en: "which brings about every good fortune," },
      ],
    },
    {
      lines: [
        { id: 13, pali: "Sabbe taṁ anumoditvā,", en: "all having rejoiced in it," },
        { id: 14, pali: "samaggā sāsane ratā,", en: "in concord, delighting in the teaching," },
        { id: 15, pali: "pamādarahitā hontu,", en: "be free of heedlessness," },
        { id: 16, pali: "ārakkhāsu visesato.", en: "above all in giving protection." },
      ],
    },
    {
      lines: [
        { id: 17, pali: "Sāsanassa ca lokassa,", en: "For the teaching and the world" },
        { id: 18, pali: "vuḍḍhī bhavatu sabbadā,", en: "may there always be growth;" },
        { id: 19, pali: "sāsanampi ca lokañca,", en: "the teaching and the world" },
        { id: 20, pali: "devā rakkhantu sabbadā.", en: "may the devas always protect." },
      ],
    },
    {
      lines: [
        { id: 21, pali: "Saddhiṁ hontu sukhī sabbe,", en: "May all be happy, together" },
        { id: 22, pali: "parivārehi attano,", en: "with their own companions;" },
        { id: 23, pali: "anīghā sumanā hontu,", en: "may they be untroubled and glad at heart," },
        { id: 24, pali: "saha sabbehi ñātibhi.", en: "together with all their relatives." },
      ],
    },
    {
      lines: [
        { id: 25, pali: "Rājato vā, corato vā, manussato vā,", en: "From kings, from thieves, from humans," },
        { id: 26, pali: "amanussato vā, aggito vā, udakato vā,", en: "from non-humans, from fire, from water," },
        { id: 27, pali: "pisācato vā, khāṇukato vā,", en: "from demons, from stumps," },
        { id: 28, pali: "kaṇṭakato vā, nakkhattato vā,", en: "from thorns, from unlucky stars," },
        { id: 29, pali: "janapadarogato vā, asaddhammato vā,", en: "from epidemics, from what is not the true Dhamma," },
        { id: 30, pali: "asandiṭṭhito vā, asappurisato vā,", en: "from wrong view, from people without integrity," },
        { id: 31, pali: "caṇḍa-hatthi-assa-miga-goṇa-kukkura-ahi-vicchika-", en: "from fierce elephants, horses, deer, cattle, dogs, snakes, scorpions," },
        { id: 32, pali: "maṇisappa-dīpi-accha-taraccha-sūkara-mahiṁsa-yakkha-rakkhasādīhi,", en: "vipers, leopards, bears, hyenas, boars, buffaloes, yakkhas, ogres and the like," },
        { id: 33, pali: "nānā-bhayato vā, nānā-rogato vā,", en: "from the many dangers, the many diseases" },
        { id: 34, pali: "nānā-upaddavato vā, ārakkhaṁ gaṇhantu.", en: "and the many misfortunes: may they receive protection." },
      ],
    },
  ],
} satisfies Chant;

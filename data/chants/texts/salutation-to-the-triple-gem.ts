import type { Chant } from '../../types.ts';

export const chant = {
  id: "salutation-to-the-triple-gem",
  title: "Salutation to the Triple Gem",
  groups: [{ group: "morning", order: 6 }],
  paliSource: { label: "Bhikkhu Manual, Morning Chanting", url: "https://bhikkhu-manual.github.io/chants/morning-chanting.html#buddho-susuddho" },
  translation: "draft",
  editorial: [
    { status: "changed", lines: [57], note: "The manual prints *Bhikkhūnaṁ/Sīladharānaṁ* inline; here it is split into the men's and women's forms." },
    { status: "changed", lines: [60], note: "The manual gives the lay version of the last section in English only, so it is left out. The cue before the Pali section, saying that only monks and nuns chant it, is our own." },
    { status: "open", lines: [6, 10, 14], note: "English to review: *ādarena* is \"with respect\" or \"with regard\". \"With devotion\" would be warmer but goes beyond the word." },
    { status: "open", lines: [12], note: "English to review: *sugatānubodhaka* is \"awakened following the Sugata\"; \"after\" may read as \"later than\"." },
    { status: "open", lines: [13], note: "English to review: *lola* is greed or fickleness." },
    { status: "open", lines: [18, 54], note: "English to review: about 100 characters, longer than a slide line should be. A shorter rendering would drop items from the list." },
    { status: "open", lines: [35], note: "English to review: *vineti* is to train or discipline. \"Guided\" is the warmer valid meaning." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ ratanattaya-paṇāma-gāthāyo c'eva", en: "Now let us chant the verses of salutation to the Triple Gem", leader: true },
        { id: 2, pali: "saṁvega-parikittana-pāṭhañca bhaṇāmase", en: "and the passage that awakens a sense of urgency.", leader: true },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Buddho susuddho karuṇā-mahaṇṇavo", en: "The Buddha, wholly pure, a great ocean of compassion," },
        { id: 4, pali: "Yo'ccanta-suddhabbara-ñāṇa-locano", en: "whose eye of knowledge is utterly pure and excellent," },
        { id: 5, pali: "Lokassa pāpūpakilesa-ghātako", en: "who destroys the evil and defilement of the world:" },
        { id: 6, pali: "Vandāmi buddhaṁ aham-ādarena taṁ", en: "with respect, I revere that Buddha." },
        { id: 7, pali: "Dhammo padīpo viya tassa satthuno", en: "The Dhamma of the Teacher, which is like a lamp," },
        { id: 8, pali: "Yo magga-pākāmata-bheda-bhinnako", en: "divided into path, fruit and the deathless," },
        { id: 9, pali: "Lokuttaro yo ca tad-attha-dīpano", en: "beyond the world, and the teaching that illuminates it:" },
        { id: 10, pali: "Vandāmi dhammaṁ aham-ādarena taṁ", en: "with respect, I revere that Dhamma." },
        { id: 11, pali: "Saṅgho sukhettābhyati-khetta-saññito", en: "The Saṅgha, known as a field surpassing all good fields," },
        { id: 12, pali: "Yo diṭṭha-santo sugatānubodhako", en: "who have seen peace and awakened after the Well-gone One," },
        { id: 13, pali: "Lolappahīno ariyo sumedhaso", en: "who have let go of greed, noble and wise:" },
        { id: 14, pali: "Vandāmi saṅghaṁ aham-ādarena taṁ", en: "with respect, I revere that Saṅgha." },
        { id: 15, pali: "Iccevam-ekantabhipūja-neyyakaṁ vatthuttayaṁ vandayatābhisaṅkhataṁ", en: "Revering in this way the Triple Gem, wholly worthy of honour," },
        { id: 16, pali: "Puññaṁ mayā yaṁ mama sabbupaddavā mā hontu ve tassa pabhāva-siddhiyā", en: "by the goodness I have made, through its power may no misfortune come to me." },
      ],
    },
    {
      lines: [
        { id: 17, pali: "Idha tathāgato loke uppanno arahaṁ sammāsambuddho", en: "Here in the world the Tathāgata has arisen, worthy, perfectly self-awakened," },
        { id: 18, pali: "Dhammo ca desito niyyāniko upasamiko parinibbāniko sambodhagāmī sugatappavedito", en: "and the Dhamma is taught, leading out, to peace, to final nibbana and awakening, as the Well-gone One made known." },
        { id: 19, pali: "Mayan-taṁ dhammaṁ sutvā evaṁ jānāma", en: "Having heard that Dhamma, we know this:" },
      ],
    },
    {
      lines: [
        { id: 20, pali: "Jātipi dukkhā", en: "birth is suffering," },
        { id: 21, pali: "Jarāpi dukkhā", en: "ageing is suffering," },
        { id: 22, pali: "Maraṇampi dukkhaṁ", en: "death is suffering," },
        { id: 23, pali: "Soka-parideva-dukkha-domanass'upāyāsāpi dukkhā", en: "sorrow, lamentation, pain, grief and despair are suffering," },
        { id: 24, pali: "Appiyehi sampayogo dukkho", en: "being with what is disliked is suffering," },
        { id: 25, pali: "Piyehi vippayogo dukkho", en: "being apart from what is loved is suffering," },
        { id: 26, pali: "Yamp'icchaṁ na labhati tampi dukkhaṁ", en: "not getting what one wants is suffering;" },
        { id: 27, pali: "Saṅkhittena pañcupādānakkhandhā dukkhā", en: "in brief, the five aggregates of clinging are suffering," },
      ],
    },
    {
      lines: [
        { id: 28, pali: "Seyyathīdaṁ", en: "namely:" },
        { id: 29, pali: "Rūpūpādānakkhandho", en: "the aggregate of clinging to form," },
        { id: 30, pali: "Vedanūpādānakkhandho", en: "the aggregate of clinging to feeling," },
        { id: 31, pali: "Saññūpādānakkhandho", en: "the aggregate of clinging to perception," },
        { id: 32, pali: "Saṅkhārūpādānakkhandho", en: "the aggregate of clinging to formations," },
        { id: 33, pali: "Viññāṇūpādānakkhandho", en: "the aggregate of clinging to consciousness." },
      ],
    },
    {
      lines: [
        { id: 34, pali: "Yesaṁ pariññāya", en: "For the full understanding of these," },
        { id: 35, pali: "Dharamāno so bhagavā evaṁ bahulaṁ sāvake vineti", en: "the Gracious One, while he lived, often guided his disciples in this way," },
        { id: 36, pali: "Evaṁ bhāgā ca panassa bhagavato sāvakesu anusāsanī bahulā pavattati", en: "and this part of his instruction was often given to his disciples:" },
      ],
    },
    {
      lines: [
        { id: 37, pali: "Rūpaṁ aniccaṁ", en: "form is impermanent," },
        { id: 38, pali: "Vedanā aniccā", en: "feeling is impermanent," },
        { id: 39, pali: "Saññā aniccā", en: "perception is impermanent," },
        { id: 40, pali: "Saṅkhārā aniccā", en: "formations are impermanent," },
        { id: 41, pali: "Viññāṇaṁ aniccaṁ", en: "consciousness is impermanent;" },
        { id: 42, pali: "Rūpaṁ anattā", en: "form is not-self," },
        { id: 43, pali: "Vedanā anattā", en: "feeling is not-self," },
        { id: 44, pali: "Saññā anattā", en: "perception is not-self," },
        { id: 45, pali: "Saṅkhārā anattā", en: "formations are not-self," },
        { id: 46, pali: "Viññāṇaṁ anattā", en: "consciousness is not-self;" },
        { id: 47, pali: "Sabbe saṅkhārā aniccā", en: "all conditioned things are impermanent," },
        { id: 48, pali: "Sabbe dhammā anattā'ti", en: "all things are not-self." },
      ],
    },
    {
      lines: [
        { id: 49, pali: "Te mayaṁ otiṇṇāmha jātiyā jarā-maraṇena", en: "We are beset by birth, ageing and death," },
        { id: 50, pali: "Sokehi paridevehi dukkhehi domanassehi upāyāsehi", en: "by sorrow, lamentation, pain, grief and despair," },
        { id: 51, pali: "Dukkhotiṇṇā dukkha-paretā", en: "beset by suffering, overwhelmed by suffering." },
        { id: 52, pali: "Appeva nāmimassa kevalassa dukkha-kkhandhassa", en: "May an end to this whole mass of suffering" },
        { id: 53, pali: "antakiriyā paññāyethā'ti", en: "be found." },
      ],
    },
    {
      lines: [
        { id: 60, cue: "The following is chanted only by the monks and nuns." },
        { id: 54, pali: "Cira-parinibbutampi taṁ bhagavantaṁ uddissa arahantaṁ sammāsambuddhaṁ", en: "Devoted to the Gracious One, worthy, perfectly self-awakened, long since passed into final nibbana," },
        { id: 55, pali: "Saddhā agārasmā anagāriyaṁ pabbajitā", en: "we have gone forth in faith from home to homelessness." },
        { id: 56, pali: "Tasmiṁ bhagavati brahma-cariyaṁ carāma", en: "In that Gracious One we live the holy life," },
        { id: 57, pali: { men: "Bhikkhūnaṁ sikkhāsājīva-samāpannā", women: "Sīladharānaṁ sikkhāsājīva-samāpannā" }, en: { men: "endowed with the bhikkhus' training and way of life.", women: "endowed with the sīladharās' training and way of life." } },
        { id: 58, pali: "Taṁ no brahma-cariyaṁ imassa kevalassa", en: "May this holy life of ours lead to the end" },
        { id: 59, pali: "dukkha-kkhandhassa antakiriyāya saṁvattatu", en: "of this whole mass of suffering." },
      ],
    },
  ],
} satisfies Chant;

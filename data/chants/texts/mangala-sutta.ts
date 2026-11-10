import type { Chant } from '../../types.ts';

export const chant = {
  id: "mangala-sutta",
  title: "The Thirty-Eight Highest Blessings",
  paliTitle: "Maṅgala-sutta",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 8 }, { group: "suttas", order: 7 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#asevana", categories: [{ category: "Parittas", subcategory: "Core Sequence", order: 8 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [1], note: "Snp 2.4 has *Evaṁ-me* where the manual has *Evam-me*. Kept as the manual prints it." },
    { status: "kept", lines: [15, 19, 23, 27, 31, 35, 39, 43, 47, 51], note: "Snp 2.4 has *Etaṁ* where the manual has *Etam*. Kept as the manual prints it." },
    { status: "kept", lines: [16], note: "Snp 2.4 has *Patirūpa-desa-vāso* where the manual has *Paṭirūpa-desa-vāso*. Kept as the manual prints it." },
    { status: "kept", lines: [37], note: "Snp 2.4 has *Santuṭṭhi* where the manual has *Santuṭṭhī*. Kept as the manual prints it." },
    { status: "open", lines: [2], note: "English to review: about 100 characters; the Pali line is also long." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Evam-me sutaṁ:", en: "Thus have I heard:", leader: true },
        { id: 2, pali: "ekaṁ samayaṁ bhagavā, sāvatthiyaṁ viharati, jeta-vane anāthapiṇḍikassa ārāme.", en: "at one time the Gracious One was staying near Sāvatthī, in Jeta's Grove, Anāthapiṇḍika's monastery.", leader: true },
        { id: 3, pali: "Atha kho aññatarā devatā abhikkantāya rattiyā", en: "Then, when the night was far advanced, a certain deva", leader: true },
        { id: 4, pali: "abhikkanta-vaṇṇā kevala-kappaṁ jetavanaṁ obhāsetvā,", en: "of surpassing beauty, lighting up the whole of Jeta's Grove,", leader: true },
        { id: 5, pali: "yena bhagavā ten'upasaṅkami.", en: "approached the Gracious One.", leader: true },
        { id: 6, pali: "Upasaṅkamitvā bhagavantaṁ abhivādetvā ekam-antaṁ aṭṭhāsi.", en: "Having approached and paid respect to the Gracious One, the deva stood to one side.", leader: true },
        { id: 7, pali: "Ekam-antaṁ ṭhitā kho sā devatā bhagavantaṁ gāthāya ajjhabhāsi:", en: "Standing to one side, the deva addressed the Gracious One in verse:", leader: true },
      ],
    },
    {
      lines: [
        { id: 8, pali: "Bahū devā manussā ca,", en: "'Many devas and humans", leader: true },
        { id: 9, pali: "Maṅgalāni acintayuṁ;", en: "have pondered on blessings,", leader: true },
        { id: 10, pali: "Ākaṅkhamānā sotthānaṁ,", en: "longing for safety:", leader: true },
        { id: 11, pali: "Brūhi maṅgalam-uttamaṁ.", en: "tell us the highest blessing.'", leader: true },
      ],
    },
    {
      lines: [
        { id: 12, pali: "Asevanā ca bālānaṁ", en: "Not associating with fools," },
        { id: 13, pali: "Paṇḍitānañ-ca sevanā", en: "associating with the wise," },
        { id: 14, pali: "Pūjā ca pūjanīyānaṁ", en: "honouring those worthy of honour:" },
        { id: 15, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 16, pali: "Paṭirūpa-desa-vāso ca", en: "Living in a suitable place," },
        { id: 17, pali: "Pubbe ca kata-puññatā", en: "having done good in the past," },
        { id: 18, pali: "Atta-sammā-paṇidhi ca", en: "setting oneself on the right course:" },
        { id: 19, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 20, pali: "Bāhu-saccañ-ca sippañ-ca,", en: "Great learning and skill," },
        { id: 21, pali: "Vinayo ca susikkhito", en: "a discipline well trained in," },
        { id: 22, pali: "Subhāsitā ca yā vācā", en: "and well-spoken words:" },
        { id: 23, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 24, pali: "Mātā-pitu-upaṭṭhānaṁ", en: "Caring for mother and father," },
        { id: 25, pali: "Putta-dārassa saṅgaho", en: "supporting spouse and children," },
        { id: 26, pali: "Anākulā ca kammantā", en: "work that brings no confusion:" },
        { id: 27, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 28, pali: "Dānañ-ca dhamma-cariyā ca", en: "Generosity and living by the Dhamma," },
        { id: 29, pali: "Ñātakānañ-ca saṅgaho", en: "supporting one's relatives," },
        { id: 30, pali: "Anavajjāni kammāni", en: "blameless actions:" },
        { id: 31, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 32, pali: "Āratī viratī pāpā", en: "Avoiding and abstaining from evil," },
        { id: 33, pali: "Majja-pānā ca saññamo", en: "refraining from intoxicating drink," },
        { id: 34, pali: "Appamādo ca dhammesu", en: "heedfulness in all things:" },
        { id: 35, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 36, pali: "Gāravo ca nivāto ca", en: "Respect and humility," },
        { id: 37, pali: "Santuṭṭhī ca kataññutā", en: "contentment and gratitude," },
        { id: 38, pali: "Kālena dhammassavanaṁ", en: "hearing the Dhamma at the right time:" },
        { id: 39, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 40, pali: "Khantī ca sovacassatā", en: "Patience and being easy to admonish," },
        { id: 41, pali: "Samaṇānañ-ca dassanaṁ", en: "seeing ascetics," },
        { id: 42, pali: "Kālena dhamma-sākacchā", en: "discussing the Dhamma at the right time:" },
        { id: 43, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 44, pali: "Tapo ca brahma-cariyañ-ca", en: "Austerity and the holy life," },
        { id: 45, pali: "Ariya-saccāna-dassanaṁ", en: "seeing the noble truths," },
        { id: 46, pali: "Nibbāna-sacchikiriyā ca", en: "realising nibbana:" },
        { id: 47, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 48, pali: "Phuṭṭhassa loka-dhammehi", en: "When touched by the ways of the world," },
        { id: 49, pali: "Cittaṁ yassa na kampati", en: "a mind that does not waver," },
        { id: 50, pali: "Asokaṁ virajaṁ khemaṁ", en: "sorrowless, stainless, secure:" },
        { id: 51, pali: "Etam maṅgalam-uttamaṁ", en: "this is the highest blessing." },
      ],
    },
    {
      lines: [
        { id: 52, pali: "Etādisāni katvāna", en: "Having done these things," },
        { id: 53, pali: "Sabbattham-aparājitā", en: "undefeated everywhere," },
        { id: 54, pali: "Sabbattha sotthiṁ gacchanti", en: "they go everywhere in safety:" },
        { id: 55, pali: "Tan-tesaṁ maṅgalam-uttaman'ti", en: "for them this is the highest blessing." },
      ],
      refs: [{ label: "Snp 2.4", uid: "snp2.4" }],
    },
  ],
} satisfies Chant;

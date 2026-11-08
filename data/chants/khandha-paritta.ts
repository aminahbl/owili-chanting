import type { Chant } from '../types.ts';

export const chant = {
  id: "khandha-paritta",
  title: "The Group Protection",
  paliTitle: "Khandha-paritta",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 11 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#virupakkhehi" },
  translation: "draft",
  editorial: [
    { status: "open", lines: [1, 2, 3, 4], note: "English to review: the four names are royal families of snakes. A short note would help users." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Virūpakkhehi me mettaṁ", en: "I have warmth for the Virūpakkhas," },
        { id: 2, pali: "mettaṁ erāpathehi me", en: "warmth for the Erāpathas," },
        { id: 3, pali: "Chabyā-puttehi me mettaṁ", en: "warmth for the Chabyāputtas," },
        { id: 4, pali: "mettaṁ kaṇhā-gotamakehi ca", en: "warmth for the Kaṇhāgotamakas." },
        { id: 5, pali: "Apādakehi me mettaṁ", en: "I have warmth for the footless," },
        { id: 6, pali: "mettaṁ dipādakehi me", en: "warmth for the two-footed," },
        { id: 7, pali: "Catuppadehi me mettaṁ", en: "warmth for the four-footed," },
        { id: 8, pali: "mettaṁ bahuppadehi me", en: "warmth for the many-footed." },
        { id: 9, pali: "Mā maṁ apādako hiṁsi", en: "May the footless not harm me," },
        { id: 10, pali: "mā maṁ hiṁsi dipādako", en: "may the two-footed not harm me," },
        { id: 11, pali: "Mā maṁ catuppado hiṁsi", en: "may the four-footed not harm me," },
        { id: 12, pali: "mā maṁ hiṁsi bahuppado", en: "may the many-footed not harm me." },
        { id: 13, pali: "Sabbe sattā sabbe pāṇā", en: "All beings, all living things," },
        { id: 14, pali: "sabbe bhūtā ca kevalā", en: "all creatures, every one," },
        { id: 15, pali: "Sabbe bhadrāni passantu", en: "may they all see good things;" },
        { id: 16, pali: "mā kiñci pāpam-āgamā", en: "may no harm come to anyone." },
      ],
    },
    {
      title: "Appamāṇo buddho appamāṇo dhammo",
      lines: [
        { id: 17, cue: "This part is sometimes chanted on its own" },
        { id: 18, pali: "Appamāṇo buddho", en: "Immeasurable is the Buddha," },
        { id: 19, pali: "appamāṇo dhammo", en: "immeasurable the Dhamma," },
        { id: 20, pali: "appamāṇo saṅgho", en: "immeasurable the Saṅgha." },
        { id: 21, pali: "Pamāṇavantāni siriṁsapāni", en: "Measurable are creeping things:" },
        { id: 22, pali: "ahi-vicchikā sata-padī", en: "snakes, scorpions, centipedes," },
        { id: 23, pali: "Uṇṇā-nābhī sarabhū mūsikā", en: "spiders, lizards and rats." },
      ],
    },
    {
      lines: [
        { id: 24, pali: "Katā me rakkhā katā me parittā", en: "I have made this safeguard, I have made this protection:" },
        { id: 25, pali: "paṭikkamantu bhūtāni", en: "may the creatures go away." },
        { id: 26, pali: "So'haṁ namo bhagavato", en: "I pay homage to the Gracious One," },
        { id: 27, pali: "namo sattannaṁ", en: "homage to the seven" },
        { id: 28, pali: "sammā-sambuddhānaṁ", en: "perfectly self-awakened Buddhas." },
      ],
      refs: [{ label: "AN 4.67", uid: "an4.67" }],
    },
  ],
} satisfies Chant;

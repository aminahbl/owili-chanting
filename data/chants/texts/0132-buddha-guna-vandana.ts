import type { Chant } from '../../types.ts';

export const chant = {
  id: "0132",
  slug: "buddha-guna-vandana",
  title: "Revering the Qualities of the Buddha",
  paliTitle: "Buddhaguṇavandanā",
  paliSource: { label: "Ancient Buddhist Texts, Daily Chanting", url: "https://ancient-buddhist-texts.net/Texts-and-Translations/Daily-Chanting/03-Wednesday.htm" },
  translation: "draft",
  editorial: [
    { status: "open", lines: [5, 9], note: "The London Buddhist Vihara text (retired chant 0027) has *Buddhaṁ jīvitaṁ pariyantaṁ* where this source has *Buddhaṁ jīvitaṁ yāva Nibbānaṁ*, and *hotu me jaya-maṅgalaṁ* where it has *hotu te jayamaṅgalaṁ*. Check against the LBV recording." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Iti pi so Bhagavā Arahaṁ Sammāsambuddho,", en: "Such indeed is the Gracious One: worthy, perfectly self-awakened," },
        { id: 2, pali: "vijjācaraṇasampanno Sugato lokavidū,", en: "accomplished in knowledge and conduct, well-gone, knower of the worlds," },
        { id: 3, pali: "anuttaro purisadammasārathī,", en: "unsurpassed guide of those ready to be trained," },
        { id: 4, pali: "Satthā devamanussānaṁ Buddho Bhagavā ti.", en: "teacher of devas and humans, awakened, the Gracious One." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Buddhaṁ jīvitaṁ yāva Nibbānaṁ saraṇaṁ gacchāmi.", en: "For life, until nibbana, I go to the Buddha for refuge." },
      ],
    },
    {
      lines: [
        { id: 6, pali: "Ye ca Buddhā atītā ca, ye ca Buddhā anāgatā,", en: "The Buddhas of the past, the Buddhas of the future," },
        { id: 7, pali: "paccuppannā ca ye Buddhā, ahaṁ vandāmi sabbadā!", en: "and the Buddhas of the present: I revere them always." },
        { id: 8, pali: "Natthi me saraṇaṁ aññaṁ, Buddho me saraṇaṁ varaṁ!", en: "I have no other refuge; the Buddha is my excellent refuge." },
        { id: 9, pali: "Etena saccavajjena hotu te jayamaṅgalaṁ!", en: "By the speaking of this truth, may you have the blessing of victory." },
        { id: 10, pali: "Uttamaṅgena vandehaṁ pādapaṁsu varuttamaṁ,", en: "With bowed head I revere the supreme dust of his feet;" },
        { id: 11, pali: "Buddhe yo khalito doso Buddho khamatu taṁ mamaṁ!", en: "whatever fault I have committed against the Buddha, may the Buddha pardon me for it." },
      ],
    },
  ],
} satisfies Chant;

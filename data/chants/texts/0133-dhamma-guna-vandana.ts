import type { Chant } from '../../types.ts';

export const chant = {
  id: "0133",
  slug: "dhamma-guna-vandana",
  title: "Revering the Qualities of the Dhamma",
  paliTitle: "Dhammaguṇavandanā",
  paliSource: { label: "Ancient Buddhist Texts, Daily Chanting", url: "https://ancient-buddhist-texts.net/Texts-and-Translations/Daily-Chanting/03-Wednesday.htm" },
  translation: "draft",
  editorial: [
    { status: "open", lines: [4, 8, 9], note: "The London Buddhist Vihara text (retired chant 0027) has *Dhammaṁ jīvitaṁ pariyantaṁ* where this source has *Dhammaṁ jīvitaṁ yāva Nibbānaṁ*, *hotu me jaya-maṅgalaṁ* where it has *hotu te jayamaṅgalaṁ*, and *pādapaṁsu-varuttamaṁ* where it has *Dhammaṁ ca tividhaṁ varaṁ*. Check against the LBV recording." },
    { status: "open", lines: [9], note: "English to review: *tividha*, threefold, is left unexplained." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Svākkhāto Bhagavatā Dhammo,", en: "The Dhamma is well taught by the Gracious One," },
        { id: 2, pali: "sandiṭṭhiko, akāliko, ehipassiko, opanayiko,", en: "visible here and now, timeless, inviting all to come and see, leading onward," },
        { id: 3, pali: "paccattaṁ veditabbo viññūhī ti.", en: "to be known by the wise for themselves." },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Dhammaṁ jīvitaṁ yāva Nibbānaṁ saraṇaṁ gacchāmi.", en: "For life, until nibbana, I go to the Dhamma for refuge." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Ye ca Dhammā atītā ca, ye ca Dhammā anāgatā,", en: "The Dhamma of the past, the Dhamma of the future," },
        { id: 6, pali: "paccuppannā ca ye Dhammā, ahaṁ vandāmi sabbadā!", en: "and the Dhamma of the present: I revere it always." },
        { id: 7, pali: "Natthi me saraṇaṁ aññaṁ, Dhammo me saraṇaṁ varaṁ!", en: "I have no other refuge; the Dhamma is my excellent refuge." },
        { id: 8, pali: "Etena saccavajjena hotu te jayamaṅgalaṁ!", en: "By the speaking of this truth, may you have the blessing of victory." },
        { id: 9, pali: "Uttamaṅgena vandehaṁ Dhammaṁ ca tividhaṁ varaṁ,", en: "With bowed head I revere the excellent threefold Dhamma;" },
        { id: 10, pali: "Dhamme yo khalito doso Dhammo khamatu taṁ mamaṁ!", en: "whatever fault I have committed against the Dhamma, may the Dhamma pardon me for it." },
      ],
    },
  ],
} satisfies Chant;

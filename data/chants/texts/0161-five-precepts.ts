import type { Chant } from '../../types.ts';

export const chant = {
  id: "0161",
  slug: "five-precepts",
  title: "The Five Precepts",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/formal-requests.tex#L226", categories: [{ category: "Formal Requests", order: 7 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Pāṇātipātā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from killing living beings." },
        { id: 2, pali: "Adinnādānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from taking what is not given." },
        { id: 3, pali: "Kāmesu micchā-cārā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from sexual misconduct." },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Musā-vādā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from false speech." },
        { id: 5, pali: "Surā-meraya-majja-pamādaṭṭhānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from liquor, wine and intoxicants that cause heedlessness." },
      ],
    },
  ],
} satisfies Chant;

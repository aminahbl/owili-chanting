import type { Chant } from '../../types.ts';

export const chant = {
  id: "0161",
  slug: "five-precepts",
  title: "The Five Precepts",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#five-precepts", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Uposatha-day for Lay-followers", order: 17 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The five training rules of the manual's ceremony (lines 21–25 of *five-precepts-ceremony*), without the request, the part of the bhikkhu or bhikkhuni and the closing verses." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Pāṇātipātā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from killing living beings." },
        { id: 2, pali: "Adinnādānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from taking what is not given." },
        { id: 3, pali: "Kāmesu micchā-cārā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from sexual misconduct." },
        { id: 4, pali: "Musā-vādā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from false speech." },
        { id: 5, pali: "Surā-meraya-majja-pamādaṭṭhānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from liquor, wine and intoxicants that cause heedlessness." },
      ],
    },
  ],
} satisfies Chant;

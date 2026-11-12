import type { Chant } from '../../types.ts';

export const chant = {
  id: "0149",
  slug: "eight-precepts-short",
  title: "Eight Precepts (short)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/sri-lanka.html#eight-precepts", categories: [{ category: "Chants Used in Sri Lanka", subcategory: "Uposatha-day for Lay-followers", order: 16 }] },
  translation: "draft",
  editorial: [
    { status: "changed", note: "The eight training rules of the manual's ceremony (lines 34–42 of *eight-precepts*), without the request, the bhikkhu's part and the closing verses." },
    { status: "open", lines: [7, 8], note: "English to review: the seventh precept is one long rule in two Pali lines; the English keeps it as one sentence over the same two lines." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Pāṇātipātā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from killing living beings." },
        { id: 2, pali: "Adinnādānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from taking what is not given." },
        { id: 3, pali: "Abrahma-cariyā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from unchaste conduct." },
        { id: 4, pali: "Musāvādā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from false speech." },
        { id: 5, pali: "Surā-meraya-majja-pamādaṭṭhānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from liquor, wine and intoxicants that cause heedlessness." },
        { id: 6, pali: "Vikāla-bhojanā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from eating at the wrong time." },
        { id: 7, pali: "Nacca-gīta vādita visūka-dassana mālāgandha vilepana dhāraṇa maṇḍana", en: "From dancing, singing, music and shows, from wearing garlands, perfumes and cosmetics, from adornment" },
        { id: 8, pali: "vibhūsanaṭṭhānā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "and beautification: I undertake the training rule to refrain from these." },
        { id: 9, pali: "Uccā-sayana mahā-sayanā veramaṇī sikkhā-padaṁ samādiyāmi.", en: "I undertake the training rule to refrain from high and luxurious beds." },
      ],
      refs: [{ label: "AN 8.41", uid: "an8.41" }],
    },
  ],
} satisfies Chant;

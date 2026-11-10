import type { Chant } from '../../types.ts';

export const chant = {
  id: "0040",
  slug: "ti-loka-vijaya-raja-patti-dana-gatha",
  title: "Verses on Sharing Goodness of the Conqueror of the Three Worlds",
  paliTitle: "Ti-loka-vijaya-rāja-patti-dāna-gāthā",
  groups: [{ group: "reflections", order: 130 }, { group: "joy-and-ceremony", order: 270 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#ti-loka", categories: [{ category: "Reflections", order: 13 }] },
  translation: "draft",
  editorial: [
    { status: "open", note: "The reference *Apadāna 4* is not confirmed: Therāpadāna 4, the likely text, has none of the chant's lines. It is shown without a link." },
    { status: "open", lines: [4], note: "English to review: *ti-dase sugataṁ kataṁ* is uncertain. The draft reads it as a deed that leads well to the heaven of the Thirty (*tidasa*)." },
    { status: "open", note: "English title to review: a literal rendering of the Pali title; the conqueror of the three worlds is not named in the verses." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Yaṅ kiñci kusalaṁ kammaṁ", en: "Whatever skilful action" },
        { id: 2, pali: "kattabbaṁ kiriyaṁ mama", en: "I have to do," },
        { id: 3, pali: "Kāyena vācā manasā", en: "by body, speech or mind," },
        { id: 4, pali: "ti-dase sugataṁ kataṁ", en: "well done, leading to the heaven of the Thirty:" },
        { id: 5, pali: "Ye sattā saññino atthi", en: "to beings who have perception" },
        { id: 6, pali: "ye ca sattā asaññino", en: "and to beings without perception," },
        { id: 7, pali: "Kataṁ puñña-phalaṁ mayhaṁ", en: "in the fruit of the goodness I have made" },
        { id: 8, pali: "sabbe bhāgī bhavantu te", en: "may they all have a share." },
        { id: 9, pali: "Ye taṁ kataṁ suviditaṁ", en: "Those who know well what I have done," },
        { id: 10, pali: "dinnaṁ puñña-phalaṁ mayā", en: "the fruit of goodness I have given," },
        { id: 11, pali: "Ye ca tattha na jānanti", en: "and those there who do not know of it," },
        { id: 12, pali: "devā gantvā nivedayuṁ", en: "may the devas go and let them know." },
        { id: 13, pali: "Sabbe lokamhi ye sattā", en: "All beings in the world" },
        { id: 14, pali: "jīvant'āhāra-hetukā", en: "who live dependent on food," },
        { id: 15, pali: "Manuññaṁ bhojanaṁ sabbe", en: "may they all receive delightful food" },
        { id: 16, pali: "labhantu mama cetasā.", en: "through my intention." },
      ],
      refs: [{ label: "Apadāna 4" }],
    },
  ],
} satisfies Chant;

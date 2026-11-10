import type { Chant } from '../../types.ts';

export const chant = {
  id: "0037",
  slug: "sabba-patti-dana-gatha",
  title: "Verses on the Sharing of Merit",
  paliTitle: "Sabba-patti-dāna-gāthā",
  groups: [{ group: "reflections", order: 100 }, { group: "joy-and-ceremony", order: 240 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#sabba-patti", categories: [{ category: "Reflections", order: 10 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [11], note: "English to review: *bhummā* is read as \"belonging to the planes\" (*bhūmi*)." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ sabba-patti-dāna-gāthāyo bhaṇāmase", en: "Now let us chant the verses on sharing all goodness.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Puññass'idāni katassa", en: "In the goodness I have now done" },
        { id: 3, pali: "Yān'aññāni katāni me", en: "and in the other good I have done," },
        { id: 4, pali: "Tesañca bhāgino hontu", en: "may they all have a share:" },
        { id: 5, pali: "Sattānantāppamāṇakā", en: "beings without end, beyond measure." },
        { id: 6, pali: "Ye piyā guṇavantā ca", en: "Those dear to me and those of virtue," },
        { id: 7, pali: "Mayhaṁ mātā-pitādayo", en: "my mother, my father and others," },
        { id: 8, pali: "Diṭṭhā me cāpyadiṭṭhā vā", en: "those I have seen and those I have not," },
        { id: 9, pali: "Aññe majjhatta-verino", en: "others, neutral or hostile;" },
        { id: 10, pali: "Sattā tiṭṭhanti lokasmiṁ", en: "beings who live in the world," },
        { id: 11, pali: "Te bhummā catu-yonikā", en: "in all its planes, of the four kinds of birth," },
        { id: 12, pali: "Pañc'eka-catu-vokārā", en: "with five, one or four aggregates," },
        { id: 13, pali: "Saṁsarantā bhavābhave", en: "wandering from existence to existence:" },
        { id: 14, pali: "Ñātaṁ ye patti-dānam-me", en: "those who know of my sharing of goodness," },
        { id: 15, pali: "Anumodantu te sayaṁ", en: "may they themselves rejoice in it." },
        { id: 16, pali: "Ye c'imaṁ nappajānanti", en: "And for those who do not know of it," },
        { id: 17, pali: "Devā tesaṁ nivedayuṁ", en: "may the devas let them know." },
        { id: 18, pali: "Mayā dinnāna-puññānaṁ anumodana-hetunā", en: "Because they rejoice in the goodness I have given," },
        { id: 19, pali: "Sabbe sattā sadā hontu", en: "may all beings always be" },
        { id: 20, pali: "Averā sukha-jīvino", en: "free from enmity, living happily." },
        { id: 21, pali: "Khemappadañca pappontu", en: "May they reach the place of safety," },
        { id: 22, pali: "Tesāsā sijjhataṁ subhā", en: "and may their good hopes be fulfilled." },
      ],
    },
  ],
} satisfies Chant;

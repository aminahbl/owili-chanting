import type { Chant } from '../../types.ts';

export const chant = {
  id: "puggalapannatti",
  title: "Opening of the Puggalapaññatti",
  paliTitle: "Puggalapaññatti",
  groups: [{ group: "funeral", order: 5 }],
  paliSource: { label: "Bhikkhu Manual, Funeral Chants", url: "https://bhikkhu-manual.github.io/chants/funeral-chants.html#puggalapannatti" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Cha paññattiyo khandhapaññatti, āyatanapaññatti, dhātupaññatti, saccapaññatti,", en: "Six designations: the designation of aggregates, of sense bases, of elements, of truths," },
        { id: 2, pali: "indriyapaññatti, puggalapaññattī'ti.", en: "of faculties, and of persons." },
      ],
    },
    {
      lines: [
        { id: 3, pali: "Kittāvatā puggalānaṁ puggalapaññatti.", en: "How far is there the designation of persons?" },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Samayavimutto, asamayavimutto,", en: "One released at times, one released not at times," },
        { id: 5, pali: "kuppadhammo, akuppadhammo,", en: "one of shakeable nature, one of unshakeable nature," },
        { id: 6, pali: "parihānadhammo, aparihānadhammo,", en: "one liable to fall away, one not liable to fall away," },
        { id: 7, pali: "cetanābhabbo, anurakkhaṇābhabbo,", en: "one capable through intention, one capable through guarding," },
        { id: 8, pali: "puthujjano, gotrabhū,", en: "an ordinary person, one of the noble lineage," },
        { id: 9, pali: "bhayūparato, abhayūparato,", en: "one restrained through fear, one restrained without fear," },
        { id: 10, pali: "bhabbāgamano, abhabbāgamano,", en: "one able to progress, one unable to progress," },
        { id: 11, pali: "niyato, aniyato,", en: "one who is fixed, one who is not fixed," },
        { id: 12, pali: "paṭipannako, phaleṭhito,", en: "one on the path, one established in the fruit," },
        { id: 13, pali: "arahā, arahattāya paṭipanno.", en: "a worthy one, one practising for worthiness." },
      ],
      refs: [{ label: "Pp 1.1", uid: "pp1.1" }],
    },
  ],
} satisfies Chant;

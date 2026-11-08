import type { Chant } from '../types.ts';

export const chant = {
  id: "abhaya-paritta",
  title: "The Danger-free Protection",
  paliTitle: "Abhaya-paritta",
  groups: [{ group: "parittas", subgroup: "Core Sequence", order: 23 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#yan-dunnimittam" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Yan-dunnimittaṁ avamaṅgalañ-ca", en: "Whatever bad omen, whatever ill luck," },
        { id: 2, pali: "Yo cāmanāpo sakuṇassa saddo", en: "whatever displeasing cry of a bird," },
        { id: 3, pali: "Pāpaggaho dussupinaṁ akantaṁ", en: "evil planets, unwelcome bad dreams:" },
        { id: 4, pali: "Buddhānubhāvena vināsamentu", en: "by the power of the Buddha may they come to nothing." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Yan-dunnimittaṁ avamaṅgalañ-ca", en: "Whatever bad omen, whatever ill luck," },
        { id: 6, pali: "Yo cāmanāpo sakuṇassa saddo", en: "whatever displeasing cry of a bird," },
        { id: 7, pali: "Pāpaggaho dussupinaṁ akantaṁ", en: "evil planets, unwelcome bad dreams:" },
        { id: 8, pali: "Dhammānubhāvena vināsamentu", en: "by the power of the Dhamma may they come to nothing." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Yan-dunnimittaṁ avamaṅgalañ-ca", en: "Whatever bad omen, whatever ill luck," },
        { id: 10, pali: "Yo cāmanāpo sakuṇassa saddo", en: "whatever displeasing cry of a bird," },
        { id: 11, pali: "Pāpaggaho dussupinaṁ akantaṁ", en: "evil planets, unwelcome bad dreams:" },
        { id: 12, pali: "Saṅghānubhāvena vināsamentu", en: "by the power of the Saṅgha may they come to nothing." },
      ],
    },
    {
      lines: [
        { id: 13, cue: "The sipsong tamnaan sequence ends here and continues with the closing sequence." },
      ],
    },
  ],
} satisfies Chant;

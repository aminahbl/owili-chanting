import type { Chant } from '../../types.ts';

export const chant = {
  id: "recollection-of-the-buddha",
  title: "Recollection of the Buddha",
  groups: [{ group: "evening", order: 1 }],
  paliSource: { label: "Bhikkhu Manual, Evening Chanting", url: "https://bhikkhu-manual.github.io/chants/evening-chanting.html#b-sati-pli" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ buddhānussatinayaṁ karomase", en: "Now let us chant the recollection of the Buddha.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Taṁ kho pana bhagavantaṁ evaṁ kalyāṇo kittisaddo abbhuggato", en: "This fine report of the Gracious One has spread far and wide:" },
        { id: 3, pali: "Itipi so bhagavā arahaṁ sammāsambuddho", en: "Such indeed is the Gracious One: worthy, perfectly self-awakened," },
        { id: 4, pali: "Vijjācaraṇa-sampanno sugato lokavidū", en: "accomplished in knowledge and conduct, well-gone, knower of the worlds," },
        { id: 5, pali: "Anuttaro purisadamma-sārathi satthā deva-manussānaṁ buddho bhagavā'ti", en: "unsurpassed guide of those ready to be trained, teacher of devas and humans, awakened, the Gracious One." },
      ],
    },
  ],
} satisfies Chant;

import type { Chant } from '../../types.ts';

export const chant = {
  id: "0010",
  slug: "recollection-of-the-buddha",
  title: "Recollection of the Buddha",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/evening-chanting.tex#L60", categories: [{ category: "Evening Chanting", order: 3 }] },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Taṁ kho pana bhagavantaṁ evaṁ kalyāṇo kittisaddo abbhuggato", en: "This fine report of the Gracious One has spread far and wide:" },
        { id: 2, pali: "Itipi so bhagavā arahaṁ sammāsambuddho", en: "Such indeed is the Gracious One: worthy, perfectly self-awakened," },
        { id: 3, pali: "Vijjācaraṇa-sampanno sugato lokavidū", en: "accomplished in knowledge and conduct, well-gone, knower of the worlds," },
        { id: 4, pali: "Anuttaro purisadamma-sārathi satthā deva-manussānaṁ buddho bhagavā'ti", en: "unsurpassed guide of those ready to be trained, teacher of devas and humans, awakened, the Gracious One." },
      ],
    },
  ],
} satisfies Chant;

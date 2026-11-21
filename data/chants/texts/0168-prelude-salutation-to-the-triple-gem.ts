import type { Chant } from '../../types.ts';

export const chant = {
  id: "0168",
  slug: "prelude-salutation-to-the-triple-gem",
  title: "Prelude · Salutation to the Triple Gem",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/morning-chanting.tex#L354" },
  translation: "draft",
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ ratanattaya-paṇāma-gāthāyo c'eva", en: "Now let us chant the verses of salutation to the Triple Gem", leader: true },
        { id: 2, pali: "saṁvega-parikittana-pāṭhañca bhaṇāmase", en: "and the passage that awakens a sense of urgency.", leader: true },
      ],
    },
  ],
} satisfies Chant;

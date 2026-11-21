import type { Chant } from '../../types.ts';

export const chant = {
  id: "0029",
  slug: "five-subjects-for-frequent-recollection",
  title: "Five Subjects for Frequent Recollection",
  paliSource: { label: "Community Chanting Book, Volume One", url: "https://github.com/profound-labs/community-chanting-book/blob/55d625dc81d25483d760877ce4c2f304caa8bcc4/chapters/english/reflections-and-recollections-p1.tex#L722", categories: [{ category: "Reflections & Recollections", order: 10 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [6], note: "AN 5.57 has *bhavissāmī* where the chanting book has *bhavissāmi*. Kept as the chanting book prints it." },
    { status: "changed", note: "The chanting book prints this chant twice, under \"Men Chant\" and \"Women Chant\". The two are merged into one chant with both forms." },
    { status: "open", lines: [5], note: "English to review: about 95 characters. The five terms are kept in full because the chant lists them." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: { men: "{Jarā-dhammomhi} jaraṁ anatīto", women: "{Jarā-dhammāmhi} jaraṁ anatītā" }, en: "{I am of the nature to age;} I have not gone beyond ageing." },
        { id: 2, pali: { men: "Byādhi-dhammomhi byādhiṁ anatīto", women: "Byādhi-dhammāmhi byādhiṁ anatītā" }, en: "I am of the nature to sicken; I have not gone beyond sickness." },
        { id: 3, pali: { men: "Maraṇa-dhammomhi maraṇaṁ anatīto", women: "Maraṇa-dhammāmhi maraṇaṁ anatītā" }, en: "I am of the nature to die; I have not gone beyond dying." },
      ],
    },
    {
      lines: [
        { id: 4, pali: "Sabbehi me piyehi manāpehi nānābhāvo vinābhāvo", en: "I will be parted and separated from all that is dear and pleasing to me." },
      ],
    },
    {
      lines: [
        { id: 5, pali: { men: "Kammassakomhi kammadāyādo kammayoni kammabandhu kammapaṭisaraṇo", women: "Kammassakāmhi kammadāyādā kammayoni kammabandhu kammapaṭisaraṇā" }, en: "I am the owner of my actions, heir to them, born of them, bound to them, with them as my refuge." },
        { id: 6, pali: { men: "Yaṁ kammaṁ karissāmi, kalyāṇaṁ vā pāpakaṁ vā, tassa dāyādo bhavissāmi", women: "Yaṁ kammaṁ karissāmi, kalyāṇaṁ vā pāpakaṁ vā, tassa dāyādā bhavissāmi" }, en: "Whatever I do, good or bad, of that I will be the heir." },
      ],
    },
    {
      lines: [
        { id: 7, pali: "Evaṁ amhehi abhiṇhaṁ paccavekkhitabbaṁ", en: "Thus we should frequently recollect." },
      ],
      refs: [{ label: "AN 5.57", uid: "an5.57" }],
    },
  ],
} satisfies Chant;

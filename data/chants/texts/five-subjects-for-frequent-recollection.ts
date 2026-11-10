import type { Chant } from '../../types.ts';

export const chant = {
  id: "five-subjects-for-frequent-recollection",
  title: "Five Subjects for Frequent Recollection",
  groups: [{ group: "reflections", order: 2 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#jara-dhammomhi", categories: [{ category: "Reflections", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [7], note: "AN 5.57 has *bhavissāmī* where the manual has *bhavissāmi*. Kept as the manual prints it." },
    { status: "changed", note: "The manual prints this chant twice, under \"Men Chant\" and \"Women Chant\". The two are merged into one chant with both forms." },
    { status: "open", lines: [6], note: "English to review: about 95 characters. The five terms are kept in full because the chant lists them." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ abhiṇha-paccavekkhaṇa-pāṭhaṁ bhaṇāmase", en: "Now let us chant the passage for frequent recollection.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: { men: "[Jarā-dhammomhi] jaraṁ anatīto", women: "[Jarā-dhammāmhi] jaraṁ anatītā" }, en: "I am of the nature to age; I have not gone beyond ageing." },
        { id: 3, pali: { men: "Byādhi-dhammomhi byādhiṁ anatīto", women: "Byādhi-dhammāmhi byādhiṁ anatītā" }, en: "I am of the nature to sicken; I have not gone beyond sickness." },
        { id: 4, pali: { men: "Maraṇa-dhammomhi maraṇaṁ anatīto", women: "Maraṇa-dhammāmhi maraṇaṁ anatītā" }, en: "I am of the nature to die; I have not gone beyond dying." },
        { id: 5, pali: "Sabbehi me piyehi manāpehi nānābhāvo vinābhāvo", en: "I will be parted and separated from all that is dear and pleasing to me." },
        { id: 6, pali: { men: "Kammassakomhi kammadāyādo kammayoni kammabandhu kammapaṭisaraṇo", women: "Kammassakāmhi kammadāyādā kammayoni kammabandhu kammapaṭisaraṇā" }, en: "I am the owner of my actions, heir to them, born of them, bound to them, with them as my refuge." },
        { id: 7, pali: { men: "Yaṁ kammaṁ karissāmi, kalyāṇaṁ vā pāpakaṁ vā, tassa dāyādo bhavissāmi", women: "Yaṁ kammaṁ karissāmi, kalyāṇaṁ vā pāpakaṁ vā, tassa dāyādā bhavissāmi" }, en: "Whatever I do, good or bad, of that I will be the heir." },
        { id: 8, pali: "Evaṁ amhehi abhiṇhaṁ paccavekkhitabbaṁ", en: "Thus we should frequently recollect." },
      ],
      refs: [{ label: "AN 5.57", uid: "an5.57" }],
    },
  ],
} satisfies Chant;

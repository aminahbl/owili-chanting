import type { Chant } from '../../types.ts';

export const chant = {
  id: "bhara-sutta-gatha",
  title: "Verses on the Burden",
  paliTitle: "Bhāra-sutta-gāthā",
  groups: [{ group: "parittas", subgroup: "Closing Sequence", order: 34 }],
  paliSource: { label: "Bhikkhu Manual, Parittas", url: "https://bhikkhu-manual.github.io/chants/parittas.html#bhara-sutta" },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [7], note: "SN 22.22 has *taṇham* where the manual has *taṇhaṁ*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Bhārā have pañcakkhandhā", en: "The five aggregates are indeed the burden," },
        { id: 2, pali: "bhāra-hāro ca puggalo", en: "and the person is the carrier of the burden." },
        { id: 3, pali: "Bhār'ādānaṁ dukkhaṁ loke", en: "Taking up the burden is suffering in the world;" },
        { id: 4, pali: "bhāra-nikkhepanaṁ sukhaṁ", en: "putting the burden down is happiness." },
        { id: 5, pali: "Nikkhipitvā garuṁ bhāraṁ", en: "Having put down the heavy burden" },
        { id: 6, pali: "aññaṁ bhāraṁ anādiya", en: "and not taking up another," },
        { id: 7, pali: "Samūlaṁ taṇhaṁ abbuyha", en: "pulling out craving with its root," },
        { id: 8, pali: "nicchāto parinibbuto", en: "one is free from hunger, fully quenched." },
      ],
      refs: [{ label: "SN 22.22", uid: "sn22.22" }],
    },
  ],
} satisfies Chant;

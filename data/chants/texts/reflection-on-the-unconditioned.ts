import type { Chant } from '../../types.ts';

export const chant = {
  id: "reflection-on-the-unconditioned",
  title: "Reflection on the Unconditioned",
  groups: [{ group: "reflections", order: 8 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#unconditioned", categories: [{ category: "Reflections", order: 8 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [6], note: "Ud 8.3 has *paññāyatī* where the manual has *paññāyati*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ nibbāna-sutta-pāṭhaṁ bhaṇāmase", en: "Now let us chant the passage on nibbana.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Atthi bhikkhave ajātaṁ abhūtaṁ akataṁ asaṅkhataṁ", en: "There is, bhikkhus, the unborn, unbecome, unmade, unconditioned." },
        { id: 3, pali: "No cetaṁ bhikkhave abhavissa ajātaṁ abhūtaṁ akataṁ asaṅkhataṁ", en: "If, bhikkhus, there were not the unborn, unbecome, unmade, unconditioned," },
        { id: 4, pali: "Na yidaṁ jātassa bhūtassa katassa saṅkhatassa nissaraṇaṁ paññāyetha", en: "no escape would be found here from the born, become, made, conditioned." },
        { id: 5, pali: "Yasmā ca kho bhikkhave atthi ajātaṁ abhūtaṁ akataṁ asaṅkhataṁ", en: "But because there is, bhikkhus, the unborn, unbecome, unmade, unconditioned," },
        { id: 6, pali: "Tasmā jātassa bhūtassa katassa saṅkhatassa nissaraṇaṁ paññāyati", en: "an escape is found from the born, become, made, conditioned." },
      ],
      refs: [{ label: "Ud 8.3", uid: "ud8.3" }],
    },
  ],
} satisfies Chant;

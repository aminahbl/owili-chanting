import type { Chant } from '../../types.ts';

export const chant = {
  id: "devat-adissa-dakkhina-numodana-gatha",
  title: "Dedicating Offerings to the Devas",
  paliTitle: "Devat'ādissa-dakkhiṇā'numodanā-gāthā",
  groups: [{ group: "anumodana", order: 14 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/anumodana.html#devat-adissa", categories: [{ category: "Anumodanā", order: 14 }] },
  translation: "draft",
  editorial: [
    { status: "kept", lines: [12], note: "Kd 6 has *passatī* where the manual has *passati*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Yasmiṁ padese kappeti", en: "In whatever place" },
        { id: 2, pali: "vāsaṁ paṇḍita-jātiyo", en: "a wise person makes their home," },
        { id: 3, pali: "Sīlavant'ettha bhojetvā", en: "having fed the virtuous there," },
        { id: 4, pali: "saññate brahma-cārino", en: "the restrained who live the holy life," },
        { id: 5, pali: "Yā tattha devatā āsuṁ", en: "to the devas who are there" },
        { id: 6, pali: "tāsaṁ dakkhiṇam-ādise", en: "they should dedicate the offering." },
        { id: 7, pali: "Tā pūjitā pūjayanti", en: "Honoured, they honour them;" },
        { id: 8, pali: "mānitā mānayanti naṁ", en: "respected, they respect them." },
        { id: 9, pali: "Tato naṁ anukampanti", en: "Then they care for them" },
        { id: 10, pali: "mātā puttaṁ va orasaṁ", en: "as a mother for her own child." },
        { id: 11, pali: "Devatā'nukampito poso", en: "A person cared for by the devas" },
        { id: 12, pali: "sadā bhadrāni passati", en: "always sees good things." },
      ],
      refs: [{ label: "Kd 6", uid: "pli-tv-kd6" }],
    },
  ],
} satisfies Chant;

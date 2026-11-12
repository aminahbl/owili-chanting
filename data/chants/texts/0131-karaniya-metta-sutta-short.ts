import type { Chant } from '../../types.ts';

export const chant = {
  id: "0131",
  slug: "karaniya-metta-sutta-short",
  title: "The Buddha's Words on Love (short)",
  paliTitle: "Karaṇīya-metta-sutta (short)",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#karaniyam-attha" },
  translation: "draft",
  links: [{ text: "Word-by-word analysis", href: "https://pali-sutta-readings.github.io/readings/2026-04-08/" }],
  editorial: [
    { status: "kept", lines: [1], note: "Snp 1.8 has *sabba-lokasmim* where the manual has *sabba-lokasmiṁ*. Kept as the manual prints it." },
    { status: "kept", lines: [2], note: "Snp 1.8 has *Mānasaṁ-bhāvaye* where the manual has *Mānasam-bhāvaye*. Kept as the manual prints it." },
    { status: "kept", lines: [4], note: "Snp 1.8 has *averam* where the manual has *averaṁ*. Kept as the manual prints it." },
    { status: "kept", lines: [8], note: "Snp 1.8 has *vihāram* where the manual has *vihāraṁ*. Kept as the manual prints it." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Mettañ-ca sabba-lokasmiṁ", en: "With warmth for all the world," },
        { id: 2, pali: "Mānasam-bhāvaye aparimāṇaṁ", en: "let one cultivate a boundless heart," },
        { id: 3, pali: "Uddhaṁ adho ca tiriyañ-ca", en: "above, below and all around," },
        { id: 4, pali: "Asambādhaṁ averaṁ asapattaṁ", en: "unobstructed, without enmity, without hostility." },
      ],
    },
    {
      lines: [
        { id: 5, pali: "Tiṭṭhañ-caraṁ nisinno vā", en: "Standing, walking or sitting," },
        { id: 6, pali: "Sayāno vā yāvat'assa vigata-middho", en: "or lying down, as long as one is awake," },
        { id: 7, pali: "Etaṁ satiṁ adhiṭṭheyya", en: "one should resolve on this mindfulness:" },
        { id: 8, pali: "Brahmam-etaṁ vihāraṁ idham-āhu", en: "this, they say, is a divine abiding here." },
      ],
    },
    {
      lines: [
        { id: 9, pali: "Diṭṭhiñca anupagamma", en: "Not holding to views," },
        { id: 10, pali: "Sīlavā dassanena sampanno", en: "virtuous and endowed with vision," },
        { id: 11, pali: "Kāmesu vineyya gedhaṁ", en: "having removed greed for sensual pleasures," },
        { id: 12, pali: "Na hi jātu gabbha-seyyaṁ punaretī'ti", en: "one does not come again to lie in a womb." },
      ],
      refs: [{ label: "Snp 1.8", uid: "snp1.8" }],
    },
  ],
} satisfies Chant;

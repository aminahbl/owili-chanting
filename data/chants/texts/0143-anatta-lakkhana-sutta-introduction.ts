import type { Chant } from '../../types.ts';

export const chant = {
  id: "0143",
  slug: "anatta-lakkhana-sutta-introduction",
  title: "Introduction to the Characteristic of Not-Self",
  paliTitle: "Yantaṁ sattehi",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/suttas.html#anatta-lakkhana", categories: [{ category: "Suttas", order: 2 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [1, 2, 3, 4, 5, 6, 7, 8], note: "English to review: the introduction is a later verse composition with long compounds; the draft follows the commentarial reading." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Yantaṁ sattehi dukkhena ñeyyaṁ anattalakkhaṇaṁ", en: "The characteristic of not-self, hard for beings to know,", solo: true },
        { id: 2, pali: "Attavādattasaññāṇaṁ sammadeva vimocanaṁ", en: "which rightly releases from the doctrine and perception of a self,", solo: true },
        { id: 3, pali: "Sambuddho taṁ pakāsesi diṭṭhasaccāna yoginaṁ", en: "the Awakened One made known to the practitioners who had seen the truths,", solo: true },
        { id: 4, pali: "Uttariṁ paṭivedhāya bhāvetuṁ ñāṇamuttamaṁ", en: "so that they could develop the highest knowledge for further penetration;", solo: true },
        { id: 5, pali: "Yantesaṁ diṭṭhadhammānam ñāṇenupaparikkhataṁ", en: "and when they had examined it with knowledge, having seen the Dhamma,", solo: true },
        { id: 6, pali: "Sabbāsavehi cittāni vimucciṁsu asesato", en: "their minds were released from all taints without remainder.", solo: true },
        { id: 7, pali: "Tathā ñāṇānussārena sāsanaṁ kātumicchataṁ", en: "Likewise, for the good who wish to follow the teaching with knowledge,", solo: true },
        { id: 8, pali: "Sādhūnaṁ atthasiddhatthaṁ taṁ suttantaṁ bhaṇāma se", en: "for the success of their aim, let us chant that discourse.", solo: true },
      ],
    },
  ],
} satisfies Chant;

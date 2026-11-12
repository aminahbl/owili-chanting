import type { Chant } from '../../types.ts';

export const chant = {
  id: "0144",
  slug: "aditta-pariyaya-sutta-introduction",
  title: "Introduction to the Fire Sermon",
  paliTitle: "Veneyyadamanopāye sabbaso",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/suttas.html#aditta-pariyaya", categories: [{ category: "Suttas", order: 3 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [1, 2, 3, 4, 5, 6, 7, 8], note: "English to review: the introduction is a later verse composition with long compounds; the draft follows the commentarial reading." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Veneyyadamanopāye sabbaso pāramiṁ gato", en: "Gone in every way to perfection in the means of taming those to be trained,", solo: true },
        { id: 2, pali: "Amoghavacano buddho abhiññāyānusāsako", en: "the Buddha, whose words are never in vain, teaching from direct knowledge,", solo: true },
        { id: 3, pali: "Ciṇṇānurūpato cāpi dhammena vinayaṁ pajaṁ", en: "and in keeping with what they had practised, training people by the Dhamma,", solo: true },
        { id: 4, pali: "Ciṇṇāggipāricariyānaṁ sambojjhārahayoginaṁ", en: "for the former fire-worshippers, practitioners ready for awakening,", solo: true },
        { id: 5, pali: "Yamādittapariyāyaṁ desayanto manoharaṁ", en: "taught the delightful Discourse on Burning,", solo: true },
        { id: 6, pali: "Te sotāro vimocesi asekkhāya vimuttiyā", en: "and freed those listeners with the release of those beyond training.", solo: true },
        { id: 7, pali: "Tathevopaparikkhāya viññūṇaṁ sotumicchataṁ", en: "Likewise, for the wise who wish to hear and examine it,", solo: true },
        { id: 8, pali: "Dukkhatālakkhaṇopāyaṁ taṁ suttantaṁ bhaṇāma se", en: "let us chant that discourse, a means to the mark of suffering.", solo: true },
      ],
    },
  ],
} satisfies Chant;

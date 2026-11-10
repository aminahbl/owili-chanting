import type { Chant } from '../../types.ts';

export const chant = {
  id: "0046",
  slug: "the-guardian-meditations",
  title: "The Guardian Meditations",
  groups: [{ group: "reflections", order: 190 }],
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/reflections.html#guardian", categories: [{ category: "Reflections", order: 19 }] },
  translation: "draft",
  editorial: [
    { status: "open", lines: [8], note: "English to review: *yogato ca pabodhā ca* is compressed. The draft reads *pabodha* as awakening others; it may also mean his own awakening." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Handa mayaṁ catur'ārakkhā-kammaṭṭhāna-pāṭhaṁ bhaṇāmase", en: "Now let us chant the four guardian meditations.", leader: true },
      ],
    },
    {
      lines: [
        { id: 2, pali: "Buddhānussati mettā ca", en: "Recollection of the Buddha, warmth," },
        { id: 3, pali: "Asubhaṁ maraṇassati", en: "unattractiveness and mindfulness of death:" },
        { id: 4, pali: "Iccimā catur'ārakkhā", en: "these are the four guardians," },
        { id: 5, pali: "Kātabbā ca vipassanā.", en: "and insight should be practised." },
        { id: 6, pali: "Visuddha-dhamma-santāno", en: "His stream of being purified," },
        { id: 7, pali: "Anuttarāya bodhiyā", en: "through unsurpassed awakening," },
        { id: 8, pali: "Yogato ca pabodhā ca", en: "by his practice and by awakening others," },
        { id: 9, pali: "Buddho Buddho'ti ñāyate.", en: "he is known as 'Buddha, Buddha'." },
        { id: 10, pali: "Narānara-tiracchāna-", en: "Humans, non-humans and animals:" },
        { id: 11, pali: "bhedā sattā sukhesino,", en: "beings of every kind wish for happiness." },
        { id: 12, pali: "Sabbe pi sukhino hontu", en: "May all of them be happy," },
        { id: 13, pali: "Sukhitattā ca khemino.", en: "happy in themselves and safe." },
        { id: 14, pali: "Kesa-lomādi-chavānaṁ", en: "Of head hairs, body hairs and other vile things" },
        { id: 15, pali: "Ayam'eva samussayo", en: "is this body made up;" },
        { id: 16, pali: "Kāyo sabbo pi jeguccho", en: "the whole body is disgusting," },
        { id: 17, pali: "Vaṇṇādito paṭikkulo.", en: "repulsive in colour and the rest." },
        { id: 18, pali: "Jīvit'indriy'upaccheda-", en: "Death, which is the cutting off" },
        { id: 19, pali: "saṅkhāta-maraṇaṁ siyā", en: "of the life faculty, will come" },
        { id: 20, pali: "Sabbesaṁ pīdha pāṇīnaṁ", en: "to every living being here," },
        { id: 21, pali: "Tañ-hi dhuvaṁ na jīvitaṁ.", en: "for death is certain, not life." },
      ],
    },
  ],
} satisfies Chant;

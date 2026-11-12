import type { Chant } from '../../types.ts';

export const chant = {
  id: "0067",
  slug: "jaya-paritta",
  title: "Victory Protection",
  paliTitle: "Jaya-paritta",
  paliSource: { label: "Bhikkhu Manual", url: "https://bhikkhu-manual.github.io/chants/parittas.html#maha-karuniko", categories: [{ category: "Parittas", subcategory: "Closing Sequence", order: 26 }] },
  translation: "draft",
  links: [{ text: "Word-by-word analysis", href: "https://pali-sutta-readings.github.io/readings/2025-08-19/" }],
  sections: [
    {
      lines: [
        { id: 1, pali: "Mahā-kāruṇiko nātho", en: "The great compassionate Protector," },
        { id: 2, pali: "Hitāya sabba-pāṇinaṁ", en: "for the welfare of all living beings," },
        { id: 3, pali: "Pūretvā pāramī sabbā", en: "fulfilled all the perfections" },
        { id: 4, pali: "Patto sambodhim-uttamaṁ", en: "and reached supreme awakening." },
        { id: 5, pali: "Etena sacca-vajjena", en: "By the speaking of this truth," },
        { id: 6, pali: "Hotu te jaya-maṅgalaṁ", en: "may you have the blessing of victory." },
      ],
    },
    {
      title: "Jayanto bodhiyā mūle",
      lines: [
        { id: 7, cue: "This part is sometimes chanted on its own" },
        { id: 8, pali: "Jayanto bodhiyā mūle", en: "Victorious at the foot of the Bodhi tree," },
        { id: 9, pali: "Sakyānaṁ nandi-vaḍḍhano", en: "he who increased the Sakyans' joy:" },
        { id: 10, pali: "Evaṁ tvaṁ vijayo hohi", en: "so may you be victorious;" },
        { id: 11, pali: "Jayassu jaya-maṅgale", en: "may you win the blessing of victory." },
        { id: 12, pali: "Aparājita-pallaṅke", en: "On the unconquered seat," },
        { id: 13, pali: "Sīse paṭhavi-pokkhare", en: "at the highest point of the earth's lotus," },
      ],
    },
    {
      lines: [
        { id: 14, pali: "Abhiseke sabba-buddhānaṁ", en: "consecrated by all the Buddhas," },
        { id: 15, pali: "Aggappatto pamodati", en: "he rejoices, having reached the summit." },
        { id: 16, pali: "Sunakkhattaṁ sumaṅgalaṁ", en: "A good star, a good blessing," },
        { id: 17, pali: "Supabhātaṁ suhuṭṭhitaṁ", en: "a good dawn, a good rising," },
        { id: 18, pali: "Sukhaṇo sumuhutto ca", en: "a good moment, a good time," },
        { id: 19, pali: "Suyiṭṭhaṁ brahma-cārisu", en: "is a good offering to those who live the holy life." },
      ],
    },
    {
      lines: [
        { id: 20, pali: "Padakkhiṇaṁ kāya-kammaṁ", en: "Auspicious are the deeds of body," },
        { id: 21, pali: "Vācā-kammaṁ padakkhiṇaṁ", en: "auspicious the deeds of speech," },
        { id: 22, pali: "Padakkhiṇaṁ mano-kammaṁ", en: "auspicious the deeds of mind," },
        { id: 23, pali: "Paṇidhi te padakkhiṇā", en: "your aspirations are auspicious." },
        { id: 24, pali: "Padakkhiṇāni katvāna", en: "Having done what is auspicious," },
        { id: 25, pali: "Labhant'atthe padakkhiṇe", en: "one gains auspicious benefits." },
      ],
      refs: [{ label: "AN 3.155", uid: "an3.155" }],
    },
  ],
} satisfies Chant;

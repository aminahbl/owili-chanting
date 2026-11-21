import type { Chant } from '../../types.ts';

export const chant = {
  id: "0191",
  slug: "etena-sacca-vajjena",
  title: "Blessing of Truth",
  paliTitle: "Etena sacca-vajjena",
  paliSource: { label: "Transcribed from a recording of the Girimānanda Sutta (Samatha Trust, Pali Chants library)", url: "https://www.libib.com/u/palichant?solo=107740209" },
  translation: "draft",
  editorial: [
    { status: "open", note: "Transcribed from the recording that closes with it, where it follows the Girimānanda Sutta. No printed source has been found. The second half of each line also ends a stanza of *Sakkatvā buddharatanaṁ* (0061)." },
  ],
  sections: [
    {
      lines: [
        { id: 1, pali: "Etena sacca-vajjena dukkhā vūpasamentu te", en: "By the speaking of this truth, may your sufferings be stilled." },
        { id: 2, pali: "Etena sacca-vajjena bhayā vūpasamentu te", en: "By the speaking of this truth, may your fears be stilled." },
        { id: 3, pali: "Etena sacca-vajjena rogā vūpasamentu te", en: "By the speaking of this truth, may your illnesses be stilled." },
      ],
    },
  ],
} satisfies Chant;

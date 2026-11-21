# Translation files

Each `.txt` file in this folder is a published translation of one chant, in the format of the site's translation export. The build places each chant's translations in its page, and the settings offer them under **Translation**, beside the site's English, with the translator's credit and licence. Each translator's files are described in a section below. How users choose a translation is described in the guide ([pages/guide.html](../../../pages/guide.html#translation)), and how the data fits together in [DATA.md](../../DATA.md#translation-files).

## Quick guide: add a translation file

1. Check that the translation's licence allows it to be shared as published. Keep its wording exactly as published.
2. Name the file `<number>-<translator>-<slug>.txt`, for example `0005-amaravati-homage-to-the-buddha.txt`. A new translator is added to [translators.ts](../../translators.ts), with the name the settings show, the credit, the URL of its source and the licence. Describe its files in a section of this file.
3. Start the file with `[lang:<code>]` and `[ti:<translator>]`, then comment rows giving the copyright holder and publisher, the source with a link to the chant in it, on a row of its own, the licence with a link, any changes of notation, and a statement that the file is not covered by the repository's licence.
4. Add `[chant:<number> <slug>]`, then one row per line: the line's number and its translation, with the line's Pali in a `#` row above it.
5. Run `npm run build`. It checks each file against its chant's lines and stops on a translator not in `translators.ts`, a file without a link to the chant in its source, a row for an unknown line, a row for a cue, or a line given twice.

When a chant's lines are renumbered, its rows here are renumbered with them. The build names any row that no longer fits.

## The Amaravati translations

The files named `<number>-amaravati-<slug>.txt` hold the English of Amaravati Buddhist Monastery, taken from the [Community Chanting Book](https://github.com/profound-labs/community-chanting-book), the LaTeX source project of the *Chanting Book* published by Amaravati Publications. The English is that of Volume One, printed in the web edition of 2024-12-26 ([PDF](https://abhayagiri.org/media/Chanting-Book-EN-Vol-1-Web-2024-12-26.pdf)).

- **Licence.** The book is licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/). The text may be shared unaltered for non-commercial purposes, with credit, and may not be changed. Corrections to the wording are a matter for the publisher, not for these files.
- **On the site.** The settings offer these files as **Amaravati Buddhist Monastery**. When it is chosen, the settings show the credit and the licence. The words "English translation" in the credit link to the chant's chapter in the Community Chanting Book, or to the project on a set page.
- **Credit.** Each file names Amaravati Buddhist Monastery as the copyright holder and Amaravati Publications as the publisher, and links to the chant's chapter in the Community Chanting Book and to its page in the PDF.
- **Notation.** Tone marks are left out, the leader's words are written in curly brackets instead of square ones, and lines that wrap in print are joined. Where a whole line is the leader's, its brackets are left out, as for any leader line.
- **Line pairs.** Each English line is chanted with one Pali line. Where the book pairs the lines, the files follow its pairs, and the chant's Pali lines are divided as the book divides them. Where the book pairs a stanza or paragraph as a whole, or prints the English on the facing page with line breaks of its own, the pairing is ours, with the words and their order unchanged. Each file says which applies to it.
- **Source text.** The text was taken from the Community Chanting Book at commit 55d625d, and the links point to that commit. It was checked line by line against the 2024-12-26 PDF.
- **Preludes.** Where the book gives English for a chant's announcement, the prelude chant has a file of its own.

## The Ānandajoti Bhikkhu translations

The files named `<number>-anandajoti-<slug>.txt` hold the English of Ānandajoti Bhikkhu, from his chanting collections on [Ancient Buddhist Texts](https://ancient-buddhist-texts.net/Texts-and-Translations/): Safeguard Recitals, Daily Chanting, Chanting for Meditators and Thai Chanting. Each page gives the Pali and the English line by line.

- **Licence.** Ānandajoti Bhikkhu's translations are licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), as the site's [copyright notice](https://ancient-buddhist-texts.net/Miscellaneous/Copyright-Notice.htm) states. The English may be shared and adapted, with credit to Ānandajoti Bhikkhu, and an adaptation must be shared under the same licence. The files are licensed under CC BY-SA 3.0.
- **On the site.** The settings offer these files as **Ānandajoti Bhikkhu**. When it is chosen, the settings show the credit and the licence. The words "English translation" in the credit link to the page the chant is taken from.
- **Credit.** Each file names Ānandajoti Bhikkhu as the copyright holder and links to the page of the collection the English is taken from.
- **Line pairs.** The words are as published. Each English line is placed with the line of the chant it translates. Where a chant line holds several of the source's lines, their English is joined. Where a source line holds several of the chant's lines, its English is divided at its commas, which divide the Pali at the same places. Each file says which applies to it.
- **Notation.** Asterisks that mark a change of word order are left out. Where the English follows the Pali's word order, the leader's words at the start of a line are marked with curly brackets.
- **Coverage.** A chant has a file only where every one of its lines could be paired in this way. Many of the source's lines hold a whole half-verse that the site divides into two lines, and these cannot be divided without rewording the English.

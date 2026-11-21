# Chants from recordings

This is how to add a new chant whose lines follow a recording. The chanter's breaths decide where each line breaks, and the chant's timing file is made at the same time. It works for any chant whose text is available as plain text. A sutta from SuttaCentral's [bilara-data](https://github.com/suttacentral/bilara-data) comes already divided into segments and paragraphs, which makes it the most predictable case.

To time a recording of a chant the site already has, see [timings/TIMINGS.md](timings/TIMINGS.md) instead.

## Quick guide

1. Check that the recording needs a new chant ([details](#a-new-chant-or-an-existing-one)).
2. Get the recording, and make a constant-bitrate copy to check the timing with ([details](#the-recording)).
3. Find the pauses:
   `ffmpeg -hide_banner -nostats -i audio.mp3 -af silencedetect=noise=-30dB:d=0.3 -f null - 2> pauses.txt`
4. Get the text, as a bilara root file (`.json`) or a plain text file, and remove the words the chanters leave out ([details](#the-text)).
5. In Audacity, label the first minute or two of the text by hand, and export the labels as `checked.txt` ([details](#the-first-lines)).
6. Draft the next stretch:
   `node scripts/timings.ts draft pauses.txt <text> checked.txt > next.txt`
7. Check `next.txt` in Audacity, and add the correct labels to the end of `checked.txt` ([details](#drafting-stretch-by-stretch)). Repeat steps 6 and 7 to the end of the recording.
8. Write the chant module, then fill in its title, source and editorial notes ([details](#the-chant-module)):
   `node scripts/timings.ts module <text> checked.txt <number> <slug> > data/chants/texts/<number>-<slug>.ts`
9. Add the chant to [ids.ts](../ids.ts) and [groups.ts](../groups.ts), as in [CHANTS.md](CHANTS.md#add-a-chant).
10. Write the timing file, then add the recording's tags at the top ([details](#the-timing-file)):
    `node scripts/timings.ts lrc checked.txt <number> > data/chants/timings/<number>-<chanter>-<slug>.lrc`
11. Run `npm run check` and `npm run build`.
12. On the chant page, play the constant-bitrate copy with Timed advance, moving between lines.
13. When every line has been checked, remove `draft: true` from the module ([details](#ready-for-release)). The English can follow as separate work.

## A new chant or an existing one

A recording whose wording differs from a chant the site already has gets a chant of its own, with its own number. A recording that differs only in spelling, such as *Evam* for *Evaṁ*, uses the existing chant, and is timed as in [TIMINGS.md](timings/TIMINGS.md). Versions of one text are kept as separate chants, for example 0053 and 0131 for the Karaṇīya Metta Sutta.

For a sutta, bilara's variant file lists where other editions differ from the Mahāsaṅgīti text; notes marked `bj` give the Buddha Jayanti Tipiṭaka reading, which Sri Lankan recordings often follow.

## The recording

Keep the audio and all working files out of the repository.

The chant page moves through a long MP3 accurately only if the file has a constant bitrate. In a file made at a variable bitrate, the browser estimates where a time falls, and in a recording of an hour or more it can land several seconds away. The lines then follow the wrong part of the audio. Audacity reads the whole file, so the times measured there are exact for either kind of file, and a constant-bitrate copy keeps the same times. To check a timing on the chant page, make a copy:

```
ffmpeg -i audio.mp3 -ac 1 -b:a 64k audio-64k.mp3
```

## The text

The text is either a bilara root file or a plain text file.

- **A bilara root file** (`.json`) is the sutta's Pali in segments, from `root/pli/ms/` in bilara-data. Its heading segments, whose IDs start with `0.` or end in `.0` or `.0.<n>`, are not chanted and are left out. Each bilara paragraph becomes a section of the chant.
- **A plain text file** has one segment on each line and a blank line between sections. A line may end anywhere the chanters might pause, such as at the end of a sentence or a verse line. The draft ends a chant's lines most easily at the end of a segment.

Make the text match what the chanters say, before drafting:

- **Remove words the chanters leave out.** The draft must find the checked lines' words in the text, in order. For a bilara file, edit a copy.
- **Leave out the closing words of sections,** such as *Cūḷasīlaṁ niṭṭhitaṁ*, and the names of recitation sections, such as *Paṭhamabhāṇavāro*. Keep the chant's own closing words, such as *Brahmajālasuttaṁ niṭṭhitaṁ paṭhamaṁ*.
- **Keep abbreviated repetitions,** such as *…pe…*, as the text prints them. Where the chanters expand one, write the expanded words into the text.
- **Leave out what the chanters add before or after the text,** such as homage or a title. Their breaths get no line.

## The first lines

The first minute or two of the text is labelled by hand. The opening of a recording is the part least like the rest: it may begin with homage and a title, and the first sentence is often slower.

In Audacity, open the audio, add one label for each line, from the line's start to its end, holding the line's words exactly as the text gives them, and export the labels (Export Labels, in the File menu). Label from the text's first words; leave homage and titles unlabelled.

## Drafting stretch by stretch

`node scripts/timings.ts draft` continues the text from the last checked word, over the next 7 minutes of the recording, and prints a label for each line. It takes the pace, and the phrases that recur in the text, from the checked labels, so each checked stretch improves the next draft. How it divides the words is described in [TIMINGS.md](timings/TIMINGS.md#draft).

Import `next.txt` in Audacity beside the recording and play it through. Correct the first wrong label and any after it that are certain, and add the labels up to the last correct one to the end of `checked.txt`. A label ending in ` ?` is the likeliest to need correcting. A label `? no words` marks a breath that holds no words of the text; leave it out of `checked.txt`.

If the recording stops before the text ends, the lines after it are made in the next step.

## The chant module

`node scripts/timings.ts module` prints a chant module:

- one line for each label in `checked.txt`, numbered from 1;
- each line in the section where its first word is;
- after the last label, one line for each segment of the text, to be divided by hand into lines of a similar length to the recorded ones, breaking where the recorded lines break;
- `draft: true`;
- for a bilara text, the SuttaCentral source and the `uid` in the last section's `refs`.

Fill in the title, the Pali title where there is one, and the label of the `refs`. Then add the chant's editorial notes. The usual kinds for a chant from a recording are listed in [DATA.md](../DATA.md#chants).

## The timing file

`node scripts/timings.ts lrc checked.txt <number>` pairs the labels with the chant's lines in order, and prints a row for each line's start, a last row that ends the last label's line, and a row with no time for each line after it. Run it after the module is in place, and again whenever lines are checked or corrected.

Name the file as described in [DATA.md](../DATA.md#timing-files), and add above the rows the tags that describe the recording and a comment that lists its chants and says how far the lines have been checked. [0163-mahamevnawa-brahmajala-sutta.lrc](timings/0163-mahamevnawa-brahmajala-sutta.lrc) is an example of a recording that stops before the text ends.

## Ready for release

A chant made this way keeps `draft: true` until every line has been checked by listening, because its lines may still be divided again and renumbered. The build lists the draft chants after each run. Line IDs may be renumbered until the site is released, and never after, because users' imported timing files refer to them ([DATA.md](../DATA.md#chants)).

New chants may be added with the Pali only. The English follows as separate work, as described in the [translation guide](../translation-guide.md#making-and-reviewing-a-translation); when a line break moves, its English moves with it.

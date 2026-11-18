# Timing files

Each `.lrc` file in this folder is the timing of one recording: when each line of its chants starts. How the files are named, their format, and how the build checks and uses them are described in [DATA.md](../../DATA.md#timing-files).

A timing file can be exported from a chant page, after tapping along or editing it by hand, or made from the recording itself, as described here. To make a new chant whose lines follow a recording, see [RECORDED-CHANTS.md](../RECORDED-CHANTS.md).

## Quick guide: time a recording of an existing chant

1. Find the pauses:
   `ffmpeg -hide_banner -nostats -i audio.mp3 -af silencedetect=noise=-30dB:d=0.3 -f null - 2> pauses.txt`
2. Check `pauses.txt` ([details](#1-find-the-pauses)).
3. Propose the line starts, giving the chant numbers in the order chanted:
   `node scripts/timings.ts propose pauses.txt 0051 > labels.txt`
4. In Audacity, check the labels by listening and export them as `checked-labels.txt` ([details](#3-check-by-listening-in-audacity)).
5. Write the file, then add the recording's tags at the top ([details](#4-write-the-file)):
   `node scripts/timings.ts lrc checked-labels.txt > data/chants/timings/<name>.lrc`
6. Run `npm run build`, then play the recording on the chant page with Timed advance ([details](#5-check-the-file)).

Chanters pause for breath, and the pauses can be found in the audio. [ffmpeg](https://ffmpeg.org/) lists the pauses, [scripts/timings.ts](../../../scripts/timings.ts) pairs the stretches of chanting between them with the chant's lines, and the pairing is checked by listening in [Audacity](https://www.audacityteam.org/). Keep the audio and the working files out of the repository.

## 1. Find the pauses

```
ffmpeg -hide_banner -nostats -i audio.mp3 -af silencedetect=noise=-30dB:d=0.3 -f null - 2> pauses.txt
```

`noise` is the level below which sound counts as silence, and `d` is the shortest pause counted, in seconds. If pauses are missed, raise `noise` (for example to `-25dB`) or lower `d`. If pauses within a breath are counted, do the opposite.

Check `pauses.txt` before going on:

- **It is from the right audio.** The line starting `Input #0`, near the top, names the audio file.
- **It has more pauses than the chants have lines.** `grep -c silence_start pauses.txt` counts the pauses. Every line needs a breath group of its own, and there is one breath group fewer than there are pauses.
- **No stretch between two pauses is much longer than a line.** The `silence_end` of one pause and the `silence_start` of the next give the length of the stretch. A stretch of a minute holds pauses that were missed.

Some recordings do not have a pause between every two lines, and no setting finds one. The recording timed in [0101-yatha-vari-vaha-pura-amaravati.lrc](0101-yatha-vari-vaha-pura-amaravati.lrc) is an example. It has 49 line starts. The settings above find 4 pauses in it. `noise=-15dB:d=0.15` finds 72, but only 27 of the 49 line starts are within half a second of one. Make the timing file for such a recording from a chant page instead.

## 2. Propose the line starts

```
node scripts/timings.ts propose pauses.txt 0051 > labels.txt
```

For a recording of several chants, give their numbers in the order chanted. How the script pairs breaths with lines is described under [propose](#propose).

If `labels.txt` is empty, the script stopped before it printed any labels. Its message is in the terminal, because `>` saves only the labels.

## 3. Check by listening in Audacity

Open the audio in Audacity and import the labels (File > Import > Labels). Play it through, and:

- move a label that starts too early or too late;
- retype a label that names the wrong line;
- label a line the recording leaves out with its number and `left out`, for example `0051:12 left out`;
- note any wording that differs from the chant, and anything chanted that the chant does not have. A timing file cannot time words the chant does not have. A recording whose wording differs may need a chant of its own ([RECORDED-CHANTS.md](../RECORDED-CHANTS.md#a-new-chant-or-an-existing-one)).

Then export the labels (Export Labels, in the File menu), for example as `checked-labels.txt`.

## 4. Write the file

```
node scripts/timings.ts lrc checked-labels.txt
```

Save the output in this folder, named as described in [DATA.md](../../DATA.md#timing-files), and add above it the tags that describe the recording and a comment listing its chants. [0051-mangala-sutta-mahamevnawa.lrc](0051-mangala-sutta-mahamevnawa.lrc) is an example.

## 5. Check the file

Run `npm run build`, which stops on rows that do not fit the chant. Then play the recording on the chant page with Timed advance, moving between lines, to confirm the lines follow it.

Use a copy of the recording at a constant bitrate for this check. In a long MP3 made at a variable bitrate, the browser estimates where a time falls when the audio is moved, and can land several seconds away. Audacity reads the whole file, so the times measured there are exact, and a constant-bitrate copy keeps them:

```
ffmpeg -i audio.mp3 -ac 1 -b:a 64k audio-64k.mp3
```

## The commands

[scripts/timings.ts](../../../scripts/timings.ts) has four commands. Each prints its result, to be saved with `>`, and prints any message in the terminal. Labels are in Audacity's label format: a start time, an end time and a text, separated by tabs.

| Command | Reads | Prints |
|---|---|---|
| `propose <pauses> <chant number>...` | The pauses and existing chants | A label for each line, naming its chant and line |
| `draft <pauses> <text> <checked> [minutes]` | The pauses, the text, and the labels checked so far | A label holding each line's words, for the next stretch |
| `module <text> <checked> <chant number> <slug>` | The text and the checked labels | A chant module, one line for each label |
| `lrc <labels> [chant number]` | Checked labels | The timing file's rows |

A text is a bilara root file (`.json`) or a plain text file, as described in [RECORDED-CHANTS.md](../RECORDED-CHANTS.md#the-text).

### propose

Pairs each line of the given chants with one or more consecutive breath groups, a breath group being the chanting between two pauses. It chooses the pairing that keeps every line closest to the recording's pace, in syllables a second, and prints the number of breath groups, the number of lines and the pace.

- `0051:14 Pūjā ca` is line 14 of chant 0051, starting at the label's start time.
- A label ending in ` ?` marks a line chanted more than 25% faster or slower than the recording's pace, which is worth checking first.
- `? group 1: no line` marks a breath group before the first line or after the last that is paired with no line, such as a title.
- A line or section with `repeat` is paired once for each time it is chanted.

The proposal is least reliable at the start and end of a recording, where a title can be taken for the first line. A breath that holds two lines gives only the first a label; the second needs one added by hand. The script stops when a number matches no chant, and when there are fewer breath groups than lines.

### draft

Continues the text from the last checked word, over the stretch of the recording after the last checked label, 7 minutes unless another length is given. It stops if the checked labels do not hold the text's first words, in order.

- **Pace.** The pace is taken from the checked labels, in syllables per second of sound. A chanter's pace can change through a recording: the recording timed in [0163-brahmajala-sutta-mahamevnawa.lrc](0163-brahmajala-sutta-mahamevnawa.lrc) starts at about 2.1 syllables a second and reaches about 2.5. That recording covers only half the sutta, so a pace taken from the whole text over the whole recording put about twice the chanted text into each breath.
- **Breaths.** A line takes one breath group, or up to three where that keeps a phrase together. A group that holds no words of the text is labelled `? no words`. Stretches of sound under 0.4 s are clicks or breaths and are left out.
- **Breaks.** A line ends most easily at the end of a segment, then after punctuation, then inside a clause. The checked lines are known phrases: wherever their words recur in the text, a break at their edges costs nothing and a break inside them costs more. A text that repeats its formulas, as suttas do, gains most: one corrected line also corrects the later lines with the same words. A line never ends between a doubled word, such as *tattha tattha*, or on the first word of a quotation.
- **Flags.** A label ending in ` ?` marks a line more than 25% off the pace, or one that ends inside a checked line's words.

### module

Prints a chant module with one line for each label in the checked file, numbered from 1, and, after the last label, one line for each segment of the text. Each line goes in the section where its first word is: a bilara paragraph, or a block of a plain text file. The module is marked `draft: true`, and its title and source are left to fill in; for a bilara text, the SuttaCentral source and the sutta's `uid` are filled in.

### lrc

Prints a `[chant:<number> <slug>]` tag for each chant, a row for each label, and a last row that ends the last line.

- **Without a chant number,** each label names its chant and line, as `propose` writes them. A label marked `left out` becomes a row with no time. Other labels are left out.
- **With a chant number,** each label that holds a line's words is that chant's next line, in order. The chant's lines after the last label get rows with no time, for a recording that stops before the chant ends.

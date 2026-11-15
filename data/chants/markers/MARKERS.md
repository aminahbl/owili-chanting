# Timing files

Each `.lrc` file in this folder is the timing of one recording: when each line of its chants starts. A set's timing takes the set's file name, for example `abhayagiri-0128-evening-chanting.lrc`. Any other timing takes the number and slug of the first chant it names, followed by the chanter where known, for example `0051-mangala-sutta-mahamevnawa.lrc`. The format, and how the build checks and uses the files, are described in [DATA.md](../../DATA.md#timing-files).

A timing file can be exported from a chant page, or made from the recording itself as described below.

## Make a timing file from a recording

Chanters pause for breath, and the pauses can be found in the audio. [ffmpeg](https://ffmpeg.org/) lists the pauses, [scripts/markers.ts](../../../scripts/markers.ts) pairs the stretches of chanting between them with the chant's lines, and the pairing is checked by listening in [Audacity](https://www.audacityteam.org/). Keep the audio and the working files out of the repository.

### 1. Find the pauses

```
ffmpeg -hide_banner -nostats -i audio.mp3 -af silencedetect=noise=-30dB:d=0.3 -f null - 2> pauses.txt
```

`noise` is the level below which sound counts as silence, and `d` is the shortest pause counted, in seconds. If pauses are missed, raise `noise` (for example to `-25dB`) or lower `d`. If pauses within a breath are counted, do the opposite.

Check `pauses.txt` before going on:

- **It is from the right audio.** The line starting `Input #0`, near the top, names the audio file.
- **It has more pauses than the chants have lines.** `grep -c silence_start pauses.txt` counts the pauses. Every line needs a breath group of its own, and there is one breath group fewer than there are pauses.
- **No stretch between two pauses is much longer than a line.** The `silence_end` of one pause and the `silence_start` of the next give the length of the stretch. A stretch of a minute holds pauses that were missed.

Some recordings do not have a pause between every two lines, and no setting finds one. The recording timed in [0101-yatha-vari-vaha-pura-amaravati.lrc](0101-yatha-vari-vaha-pura-amaravati.lrc) is an example. It has 49 line starts. The settings above find 4 pauses in it. `noise=-15dB:d=0.15` finds 72, but only 27 of the 49 line starts are within half a second of one. Make the timing file for such a recording from a chant page instead.

### 2. Propose the line starts

```
node scripts/markers.ts propose pauses.txt 0051 > labels.txt
```

For a recording of several chants, give their numbers in the order chanted. The script prints the number of breath groups, the number of lines and the recording's pace in syllables a second.

If `labels.txt` is empty, the script stopped before it printed any labels. Its message is in the terminal, because `>` saves only the labels. The script stops when no chant number is given, when a number matches no chant, and when there are fewer breath groups than lines.

Each line is paired with one or more consecutive breath groups, a breath group being the chanting between two pauses. The script chooses the pairing that keeps every line closest to the recording's pace. `labels.txt` is in Audacity's label format, with one label per line:

- `0051:14 Pūjā ca` is line 14 of chant 0051, starting at the label's start time.
- A label ending in ` ?` marks a line chanted more than 25% faster or slower than the recording's pace, which is worth checking first.
- `? group 1: no line` marks a breath group before the first line or after the last that is paired with no line, such as a title.

The proposal is least reliable at the start and end of a recording, where a title can be taken for the first line. A breath that holds two lines gives only the first a label; the second needs one added by hand.

### 3. Check by listening in Audacity

Open the audio in Audacity and import the labels (File > Import > Labels). Play it through, and:

- move a label that starts too early or too late;
- retype a label that names the wrong line;
- label a line the recording leaves out with its number and `left out`, for example `0051:12 left out`;
- note any wording that differs from the chant, and anything chanted that the chant does not have. A timing file cannot time words the chant does not have.

Then export the labels (Export Labels, in the File menu), for example as `checked-labels.txt`.

### 4. Write the file

```
node scripts/markers.ts lrc checked-labels.txt
```

This prints a `[chant:<number> <slug>]` tag for each chant, a row for each label, and a last row that ends the last line. Labels that do not start with a chant and line number are left out. Save the output in this folder, named as described at the top of this file, and add above it the tags that describe the recording and a comment listing its chants. [0051-mangala-sutta-mahamevnawa.lrc](0051-mangala-sutta-mahamevnawa.lrc) is an example.

### 5. Check the file

Run `npm run build`, which stops on rows that do not fit the chant. Then play the recording on the chant page with Timed advance, to confirm the lines follow it.

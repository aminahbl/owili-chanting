# The site's data

This folder holds the content of the site: the chants, the Sangha sets, the categories, the timing files and the translation files. `npm run build` ([scripts/build.ts](../scripts/build.ts)) reads it, checks it, and writes the site to `dist/`. The build stops with a message naming the file and the problem when the data is inconsistent.

Quick guides for common changes are in [chants/CHANTS.md](chants/CHANTS.md) and [sets/SETS.md](sets/SETS.md), for making a chant from a recording in [chants/RECORDED-CHANTS.md](chants/RECORDED-CHANTS.md), for making a timing file in [chants/timings/TIMINGS.md](chants/timings/TIMINGS.md), and for adding a translation file in [chants/translations/TRANSLATIONS.md](chants/translations/TRANSLATIONS.md). This file describes how the data fits together, and the rules those guides follow.

## Files in this folder

| Path | Contents |
|---|---|
| `chants/texts/` | One module per chant |
| `chants/texts/retired/` | Modules of retired chants |
| `chants/timings/` | Timing files, one per recording |
| `chants/translations/` | Published translation files, offered in the settings |
| `sets/` | One module per Sangha set |
| `sets/retired/` | Modules of retired sets |
| `groups.ts` | Categories and their chants, and the Sangha sets, in display order |
| `chanters.ts` | Chanters of the Sangha sets and their lineages |
| `translators.ts` | Translators of the translation files, with their credit, source and licence |
| `ids.ts` | The ledger of chant and set numbers |
| `types.ts` | The `Chant` and `ChantSet` types |
| `translation-guide.md` | Principles and fixed renderings for the English |

## Chant and set numbers

Each chant and set has a four-digit number, its `id`, which never changes. Chants and sets take numbers from one ledger, [ids.ts](ids.ts).

- A new chant or set takes the number after the last line of the ledger, and the same change adds a line for it there.
- A renamed slug is changed in the ledger and in the module's file name too.
- A chant or set that is retired keeps its ledger line, marked `retired: true`, so its number is never issued again.

The build stops if a number is repeated, out of order, missing from the ledger or retired, if an item's slug differs from its ledger line, or if a line that is not retired has no chant or set.

The build does not notice a deleted ledger line, because gaps in the numbers are allowed. A deleted line frees its number, and if it was the last line, the next new chant or set would be given the same number. See [Data stored in users' browsers](#data-stored-in-users-browsers) for why that matters.

## Chants

A chant is a module in `chants/texts/` named `<id>-<slug>.ts`, for example `0053-karaniya-metta-sutta.ts`. It exports `chant`, typed with `satisfies Chant` from [types.ts](types.ts). The build reads every `.ts` file in the folder, stops if a file name does not match the module's number and slug, and writes the chant's page to `/chants/<slug>`. It also writes the chant's block, its text as a set page shows it, to `/blocks/<number>.html`, which the pages of open sets fetch.

- **Sections and lines.** A chant is a list of sections, each a stanza or paragraph of lines. Each line has an `id`, a number within the chant. Timing files, including timing files users have exported and imported, refer to lines by it, so once the site is released a line `id` is never changed or reused. Until then, a chant's lines may be renumbered. A line with `cue` instead of `pali` is an instruction, shown but not chanted.
- **`draft: true`** marks a chant that is not ready for release, because its lines may still be divided again and renumbered, as while a chant made from a recording is being checked. The build lists the draft chants after each run.
- **Sections.** A section is one unit of meaning: a stanza, a sentence, or a passage chanted as one. The slide view shows up to four lines at a time and never runs past a section's end, so a section longer than four lines is divided at its units of meaning.
- **Preludes.** The leader's announcement of a chant, such as *Handa mayaṁ buddhābhitthutiṁ karomase*, is a chant of its own, so that it can be included in a sequence or left out. Its title is "Prelude · " followed by the title of the chant it introduces, its slug is `prelude-` followed by that chant's slug, and it is in Other chants. A set that chants the announcement lists the prelude before the chant.
- **Versions.** A text chanted with different wording, such as a recording that follows another edition, is a separate chant with its own number, for example 0053 and 0131 for the Karaṇīya Metta Sutta. A text that differs only in spelling is the same chant.
- **`paliSource`** names where the Pali was taken from. A chant in Amaravati's *Chanting Book* cites the [Community Chanting Book](https://github.com/profound-labs/community-chanting-book), the book's LaTeX source project, with a link to the chant's chapter at the commit the text was checked against; most other chants cite the *Bhikkhu Manual*. The info panel shows the Pali as public domain, as the Pali texts are, and the source as where it was initially retrieved from, since the site's text may differ from it; the chant's `editorial` notes record each difference. For a chant from a book with its own arrangement, `paliSource.categories` records where the book places it: its category, subcategory where there is one, and position. This is a record of the source, separate from the site's categories, and the info panel shows it with the source.
- **`editorial`** records editorial work on the chant, as notes that are not shown on the site. Each note has a status: `open` for a question or a known problem, `changed` where the text differs from its Pali source, and `kept` where a possible problem was checked and the text left as it is. A note can name the lines it applies to. The usual notes for a chant made from a recording are:
  - an `open` note for the readings of other editions that the recording may follow, such as the BJT readings in bilara's variant file;
  - an `open` note for abbreviated repetitions, such as *…pe…*, until it is known whether the chanters expand them;
  - a `changed` note for words that follow the recording rather than the source, and for words left out, such as the closing words of sections;
  - an `open` note for English to review, listing the lines whose rendering is uncertain.

## Categories

[groups.ts](groups.ts) lists the categories in display order, each with its chants in display order. Chants are given by number, with the slug in a comment. A chant can be in more than one category, and every chant must be in at least one. The category's `id` is its address, `/list/<id>`.

The `sangha-sets` entry lists sets in its `chants` field instead of chants, by set number with the slug in a comment, in display order. Every set must be in it once. It is shown when there is at least one set. Other categories without chants are not shown.

The build stops if a category names an unknown chant or names a chant twice, or if a chant is in no category.

## Sangha sets

A set is a module in `sets/` named `<chanter>-<id>-<title>.ts`, for example `lbv-0130-evening-puja.ts`. The title part is the slug without its chanter prefix, so a set's slug must start with its chanter. The module exports `set`, typed with `satisfies ChantSet` from [types.ts](types.ts). It gives:

- its number and slug from the ledger;
- its title;
- its `chanter`, from [chanters.ts](chanters.ts): the community or individual whose chanting it follows;
- its `chants`, as chant numbers in the order chanted, each with its slug in a comment;
- its `anchorRecording`: the recording whose chants, order and wording the set follows. The field gives the recording's label and, where known, its `url`, `performers` and `date`. The set's info panel shows them.

The build writes the set's page to `/sets/<slug>`. The Sangha sets page lists the sets in the order of the `sangha-sets` entry in [groups.ts](groups.ts), each card titled with its chanter and its own title, for example "London Buddhist Vihara · Daily Evening Puja". Each chant page links to the sets that include the chant.

A new chanter or lineage is added to `chanters.ts`. A chanter can only be removed once no set names it; otherwise `npm run check` fails.

The build stops if a set's slug does not start with its chanter, if its file name does not match its chanter, number and slug, if the set has no chants, names an unknown chant or names a chant twice, or if the `sangha-sets` entry leaves out a set, names it twice or names a set that does not exist.

## Timing files

The timing of a recording is a file in `chants/timings/`, in the LRC format the chant page exports. The format is described at the top of [src/lrc.ts](../src/lrc.ts).

A file that is a set's timing takes the set's file name, for example `abhayagiri-0128-evening-chanting.lrc`. Any other file takes the number of the first chant it names, then the chanter where known, then the chant's slug, for example `0051-mahamevnawa-mangala-sutta.lrc`. The chanter comes before the slug because it is what tells one recording of a chant from another.

- Tags at the top give the recording's details: `ti`, `place`, `performers`, `date`, and `page` for the address of the recording's web page.
- A comment lists the chants the recording covers, in order.
- A `[chant:<number> <slug>]` tag starts each chant's rows, one row per line chanted. A chant chanted in two parts, with another chant between them, has its tag twice.
- A row with a line `id` and no time marks a line the recording leaves out. A recording that stops before a chant ends has such rows for the lines it does not reach.

The build checks each chant's rows against the chant's lines, and stops if a file names an unknown chant, gives a chant a slug other than its own, or has rows that do not fit the chant. A file that passes becomes a timing for each chant it covers: the chant's info panel lists the recording, and Timed advance uses it by default. Where several recordings cover a chant, a file tagged `[default:yes]` is used, otherwise the first by file name.

A file that names a set's chants, in the set's order and no others, is also the set's default timing.

## Translation files

A published translation of a chant is a file in `chants/translations/`, in the format of the site's translation export, named `<number>-<translator>-<slug>.txt`. The translator is an entry in [translators.ts](translators.ts), which gives the name the settings show, the credit and licence shown with it, and its source. Each file has a comment row linking to its chant in the source, and the credit links to it. [chants/translations/TRANSLATIONS.md](chants/translations/TRANSLATIONS.md) describes the files and their licences.

The build places each chant's translations in its page and its block, and the settings offer each translator that a chant on the page has, beside the site's English. The choice is kept as the `translator` setting, so it applies on every page, and a chant without that translation shows the site's English.

The build checks each file against its chant's lines, and stops if a file names an unknown chant or more than one chant, is not named for its chant, names a translator not in `translators.ts`, has no link to its chant in the source, or has a row for an unknown line, a row for a cue, or a line given twice.

## Data stored in users' browsers

Browsers store data for each chant and set under its number:

- the last position, the Auto speed and any imported timing file, in `localStorage` under the key `chant:<number>`;
- the user's audio file, in IndexedDB under the number.

This data stays in the browser when a chant or set is retired. Because a retired number is never issued again, it is never applied to another chant or set.

Open sets, the sets users make, are kept in `localStorage` under the key `open-sets`, as a list of each set's ID, title and chant numbers. An open set's ID starts with `open-`, so it cannot clash with a number, and the set's data is kept under its ID as above. Deleting an open set removes this data too.

## Retiring a chant or set

A retired chant or set is removed from the site. Its module moves into the `retired/` folder beside it, unchanged, and its ledger line is marked `retired: true`. The build does not read `retired/` folders, and `npm run check` leaves them out, so a retired module's import of `types.ts` does not need fixing; it resolves again if the module is moved back.

For a set, its number is also removed from the `sangha-sets` entry in `groups.ts`; the build stops until it is. On the next build:

- the set's page is not written, and `/sets/<slug>` shows the site's 404 page;
- the set leaves the Sangha sets page, and the Sangha sets category is hidden if no sets remain;
- chant pages stop linking to the set;
- the set's chants keep their pages and categories;
- a timing file that covered the set still gives its chants their timing.

A retired chant must also be removed wherever its number appears: the categories in `groups.ts`, any set in `sets/`, and its rows and tag in `chants/timings/`. The build stops on each of these until they are removed. Removing a chant from a set means the set no longer matches its anchor recording, which may call for a note or a different recording. Its block at `/blocks/<number>.html` is no longer written. Open sets that name the chant cannot be changed by the build: their pages show a note in its place, and the Open sets editor marks it for removal.

## Old addresses

A retired or renamed chant or set loses its address. The site's 404 page is shown there. A redirect can be added to the `redirects` list in [scripts/build.ts](../scripts/build.ts), for example `'/sets/lbv-evening-chanting /list/sangha-sets 301'`.

# The site's data

This folder holds the content of the site: the chants, the Sangha sets, the categories and the timing files. `npm run build` ([scripts/build.ts](../scripts/build.ts)) reads it, checks it, and writes the site to `dist/`. The build stops with a message naming the file and the problem when the data is inconsistent.

Short instructions for common changes are in [chants/README.md](chants/README.md) and [sets/README.md](sets/README.md). This file describes how the data fits together.

## Files in this folder

| Path | Contents |
|---|---|
| `chants/texts/` | One module per chant |
| `chants/texts/retired/` | Modules of retired chants |
| `chants/markers/` | Timing files, one per recording |
| `sets/` | One module per Sangha set |
| `sets/retired/` | Modules of retired sets |
| `groups.ts` | Categories and their chants, and the Sangha sets, in display order |
| `chanters.ts` | Chanters of the Sangha sets and their lineages |
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

A chant is a module in `chants/texts/` named `<id>-<slug>.ts`, for example `0053-karaniya-metta-sutta.ts`. It exports `chant`, typed with `satisfies Chant` from [types.ts](types.ts). The build reads every `.ts` file in the folder, stops if a file name does not match the module's number and slug, and writes the chant's page to `/chants/<slug>`.

- **Sections and lines.** A chant is a list of sections, each a stanza or paragraph of lines. Each line has an `id`, a number within the chant that is assigned once and never reused, because timing files refer to lines by it. A line with `cue` instead of `pali` is an instruction, shown but not chanted.
- **`paliSource`** names where the Pali was taken from. For a chant from a book with its own arrangement, `paliSource.categories` records where the book places it: its category, subcategory where there is one, and position. This is a record of the source, separate from the site's categories, and the info panel shows it with the source.
- **`editorial`** records editorial work on the chant. It is not shown on the site.

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

The timing of a recording is a file `chants/markers/<recording>.lrc`, in the LRC format the chant page exports. The format is described at the top of [src/lrc.ts](../src/lrc.ts).

- Tags at the top give the recording's details: `ti`, `place`, `performers`, `date`, and `page` for the address of the recording's web page.
- A comment lists the chants the recording covers, in order.
- A `[chant:<number> <slug>]` tag starts each chant's rows, one row per line chanted. A chant chanted in two parts, with another chant between them, has its tag twice.

The build checks each chant's rows against the chant's lines, and stops if a file names an unknown chant, gives a chant a slug other than its own, or has rows that do not fit the chant. A file that passes becomes a timing for each chant it covers: the chant's info panel lists the recording, and Timed advance uses it by default. Where several recordings cover a chant, a file tagged `[default:yes]` is used, otherwise the first by file name.

A file that names a set's chants, in the set's order and no others, is also the set's default timing.

## Data stored in users' browsers

Browsers store data for each chant and set under its number:

- the last position, the Auto speed and any imported timing file, in `localStorage` under the key `chant:<number>`;
- the user's audio file, in IndexedDB under the number.

This data stays in the browser when a chant or set is retired. Because a retired number is never issued again, it is never applied to another chant or set.

## Retiring a chant or set

A retired chant or set is removed from the site. Its module moves into the `retired/` folder beside it, unchanged, and its ledger line is marked `retired: true`. The build does not read `retired/` folders, and `npm run check` leaves them out, so a retired module's import of `types.ts` does not need fixing; it resolves again if the module is moved back.

For a set, its number is also removed from the `sangha-sets` entry in `groups.ts`; the build stops until it is. On the next build:

- the set's page is not written, and `/sets/<slug>` shows the site's 404 page;
- the set leaves the Sangha sets page, and the Sangha sets category is hidden if no sets remain;
- chant pages stop linking to the set;
- the set's chants keep their pages and categories;
- a timing file that covered the set still gives its chants their timing.

A retired chant must also be removed wherever its number appears: the categories in `groups.ts`, any set in `sets/`, and its rows and tag in `chants/markers/`. The build stops on each of these until they are removed. Removing a chant from a set means the set no longer matches its anchor recording, which may call for a note or a different recording.

## Old addresses

A retired or renamed chant or set loses its address. The site's 404 page is shown there. A redirect can be added to the `redirects` list in [scripts/build.ts](../scripts/build.ts), for example `'/sets/lbv-evening-chanting /list/sangha-sets 301'`.

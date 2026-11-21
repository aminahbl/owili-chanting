# Changing chants

Each section is a quick guide to one change. After any change, run `npm run check` and `npm run build`. The build names anything missing. How the data fits together, and the rules the steps follow, are in [DATA.md](../DATA.md).

## Add a chant

1. Check that it is a new chant: a text whose wording differs from a chant the site has is a new chant; one that differs only in spelling is not ([details](RECORDED-CHANTS.md#a-new-chant-or-an-existing-one)).
2. Take the next number, and add a line for it at the end of [ids.ts](../ids.ts).
3. Add a module to `texts/` named `<number>-<slug>.ts` that exports `chant` with `satisfies Chant`.
4. Add the number to one or more categories in [groups.ts](../groups.ts).
5. If the chant opens with the leader's announcement, such as *Handa mayaṁ …*, put the announcement in a prelude of its own, as described in [DATA.md](../DATA.md#chants).

A chant may be added with the Pali only; the English follows as separate work, as described in the [translation guide](../translation-guide.md#making-and-reviewing-a-translation).

## Add a chant from a recording

Follow [RECORDED-CHANTS.md](RECORDED-CHANTS.md), which drafts the chant's lines from the recording's breaths and makes its timing file at the same time.

## Move or reorder a chant

Edit its categories in [groups.ts](../groups.ts).

## Edit a chant's lines

1. Give a new line an `id` the chant has not used. Do not renumber or reuse a line `id` once the site is released ([details](../DATA.md#chants)).
2. When a line break moves, move the English with its Pali.
3. Update the line numbers in the chant's `editorial` notes.
4. Update the chant's rows in any timing file in `timings/` or translation file in `translations/` that the build reports.

## Mark a chant ready for release

Remove `draft: true` from its module once its lines will not change. The build lists the chants still marked as drafts.

## Rename a chant's slug

1. Change `slug` in the module, in its file name and in [ids.ts](../ids.ts).
2. Change its `[chant:<number> <slug>]` tags in `timings/` and `translations/`, and the slug in the names of its files there.
3. Update the slug comments in [groups.ts](../groups.ts) and [sets/](../sets/).

## Retire a chant

1. Move its module into `retired/`.
2. Add `retired: true` to its line in [ids.ts](../ids.ts). **Do not delete the line.**
3. Remove its number from [groups.ts](../groups.ts) and from any set in [sets/](../sets/).
4. Remove its tag and rows from `timings/`, and its files from `translations/`.

## Add a timing

Follow [timings/TIMINGS.md](timings/TIMINGS.md), or export a timing from the chant page and add the file to `timings/`.

## Add a translation file

Follow [translations/TRANSLATIONS.md](translations/TRANSLATIONS.md).

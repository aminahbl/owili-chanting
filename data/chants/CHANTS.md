# Changing chants

After any change, run `npm run check` and `npm run build`. The build names anything missing. Details are in [DATA.md](../DATA.md).

## Add a chant

1. Take the next number, and add a line for it at the end of [ids.ts](../ids.ts).
2. Add a module to `texts/` named `<number>-<slug>.ts` that exports `chant` with `satisfies Chant`.
3. Add the number to one or more categories in [groups.ts](../groups.ts).

## Move or reorder a chant

Edit its categories in [groups.ts](../groups.ts).

## Edit a chant's lines

- Give a new line an `id` the chant has not used. Never renumber or reuse a line `id`.
- Update the chant's rows in any timing file in `markers/` that the build reports.

## Rename a chant's slug

1. Change `slug` in the module, in its file name and in [ids.ts](../ids.ts).
2. Change its `[chant:<number> <slug>]` tags in `markers/`.
3. Update the slug comments in [groups.ts](../groups.ts) and [sets/](../sets/).

## Retire a chant

1. Move its module into `retired/`.
2. Add `retired: true` to its line in [ids.ts](../ids.ts). **Do not delete the line.**
3. Remove its number from [groups.ts](../groups.ts) and from any set in [sets/](../sets/).
4. Remove its tag and rows from `markers/`.

## Add a timing

Add `markers/<recording>.lrc`, in the format the chant page exports.

# Changing Sangha sets

After any change, run `npm run check` and `npm run build`. The build names anything missing. Details are in [DATA.md](../DATA.md).

## Add a set

1. Take the next number, and add a line for it at the end of [ids.ts](../ids.ts).
2. Add a module here named `<chanter>-<number>-<title>.ts` that exports `set` with `satisfies ChantSet`. The slug is `<chanter>-<title>`.
3. Fill in `chanter` (add a new one to [chanters.ts](../chanters.ts)), `chants` and `anchorRecording`.
4. Add the number, with the slug in a comment, to the `sangha-sets` entry in [groups.ts](../groups.ts), where the set should appear.

## Change a set's chants

Edit `chants` to match the anchor recording. A timing file only serves as the set's timing if it names the same chants in the same order.

## Reorder the sets

Move their lines in the `sangha-sets` entry in [groups.ts](../groups.ts).

## Rename a set's slug

Change `slug` in the module, in its file name and in [ids.ts](../ids.ts).

## Retire a set

1. Move its module into `retired/`.
2. Add `retired: true` to its line in [ids.ts](../ids.ts). **Do not delete the line.**
3. Remove its line from the `sangha-sets` entry in [groups.ts](../groups.ts).

Chants, timing files and chanters need no change.

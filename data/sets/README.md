# Changing Sangha sets

After any change, run `npm run check` and `npm run build`. The build names anything missing. Details are in [DATA.md](../DATA.md).

## Add a set

1. Take the next number, and add a line for it at the end of [ids.ts](../ids.ts).
2. Add a module here named `<number>-<slug>.ts` that exports `set` with `satisfies ChantSet`.
3. Fill in `place` (add a new one to [places.ts](../places.ts)), `order`, `chants` and `anchorRecording`.

## Change a set's chants

Edit `chants` to match the anchor recording. A timing file only serves as the set's timing if it names the same chants in the same order.

## Reorder a place's sets

Change their `order` values.

## Rename a set's slug

Change `slug` in the module, in its file name and in [ids.ts](../ids.ts).

## Retire a set

1. Move its module into `retired/`.
2. Add `retired: true` to its line in [ids.ts](../ids.ts). **Do not delete the line.**

Chants, timing files and places need no change.

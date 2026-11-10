/** Lineages and places in display order, for the headings of the Sangha sets page. */
export const lineages = [{ id: 'ajahn-chah', title: 'Ajahn Chah Lineage' }] as const;

export const places = [
  { id: 'amaravati', title: 'Amaravati Monastery', lineage: 'ajahn-chah' },
  { id: 'abhayagiri', title: 'Abhayagiri Monastery', lineage: 'ajahn-chah' },
  { id: 'lbv', title: 'London Buddhist Vihara' },
] as const;

export type PlaceId = (typeof places)[number]['id'];

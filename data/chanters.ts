/**
 * Who chants each Sangha set: a community or an individual. A lineage shows in
 * a set's details and matches in search.
 */
export const lineages = [{ id: 'ajahn-chah', title: 'Ajahn Chah Lineage' }] as const;

export const chanters = [
  { id: 'abhayagiri', title: 'Abhayagiri Monastery', lineage: 'ajahn-chah' },
  { id: 'amaravati', title: 'Amaravati Monastery', lineage: 'ajahn-chah' },
  { id: 'lbv', title: 'London Buddhist Vihara' },
  { id: 'mahamevnawa', title: 'Mahamevnawa Buddhist Monastery' },
] as const;

export type ChanterId = (typeof chanters)[number]['id'];

/**
 * Who chants each Sangha set: a community or an individual. A lineage shows in
 * a set's details and matches in search.
 */
export const lineages = [{ id: 'ajahn-chah', title: 'Ajahn Chah Lineage' }] as const;

export const chanters = [
  { id: 'abhayagiri', title: 'Abhayagiri Monastery', lineage: 'ajahn-chah' },
  { id: 'amaravati', title: 'Amaravati Monastery', lineage: 'ajahn-chah' },
  { id: 'wat-marp-jan', title: 'Wat Marp Jan', lineage: 'ajahn-chah' },
  { id: 'lbv', title: 'London Buddhist Vihara' },
  { id: 'mahamevnawa', title: 'Mahamevnawa Buddhist Monastery' },
  { id: 'aungsi-sayadaw', title: 'Aungsi Sayadaw U Pannathamibhivamsa' },
  { id: 'cloud-mountain', title: 'Cloud Mountain Retreat Center' },
  { id: 'karuna', title: 'Karuna Buddhist Vihara' },
  { id: 'narayan-liebenson', title: 'Narayan Helen Liebenson' },
] as const;

export type ChanterId = (typeof chanters)[number]['id'];

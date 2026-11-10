/** Categories in display order. The id is the URL slug in /list/<id>. */
export const groups = [
  { id: 'reverence', title: 'Reverence' },
  { id: 'reflections', title: 'Reflections' },
  { id: 'parittas', title: 'Parittas' },
  { id: 'suttas', title: 'Suttas' },
  { id: 'funeral', title: 'Funeral chants' },
  { id: 'joy-and-ceremony', title: 'Joy and ceremony' },
  { id: 'other', title: 'Other chants' },
  { id: 'sangha-sets', title: 'Sangha sets' },
] as const;

export type GroupId = (typeof groups)[number]['id'];

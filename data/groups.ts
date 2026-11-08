/** Groups in display order. The id is the URL slug in /list/<id>. */
export const groups = [
  { id: 'morning', title: 'Morning chanting' },
  { id: 'evening', title: 'Evening chanting' },
  { id: 'services', title: 'Services' },
  { id: 'reflections', title: 'Reflections' },
  { id: 'parittas', title: 'Parittas' },
  { id: 'suttas', title: 'Suttas' },
  { id: 'anumodana', title: 'Anumodanā' },
  { id: 'funeral', title: 'Funeral chants' },
  { id: 'sri-lanka', title: 'Chants used in Sri Lanka' },
  { id: 'other', title: 'Other chants' },
] as const;

export type GroupId = (typeof groups)[number]['id'];

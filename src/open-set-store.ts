// Open sets: sequences of chants the user makes, kept in localStorage as one
// list. A set's ID keys its kept data, as a number does for a chant or a
// Sangha set; it starts with "open-", so it cannot clash with a number. A set
// also travels as a share link that holds its title and chant numbers after
// the "#", which the browser does not send to the server.
import { forgetAudio } from './audio-store.ts';
import { removeChantSettings } from './settings.ts';

export interface OpenSet {
  id: string;
  title: string;
  /** Chant numbers in the order chanted, none twice. */
  chants: string[];
}

const KEY = 'open-sets';
export const SET_PAGE = '/open-sets/set';

export function readOpenSets(): OpenSet[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as OpenSet[];
  } catch {
    return [];
  }
}

function writeOpenSets(sets: OpenSet[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(sets));
  } catch {
    // Storage can be unavailable, for example in some private windows; the set is then not kept.
  }
}

/** An ID from the time, so that a deleted set's ID is not given again. */
export const newOpenSetId = () => `open-${Date.now().toString(36)}`;

/** Adds the set, or replaces the one with its ID. */
export function saveOpenSet(set: OpenSet) {
  const sets = readOpenSets();
  const index = sets.findIndex((s) => s.id === set.id);
  if (index >= 0) sets[index] = set;
  else sets.push(set);
  writeOpenSets(sets);
}

/** Removes the set with its kept data and audio file. */
export async function deleteOpenSet(id: string) {
  writeOpenSets(readOpenSets().filter((s) => s.id !== id));
  removeChantSettings(id);
  await forgetAudio(id);
}

export function shareLink(set: OpenSet): string {
  const params = new URLSearchParams({ title: set.title, chants: set.chants.join(',') });
  return `${location.origin}${SET_PAGE}#${params}`;
}

/** The title and chants of a share link's "#" part, or null if it holds none. */
export function readShareLink(hash: string): Omit<OpenSet, 'id'> | null {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const chants = [...new Set((params.get('chants') ?? '').split(','))].filter((id) => /^\d{4}$/.test(id));
  if (!chants.length) return null;
  return { title: params.get('title')?.trim() || 'Open set', chants };
}

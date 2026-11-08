// Text and queries are normalised the same way, so that "anicca vata" finds
// "aniccā vata", "evameva" finds "Evam-eva", and ṁ and ṃ match each other.
export function normalise(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[-'’]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

/** True when every word of the query appears in the normalised text. */
export function matches(text: string, query: string): boolean {
  return query.split(' ').every((word) => text.includes(word));
}

import { escapeHtml } from './html.ts';

/** A chant in the search index: its card, its number, its position in each of its groups and its normalised search text. */
export interface SearchEntry extends CardData {
  id: string;
  groups: Record<string, number>;
  /** Titles and Pali. */
  text: string;
  /** Categories in the Pali source, such as "Morning Chanting". Not searched on the Sangha sets page. */
  sourceCategories: string;
}

export interface CardData {
  slug: string;
  title: string;
  paliTitle?: string;
  /** The first two chanting lines, without an opening introduction and cues. */
  lines: string[];
}

export const SEARCH_INDEX = '/search.json';

let index: Promise<SearchEntry[]> | null = null;

/** The search index, fetched once per page. A failed fetch is tried again on the next call. */
export function loadSearchIndex(): Promise<SearchEntry[]> {
  index ??= fetch(SEARCH_INDEX)
    .then((r) => {
      if (!r.ok) throw new Error(`Search index: ${r.status}`);
      return r.json() as Promise<SearchEntry[]>;
    })
    .catch((error: unknown) => {
      index = null;
      throw error;
    });
  return index;
}

export function chantHref(slug: string): string {
  return `/chants/${slug}`;
}

// The title link is stretched over the card in CSS, so each card is one link.
export function cardHtml(card: CardData): string {
  const pali = card.paliTitle ? `<p class="card-pali-title" lang="pi">${escapeHtml(card.paliTitle)}</p>` : '';
  const lines = card.lines.map((l) => `<span>${escapeHtml(l)}</span>`).join('');
  const title = `<h3 class="card-title"><a href="${chantHref(card.slug)}">${escapeHtml(card.title)}</a></h3>`;
  return `<li class="card">
<div class="card-head">${title}${pali}</div>
<p class="card-lines" lang="pi">${lines}</p>
</li>`;
}

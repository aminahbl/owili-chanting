import { escapeHtml } from './html.ts';

/** A chant in the search index: its card, its position in each of its groups and its titles and Pali, normalised. */
export interface SearchEntry extends CardData {
  groups: Record<string, number>;
  text: string;
}

export interface CardData {
  slug: string;
  title: string;
  paliTitle?: string;
  /** The first two chanting lines, without an opening introduction and cues. */
  lines: string[];
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

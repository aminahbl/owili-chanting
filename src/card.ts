import { escapeHtml } from './html.ts';

/** A chant in the search index: its card, its group orders and its titles and Pali, normalised. */
export interface SearchEntry extends CardData {
  groups: Record<string, number>;
  text: string;
}

export interface CardData {
  id: string;
  title: string;
  paliTitle?: string;
  /** The first two chanting lines, without leader lines and cues. */
  lines: string[];
}

export function chantHref(id: string): string {
  return `/chants/${id}`;
}

// The title link is stretched over the card in CSS, so each card is one link.
export function cardHtml(card: CardData): string {
  const pali = card.paliTitle ? `<p class="card-pali-title" lang="pi">${escapeHtml(card.paliTitle)}</p>` : '';
  const lines = card.lines.map((l) => `<span>${escapeHtml(l)}</span>`).join('');
  const title = `<h3 class="card-title"><a href="${chantHref(card.id)}">${escapeHtml(card.title)}</a></h3>`;
  return `<li class="card">
<div class="card-head">${title}${pali}</div>
<p class="card-lines" lang="pi">${lines}</p>
</li>`;
}

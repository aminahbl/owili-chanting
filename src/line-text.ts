// A line's text as HTML, shared by the build and the page, which fills in an
// imported translation. What the leader chants alone, a whole line or a line's
// opening words, is shown in curly brackets, so it is clear where the leader
// stops and the group joins.
import { escapeHtml } from './html.ts';

/** Text with men's and women's forms carries both. The forms follow the chanter's gender, except in the precepts ceremonies, where they follow the gender of the one giving the precepts. */
export type Forms = string | { men: string; women: string };

export const LEADER_OPEN = '<span class="leader-bracket leader-open" aria-hidden="true">{&nbsp;</span>';
export const LEADER_CLOSE = '<span class="leader-bracket" aria-hidden="true">&nbsp;}</span>';

/** Escaped text, with opening words in curly brackets ("{Yo so} bhagavā") marked as the leader's. */
export function leaderWords(text: string): string {
  return escapeHtml(text).replace(/^\{([^}]+)\}/, `${LEADER_OPEN}$1${LEADER_CLOSE}`);
}

// A text with two forms renders both; the CSS shows the one chosen in settings.
export function forms(text: Forms, format: (t: string) => string): string {
  if (typeof text === 'string') return format(text);
  return `<span class="form-men">${format(text.men)}</span><span class="form-women">${format(text.women)}</span>`;
}

/** A line's text, with a whole line chanted by the leader in curly brackets. */
export function lineText(text: Forms, leader: boolean): string {
  const html = forms(text, leaderWords);
  return leader ? `${LEADER_OPEN}${html}${LEADER_CLOSE}` : html;
}

import { escapeHtml } from '../src/html.ts';
import type { Chant, ChantingLine, Line, Ref, Section, Text } from '../data/types.ts';
import type { Group } from './chant-list.ts';
import { layout } from './templates.ts';

const DRAFT_NOTICE = 'The English is a draft translation.';

const SHORTCUTS = [
  ['T', 'Show or hide translation'],
  ['I', 'Info'],
  ['S', 'Settings'],
  ['?', 'Keyboard shortcuts'],
  ['Esc', 'Close'],
];

// Opening words in brackets are chanted by the leader alone ("[Yo so] bhagavā").
// Brackets later in a line mark an optional word and are kept as written.
function pali(text: string): string {
  return escapeHtml(text).replace(/^\[([^\]]+)\]/, '<span class="leader-words">$1</span>');
}

// A text with two forms renders both; the CSS shows the one chosen in settings.
function forms(text: Text, format: (t: string) => string): string {
  if (typeof text === 'string') return format(text);
  return `<span class="form-men">${format(text.men)}</span><span class="form-women">${format(text.women)}</span>`;
}

const hasForms = (text: Text | undefined) => typeof text === 'object';

function suttaCentral(ref: Ref): string {
  const label = escapeHtml(ref.label);
  return ref.uid ? `<a href="https://suttacentral.net/${ref.uid}">${label}</a>` : label;
}

function chantingLine(line: ChantingLine, labelled: boolean): string {
  const label = labelled ? '<span class="leader-label">Leader</span>' : '';
  const repeat = line.repeat
    ? ` <span class="repeat"><span aria-hidden="true">×${line.repeat}</span><span class="sr-only">${line.repeat} times</span></span>`
    : '';
  const en = line.en ? `<p class="en">${forms(line.en, escapeHtml)}</p>` : '';
  return `<div class="line${line.leader ? ' leader' : ''}" data-line="${line.id}">${label}<p class="pali" lang="pi">${forms(line.pali, pali)}${repeat}</p>${en}</div>`;
}

// A run of consecutive leader lines has one label.
function lines(list: Line[]): string {
  return list
    .map((line, i) => {
      if ('cue' in line) return `<p class="cue">${escapeHtml(line.cue)}</p>`;
      const before = list[i - 1];
      const labelled = Boolean(line.leader) && !(before && 'pali' in before && before.leader);
      return chantingLine(line, labelled);
    })
    .join('\n');
}

function section(s: Section): string {
  const title = s.title ? `<h2>${escapeHtml(s.title)}</h2>\n` : '';
  const refs = s.refs?.length ? `\n<p class="refs">${s.refs.map(suttaCentral).join(', ')}</p>` : '';
  return `<section class="chant-section">
${title}${lines(s.lines)}${refs}
</section>`;
}

function notes(chant: Chant): string {
  if (!chant.notes?.length) return '';
  return `<div class="chant-notes">${chant.notes.map((n) => `<p>${escapeHtml(n)}</p>`).join('')}</div>`;
}

function popover(id: string, title: string, body: string): string {
  return `<div id="${id}" class="popover" popover aria-labelledby="${id}-title">
<div class="popover-head">
  <h2 id="${id}-title">${title}</h2>
  <button class="icon-button" popovertarget="${id}" popovertargetaction="hide" title="Close"><icon-close></icon-close><span class="sr-only">Close</span></button>
</div>
${body}
</div>`;
}

function infoPopover(chant: Chant, groups: Map<string, Group>): string {
  const groupLinks = chant.groups
    .map((m) => groups.get(m.group))
    .filter((g): g is Group => g !== undefined)
    .map((g) => `<a href="/list/${g.id}">${escapeHtml(g.title)}</a>`)
    .join(', ');
  const source = chant.paliSource.url
    ? `<a href="${escapeHtml(chant.paliSource.url)}">${escapeHtml(chant.paliSource.label)}</a>`
    : escapeHtml(chant.paliSource.label);
  const refs = chant.sections.flatMap((s) => s.refs ?? []);
  const items = [
    `<dt>Groups</dt><dd>${groupLinks}</dd>`,
    `<dt>Pali source</dt><dd>${source}</dd>`,
    `<dt>English</dt><dd>Our own translation.${chant.translation === 'draft' ? ' It is still a draft.' : ''}</dd>`,
    refs.length ? `<dt>References</dt><dd>${refs.map(suttaCentral).join(', ')}</dd>` : '',
    chant.notes?.length ? `<dt>Notes</dt>${chant.notes.map((n) => `<dd>${escapeHtml(n)}</dd>`).join('')}` : '',
    chant.links?.length
      ? `<dt>Links</dt>${chant.links.map((l) => `<dd><a href="${escapeHtml(l.href)}">${escapeHtml(l.text)}</a></dd>`).join('')}`
      : '',
  ];
  const pali = chant.paliTitle ? `<p class="info-pali-title" lang="pi">${escapeHtml(chant.paliTitle)}</p>` : '';
  return popover('info', escapeHtml(chant.title), `${pali}<dl>${items.join('')}</dl>`);
}

function choice(name: string, legend: string, options: [string, string][]): string {
  const inputs = options
    .map(([value, label]) => `<label><input type="radio" name="${name}" value="${value}"> ${label}</label>`)
    .join('');
  return `<fieldset><legend>${legend}</legend><div class="choices">${inputs}</div></fieldset>`;
}

function settingsPopover(chant: Chant): string {
  const chantLines = chant.sections.flatMap((s) => s.lines).filter((l): l is ChantingLine => 'pali' in l);
  const twoForms = chantLines.some((l) => hasForms(l.pali) || hasForms(l.en));
  const translated = chantLines.some((l) => l.en);
  const shortcuts = SHORTCUTS.map(([key, action]) => `<dt><kbd>${escapeHtml(key)}</kbd></dt><dd>${action}</dd>`).join('');
  const body = `<form class="settings">
${choice('theme', 'Theme', [['', 'System'], ['light', 'Light'], ['dark', 'Dark']])}
${choice('size', 'Text size', [['small', 'Small'], ['', 'Medium'], ['large', 'Large']])}
${translated ? '<label class="toggle"><input type="checkbox" name="translation"> Show translation</label>' : ''}
${twoForms ? choice('form', 'Form', [['', 'Men’s form'], ['women', 'Women’s form']]) : ''}
</form>
<h3 id="shortcuts">Keyboard shortcuts</h3>
<dl class="shortcuts">${shortcuts}</dl>`;
  return popover('settings', 'Settings', body);
}

function header(chant: Chant): string {
  return `<header class="chant-header">
  <a class="icon-button" href="/" title="All chants"><icon-home></icon-home><span class="sr-only">All chants</span></a>
  <p class="chant-header-title">${escapeHtml(chant.title)}</p>
  <button class="icon-button" popovertarget="info" title="Info (I)"><icon-info></icon-info><span class="sr-only">Info</span></button>
  <button class="icon-button" popovertarget="settings" title="Settings (S)"><icon-tune></icon-tune><span class="sr-only">Settings</span></button>
</header>`;
}

export function chantPage(chant: Chant, groups: Map<string, Group>): string {
  const paliTitle =
    chant.paliTitle && chant.paliTitle !== chant.title ? `<p class="chant-pali-title" lang="pi">${escapeHtml(chant.paliTitle)}</p>` : '';
  const draft = chant.translation === 'draft' ? `<p class="draft-notice">${DRAFT_NOTICE}</p>` : '';
  const body = `<article class="chant">
<h1>${escapeHtml(chant.title)}</h1>
${paliTitle}
${notes(chant)}
${chant.sections.map(section).join('\n')}
${draft}
</article>
${infoPopover(chant, groups)}
${settingsPopover(chant)}`;
  return layout(chant.title, body, '<script type="module" src="/assets/js/chant-page.js"></script>', header(chant));
}

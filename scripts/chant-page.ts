import { escapeHtml } from '../src/html.ts';
import { SIZE_RANGES, TEMPO_RANGE, type Range } from '../src/settings.ts';
import type { Chant, ChantingLine, Line, Ref, Section, Text } from '../data/types.ts';
import type { Group } from './chant-list.ts';
import { layout } from './templates.ts';

const TRANSLATION_NOTE = 'LLM translation as a guide only. Please consult a published translation and report mistakes.';
const DEDICATION =
  'May the heartfelt recitation of these verses be offered to the Buddha, Dhamma and Sangha and for the happiness of all beings';

const SHORTCUTS = [
  ['Space', 'Start or pause; in the text view, tracking on or off'],
  ['→ or Page Down', 'Next line'],
  ['← or Page Up', 'Previous line'],
  ['+ and −', 'Faster or slower (Auto advance on slides)'],
  ['V', 'Switch between text and slides'],
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
  const repeats = line.repeat ? ` data-repeat="${line.repeat}"` : '';
  return `<div class="line${line.leader ? ' leader' : ''}" data-line="${line.id}"${repeats}>${label}<p class="pali" lang="pi">${forms(line.pali, pali)}${repeat}</p>${en}</div>`;
}

// A run of consecutive leader lines has one label.
function lines(list: Line[]): string {
  return list
    .map((line, i) => {
      if ('cue' in line) return `<p class="cue" data-cue="${line.id}">${escapeHtml(line.cue)}</p>`;
      const before = list[i - 1];
      const labelled = Boolean(line.leader) && !(before && 'pali' in before && before.leader);
      return chantingLine(line, labelled);
    })
    .join('\n');
}

function section(s: Section): string {
  const title = s.title ? `<h2>${escapeHtml(s.title)}</h2>\n` : '';
  return `<section class="chant-section">
${title}${lines(s.lines)}
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
    chant.translation ? `<dt>English</dt><dd>${TRANSLATION_NOTE}</dd>` : '',
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

// `attributes` names the slider: a setting's name, or an ID for the tempo.
function slider(attributes: string, label: string, range: Range, ends: [string, string]): string {
  const { min, max, step } = range;
  return `<div class="slider"><span aria-hidden="true">${ends[0]}</span><input type="range" ${attributes} min="${min}" max="${max}" step="${step}" value="${range.default}" aria-label="${label}"><span aria-hidden="true">${ends[1]}</span></div>`;
}

// Each view has its own text size; the settings show the slider of the view in use.
function textSize(name: 'size' | 'slideSize', view: string): string {
  const ends: [string, string] = ['<span class="size-small">A</span>', '<span class="size-large">A</span>'];
  return `<fieldset class="${view}-only"><legend>Text size</legend>${slider(`name="${name}"`, 'Text size', SIZE_RANGES[name], ends)}</fieldset>`;
}

function settingsPopover(chant: Chant): string {
  const chantLines = chant.sections.flatMap((s) => s.lines).filter((l): l is ChantingLine => 'pali' in l);
  const twoForms = chantLines.some((l) => hasForms(l.pali) || hasForms(l.en));
  const translated = chantLines.some((l) => l.en);
  const shortcuts = SHORTCUTS.map(([key, action]) => `<dt><kbd>${escapeHtml(key)}</kbd></dt><dd>${action}</dd>`).join('');
  const body = `<form class="settings">
<div class="slides-only">
<fieldset><legend>Advance</legend><div class="choices">
  <label><input type="radio" name="advance" value=""> Manual</label>
  <label><input type="radio" name="advance" value="auto"> Auto</label>
  <label><input type="radio" name="advance" value="timed"> Timed</label>
</div></fieldset>
<div class="auto-options">
  ${slider('id="tempo" list="tempo-marks"', 'Speed', TEMPO_RANGE, ['Slower', 'Faster'])}
  <datalist id="tempo-marks"><option value="${TEMPO_RANGE.default}"></option></datalist>
</div>
<div class="timed-options">
  <p class="timing-name"></p>
  <div class="timing-actions">
    <button type="button" class="outline-button" id="timing-export">Export timing</button>
    <button type="button" class="outline-button" id="timing-import-button">Import timing</button>
    <input type="file" id="timing-import" accept=".lrc,.txt,text/plain" hidden>
    <button type="button" class="outline-button" id="timing-default">Use default</button>
  </div>
  <p class="timing-error" role="alert"></p>
</div>
</div>
${choice('theme', 'Theme', [['', 'System'], ['light', 'Light'], ['dark', 'Dark']])}
${textSize('size', 'text')}
${textSize('slideSize', 'slides')}
${translated ? '<label class="toggle"><input type="checkbox" name="translation" value="" data-unchecked="off"> Show translation</label>' : ''}
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
  <div class="view-switch" role="group" aria-label="View">
    <button data-view="text" title="Text (V)">Text</button>
    <button data-view="slides" title="Slides (V)">Slides</button>
  </div>
  <button class="track" id="track" aria-pressed="false" title="Mark the current line (Space)">Track</button>
  <button class="icon-button" popovertarget="settings" title="Settings (S)"><icon-tune></icon-tune><span class="sr-only">Settings</span></button>
  <button class="icon-button" popovertarget="info" title="Info (I)"><icon-info></icon-info><span class="sr-only">Info</span></button>
</header>`;
}

/** The chant after this one in its first group, offered on the end slide. */
export interface NextChant {
  id: string;
  title: string;
  groupTitle: string;
}

// The slide view is filled from the text view's lines by src/slide-view.ts.
function slides(next: NextChant | undefined): string {
  const nextLink = next
    ? `<a class="slide-next-chant" href="/chants/${next.id}?view=slides">Next in ${escapeHtml(next.groupTitle)}: ${escapeHtml(next.title)}</a>`
    : '';
  return `<section class="slides" id="slides" aria-label="Slides">
<p class="slide-section"></p>
<div class="slide-stage" id="slide-stage">
  <div class="slide-page"></div>
  <div class="slide-end">
    <p class="slide-dedication">${DEDICATION}</p>
    <div class="slide-end-actions">
      <button class="outline-button" id="back-to-start">Back to start</button>
      <a class="outline-button" href="/">Back to list</a>
    </div>
    ${nextLink}
  </div>
</div>
<div class="slide-bar" id="slide-bar">
  <button class="icon-button" id="slide-previous" title="Previous line (←)"><span aria-hidden="true">‹</span><span class="sr-only">Previous line</span></button>
  <button class="start" id="slide-start">Start</button>
  <button class="icon-button" id="slide-next" title="Next line (→)"><span aria-hidden="true">›</span><span class="sr-only">Next line</span></button>
  <button class="icon-button slower auto-only" title="Slower (−)"><span aria-hidden="true">−</span><span class="sr-only">Slower</span></button>
  <button class="method-label" popovertarget="settings" title="How lines move on">Manual</button>
  <button class="icon-button faster auto-only" title="Faster (+)"><span aria-hidden="true">+</span><span class="sr-only">Faster</span></button>
  <p class="slide-position"></p>
</div>
</section>`;
}

// A recording's timing is bundled with the page as the default for Timed advance (spec 09, F8).
export function chantPage(chant: Chant, groups: Map<string, Group>, next?: NextChant, timing?: string | null): string {
  const paliTitle =
    chant.paliTitle && chant.paliTitle !== chant.title ? `<p class="chant-pali-title" lang="pi">${escapeHtml(chant.paliTitle)}</p>` : '';
  const body = `<article class="chant" data-chant="${chant.id}">
<h1>${escapeHtml(chant.title)}</h1>
${paliTitle}
${notes(chant)}
${chant.sections.map(section).join('\n')}
</article>
<button class="back-to-line" id="back-to-line" hidden>Back to current line</button>
${slides(next)}
${infoPopover(chant, groups)}
${settingsPopover(chant)}${timing ? `\n<script type="text/plain" id="recording-timing">${timing}</script>` : ''}`;
  return layout(chant.title, body, '<script type="module" src="/assets/js/chant-page.js"></script>', header(chant));
}

import { chantHref } from '../src/card.ts';
import { escapeHtml } from '../src/html.ts';
import { forms, lineText } from '../src/line-text.ts';
import { SIZE_RANGES, TEMPO_RANGE, type Range } from '../src/settings.ts';
import type { Chant, ChantingLine, ChantSet, Line, Ref, Section, Text } from '../data/types.ts';
import type { PublishedTranslation } from '../src/translation-file.ts';
import { translators } from '../data/translators.ts';
import type { Group, RecordingInfo } from './chant-list.ts';
import { layout, THEME_BUTTON, type SetChanter } from './templates.ts';

const TIMING_FILES = 'https://github.com/aminahbl/owili-chanting/blob/main/data/chants/timings';
const DEDICATION =
  'May the heartfelt recitation of these verses be offered to the Buddha, Dhamma and Sangha and for the happiness of all beings';

const SHORTCUTS = [
  ['Space', 'Start or pause; with Manual advance, the next line on slides, or tracking on or off in the text view'],
  ['→ or Page Down', 'Next line'],
  ['← or Page Up', 'Previous line'],
  ['+ and −', 'Faster or slower (Auto advance)'],
  ['V', 'Switch between text and slides'],
  ['T', 'Show or hide the translation, or the Pali when the translation is chanted'],
  ['I', 'Info'],
  ['S', 'Settings'],
  ['?', 'Keyboard shortcuts'],
  ['Esc', 'Close'],
];

const hasForms = (text: Text | undefined) => typeof text === 'object';

/** A link to another site, opened in a new tab so a chant in progress is not left. */
function externalLink(href: string, text: string): string {
  return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
}

function suttaCentral(ref: Ref): string {
  return ref.uid ? externalLink(`https://suttacentral.net/${ref.uid}`, ref.label) : escapeHtml(ref.label);
}

const repeatCount = (times: number) => `<span aria-hidden="true">×${times}</span><span class="sr-only">${times} times</span>`;

type Role = 'leader' | 'solo' | '';
const ROLE_LABELS: Record<Role, string> = { leader: 'Leader', solo: 'Solo introduction', '': '' };

function role(line: Line | undefined): Role {
  if (!line || 'cue' in line) return '';
  if (line.solo) return 'solo';
  return line.leader ? 'leader' : '';
}

function chantingLine(line: ChantingLine, labelled: boolean): string {
  const lineRole = role(line);
  const label = labelled ? `<span class="role-label">${ROLE_LABELS[lineRole]}</span>` : '';
  // The count is in both texts, as either can be the chanted one.
  const repeat = line.repeat ? ` <span class="repeat">${repeatCount(line.repeat)}</span>` : '';
  const leader = line.leader === true;
  const en = line.en ? `<p class="en">${lineText(line.en, leader)}${repeat}</p>` : '';
  const repeats = line.repeat ? ` data-repeat="${line.repeat}"` : '';
  return `<div class="line${lineRole ? ` ${lineRole}` : ''}" data-line="${line.id}"${repeats}>${label}<p class="pali" lang="pi">${lineText(line.pali, leader)}${repeat}</p>${en}</div>`;
}

// A run of consecutive solo or leader lines has one label.
function lines(list: Line[]): string {
  return list
    .map((line, i) => {
      if ('cue' in line) return `<p class="cue" data-cue="${line.id}">${forms(line.cue, escapeHtml)}</p>`;
      const labelled = role(line) !== '' && role(line) !== role(list[i - 1]);
      return chantingLine(line, labelled);
    })
    .join('\n');
}

// On a set page, each chant's title is an h2, so its section titles are h3.
function section(s: Section, heading: 'h2' | 'h3' = 'h2'): string {
  const title = s.title ? `<${heading}>${escapeHtml(s.title)}</${heading}>\n` : '';
  const repeats = s.repeat ? ` data-repeat="${s.repeat}"` : '';
  const repeat = s.repeat ? `\n<p class="repeat section-repeat">${repeatCount(s.repeat)}</p>` : '';
  return `<section class="chant-section"${repeats}>
${title}${lines(s.lines)}${repeat}
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

// Each recording that a timing file follows, with its details, its page and the file.
function recording({ file, tags }: RecordingInfo): string {
  const about = [tags.ti, tags.place, tags.performers, tags.date].filter(Boolean).map((t) => escapeHtml(t)).join(', ');
  const links = [
    tags.page ? externalLink(tags.page, 'Recording page') : '',
    externalLink(`${TIMING_FILES}/${encodeURIComponent(file)}`, 'Timing file'),
  ];
  return `<dd>${about}. ${links.filter(Boolean).join(' · ')}</dd>`;
}

// A chant's published translations, which src/translation.ts offers in the settings.
function publishedTranslations(translations: PublishedTranslation[] = []): string {
  if (!translations.length) return '';
  const json = JSON.stringify(translations).replace(/</g, '\\u003c');
  return `\n<script type="application/json" class="published-translations">${json}</script>`;
}

/** A set that a chant is part of, for its info panel. */
export interface SetLink {
  slug: string;
  title: string;
  chanterTitle: string;
}

function infoPopover(chant: Chant, groups: Group[], recordings: RecordingInfo[], sets: SetLink[]): string {
  const groupLinks = groups.map((g) => `<a href="/list/${g.id}">${escapeHtml(g.title)}</a>`).join(', ');
  const { label, url, categories } = chant.paliSource;
  const paliSourceName = url ? externalLink(url, label) : escapeHtml(label);
  const placing = (categories ?? [])
    .map((c) => escapeHtml([c.category, c.subcategory].filter(Boolean).join(', ')))
    .join('; ');
  const paliSource = placing ? `${paliSourceName}: ${placing}` : paliSourceName;
  const refs = chant.sections.flatMap((s) => s.refs ?? []);
  const items = [
    `<dt>Pali (public domain)</dt><dd>Initially retrieved from ${paliSource}</dd>`,
    `<dt>Categories</dt><dd>${groupLinks}</dd>`,
    sets.length
      ? `<dt>Sangha sets</dt>${sets.map((s) => `<dd><a href="/sets/${s.slug}">${escapeHtml(s.title)}</a>, ${escapeHtml(s.chanterTitle)}</dd>`).join('')}`
      : '',
    recordings.length ? `<dt>Recordings</dt>${recordings.map(recording).join('')}` : '',
    refs.length ? `<dt>References</dt><dd>${refs.map(suttaCentral).join(', ')}</dd>` : '',
    chant.notes?.length ? `<dt>Notes</dt>${chant.notes.map((n) => `<dd>${escapeHtml(n)}</dd>`).join('')}` : '',
    chant.links?.length
      ? `<dt>Links</dt>${chant.links.map((l) => `<dd>${externalLink(l.href, l.text)}</dd>`).join('')}`
      : '',
  ];
  const pali = chant.paliTitle ? `<p class="info-pali-title" lang="pi">${escapeHtml(chant.paliTitle)}</p>` : '';
  const number = `<p class="info-number">#${chant.id}</p>`;
  return popover('info', escapeHtml(chant.title), `${pali}<dl>${items.join('')}</dl>${number}`);
}

function choice(name: string, legend: string, options: [string, string][], className = ''): string {
  const inputs = options
    .map(([value, label]) => `<label><input type="radio" name="${name}" value="${value}"> ${label}</label>`)
    .join('');
  const classes = className ? ` class="${className}"` : '';
  return `<fieldset${classes}><legend>${legend}</legend><div class="choices">${inputs}</div></fieldset>`;
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

function hasTwoForms(chants: Chant[]): boolean {
  const chantLines = chants.flatMap((c) => c.sections.flatMap((s) => s.lines)).filter((l): l is ChantingLine => 'pali' in l);
  return chantLines.some((l) => hasForms(l.pali) || hasForms(l.en));
}

// Every published translator is offered; src/translation.ts hides those without
// a translation of a chant on the page, and shows the credit of the one in use.
// The credit links to the chant in the translator's source when the page has one
// chant in it, and to the source as a whole otherwise.
function translatorChoices(translations: PublishedTranslation[]): string {
  const options = translators
    .map((t) => {
      const sources = translations.filter((p) => p.translator === t.id).map((p) => p.source);
      const source = sources.length === 1 ? sources[0] : t.source;
      const credit = `${externalLink(source, 'English translation')} ${escapeHtml(t.credit)}. ${externalLink(t.licence.url, t.licence.label)}`;
      return `<label data-translator="${t.id}"><input type="radio" name="translator" value="${t.id}"> ${escapeHtml(t.title)}</label>
  <p class="translator-credit option-note" data-translator="${t.id}" hidden>${credit}</p>`;
    })
    .join('');
  const site = '<label><input type="radio" name="translator" value=""> Site English (LLM generated)</label>';
  return `<div class="translator-choices">${site}${options}</div>`;
}

// The choice of men's and women's forms is included when `twoForms` is true.
function settingsPopover(twoForms: boolean, recorded: boolean, translations: PublishedTranslation[] = []): string {
  const body = `<form class="settings">
  <fieldset><legend>Audio</legend>
  <p class="audio-note option-note">Selected audio files are remembered by your browser on this device.${recorded ? ' Details of the available recordings, with links to their pages, are given in the info panel.' : ''}</p>
  <p class="audio-name option-note" hidden></p>
  <div class="option-actions">
    <button type="button" class="outline-button" id="audio-restore" hidden></button>
    <button type="button" class="outline-button" id="audio-choose">Add audio file</button>
    <input type="file" id="audio-file" accept="audio/*" hidden>
    <button type="button" class="outline-button" id="audio-remove" hidden>Remove</button>
  </div>
  <p class="audio-error option-error" role="alert"></p>
</fieldset>
<fieldset><legend>Advance</legend><div class="choices">
  <label><input type="radio" name="advance" value=""> Manual</label>
  <label><input type="radio" name="advance" value="auto"> Auto</label>
  <label><input type="radio" name="advance" value="timed"> Timed</label>
</div></fieldset>
<div class="auto-options">
  ${slider('id="tempo" list="tempo-marks"', 'Speed', TEMPO_RANGE, ['<icon-tortoise></icon-tortoise>', '<icon-hare></icon-hare>'])}
  <datalist id="tempo-marks"><option value="${TEMPO_RANGE.default}"></option></datalist>
</div>
<div class="timed-options">
  <p class="timing-name option-note"></p>
  <div class="option-actions">
    <button type="button" class="outline-button" id="timing-default">Use default</button>
    <button type="button" class="outline-button" id="timing-import-button">Import timing</button>
    <input type="file" id="timing-import" accept=".lrc,.txt,text/plain" hidden>
    <button type="button" class="outline-button" id="timing-export">Export timing</button>
  </div>
  <p class="timing-error option-error" role="alert"></p>
</div>
${textSize('size', 'text')}
${textSize('slideSize', 'slides')}
${choice('chanting', 'Chanting', [['', 'Pali'], ['translation', 'Translation'], ['both', 'Pali & translation']])}
${choice('order', 'Order', [['', 'Pali first'], ['translation', 'Translation first']], 'order-options')}
<fieldset><legend>Translations</legend>
  <label class="toggle shadow-toggle"><input type="checkbox" name="translation" value="" data-unchecked="off"> <span class="shadow-en">Show translation</span><span class="shadow-pali">Show Pali</span></label>
  ${translatorChoices(translations)}
  <p class="translation-name option-note" hidden></p>
  <div class="option-actions">
    <button type="button" class="outline-button" id="translation-import-button">Import translation</button>
    <input type="file" id="translation-import" accept=".txt,text/plain" hidden>
    <button type="button" class="outline-button" id="translation-export">Export translation</button>
  </div>
  <p class="translation-error option-error" role="alert"></p>
</fieldset>
${twoForms ? choice('form', 'Form', [['', 'Men’s form'], ['women', 'Women’s form']], 'form-options') : ''}
</form>`;
  return popover('settings', 'Settings', body);
}

function shortcutsPopover(): string {
  const shortcuts = SHORTCUTS.map(([key, action]) => `<dt><kbd>${escapeHtml(key)}</kbd></dt><dd>${action}</dd>`).join('');
  return popover('shortcuts', 'Keyboard shortcuts', `<dl class="shortcuts">${shortcuts}</dl>`);
}

function header(title: string): string {
  return `<header class="chant-header">
  <a class="icon-button" href="/" title="All chants"><icon-home></icon-home><span class="sr-only">All chants</span></a>
  <p class="chant-header-title">${escapeHtml(title)}</p>
  <div class="view-switch" role="group" aria-label="View">
    <button data-view="text" title="Text (V)">Text</button>
    <button data-view="slides" title="Slides (V)">Slides</button>
  </div>
  <button class="icon-button" popovertarget="settings" title="Settings (S)"><icon-tune></icon-tune><span class="sr-only">Settings</span></button>
  <button class="icon-button" popovertarget="info" title="Info (I)"><icon-info></icon-info><span class="sr-only">Info</span></button>
  <button class="icon-button shortcuts-button" popovertarget="shortcuts" title="Keyboard shortcuts (?)"><icon-command></icon-command><span class="sr-only">Keyboard shortcuts</span></button>
  ${THEME_BUTTON}
</header>`;
}

// The audio controls, shown once the user adds an audio file, in the slide bar
// and in the text bar, beside Start and the advance method.
function audioControls(): string {
  return `<div class="audio-controls" hidden>
  <button class="icon-button audio-skip" data-audio="back" title="Back 3 seconds; hold to rewind"><icon-rewind></icon-rewind><span class="sr-only">Back 3 seconds</span></button>
  <button class="icon-button" data-audio="play" title="Play"><icon-play></icon-play><icon-pause></icon-pause><span class="sr-only">Play</span></button>
  <button class="icon-button audio-skip" data-audio="forward" title="Forward 3 seconds; hold to fast-forward"><icon-forward></icon-forward><span class="sr-only">Forward 3 seconds</span></button>
  <button class="icon-button" data-audio="stop" title="Stop"><icon-stop></icon-stop><span class="sr-only">Stop</span></button>
</div>`;
}

function lockButton(title: string): string {
  return `<button class="icon-button audio-link" data-audio="link" aria-pressed="true" title="${title}" hidden><icon-lock-open size="16"></icon-lock-open><icon-lock size="16"></icon-lock><span class="sr-only">${title}</span></button>`;
}

function methodControls(): string {
  return `<div class="control-group">
    <button class="icon-button slower auto-only" title="Slower (−)"><icon-minus></icon-minus><span class="sr-only">Slower</span></button>
    <button class="method-label" popovertarget="settings" title="How lines move on">Manual</button>
    <button class="icon-button faster auto-only" title="Faster (+)"><icon-plus></icon-plus><span class="sr-only">Faster</span></button>
  </div>`;
}

// The text view's controls float at the foot of the screen, with "Back to
// current line" above them.
function textFoot(): string {
  return `<div class="text-foot">
<button class="back-to-line" id="back-to-line" hidden>Back to current line</button>
<div class="text-bar">
  <div class="control-group">
    <button class="track" id="track" aria-pressed="false" title="Mark the current line">Track</button>
    ${lockButton('Lock the audio to the text')}
    <button class="start">Start</button>
  </div>
  ${methodControls()}
  ${audioControls()}
</div>
</div>`;
}

// The slide view is filled from the text view's lines by src/slide-view.ts.
function slides(): string {
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
  </div>
</div>
<div class="slide-bar" id="slide-bar">
<div class="slide-controls">
  <div class="control-group">
    ${lockButton('Lock the audio to the slides')}
    <button class="icon-button" id="slide-previous" title="Previous line (←)"><icon-chevron-left></icon-chevron-left><span class="sr-only">Previous line</span></button>
    <button class="start">Start</button>
    <button class="icon-button" id="slide-next" title="Next line (→)"><icon-chevron-right></icon-chevron-right><span class="sr-only">Next line</span></button>
  </div>
  ${methodControls()}
  ${audioControls()}
</div>
<p class="slide-position"><input class="slide-line" id="slide-line" inputmode="numeric" enterkeyhint="go" autocomplete="off" placeholder="–" aria-label="Go to line" title="Go to line"> / <span class="slide-total"></span></p>
</div>
</section>`;
}

// A recording's timing is bundled with the page as the default for Timed advance.
export function chantPage(
  chant: Chant,
  groups: Group[],
  timing?: string,
  recordings: RecordingInfo[] = [],
  sets: SetLink[] = [],
  translations: PublishedTranslation[] = [],
): string {
  const paliTitle =
    chant.paliTitle && chant.paliTitle !== chant.title ? `<p class="chant-pali-title" lang="pi">${escapeHtml(chant.paliTitle)}</p>` : '';
  const body = `<article class="chant" data-chant="${chant.id}" data-slug="${chant.slug}">
<h1>${escapeHtml(chant.title)}</h1>
${paliTitle}
${notes(chant)}
${chant.sections.map((s) => section(s)).join('\n')}${publishedTranslations(translations)}
</article>
${textFoot()}
${slides()}
${infoPopover(chant, groups, recordings, sets)}
${settingsPopover(hasTwoForms([chant]), recordings.length > 0, translations)}
${shortcutsPopover()}${timing ? `\n<script type="text/plain" id="recording-timing">${timing}</script>` : ''}`;
  return layout(chant.title, body, ['chant-page'], header(chant.title));
}

function setInfoPopover(set: ChantSet, chants: Chant[], chanter: SetChanter, recordings: RecordingInfo[]): string {
  const anchor = set.anchorRecording;
  const anchorLabel = anchor.url ? externalLink(anchor.url, anchor.label) : escapeHtml(anchor.label);
  const anchorDetails = [anchor.performers, anchor.date].filter(Boolean).map((t) => escapeHtml(t!));
  const anchorName = [anchorLabel, ...anchorDetails].join(', ');
  const items = [
    `<dt>Chanted by</dt><dd>${escapeHtml([chanter.title, chanter.lineageTitle].filter(Boolean).join(', '))}</dd>`,
    `<dt>Chants</dt>${chants.map((c) => `<dd><a href="${chantHref(c.slug)}">${escapeHtml(c.title)}</a></dd>`).join('')}`,
    `<dt>Anchor recording</dt><dd>${anchorName}</dd>`,
    recordings.length ? `<dt>Recordings</dt>${recordings.map(recording).join('')}` : '',
    set.links?.length
      ? `<dt>Links</dt>${set.links.map((l) => `<dd>${externalLink(l.href, l.text)}</dd>`).join('')}`
      : '',
  ];
  const copy = `<p class="info-actions"><button type="button" class="outline-button" id="copy-set" data-title="${escapeHtml(`${set.title}, ${chanter.title}`)}">Copy to open sets</button></p>`;
  const number = `<p class="info-number">#${set.id}</p>`;
  return popover('info', escapeHtml(set.title), `<dl>${items.join('')}</dl>${copy}${number}`);
}

/**
 * A chant as one block of a set page, with its title as a heading. The block
 * carries the chant's number. The build also writes each chant's block to
 * /blocks/<number>.html, which an open set's page fetches.
 */
export function chantBlock(chant: Chant, translations: PublishedTranslation[] = []): string {
  return `<section class="set-chant" data-chant="${chant.id}" data-slug="${chant.slug}">
<h2 class="set-chant-title">${escapeHtml(chant.title)}</h2>
${notes(chant)}
${chant.sections.map((s) => section(s, 'h3')).join('\n')}${publishedTranslations(translations)}
</section>`;
}

// A set is one continuous text of chant blocks. The article carries the set's
// number, for its kept settings.
export function setPage(
  set: ChantSet,
  chants: Chant[],
  chanter: SetChanter,
  translations: Map<string, PublishedTranslation[]>,
  timing?: string,
  recordings: RecordingInfo[] = [],
): string {
  const body = `<article class="chant" data-chant="${set.id}" data-slug="${set.slug}">
<h1>${escapeHtml(set.title)}</h1>
<p class="set-chanter">${escapeHtml(chanter.title)}</p>
${chants.map((chant) => chantBlock(chant, translations.get(chant.id))).join('\n')}
</article>
${textFoot()}
${slides()}
${setInfoPopover(set, chants, chanter, recordings)}
${settingsPopover(hasTwoForms(chants), recordings.length > 0, chants.flatMap((c) => translations.get(c.id) ?? []))}
${shortcutsPopover()}${timing ? `\n<script type="text/plain" id="recording-timing">${timing}</script>` : ''}`;
  const title = `${set.title}, ${chanter.title}`;
  return layout(title, body, ['chant-page', 'copy-set'], header(title));
}

const OPEN_SET = 'Open set';

// The page of an open set, at /open-sets/set. src/open-set.ts fills the
// article, the title and the info panel's list of chants from the set kept in
// the browser or given in the address, and then loads chant-page.js. The form
// choice is always included, and the script hides it when no line has two forms.
export function openSetPage(): string {
  const items = [
    '<dt id="open-set-chants">Chants</dt>',
    '<dt class="open-set-kept">Open set</dt><dd class="open-set-kept">Kept in this browser. <a id="open-set-edit" href="/open-sets">Edit in Open sets</a></dd>',
  ];
  const body = `<div class="open-set-save text-only" hidden>
<p>This set is not saved in this browser.</p>
<button type="button" class="outline-button" id="open-set-save">Save to open sets</button>
</div>
<p class="open-set-status" role="status"></p>
<noscript><p class="open-set-status">Open sets need JavaScript.</p></noscript>
<article class="chant"></article>
${textFoot()}
${slides()}
${popover('info', OPEN_SET, `<dl>${items.join('')}</dl>`)}
${settingsPopover(true, false)}
${shortcutsPopover()}`;
  return layout(OPEN_SET, body, ['open-set'], header(OPEN_SET));
}

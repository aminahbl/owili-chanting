// The chant page's settings popover and keyboard shortcuts. The popovers open
// and close through the HTML popover attribute, without this script.
import './icons/close.ts';
import './icons/home.ts';
import './icons/info.ts';
import './icons/tune.ts';
import { SETTING_NAMES, writeSetting, type SettingName } from './settings.ts';

const root = document.documentElement;
const form = document.querySelector<HTMLFormElement>('form.settings');
const info = document.querySelector<HTMLElement>('#info');
const settings = document.querySelector<HTMLElement>('#settings');

const isSetting = (name: string): name is SettingName => (SETTING_NAMES as readonly string[]).includes(name);

function apply(name: SettingName, value: string) {
  if (value) root.dataset[name] = value;
  else delete root.dataset[name];
  writeSetting(name, value);
}

// The translation checkbox stores "off" when cleared; every other control is a radio group.
function showCurrent(controls: HTMLFormElement) {
  for (const input of controls.querySelectorAll<HTMLInputElement>('input')) {
    const current = isSetting(input.name) ? (root.dataset[input.name] ?? '') : '';
    input.checked = input.type === 'checkbox' ? current !== 'off' : input.value === current;
  }
}

function toggleTranslation() {
  apply('translation', root.dataset.translation === 'off' ? '' : 'off');
  if (form) showCurrent(form);
}

function isTextField(target: EventTarget | null): boolean {
  if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return true;
  if (target instanceof HTMLInputElement) return !['checkbox', 'radio'].includes(target.type);
  return target instanceof HTMLElement && target.isContentEditable;
}

function openShortcuts(popover: HTMLElement) {
  if (!popover.matches(':popover-open')) popover.showPopover();
  popover.querySelector('#shortcuts')?.scrollIntoView({ block: 'nearest' });
}

if (form) {
  showCurrent(form);
  form.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (!isSetting(input.name)) return;
    if (input.type === 'checkbox') apply(input.name, input.checked ? '' : 'off');
    else apply(input.name, input.value);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.altKey || event.metaKey || isTextField(event.target)) return;
  const key = event.key.toLowerCase();
  if (key === 't' && form?.querySelector('[name="translation"]')) toggleTranslation();
  else if (key === 'i') info?.togglePopover();
  else if (key === 's') settings?.togglePopover();
  else if (key === '?' && settings) openShortcuts(settings);
  else return;
  event.preventDefault();
});

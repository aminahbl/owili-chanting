// The theme button in every page's header switches between light and dark.
// Until the user presses it, the page follows the system's theme. The CSS
// shows the icon of the theme in use.
import './icons/moon.ts';
import './icons/sun.ts';
import { writeSetting } from './settings.ts';

type Theme = 'light' | 'dark';

const root = document.documentElement;
const button = document.querySelector<HTMLButtonElement>('#theme-button');
const systemDark = matchMedia('(prefers-color-scheme: dark)');

function current(): Theme {
  const chosen = root.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return systemDark.matches ? 'dark' : 'light';
}

function other(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}

function showCurrent(button: HTMLButtonElement) {
  const label = `Switch to ${other(current())} theme`;
  button.title = label;
  const text = button.querySelector('.sr-only');
  if (text) text.textContent = label;
}

if (button) {
  showCurrent(button);
  systemDark.addEventListener('change', () => showCurrent(button));
  button.addEventListener('click', () => {
    const next = other(current());
    root.dataset.theme = next;
    writeSetting('theme', next);
    showCurrent(button);
  });
}

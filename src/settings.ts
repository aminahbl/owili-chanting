// Display settings are global across chants and stored as one localStorage
// entry. Each stored value is also set as a data attribute on <html>, which the
// CSS reads; an absent value means the default. The build inlines a script in
// each page's head that sets the attributes before the page is drawn.

export const SETTINGS_KEY = 'settings';
export const SETTING_NAMES = ['theme', 'translation', 'size', 'form'] as const;
export type SettingName = (typeof SETTING_NAMES)[number];
export type Settings = Partial<Record<SettingName, string>>;

export function readSettings(): Settings {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}') as Settings;
  } catch {
    return {};
  }
}

/** Stores one setting; an empty value restores the default. */
export function writeSetting(name: SettingName, value: string) {
  const settings = readSettings();
  if (value) settings[name] = value;
  else delete settings[name];
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Storage can be unavailable, for example in some private windows; the setting then lasts for this page only.
  }
}

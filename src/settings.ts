// Display settings are global across chants and stored as one localStorage
// entry. Each stored value is also set as a data attribute on <html>, which the
// CSS reads; an absent value means the default. The build inlines a script in
// each page's head that sets the attributes before the page is drawn.

export const SETTINGS_KEY = 'settings';
export const SETTING_NAMES = ['theme', 'translation', 'size', 'slideSize', 'form', 'view', 'advance'] as const;
export type SettingName = (typeof SETTING_NAMES)[number];
export type Settings = Partial<Record<SettingName, string>>;

export interface Range {
  min: number;
  max: number;
  step: number;
  default: number;
}

/** Each view has its own text size, in rem: the reading size in the text view and the line size on slides. */
export const SIZE_RANGES: Record<'size' | 'slideSize', Range> = {
  size: { min: 0.75, max: 1.75, step: 0.125, default: 1 },
  slideSize: { min: 1.25, max: 4, step: 0.25, default: 2 },
};

/** The Auto tempo, 1 being the rhythm model's natural speed, in the middle of the range. */
export const TEMPO_RANGE: Range = { min: 0.5, max: 1.5, step: 0.05, default: 1 };

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

/** Settings for one chant, such as its last position, stored as one entry per chant. */
export interface ChantSettings {
  position?: { line: number; repeat: number };
  /** Auto-advance tempo, 1 being the rhythm model's natural speed. */
  tempo?: number;
  /** An imported timing file (LRC), as imported, and its file name. */
  timing?: { name: string; lrc: string };
}

const chantKey = (id: string) => `chant:${id}`;

export function readChantSettings(id: string): ChantSettings {
  try {
    return JSON.parse(localStorage.getItem(chantKey(id)) ?? '{}') as ChantSettings;
  } catch {
    return {};
  }
}

export function writeChantSettings(id: string, changes: ChantSettings) {
  try {
    localStorage.setItem(chantKey(id), JSON.stringify({ ...readChantSettings(id), ...changes }));
  } catch {
    // As for writeSetting.
  }
}

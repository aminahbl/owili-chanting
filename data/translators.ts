/**
 * The translators of the files in chants/translations/, which the settings
 * offer beside the site's English. A file's name gives its translator:
 * <number>-<translator>-<slug>.txt. Each file links to its chant in the
 * translator's `source`, and the credit in the settings links to it.
 */
export const translators = [
  {
    id: 'amaravati',
    title: 'Amaravati Buddhist Monastery',
    credit: '© Amaravati Buddhist Monastery, published by Amaravati Publications',
    source: 'https://github.com/profound-labs/community-chanting-book',
    licence: { label: 'CC BY-NC-ND 4.0', url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/' },
  },
  {
    id: 'anandajoti',
    title: 'Ānandajoti Bhikkhu',
    credit: '© Ānandajoti Bhikkhu, Ancient Buddhist Texts',
    source: 'https://ancient-buddhist-texts.net/Texts-and-Translations',
    licence: { label: 'CC BY-SA 3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0/' },
  },
] as const;

export type TranslatorId = (typeof translators)[number]['id'];

# Chanting

A lightweight, static website to help users chant Pali texts, with line‑by‑line English, a slide view that marks the current line, and the user's own audio of a recording to chant along with.

## Features

- Minimal, typography‑first layout focussed on the text
- Chant list with search, categories and pages
- Sangha sets: sequences of chants as a community or an individual chants them, each on one page
- Open sets: sequences of chants chosen by the user, kept in the browser and shared by link, each on one page like a Sangha set
- Pali text with secondary English line‑by‑line
- Chanting in Pali, in translation, or in both line by line
- Published translations, such as the English of Amaravati Buddhist Monastery and of Ānandajoti Bhikkhu, offered in the settings beside the site's English
- The user's own translation, imported from a plain text file in place of the English
- A text view with line tracking, and a slide view that shows a few lines at a time with the current line marked
- Three ways for lines to move on in the slide view: Manual, Auto (at a pace worked out from the Pali, with a speed control) and Timed (following a timing file)
- Timing files in LRC, the plain text format for timed lyrics, that can be exported, edited and imported; chants with a recording's timing use it by default
- The user's own audio file, played in either view; in the slide view it can be locked to the slides, and with Timed advance the lines follow it
- The recordings of each chant and set listed in its info panel, with their timing files
- 100% static: no backend, nothing uploaded

## Project structure

```
.
├── pages/                    # Body HTML of the about, guide and resources pages
├── scripts/
│   ├── build.ts              # Writes the site to dist/
│   ├── chant-list.ts         # Chants and sets, their timings, cards and search index
│   ├── chant-page.ts         # HTML for the chant, set and open set pages, and each chant's block
│   ├── ids.ts                # Checks chant and set numbers against the ledger
│   ├── modules.ts            # The modules each page's scripts import, for preload links
│   ├── timings.ts            # Drafts chants and timing files from a recording's pauses
│   └── templates.ts          # Page layout, the site header, and HTML for the list and Open sets pages
├── src/                      # Browser code, compiled to dist/assets/js/
│   ├── search.ts             # Search on the list pages
│   ├── chant-page.ts         # Connects the chant or set page's views, controls and keys
│   ├── open-set-store.ts     # The user's open sets in the browser, and their share links
│   ├── open-set.ts           # Fills an open set's page with its chants' blocks
│   ├── open-sets.ts          # The Open sets page: the list and the editor
│   ├── copy-set.ts           # Copy to open sets, on a Sangha set's page
│   ├── clock.ts              # The line clock: the current line and how it moves on
│   ├── text-view.ts          # The text view, and the steps of the line clock
│   ├── slide-view.ts         # The slide view
│   ├── rhythm.ts             # Line lengths from Pali syllables, for Auto advance
│   ├── tempo.ts              # The Auto speed
│   ├── lrc.ts                # Reads timing files, shared with the build
│   ├── timing.ts             # The timing in use for Timed advance
│   ├── translation.ts        # The translation in use: the site's English, a published one or an imported file
│   ├── translation-file.ts   # Reads and writes translation files, shared with the build
│   ├── line-text.ts          # A line's text as HTML, with leader marks and forms, shared with the build
│   ├── audio-store.ts        # Remembering the user's audio file per chant or set
│   ├── recording.ts          # The user's audio file, which the slides can follow
│   ├── wake-lock.ts          # Keeps the screen on while lines move on
│   ├── settings.ts           # Stored display settings, shared with the build
│   ├── theme.ts              # The theme button in every page's header
│   ├── icons/                # Icons as custom elements
│   ├── card.ts               # Card markup and the search index, shared with the build
│   ├── normalise.ts          # Search text normalisation, shared with the build
│   └── html.ts               # HTML escaping
├── data/
│   ├── DATA.md               # How the data fits together and is checked
│   ├── chants/
│   │   ├── CHANTS.md         # Quick guides for changing chants
│   │   ├── RECORDED-CHANTS.md # Making a chant whose lines follow a recording
│   │   ├── texts/            # One typed module per chant; retired ones in retired/
│   │   ├── timings/          # Timing files, one per recording, and TIMINGS.md
│   │   └── translations/     # Published translations offered in the settings, and TRANSLATIONS.md
│   ├── sets/                 # One typed module per Sangha set; retired ones in retired/
│   │   └── SETS.md           # Quick guides for changing sets
│   ├── groups.ts             # Categories and their chants, in display order
│   ├── chanters.ts           # Chanters of the Sangha sets and their lineages
│   ├── translators.ts        # Translators of the translation files, with credit, source and licence
│   ├── ids.ts                # The ledger of chant and set numbers
│   ├── types.ts              # The Chant and ChantSet types
│   └── translation-guide.md  # Principles and fixed renderings for the English
├── package.json              # Build and type-check scripts
├── tsconfig.json             # Type-check for build scripts and data
├── tsconfig.browser.json     # Compiles src/ for the browser
├── assets/
│   ├── site.css              # Styles for all pages
│   └── fonts/noto-sans/      # Noto Sans subset to Latin and Pali letters
└── README.md
```

## Quick start

Requires Node 24.22.1 or later, the earliest release with current security fixes. `npm install` refuses older versions.

- `npm install`
- `npm run build` writes the site to `dist/` and compiles the browser code.
- `python3 -m http.server 8000 -d dist`, then open http://127.0.0.1:8000. Any static server works. A server is needed because ES modules and some browser APIs don’t work over `file://`.
- `npm run check` type-checks the TypeScript files.

## Usage

The site's features are explained for users on its Guide page, written in [pages/guide.html](pages/guide.html). It covers the views, the settings, advancing lines, recordings, timing and translation files, keyboard shortcuts and the data kept in the browser.

## Documentation

| File | Read it to |
|---|---|
| [data/DATA.md](data/DATA.md) | Understand how the data fits together, what the build checks, and the rules the quick guides follow |
| [data/chants/CHANTS.md](data/chants/CHANTS.md) | Add, edit, rename or retire a chant |
| [data/chants/RECORDED-CHANTS.md](data/chants/RECORDED-CHANTS.md) | Make a new chant whose lines and timing follow a recording |
| [data/chants/timings/TIMINGS.md](data/chants/timings/TIMINGS.md) | Time a recording of an existing chant, and look up the timing commands |
| [data/sets/SETS.md](data/sets/SETS.md) | Add, change, rename or retire a Sangha set |
| [data/translation-guide.md](data/translation-guide.md) | Write or review the English |

Each guide to a change opens with its steps as a numbered list that can be followed at a glance, with the details after it.

## Editing the about, guide and resources pages

Each page's body is plain HTML in `pages/<slug>.html`, starting with its `<h1>`. The build wraps it in the site layout and writes it to `/<slug>`. The pages and their order in the site header are listed in `PAGES` in [scripts/templates.ts](scripts/templates.ts). A list of named entries, each with a note under it, is written as `<dl class="entries">`. The guide's keyboard shortcuts repeat the list in [scripts/chant-page.ts](scripts/chant-page.ts), so a change to one needs the same change in the other.

## Browser support

- An audio file plays if the browser can play its format; MP3 and AAC play in all current browsers.
- In a long MP3 made at a variable bitrate, moving the audio can land several seconds from the time asked for, and the lines then follow the wrong part of it. A constant-bitrate copy does not have this problem; the guide page gives the command.
- The audio file is remembered per chant or set. Chromium browsers (Chrome, Edge) keep only a link to the file and ask for permission to read it again on a later visit; other browsers keep a copy of the file in the browser.
- The screen wake lock, which keeps the screen on while lines move on, is not available in every browser; the page works without it.
- ES modules are used; serve over `http://localhost` or `https://`.

## Deployment

- Netlify runs `npm run build` and publishes `dist/` ([netlify.toml](netlify.toml)).
- Any static host works with the same two steps: build, then serve `dist/` as the site root, because pages link to absolute paths such as `/assets/site.css`. The build writes Netlify's `_redirects` file for the page-1 list URLs and the previous site's `chant.html?id=<id>` and `about.html` links, and its `_headers` file with the security headers and the asset cache time. The Content-Security-Policy in `_headers` allows the one inline script, which applies the stored settings, by its hash, and the build updates the hash when the script changes. Other hosts need the same redirects and headers.

## Privacy

- Audio files stay on your device and are never uploaded. The browser keeps a link to the file, or in some browsers a copy of it, until you remove it. Settings, open sets, positions, imported timing files and imported translations are kept in your browser's local storage. An open set's share link holds the set after the `#`, which the browser does not send to the server.

## Roadmap ideas

- Search and bookmarks
- Offline PWA shell


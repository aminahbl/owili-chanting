# Chanting

A lightweight, static website to help users chant Pali texts, with line‑by‑line English, a slide view that marks the current line, and the user's own audio of a recording to chant along with.

## Features

- Minimal, typography‑first layout focussed on the text
- Chant list with search, categories and pages
- Sangha sets: sequences of chants as a community or an individual chants them, each on one page
- Open sets: sequences of chants chosen by the user, kept in the browser and shared by link, each on one page like a Sangha set
- Pali text with secondary English line‑by‑line
- Chanting in Pali, in translation, or in both line by line
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
│   ├── translation.ts        # The translation in use: the site's English or an imported file
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
│   │   ├── README.md         # Steps for changing chants
│   │   ├── texts/            # One typed module per chant; retired ones in retired/
│   │   └── markers/          # Timing files, one per recording
│   ├── sets/                 # One typed module per Sangha set; retired ones in retired/
│   │   └── README.md         # Steps for changing sets
│   ├── groups.ts             # Categories and their chants, in display order
│   ├── chanters.ts           # Chanters of the Sangha sets and their lineages
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

- On the home page, search or choose a category, then open a chant. Sangha sets lists sets in one list, each titled with who chants it; a set page works like a chant page, with the set's chants in order, each under its title. The header links to the About, Guide and Resources pages; the guide explains the features below for users.
- The Sangha sets page links to Open sets, where the user makes, edits, shares and deletes sets of their own. An open set opens at `/open-sets/set` and works like a Sangha set page. Copy to open sets, in a Sangha set's info panel, starts an open set with its chants.
- The theme button at the right of every page's header switches between light and dark. Until it is pressed, the site follows the system theme.
- On a chant page, the info button shows the chant's Pali source, the recordings that have a timing file, references and notes. The settings button sets the text size, what is chanted (Pali, translation, or both), whether the smaller text under each line is shown and, for chants that have them, men's or women's forms. These settings apply to every chant.
- Text and Slides in the header switch view. In the text view, Track marks the current line. In the slide view, the settings choose how lines move on: Manual, Auto or Timed. On a touch screen, a swipe across a slide moves a line.
- With Timed, the settings show the timing in use, with Export timing and Import timing.
- Under Translation in the settings, Export translation saves the translation in use as a plain text file, with each line's Pali as a comment, and Import translation loads one in place of the site's English. The file format is described in the guide and at the top of [src/translation-file.ts](src/translation-file.ts).
- Under Audio in the settings, "Add audio file" chooses an audio file. Its controls (back, play or pause, forward, stop; a press on back or forward moves 3 seconds, and holding it rewinds or fast-forwards) are in the slide view's bottom bar, and in a bar at the foot of the text view.
- In the slide view with Auto or Timed advance, the lock at the start of the bottom bar locks the audio to the slides. It is closed while the audio is locked. With Timed advance and a timing from a recording, the lines follow the audio, and Start, Pause and moving a line work on it. With Auto, or Timed with the rhythm model, Start and Pause also play and pause the audio. With the lock open, the audio and the slides run separately. Manual advance has no Start and no lock: next and previous move the lines, and the audio controls work on their own.
- Keys on a chant page: Space starts or pauses (on slides with Manual advance, it moves to the next line), → and ← move a line, V switches view, T shows or hides the translation (or the Pali when the translation is chanted), I opens info, S opens settings, ? lists the shortcuts, Escape closes a popover. The ⌘ button in the header also lists the shortcuts; it is hidden on touch-only devices.

## Changing chants and sets

- [data/chants/README.md](data/chants/README.md): steps for adding, editing, renaming and retiring a chant.
- [data/sets/README.md](data/sets/README.md): the same for Sangha sets.
- [data/DATA.md](data/DATA.md): how the data fits together, what the build checks, and what retiring a chant or set changes.

## Editing the about, guide and resources pages

Each page's body is plain HTML in `pages/<slug>.html`, starting with its `<h1>`. The build wraps it in the site layout and writes it to `/<slug>`. The pages and their order in the site header are listed in `PAGES` in [scripts/templates.ts](scripts/templates.ts). A list of named entries, each with a note under it, is written as `<dl class="entries">`. The guide's keyboard shortcuts repeat the list in [scripts/chant-page.ts](scripts/chant-page.ts), so a change to one needs the same change in the other.

## Browser support

- An audio file plays if the browser can play its format; MP3 and AAC play in all current browsers.
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


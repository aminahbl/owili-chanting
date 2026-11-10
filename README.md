# Chanting

A lightweight, static website to help users chant Pali texts, with line‑by‑line English, a slide view that marks the current line, and the user's own audio of a recording to chant along with.

## Features

- Minimal, typography‑first layout focussed on the text
- Chant list with search, categories and pages
- Sangha sets: sequences of chants as a monastery or centre chants them, each on one page
- Pali text with secondary English line‑by‑line
- A text view with line tracking, and a slide view that shows a few lines at a time with the current line marked
- Three ways for lines to move on in the slide view: Manual, Auto (at a pace worked out from the Pali, with a speed control) and Timed (following a timing file)
- Timing files in LRC, the plain text format for timed lyrics, that can be exported, edited and imported; chants with a recording's timing use it by default
- The user's own audio file, played in either view; in the slide view it can be linked to the slides, and with Timed advance the lines follow it
- The recordings of each chant and set listed in its info panel, with their timing files
- 100% static: no backend, nothing uploaded

## Project structure

```
.
├── pages/                    # Body HTML of the about, guide and resources pages
├── scripts/
│   ├── build.ts              # Writes the site to dist/
│   ├── chant-list.ts         # Chants and sets, their timings, cards and search index
│   ├── chant-page.ts         # HTML for the chant and set pages
│   ├── ids.ts                # Checks chant and set numbers against the ledger
│   └── templates.ts          # Page layout, the site header, and HTML for the list pages
├── src/                      # Browser code, compiled to dist/assets/js/
│   ├── search.ts             # Search on the list pages
│   ├── chant-page.ts         # Connects the chant or set page's views, controls and keys
│   ├── clock.ts              # The line clock: the current line and how it moves on
│   ├── text-view.ts          # The text view
│   ├── slide-view.ts         # The slide view
│   ├── rhythm.ts             # Line lengths from Pali syllables, for Auto advance
│   ├── tempo.ts              # The Auto speed
│   ├── lrc.ts                # Reads timing files, shared with the build
│   ├── timing.ts             # The timing in use for Timed advance
│   ├── audio-store.ts        # Remembering the user's audio file per chant or set
│   ├── recording.ts          # The user's audio file, which the slides can follow
│   ├── wake-lock.ts          # Keeps the screen on while lines move on
│   ├── settings.ts           # Stored display settings, shared with the build
│   ├── theme.ts              # The theme button in every page's header
│   ├── icons/                # Icons as custom elements
│   ├── card.ts               # Card markup, shared with the build
│   ├── normalise.ts          # Search text normalisation, shared with the build
│   └── html.ts               # HTML escaping
├── data/
│   ├── chants/
│   │   ├── texts/            # One typed module per chant
│   │   └── markers/          # Timing files, one per recording
│   ├── sets/                 # One typed module per Sangha set
│   ├── groups.ts             # Categories in display order
│   ├── places.ts             # Lineages and places of the Sangha sets
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

- On the home page, search or choose a category, then open a chant. Sangha sets lists sets by lineage and place; a set page works like a chant page, with the set's chants in order, each under its title. The header links to the About, Guide and Resources pages; the guide explains the features below for users.
- The theme button at the right of every page's header switches between light and dark. Until it is pressed, the site follows the system theme.
- On a chant page, the info button shows the chant's source, the recordings that have a timing file, references and notes. The settings button sets the text size, translation and, for chants that have them, men's or women's forms. These settings apply to every chant.
- Text and Slides in the header switch view. In the text view, Track marks the current line. In the slide view, the settings choose how lines move on: Manual, Auto or Timed. On a touch screen, a swipe across a slide moves a line.
- With Timed, the settings show the timing in use, with Export timing and Import timing.
- Under Audio in the settings, "Add audio file" chooses an audio file. Its controls (back, play or pause, forward, stop; a press on back or forward moves 3 seconds, and holding it rewinds or fast-forwards) are in the slide view's bottom bar, and in a bar at the foot of the text view.
- In the slide view with Auto or Timed advance, Link ties the audio to the slides. With Timed advance and a timing from a recording, the lines follow the audio, and Start, Pause and moving a line work on it. With Auto, or Timed with the rhythm model, Start and Pause also play and pause the audio. With Link off, the audio and the slides run separately. Manual advance has no Start and no Link: next and previous move the lines, and the audio controls work on their own.
- Keys on a chant page: Space starts or pauses (on slides with Manual advance, it moves to the next line), → and ← move a line, V switches view, T shows or hides the translation, I opens info, S opens settings, ? lists the shortcuts, Escape closes a popover. The ⌘ button in the header also lists the shortcuts; it is hidden on touch-only devices.

## Adding a new chant

Add a module to `data/chants/texts/` that exports `chant`, typed with `satisfies Chant` from [data/types.ts](data/types.ts), and give it a place in one or more categories from [data/groups.ts](data/groups.ts). The build picks up every module in the folder and writes the chant's page to `/chants/<slug>`.

`paliSource` names where the Pali was taken from. For a chant from a book with its own arrangement, `paliSource.categories` records where the book places it: its category, subcategory where there is one, and position. This is a record of the source, separate from the site's categories in `groups`, and the info panel shows it with the source.

Each chant has a four-digit number, its `id`, which never changes. A new chant takes the number after the last line of the ledger in [data/ids.ts](data/ids.ts), and the same change adds a line for it there. A chant that is removed keeps its ledger line, marked `retired: true`, so its number is never issued again; a renamed slug is changed in the ledger too. The build stops if a number is repeated, missing from the ledger or retired, or if a chant's slug differs from its ledger line. Sets take numbers from the same ledger.

The timing of a recording goes in `data/chants/markers/<recording>.lrc`, an LRC file in the format the chant page exports. It follows the recording: tags at the top give its details (`ti`, `place`, `performers`, `date`, `source`), a comment lists the chants it covers in order, and a `[chant:<number> <slug>]` tag starts each chant's rows, one row per line chanted. A chant chanted in two parts, with another chant between them, has its tag twice. The build checks each chant's part against the chant's lines and includes it in the chant's page as the default timing for Timed advance; the chant's info panel lists the recording. Where several recordings cover a chant, a file tagged `[default:yes]` is used, otherwise the first by file name. A file that names a set's chants, in the set's order and no others, is also the set's default timing.

## Adding a Sangha set

Add a module to `data/sets/` that exports `set`, typed with `satisfies ChantSet` from [data/types.ts](data/types.ts). It gives the set's number and slug from the ledger in [data/ids.ts](data/ids.ts), its title, its place from [data/places.ts](data/places.ts), its `order` among the place's sets, and its chants as a list of chant numbers, with each chant's slug in a comment. A new place or lineage is added to `data/places.ts`, in display order. The build writes the set's page to `/sets/<slug>` and stops if a set names an unknown chant or names a chant twice.

## Editing the about, guide and resources pages

Each page's body is plain HTML in `pages/<slug>.html`, starting with its `<h1>`. The build wraps it in the site layout and writes it to `/<slug>`. The pages and their order in the site header are listed in `PAGES` in [scripts/templates.ts](scripts/templates.ts). A list of named entries, each with a note under it, is written as `<dl class="entries">`. The guide's keyboard shortcuts repeat the list in [scripts/chant-page.ts](scripts/chant-page.ts), so a change to one needs the same change in the other.

## Browser support

- An audio file plays if the browser can play its format; MP3 and AAC play in all current browsers.
- The audio file is remembered per chant or set. Chromium browsers (Chrome, Edge) keep only a link to the file and ask for permission to read it again on a later visit; other browsers keep a copy of the file in the browser.
- The screen wake lock, which keeps the screen on while lines move on, is not available in every browser; the page works without it.
- ES modules are used; serve over `http://localhost` or `https://`.

## Deployment

- Netlify runs `npm run build` and publishes `dist/` ([netlify.toml](netlify.toml)).
- Any static host works with the same two steps: build, then serve `dist/` as the site root, because pages link to absolute paths such as `/assets/site.css`. The build writes Netlify's `_redirects` file for the page-1 list URLs and the previous site's `chant.html?id=<id>` and `about.html` links; other hosts need the same redirects.

## Privacy

- Audio files stay on your device and are never uploaded. The browser keeps a link to the file, or in some browsers a copy of it, until you remove it. Settings, positions and imported timing files are kept in your browser's local storage.

## Roadmap ideas

- Search and bookmarks
- Offline PWA shell


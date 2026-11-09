# Chanting

A lightweight, static website to help users chant Pali texts, with line‑by‑line English, a slide view that marks the current line, and the user's own audio of a recording to chant along with.

## Features

- Minimal, typography‑first layout focussed on the text
- Chant list with search, groups and pages
- Pali text with secondary English line‑by‑line
- A text view with line tracking, and a slide view that shows a few lines at a time with the current line marked
- Three ways for lines to move on in the slide view: Manual, Auto (at a pace worked out from the Pali, with a speed control) and Timed (following a timing file)
- Timing files in LRC, the plain text format for timed lyrics, that can be exported, edited and imported; chants with a recording's timing use it by default
- The user's own audio file, played in either view; in the slide view it can be linked to the slides, and with Timed advance the lines follow it
- The recordings of each chant listed in its info panel, with their timing files
- 100% static: no backend, nothing uploaded

## Project structure

```
.
├── about.html                # Links and resources
├── scripts/
│   ├── build.ts              # Writes the site to dist/
│   ├── chant-list.ts         # Chant data in list order, cards and search index
│   ├── chant-page.ts         # HTML for the chant pages
│   └── templates.ts          # Page layout and HTML for the list pages
├── src/                      # Browser code, compiled to dist/assets/js/
│   ├── search.ts             # Search on the list pages
│   ├── chant-page.ts         # Connects the chant page's views, controls and keys
│   ├── clock.ts              # The line clock: the current line and how it moves on
│   ├── text-view.ts          # The text view
│   ├── slide-view.ts         # The slide view
│   ├── rhythm.ts             # Line lengths from Pali syllables, for Auto advance
│   ├── tempo.ts              # The Auto speed
│   ├── lrc.ts                # Reads timing files, shared with the build
│   ├── timing.ts             # The timing in use for Timed advance
│   ├── audio-store.ts        # Remembering the user's audio file per chant
│   ├── recording.ts          # The user's audio file, which the slides can follow
│   ├── wake-lock.ts          # Keeps the screen on while lines move on
│   ├── settings.ts           # Stored display settings, shared with the build
│   ├── icons/                # Icons as custom elements
│   ├── card.ts               # Card markup, shared with the build
│   ├── normalise.ts          # Search text normalisation, shared with the build
│   └── html.ts               # HTML escaping
├── data/
│   ├── chants/
│   │   ├── texts/            # One typed module per chant
│   │   └── markers/          # Timing files, one per recording
│   ├── groups.ts             # Chant groups in display order
│   ├── types.ts              # The Chant type
│   └── translation-guide.md  # Principles and fixed renderings for the English
├── package.json              # Build and type-check scripts
├── tsconfig.json             # Type-check for build scripts and data
├── tsconfig.browser.json     # Compiles src/ for the browser
├── assets/
│   ├── site.css              # Styles for the generated pages
│   ├── style.css             # Styles for the about page
│   ├── fonts/noto-sans/      # Noto Sans subset to Latin and Pali letters
│   ├── lib/
│   │   └── storage.js        # Audio storage of the previous chant page, no longer used
│   └── data/
│       ├── chants.js         # Previous chant registry, read by the about page
│       └── markers/          # Timing files of the previous chant page
└── README.md
```

## Quick start

Requires Node 24.22.1 or later, the earliest release with current security fixes. `npm install` refuses older versions.

- `npm install`
- `npm run build` writes the site to `dist/` and compiles the browser code.
- `python3 -m http.server 8000 -d dist`, then open http://127.0.0.1:8000. Any static server works. A server is needed because ES modules and some browser APIs don’t work over `file://`.
- `npm run check` type-checks the TypeScript files.

## Usage

- On the home page, search or choose a group, then open a chant.
- On a chant page, the info button shows the chant's source, the recordings that have a timing file, references and notes. The settings button sets the theme, text size, translation and, for chants that have them, men's or women's forms. These settings apply to every chant.
- Text and Slides in the header switch view. In the text view, Track marks the current line. In the slide view, the settings choose how lines move on: Manual, Auto or Timed. On a touch screen, a swipe across a slide moves a line.
- With Timed, the settings show the timing in use, with Export timing and Import timing.
- Under Audio in the settings, "Add audio file" chooses an audio file. Its controls (back, play or pause, forward, stop; a press on back or forward moves 3 seconds, and holding it rewinds or fast-forwards) are in the slide view's bottom bar, and in a bar at the foot of the text view.
- In the slide view with Auto or Timed advance, Link ties the audio to the slides. With Timed advance and a timing from a recording, the lines follow the audio, and Start, Pause and moving a line work on it. With Auto, or Timed with the rhythm model, Start and Pause also play and pause the audio. With Link off, the audio and the slides run separately. Manual advance has no Start and no Link: next and previous move the lines, and the audio controls work on their own.
- Keys on a chant page: Space starts or pauses (on slides with Manual advance, it moves to the next line), → and ← move a line, V switches view, T shows or hides the translation, I opens info, S opens settings, ? lists the shortcuts, Escape closes a popover.

## Adding a new chant

Add a module to `data/chants/texts/` that exports `chant`, typed with `satisfies Chant` from [data/types.ts](data/types.ts), and give it a place in one or more groups from [data/groups.ts](data/groups.ts). The build picks up every module in the folder and writes the chant's page to `/chants/<id>`.

The timing of a recording goes in `data/chants/markers/<recording>.lrc`, an LRC file in the format the chant page exports. It follows the recording: tags at the top give its details (`ti`, `place`, `performers`, `date`, `source`), a comment lists the chants it covers in order, and a `[chant:<id>]` tag starts each chant's rows, one row per line chanted. A chant chanted in two parts, with another chant between them, has its tag twice. The build checks each chant's part against the chant's lines and includes it in the chant's page as the default timing for Timed advance; the chant's info panel lists the recording. Where several recordings cover a chant, a file tagged `[default:yes]` is used, otherwise the first by file name.

## Browser support

- An audio file plays if the browser can play its format; MP3 and AAC play in all current browsers.
- The audio file is remembered per chant. Chromium browsers (Chrome, Edge) keep only a link to the file and ask for permission to read it again on a later visit; other browsers keep a copy of the file in the browser.
- The screen wake lock, which keeps the screen on while lines move on, is not available in every browser; the page works without it.
- ES modules are used; serve over `http://localhost` or `https://`.

## Deployment

- Netlify runs `npm run build` and publishes `dist/` ([netlify.toml](netlify.toml)).
- Any static host works with the same two steps: build, then serve `dist/` as the site root, because pages link to absolute paths such as `/assets/site.css`. The build writes Netlify's `_redirects` file for the page-1 list URLs and the previous `chant.html?id=<id>` links; other hosts need the same redirects.

## Privacy

- Audio files stay on your device and are never uploaded. The browser keeps a link to the file, or in some browsers a copy of it, until you remove it. Settings, positions and imported timing files are kept in your browser's local storage.

## Roadmap ideas

- Search and bookmarks
- Offline PWA shell


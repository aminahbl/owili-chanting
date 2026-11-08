# Chanting

A lightweight, static, karaoke‑style website to help users chant Pali texts with line‑by‑line English, optional auto‑scroll, and locally supplied audio that is remembered per chant.

## Features

- Minimal, typography‑first layout focussed on the text
- Chant list with search, groups and pages
- Pali text with secondary English line‑by‑line
- Auto‑scroll with Start/Pause and adjustable speed (+ keyboard controls)
- Bring‑your‑own audio via File System Access API (or file picker fallback)
- Remembers the selected audio per chant (IndexedDB)
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
│   ├── chant-page.ts         # Settings and keyboard shortcuts on the chant pages
│   ├── settings.ts           # Stored display settings, shared with the build
│   ├── icons/                # Icons as custom elements
│   ├── card.ts               # Card markup, shared with the build
│   ├── normalise.ts          # Search text normalisation, shared with the build
│   └── html.ts               # HTML escaping
├── data/
│   ├── chants/               # One typed module per chant
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
│   │   └── storage.js        # IndexedDB helpers for audio handles
│   └── data/
│       ├── chants.js         # Previous chant registry, read by the about page
│       └── markers/          # Timing files for recordings
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
- On a chant page, the info button shows the chant's source, references and notes. The settings button sets the theme, text size, translation and, for chants that have them, men's or women's forms. These settings apply to every chant.
- Keys on a chant page: T shows or hides the translation, I opens info, S opens settings, ? lists the shortcuts, Escape closes a popover.

## Adding a new chant

Add a module to `data/chants/` that exports `chant`, typed with `satisfies Chant` from [data/types.ts](data/types.ts), and give it a place in one or more groups from [data/groups.ts](data/groups.ts). The build picks up every module in the folder and writes the chant's page to `/chants/<id>`.

## Browser support

- File System Access API for persistent audio handles: Chromium/Edge/Opera on desktop, behind secure context (localhost/https).
- Fallback (file input) works broadly, but can’t persist access across sessions—only remembers the filename for display.
- ES modules are used; serve over `http://localhost` or `https://`.

## Deployment

- Netlify runs `npm run build` and publishes `dist/` ([netlify.toml](netlify.toml)).
- Any static host works with the same two steps: build, then serve `dist/` as the site root, because pages link to absolute paths such as `/assets/site.css`. The build writes Netlify's `_redirects` file for the page-1 list URLs and the previous `chant.html?id=<id>` links; other hosts need the same redirects.

## Privacy

- All audio stays on your device. No uploads. The app stores a handle reference in your browser (IndexedDB) to re‑open the same local file, with your permission.

## Roadmap ideas

- Search and bookmarks
- Offline PWA shell


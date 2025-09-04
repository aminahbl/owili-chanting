# Chanting

A lightweight, static, karaoke‑style website to help users chant Pali texts with line‑by‑line English, optional auto‑scroll, and locally supplied audio that is remembered per chant.

## Features

- Minimal, typography‑first layout focussed on the text
- Pali text with secondary English line‑by‑line
- Auto‑scroll with Start/Pause and adjustable speed (+ keyboard controls)
- Bring‑your‑own audio via File System Access API (or file picker fallback)
- Remembers the selected audio per chant (IndexedDB)
- 100% static: no backend, nothing uploaded

## Project structure

```
.
├── index.html                # List of available chants
├── chant.html                # Individual chant page
├── assets/
│   ├── style.css             # Minimal site styles
│   ├── index.js              # Index page script
│   ├── chant.js              # Chant page logic (render, scroll, audio)
│   ├── lib/
│   │   └── storage.js        # IndexedDB helpers for audio handles
│   └── data/
│       ├── chants.js         # Registry of chants (id, title)
│       └── morning-chanting.js  # Data for Morning Chanting
└── README.md
```

## Quick start

- Option A: Python static server
  - `python3 -m http.server 8000`
  - Open http://127.0.0.1:8000
- Any static server will work. A server is recommended because ES modules and some browser APIs don’t work over `file://`.

## Usage

- From `index.html`, open a chant.
- Use the Start/Pause button to toggle auto‑scroll.
- Adjust speed with the slider, or use keys:
  - Space: toggle scroll
  - Arrow Up/Down: increase/decrease speed
- Click “Select audio (remembered)” to pick a local file via the File System Access API (Chromium/Edge/Opera), or use “Choose audio…” (file input) in other browsers.
- Audio is remembered per chant (via IndexedDB when using FS Access; filename remembered when using file input fallback). Nothing is uploaded.

## Adding a new chant

1. Register the chant in `assets/data/chants.js`:
   - `{ id: "your-id", title: "Your Title", description?: "..." }`
2. Create `assets/data/your-id.js` that exports `chant` with:
   - `id`: string
   - `title`: string
   - `sections`: array of sections
     - Each section: `{ title?: string, items: Array<Item> }`
     - Item can be one of:
       - `{ pali: string, en?: string }` (a chanting line)
       - `{ note: string }` (an instructional note)

The chant page auto‑loads `./data/${id}.js` based on the `?id=` query param.

## Browser support

- File System Access API for persistent audio handles: Chromium/Edge/Opera on desktop, behind secure context (localhost/https).
- Fallback (file input) works broadly, but can’t persist access across sessions—only remembers the filename for display.
- ES modules are used; serve over `http://localhost` or `https://`.

## Deployment

- Host the directory on any static host (Netlify, GitHub Pages, Vercel static, S3/CloudFront, nginx). No build step required.
- Ensure the site is served from the project root so relative paths resolve (`index.html`, `assets/...`).

## Privacy

- All audio stays on your device. No uploads. The app stores a handle reference in your browser (IndexedDB) to re‑open the same local file, with your permission.

## Roadmap ideas

- Search and bookmarks
- Offline PWA shell


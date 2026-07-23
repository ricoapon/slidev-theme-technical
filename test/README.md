# Test deck

A minimal Slidev deck for developing and previewing the theme locally. It links
the theme straight from the parent directory, so there is no packing or
publishing step — edits to the theme show up live.

## Setup (once)

The theme is consumed as a linked local dependency (`"@ricoapon/slidev-theme-technical": "file:.."`
in `package.json`), which npm installs as a symlink to the repo root. You need
the theme's own dependencies (the bundled fonts) present too, so install in both
places once:

```bash
# from the repo root — installs the theme's font dependencies
npm install

# from this test/ directory — installs Slidev and links the theme
cd test
npm install
```

## Run

```bash
npm run dev
```

Because the theme is symlinked, edits to its `styles/`, `layouts/`, and
`components/` **hot-reload instantly** — no rebuild, no reinstall, no `npm pack`.

This deck's **headmatter** (`theme`, `colorSchema`, `themeConfig` — including
the `accent`) hot-reloads too: change it in `slides.md` and the running dev
server picks it up without a restart.

## Build / export

```bash
npm run build     # static site into dist/
npm run export    # PDF
```

## README screenshots

The images in the root [`README.md`](../README.md) are generated from this deck —
one PNG per slide, in **both** color modes, so the deck doubles as a
one-slide-per-layout showcase across light and dark.

```bash
npm run screenshots   # writes ../screenshots/<layout>.png + <layout>-dark.png
```

Light uses the deck as authored (`colorSchema: light`); the dark set is exported
from a temporary copy with `colorSchema` flipped to `dark` (see
[`generate-screenshots.mjs`](generate-screenshots.mjs)). This runs
`slidev export --format png` under the hood and renames the output to semantic
filenames. It
requires `playwright-chromium`, which is a dev dependency here and installs its
Chromium binary automatically on `npm install`; if the binary is missing, run
`npx playwright install chromium`. Commit the regenerated PNGs when the theme's
look changes. The slide images use the committed placeholder photo at
[`public/image.jpg`](public/image.jpg), so screenshots are reproducible and offline.

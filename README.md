# TWINS Lab

Website source for TWINS Lab — Towards Intelligent Spatial Computing at Southern Illinois University Carbondale.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

To use the current preview port:

```bash
npm run dev -- --port 3001
```

## Editing the website

- `content/research.md`: research descriptions and publication links.
- `content/team.md`: group members and profile information.
- `content/join.md`: recruitment text.
- `app/page.tsx`: page structure and introductory text.
- `app/globals.css`: layout, colors, and typography.
- `app/*-animation.tsx`: animated research illustrations.
- `public/`: portraits, figures, and other static assets.
- `assets/source/sea-surface-temperature.gif`: original source for the sea-temperature illustration; kept outside published assets.

`scripts/extract-sea-temperature-frames.py` converts the source GIF into the SVG path data in `content/sea-temperature-frames.json`. Regeneration requires Python with NumPy, Matplotlib, and Pillow; normal website builds use the checked-in JSON.

## Build and verify

```bash
npm test
npm run build
```

`npm test` builds the GitHub Pages site and checks the prerendered content, asset paths, internal links, and section redirects. To check an existing Pages build, run `npm run verify:pages`.

`npm run build` builds the React/Vinext version used by Sites. Its deployment configuration is in `.openai/hosting.json`.

## GitHub Pages

The public website is published at [linyijun.github.io/twins-lab](https://linyijun.github.io/twins-lab/).

```bash
npm run build:pages
```

This builds and prerenders the same page and interactive components into `dist/pages/`, with asset and navigation URLs rooted at `/twins-lab/`. It does not require a server. GitHub Actions publishes the static output whenever changes are pushed to `main`, or when the **Publish lab website** workflow is run manually. GitHub Pages must use **GitHub Actions** as its source.

The regular `npm run dev` preview continues to run at the root URL.

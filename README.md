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

## Build

```bash
npm run build
```

The existing local/Sites build uses React and Vinext. The `.openai/hosting.json` file is used by that build configuration.

## GitHub Pages

The public website is published at https://linyijun.github.io/twins-lab/.

```bash
npm run build:pages
```

This builds and prerenders the same page and interactive components into `dist/pages/`, with asset and navigation URLs rooted at `/twins-lab/`. It does not require a server. GitHub Actions publishes the static output whenever changes are pushed to `main`, or when the **Publish lab website** workflow is run manually. GitHub Pages must use **GitHub Actions** as its source.

The regular `npm run dev` preview continues to run at the root URL.

The existing `npm test` command still contains starter-template assertions and is not a validation suite for the lab website.

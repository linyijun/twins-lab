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

The site currently uses React and Vinext with a Cloudflare Worker build. The `.openai/hosting.json` file is used by the existing build configuration. Saving this repository does not publish the website or enable GitHub Pages. GitHub Pages deployment will require a static-site build and configuration for the repository URL.

The existing `npm test` command still contains starter-template assertions and is not a validation suite for the lab website.

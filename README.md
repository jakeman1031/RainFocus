# RainFocus UI Challenge — Jake Arciniega

A responsive implementation of the RainFocus Summit "Event setup guide" from the provided Figma design, plus a Storybook-style **Design System** reference page. Built with **Next.js (App Router)** and **SCSS** — no Tailwind, Bootstrap, or other CSS frameworks.

**Live sandbox:** <!-- paste your CodeSandbox / StackBlitz link here -->

Pages:
- `/` — Event setup guide (the design).
- `/design-system` — design tokens, type scale, grid, and components.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## View the production build (no build step needed)

The delivered `build/` folder is a static export with `index.html` at its root.

- **Quickest:** open `build/index.html` directly in your browser. Asset paths are relativized during the build, so the page renders from `file://`.
- **Full interactivity** (mobile nav toggle, the design-system Copy buttons): serve the folder over HTTP — module scripts don't execute from `file://`:
  ```bash
  npm run serve:build      # serves /build at http://localhost:4173
  ```
  …or just use the live sandbox link above.

To regenerate it yourself: `npm run build` (runs `next build` and a postbuild step that moves `out/ → build/` and relativizes asset paths).

## Build & package for delivery

```bash
npm run package
```

This builds, then writes two delivery artifacts **next to** the project folder:

- `../jake-arciniega-rf-ui/` — clean copy of the whole project (source + `build/`, no `node_modules`).
- `../jake-arciniega-rf-ui.zip` — the same, zipped.

Email the zip. Reviewers can unzip and open `jake-arciniega-rf-ui/build/index.html` to see the finished work without building.

## Tech notes

- **Framework:** Next.js 16, App Router, static export (`output: 'export'`).
- **Styling:** SCSS via the `sass` package — CSS Modules (`*.module.scss`) per component plus `app/globals.scss`. Tokens live in `styles/_variables.scss` (exposed as SCSS variables and `--rf-*` CSS custom properties); a fractional flex grid lives in `styles/_grid.scss`.
- **Fonts:** Inter via `next/font/google` (weights 300/400/600/700).
- **Responsiveness:** Full-width at desktop, usable down to 320px. The sidebar becomes a top bar at ≤992px. Breakpoint mixins (`sm` 480 / `md` 768 / `lg` 1024 / `xl` 1280) live in `styles/_mixins.scss`.

## Project layout

```
app/          App Router — layout, the two pages, globals.scss
components/   One folder per UI block; each .jsx pairs with a .module.scss
styles/       _variables / _grid / _mixins / _reset partials
public/       Static assets exported from Figma (icons/, images/)
scripts/      postbuild (out → build + relativize) and package (zip) helpers
DESIGN.md     Design reference — Figma node map, tokens, responsive plan
```

See `DESIGN.md` for the full design reference.

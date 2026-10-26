# whynicky® — Portfolio

Portfolio for Alimzhan Galymzhan: frontend development, web and mobile applications.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5176/.

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. Preview runs at http://127.0.0.1:4176/.

## Structure

- `src/main.js` — routes, page transitions, shared navigation and opening animation.
- `src/studio-home.js`, `src/studio-scene.js` — homepage and animated Chrome Blue portrait.
- `src/work-gallery.js`, `src/data.js` — circular project gallery and project content.
- `src/case-page.js` — individual project pages.
- `src/editorial-pages.js` — About, Contact, Process and Credentials.
- `src/site-footer.js`, `src/sound.js` — shared footer and optional audio.
- `src/mobile.css` — mobile layout and safe-area adjustments.
- `public/projects`, `public/certificates`, `public/documents` — portfolio screenshots, certificates and résumé.
- `public/images`, `public/fonts`, `public/audio` — active visual, type and audio resources.

This repository contains the current website only. Earlier experiments and preview recordings are not part of the project.

## Interaction and accessibility

The project gallery supports wheel, touch and keyboard navigation. Directory and certificate dialogs support keyboard focus and Escape. Reduced-motion preferences are supported, with a manual toggle in Directory. The portrait has a static fallback when WebGL is unavailable. Sound is off by default and starts only after user interaction.

The generated anonymous portrait is visual artwork, not a photograph of Alimzhan.

## Asset licenses

Music: **Chill lofi inspired** by **omfgdude**, released under CC0. See [audio source and license](docs/AUDIO-LICENSE.md). Font licenses are included in `public/fonts/`.

## GitHub Pages

Live website: https://whynicky19.github.io/whynicky/

Pushes to `main` run `.github/workflows/pages.yml`, build with Node 22, and deploy `dist/` to GitHub Pages. Public asset paths use the configured Vite base so local development remains at `/`.

To preview the Pages build locally:

```sh
DEPLOY_BASE=/whynicky/ npm run build
DEPLOY_BASE=/whynicky/ npm run preview
```

Open http://127.0.0.1:4176/whynicky/.

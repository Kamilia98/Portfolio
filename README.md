# Portfolio

The personal portfolio of Kamilia Ahmed, a front-end developer. It is a single-page site built with React, TypeScript and Vite, laid out like a product datasheet, with a printable CV that is generated from the same content.

## Commands

- `npm run dev` starts the dev server.
- `npm test` runs the unit tests (Vitest).
- `npm run e2e` runs the browser tests (Playwright). It builds the site and the CV first.
- `npm run cv` builds the site and writes the CV to `dist/kamilia-ahmed-hamed.pdf`.

## Content

All text and numbers live in `src/content/`. Edit them there; the site and the CV both read from it.

## Deploys

Every push to `main` runs `.github/workflows/deploy.yml` on GitHub Actions. It installs, runs the tests, prints the CV, runs the browser tests and publishes `dist` to GitHub Pages at `/Portfolio/`.

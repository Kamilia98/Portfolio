# Portfolio

The personal portfolio of Kamilia Ahmed, a full-stack engineer (React + Node). Live at https://kamilia98.github.io/Portfolio/. It is a single-page site built with React, TypeScript and Vite, laid out like a product datasheet, with a printable CV that is generated from the same content.

## Commands

- `npm run dev` starts the dev server.
- `npm test` runs the unit tests (Vitest).
- `npm run e2e` runs the browser tests (Playwright). It builds the site and the CV first.
- `npm run cv` builds the site and writes the CV to `dist/kamilia-ahmed-hamed.pdf`.

## Content

All text and numbers live in `src/content/`. Edit them there; the site and the CV both read from it.

## Deploys

Every push to `main` runs `.github/workflows/deploy.yml` on GitHub Actions. It installs, runs the tests, prints the CV, runs the browser tests and publishes `dist` to GitHub Pages at `/Portfolio/`.

### Releasing the redesign

Do these in order:

1. Push the `redesign` branch.
2. In the repository's Settings → Pages, set Source to "GitHub Actions". The last deployment keeps serving until a new one replaces it.
3. Merge `redesign` into `main`.
4. Watch the Actions run. When it is green, open `/Portfolio/` and `/Portfolio/kamilia-ahmed-hamed.pdf`, and check the PDF built by CI: one page, set in Archivo, and the arrows in the results (`63 s → 4.3 s`) show as arrows, not empty boxes.

Merging before step 2 publishes the raw source from the branch instead of the build, and the site goes blank.

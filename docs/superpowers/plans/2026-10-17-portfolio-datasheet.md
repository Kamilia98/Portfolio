# Portfolio Datasheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the template portfolio in `D:\Me\Portfolio` with a single-page "component datasheet" portfolio and a two-page PDF CV printed from the same content.

**Architecture:** A static React 18 + TypeScript app built by Vite with two entries (`index.html` site, `cv.html` CV). One typed content module feeds both. Diagrams are semantic HTML lists styled as block diagrams; the only shared state is the selected pin (React context). A Node script prints `cv.html` to PDF with Playwright's Chromium; GitHub Actions builds, tests, prints and deploys to GitHub Pages.

**Tech Stack:** React 18.3, Vite 8 (`@vitejs/plugin-react` 6), TypeScript ~5.9 (strict), CSS Modules, `@fontsource-variable/archivo` 5.3 (wdth axis), Vitest 5 + Testing Library + jsdom, Playwright 1.64, pdf-lib 1.17.

**Spec:** `docs/superpowers/specs/2026-10-17-portfolio-datasheet-design.md` · Product truth: `PRODUCT.md` · Direction contract: `.impeccable/surfaces/index-html.md`

## Global Constraints

- Work on branch `redesign`; one commit per task. Never push, merge, or change GitHub settings without Kamilia's explicit yes.
- Vite `base: '/Portfolio/'`; every internal URL is built from `import.meta.env.BASE_URL`.
- Runtime dependencies: `react`, `react-dom`, `@fontsource-variable/archivo` only.
- Font: `import '@fontsource-variable/archivo/wdth.css'`; family `'Archivo Variable'`; tabular figures (`font-variant-numeric: tabular-nums`) for every number.
- Colour tokens (exact): `--paper #FFFFFF`, `--ink #121417`, `--muted #4A5160`, `--accent #1D5FBF`, `--fill #EEF0F3`.
- Hierarchy from rule weight and type size only: no `box-shadow`, `border-radius`, gradients, cards, or background images anywhere.
- No dark mode, no skill pills, no contact form, no profile photo, no loading screen, no icon font.
- Phone number appears on the CV only, never on the site.
- No screenshots of AIM Insights, no client or account names, no number that is not in `src/content/`. Every % change is computed by `percentChange`, never typed.
- Copy: use the content module text verbatim; first person, plain English.
- Motion: only the performance bars (grow once, 900 ms ease-out) and the pin highlight (150 ms). `prefers-reduced-motion: reduce` removes both transitions.
- Accessibility: WCAG 2.2 AA, visible focus (`outline: 3px solid var(--accent); outline-offset: 2px`), keyboard-operable pins, page works at 320 px wide with ≥ 16 px side padding.

## Review Focus

1. **A 320 px phone:** the diagrams, the chip, the bars or the tables push the page wider than the screen. Expected: no horizontal scroll. Test in Task 6.
2. **Keyboard-only reader:** pins must be reachable with Tab, toggled with Space or Enter, with a visible focus ring. Test in Task 5.
3. **A shared deep link** (`/Portfolio/#5-2-chart-speed`) must land on the case study with its heading visible, not hidden under the sticky bar. Test in Task 6.
4. **The CV link under the `/Portfolio/` base** returns 404, the PDF runs to three pages, or it prints in a fallback font. Expected: 200, ≤ 2 pages, Archivo embedded. Test in Task 8.
5. **A link pasted into LinkedIn or WhatsApp** shows no title or description, because crawlers do not run JavaScript. Expected: static `<title>`, meta description and Open Graph tags in `index.html`. Test in Task 3.

---

### Task 1: Scaffold the React app and remove the old site

**Files:**
- Delete: `index.html` (old), `style.css`, `about-hover.css`, `animations.css`, `data.js`, `renderer.js`, `script.js`, `images/`, `kamilia-ahmed-hamed.pdf`
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `playwright.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/tokens.css`, `src/styles/base.css`, `src/vite-env.d.ts`, `tests/setup.ts`, `tests/app.test.tsx`, `tests/e2e/smoke.spec.ts`

**Interfaces:**
- Produces: `App` (default export of `src/App.tsx`); CSS custom properties from `tokens.css` used by every later task; npm scripts `dev`, `build`, `preview`, `test`, `e2e`.

- [ ] **Step 1: Delete the old site files listed above** (`git rm -r`); they stay in git history.
- [ ] **Step 2: Create `package.json`** with `"type": "module"`, scripts `dev: vite`, `build: tsc -b && vite build`, `preview: vite preview`, `test: vitest run`, `e2e: playwright test`; install `react@^18.3.1 react-dom@^18.3.1 @fontsource-variable/archivo@^5.3.0` and dev `vite@^8 @vitejs/plugin-react@^6 typescript@~5.9 @types/react@^18 @types/react-dom@^18 vitest@^5 jsdom @testing-library/react@^16 @testing-library/user-event @testing-library/jest-dom @playwright/test@^1.64 pdf-lib@^1.17`. Run `npx playwright install chromium`.
- [ ] **Step 3: Create `vite.config.ts`**: `base: '/Portfolio/'`, `plugins: [react()]`, `test: { environment: 'jsdom', globals: true, setupFiles: ['tests/setup.ts'], include: ['tests/**/*.test.{ts,tsx}'] }`. `tsconfig.json`: strict, `jsx: react-jsx`, `moduleResolution: bundler`, `types: ["vite/client", "vitest/globals", "@testing-library/jest-dom"]`, `noEmit: true`, include `src`, `tests`, `scripts`, `vite.config.ts`, `playwright.config.ts`. `tests/setup.ts` imports `@testing-library/jest-dom/vitest`.
- [ ] **Step 4: Create `playwright.config.ts`**: `testDir: 'tests/e2e'`, chromium only, `use.baseURL: 'http://localhost:4173/Portfolio/'`, `webServer: { command: 'npm run build && npm run preview -- --port 4173 --strictPort', url: 'http://localhost:4173/Portfolio/', reuseExistingServer: !process.env.CI, timeout: 120000 }`.
- [ ] **Step 5: Write the failing unit test** `tests/app.test.tsx`:

```tsx
test('renders the name as the only h1', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kamilia Ahmed')
})
```

- [ ] **Step 6: Run `npm test`** — expected: FAIL (App not found).
- [ ] **Step 7: Create `index.html`** (`<html lang="en">`, `<div id="root">`, module script `/src/main.tsx`), `src/main.tsx` (imports `@fontsource-variable/archivo/wdth.css`, `./styles/tokens.css`, `./styles/base.css`, renders `<App />` in `StrictMode`), and `src/App.tsx` returning `<main><h1>Kamilia Ahmed</h1></main>`. `tokens.css` declares the five colour tokens plus: `--font: 'Archivo Variable', Arial, sans-serif; --rule-hair: 1px; --rule-section: 2px; --rule-header: 6px; --size-name: clamp(3rem, 8vw, 7.5rem); --size-h2: 1.625rem; --size-h3: 1.25rem; --size-body: 1.0625rem; --size-small: 0.875rem; --line-body: 1.55; --space: 8px; --measure: 68ch`. `base.css`: margin reset, `body { background: var(--paper); color: var(--ink); font: var(--size-body)/var(--line-body) var(--font); }`, `:focus-visible` outline from Global Constraints, `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }`.
- [ ] **Step 8: Run `npm test`** — expected: PASS.
- [ ] **Step 9: Write `tests/e2e/smoke.spec.ts`**: `test('home loads under the /Portfolio/ base', …)` — `page.goto('')`, expect h1 to have text `Kamilia Ahmed`, expect no console errors.
- [ ] **Step 10: Run `npm run e2e`** — expected: PASS.
- [ ] **Step 11: Commit** — `git add -A && git commit -m "chore: replace the template site with a React + Vite app"`.

---

### Task 2: Content module and its rules

**Files:**
- Create: `src/content/types.ts`, `src/content/profile.ts`, `src/content/pins.ts`, `src/content/results.ts`, `src/content/caseStudies.ts`, `src/content/earlierWork.ts`, `src/content/history.ts`, `src/content/sections.ts`, `src/content/index.ts`, `src/lib/results.ts`
- Test: `tests/results.test.ts`, `tests/content.test.ts`

**Interfaces:**
- Produces (types in `types.ts`):
  - `type PinId = 'react' | 'typescript' | 'node' | 'nestjs' | 'elasticsearch' | 'mongodb' | 'llm' | 'testing'`
  - `interface Pin { id: PinId; label: string }`
  - `type CaseStudyId = 'ask-your-data' | 'chart-speed' | 'ai-cost-dashboard' | 'one-interface'`
  - `interface Result { id: string; label: string; before: number; after: number; unit: 's' | ''; caseStudy?: CaseStudyId }`
  - `interface DiagramBlock { id: string; label: string; pins: PinId[] }`
  - `interface DiagramStage { title: string; blocks: DiagramBlock[] }`
  - `interface Diagram { caption: string; stages: DiagramStage[] }`
  - `interface CaseStudy { id: CaseStudyId; number: string; anchor: string; title: string; summary: string; headlineResult?: string; status: string; problem: string; built: string[]; diagrams: Diagram[]; resultIds: string[]; resultNote?: string; pins: PinId[] }`
  - `interface Profile { name: string; fullName: string; role: string; location: string; email: string; phone: string; linkedin: string; github: string; site: string; cvFile: string; description: string[] }`
  - `interface EarlierWork { name: string; what: string; stack: string; url: string; live?: string }`
  - `interface HistoryEntry { period: string; title: string; detail: string }`
  - `interface SectionInfo { id: string; number: number; title: string }`
- Produces (`src/lib/results.ts`): `percentChange(before: number, after: number): number` (rounded integer, negative for a drop); `formatValue(n: number, unit: Result['unit']): string` (`63` → `"63 s"`, `4.3` → `"4.3 s"`, `5` with `''` → `"5"`); `formatResult(r: Result): string` (`"63 s → 4.3 s"`); `formatPercent(p: number): string` (`-93` → `"−93%"` with U+2212, `12` → `"+12%"`).
- Produces (`index.ts`): named exports `profile`, `pins`, `results`, `resultById(id: string): Result`, `caseStudies`, `earlierWork`, `history`, `sections`.

- [ ] **Step 1: Write the failing tests.** `tests/results.test.ts`:

```ts
test.each([[63, 4.3, -93], [262, 50, -81], [89, 52, -42], [5, 1, -80]])('percentChange(%d, %d) = %d', (b, a, p) => {
  expect(percentChange(b, a)).toBe(p)
})
test('formats', () => {
  expect(formatResult(resultById('slowest-chart'))).toBe('63 s → 4.3 s')
  expect(formatResult(resultById('dialog-components'))).toBe('5 → 1')
  expect(formatPercent(-93)).toBe('−93%')
})
```

`tests/content.test.ts` — one test each:
  - every `caseStudy.pins` and every diagram block's `pins` id exists in `pins`;
  - every block's pins are a subset of its case study's `pins`;
  - every pin is used by at least one case study;
  - every `resultIds` entry and `headlineResult` resolves with `resultById`;
  - anchors are unique and match `/^5-[1-4]-[a-z-]+$/`, numbers are `5.1`–`5.4` in order;
  - `sections` has ids `1-features`, `2-description`, `3-pin-configuration`, `4-typical-performance`, `5-detailed-description`, `6-related-parts`, `7-revision-history`, `8-ordering-information`, numbered 1–8;
  - no string anywhere in the content (walk the exported objects) matches `/vodafone|etisalat|beyti|ora_properties|consumer_finance/i`.
- [ ] **Step 2: Run `npm test`** — expected: FAIL (modules missing).
- [ ] **Step 3: Implement `src/lib/results.ts`** with the signatures above (`Math.round((after - before) / before * 100)`; `formatValue` drops trailing zeros via `String(n)`).
- [ ] **Step 4: Write the content files with this exact copy.**

`profile.ts`:
```ts
export const profile: Profile = {
  name: 'Kamilia Ahmed', fullName: 'Kamilia Ahmed Hamed',
  role: 'Full-stack engineer. React + Node, end to end.',
  location: 'Cairo, Egypt · works UK hours',
  email: 'kamiliaahmed01@gmail.com', phone: '+20 112 452 9888',
  linkedin: 'https://www.linkedin.com/in/kamiliaahmed/', github: 'https://github.com/Kamilia98',
  site: 'https://kamilia98.github.io/Portfolio/', cvFile: 'kamilia-ahmed-hamed.pdf',
  description: [
    'I build features for AIM Insights, a social-listening and analytics platform at AIM Technologies, where I have worked since July 2025.',
    'I take a feature from the React screen through the Node and NestJS services to the Elasticsearch query and the LLM call, and I measure what it changed.',
    'By October 2026 that was about 4,400 commits across 16 repositories: AI answers, query speed, an AI cost dashboard and a shared design system.',
  ],
}
```

`pins.ts` (in this order): react `React`, typescript `TypeScript`, node `Node.js`, nestjs `NestJS`, elasticsearch `Elasticsearch`, mongodb `MongoDB`, llm `LLMs`, testing `Jest / Playwright`.

`results.ts`:
```ts
export const results: Result[] = [
  { id: 'slowest-chart', label: 'Slowest chart load', before: 63, after: 4.3, unit: 's', caseStudy: 'chart-speed' },
  { id: 'heavy-charts', label: 'Fifteen heavy charts, together', before: 262, after: 50, unit: 's', caseStudy: 'chart-speed' },
  { id: 'frontend-build', label: 'Frontend image build', before: 89, after: 52, unit: 's' },
  { id: 'dialog-components', label: 'Dialog components', before: 5, after: 1, unit: '', caseStudy: 'one-interface' },
]
```

`caseStudies.ts` — four entries; `status`, `summary`, `problem`, `built` verbatim:

5.1 `ask-your-data`, anchor `5-1-ask-your-data`, title `Ask your data`, status `Built; ready for a pilot`, pins `react, typescript, node, llm, elasticsearch`, resultIds `[]`.
  - summary: `Plain-English questions answered with checked numbers and a chart.`
  - problem: `Analysts wanted to ask a dashboard a question in their own words, but a language model that writes the answer can also invent the numbers.`
  - built: `A two-phase design: when the widget is created, one LLM call compiles the question into a structured plan; when it opens, the plan runs as ordinary code.` · `Every claim the question takes for granted, such as a ranking or a rise, is checked in code before an answer is written, or the question is refused with a reason.` · `Numbers stream to the screen first; a second LLM call only phrases those facts, and the backend checks every number in the text against them.` · `The chart type is chosen in code from the question's intent, and prompt changes are tested against a bank of about 180 questions.`
  - diagram caption `From question to checked answer`; stages: `Ask` [`question` (react, typescript)] → `Compile, once` [`compile plan · LLM` (llm), `claim check · Node` (node)] → `Run, on every open` [`query · Elasticsearch` (elasticsearch), `facts · Node` (node)] → `Answer` [`phrase facts · LLM` (llm), `number check · Node` (node)] → `Show` [`answer + chart` (react, typescript)].

5.2 `chart-speed`, anchor `5-2-chart-speed`, title `Chart speed`, status `Merged; awaiting release`, pins `nestjs, typescript, elasticsearch`, headlineResult `slowest-chart`, resultIds `['slowest-chart', 'heavy-charts']`, resultNote `Measured on a test environment with identical numbers; a replay of 10 days of production requests confirmed the gains.`
  - summary: `Tag breakdowns sent to Elasticsearch once instead of once per tab.`
  - problem: `Charts that split results into tabs and break them down by tags took up to a minute to load, and some timed out during Excel export.`
  - built: `Measured where the time went with Elasticsearch's profiler: each tab rebuilt the full tag breakdown, so a seven-tab chart did the same heavy work seven times.` · `Changed the query builder so tabs that share a breakdown send it once, and matched a tag's hand-picked posts with one terms clause instead of one clause per post.` · `Proved the numbers were unchanged by comparing old and new answers chart by chart.`
  - two diagrams. `Before`: `Request` [`chart with 7 tabs · NestJS` (nestjs, typescript)] → `Query` [`7 copies of the tag breakdown · Elasticsearch` (elasticsearch)] → `Result` [`63 s`]. `After`: `Request` [`same chart · NestJS` (nestjs, typescript)] → `Query` [`1 shared breakdown + 1 terms clause · Elasticsearch` (elasticsearch)] → `Result` [`4.3 s, same numbers`]. Result blocks have `pins: []`.

5.3 `ai-cost-dashboard`, anchor `5-3-ai-cost-dashboard`, title `AI cost dashboard`, status `Internal tool, built alone`, pins `react, typescript, nestjs, mongodb, llm`, resultIds `[]`.
  - summary: `AI spend per feature, user and request, in a tool I built alone.`
  - problem: `The company runs five AI features on several model providers, and nobody could see what each feature, user or request cost.`
  - built: `A NestJS service that ingests the LLM gateway's logs and the providers' own billing from OpenAI, Anthropic and OpenRouter into MongoDB.` · `A React dashboard on TanStack Query and Recharts: cost over time, cost per feature, top users, and each request's cost down to its sub-calls.` · `A product filter, so each product's AI spend can be read on its own.`
  - diagram caption `From model calls to cost per request`; stages: `Sources` [`LLM gateway logs` (llm), `provider billing: OpenAI, Anthropic, OpenRouter` (llm)] → `Ingest` [`ingestion API · NestJS` (nestjs, typescript), `store · MongoDB` (mongodb)] → `Read` [`dashboard · React: feature, user, request` (react, typescript)].

5.4 `one-interface`, anchor `5-4-one-interface`, title `One interface`, status `Merged; awaiting release`, pins `react, typescript, testing`, headlineResult `dialog-components`, resultIds `['dialog-components']`.
  - summary: `Four UI patterns, each brought down to one component and kept there by lint rules.`
  - problem: `The app said the same things in different ways: confirmations on five components, large modals in twelve widths, success messages as toasts or as pop-ups, and six kinds of expandable list.`
  - built: `One dialog component in two sizes for all 43 confirmations, and one frame in three sizes for the 19 large modals.` · `One feedback mechanism for 242 toast calls and 22 success pop-ups, with written rules for what every message says.` · `One collapsible row for six lists.` · `An ESLint rule for each pattern, so the old way cannot come back, and the end-to-end tests updated to match.`
  - diagram caption `Many ways, one component each`; stages: `Before` [`5 dialog components`, `12 modal widths`, `toasts and success pop-ups`, `6 list types`] (react) → `After` [`Dialog, 2 sizes`, `Large dialog, 3 sizes`, `useNotify`, `CollapseList`] (react, typescript) → `Kept` [`ESLint rules` (typescript), `end-to-end tests · Playwright` (testing)].

`earlierWork.ts` (in order):
  - `No-code website builder` · `Graduation project: build websites visually; extended GrapesJS with events and backend loading` · `TypeScript, GrapesJS` · `https://github.com/m-emadeddin/codeless-demo-app`
  - `Furniture shop` · `Store with filters, cart, JWT auth, admin roles and Stripe payments` · `Angular, Node.js` · `https://github.com/Kamilia98/Furniture-ecommerce-frontend` · live `https://furniture-ecommerce-frontend.vercel.app`
  - `Store admin dashboard` · `Products, categories, orders and customers for the furniture shop` · `Vue, Pinia, Node.js` · `https://github.com/Kamilia98/Admin-Dashboard`
  - `Bloogy` · `Blogging platform with auth, comments and likes` · `React, Redux, NestJS` · `https://github.com/Kamilia98/Bloogy` · live `https://bloogy-ashy.vercel.app`
  - `Oncology management system` · `Patients, treatment plans and follow-ups for clinicians` · `React, Node.js` · `https://github.com/m-emadeddin/chemotherapy-management-system`
  - `Examination system` · `Online exams with sign-up, eligibility and instant results` · `JavaScript` · `https://github.com/Kamilia98/Examination-System` · live `https://examination-system-topaz.vercel.app`

`history.ts` (newest first):
  - `Jul 2025 – now` · `Full-stack engineer, AIM Technologies` · `AIM Insights: AI features, query performance, AI cost tooling, design system.`
  - `Oct 2024 – Jul 2025` · `Information Technology Institute (ITI)` · `9-month program, Web and UI development.`
  - `Sep 2023 – now` · `Freelance frontend developer, Fiverr` · `Responsive email templates; 5-star client reviews.`
  - `Sep 2019 – Jul 2024` · `B.Sc. Computer and Systems Engineering, Zagazig University` · `Excellent with honours, 92.47%, ranked 3rd in class.`

`sections.ts`: the eight `SectionInfo` entries from Step 1 with titles `Features`, `Description`, `Pin configuration`, `Typical performance characteristics`, `Detailed description`, `Related parts`, `Revision history`, `Ordering information`.
- [ ] **Step 5: Run `npm test`** — expected: PASS.
- [ ] **Step 6: Commit** — `git commit -m "feat: content module with computed results and content rules"`.

---

### Task 3: Page shell — header, numbered sections, section index, link previews

**Files:**
- Create: `src/components/Header.tsx` + `.module.css`, `src/components/Section.tsx` + `.module.css`, `src/components/SectionIndex.tsx` + `.module.css`, `src/lib/useActiveSection.ts`
- Modify: `src/App.tsx`, `index.html`
- Test: `tests/shell.test.tsx`, `tests/e2e/shell.spec.ts`

**Interfaces:**
- Consumes: `profile`, `sections` from `src/content`.
- Produces: `Section({ info: SectionInfo; children: ReactNode })` — renders `<section id={info.id} aria-labelledby>` with `<h2>` text `` `${info.number} ${info.title}` ``, a `--rule-section` rule under it, and `scroll-margin-top: 88px`; `useActiveSection(ids: string[]): string | null` (IntersectionObserver, `rootMargin: '-30% 0px -60% 0px'`); `cvHref = import.meta.env.BASE_URL + profile.cvFile` exported from `src/lib/links.ts`.
- `App` layout: ≥ 1024 px a two-column grid (`220px` index, main column `max-width: 920px`, gap `64px`, page padding `48px`); below 1024 px the index becomes a sticky top bar (horizontal, scrollable, `56px` tall) and page padding `20px`. Section bodies for 1–8 are `null` placeholders that Tasks 4–7 fill.
- Header: `<h1>` name (size `--size-name`, `font-stretch: 72%`, weight 850, line-height 0.9), role line (`font-stretch: 90%`, weight 600, `1.75rem`), location line (`--muted`), then four links: `Download CV` (primary: ink fill, paper text, `href={cvHref}`, `download`), `Email` (`mailto:`), `LinkedIn`, `GitHub` (outline buttons, 2px ink border); then the 6px accent header rule.

- [ ] **Step 1: Write the failing tests** `tests/shell.test.tsx`: renders eight `h2` headings whose text is `1 Features` … `8 Ordering information` in order; the index has eight links with `href` `#1-features` … `#8-ordering-information`; the Download CV link `href` is `/Portfolio/kamilia-ahmed-hamed.pdf`; the Email link `href` is `mailto:kamiliaahmed01@gmail.com`; the rendered text does not contain `112 452`.
- [ ] **Step 2: Run `npm test`** — expected: FAIL.
- [ ] **Step 3: Implement** `Section`, `SectionIndex` (an `<nav aria-label="Sections">` list; the link for the active section gets `aria-current="location"` and a 3px accent left rule), `useActiveSection`, `Header`, `links.ts`, and the `App` layout above.
- [ ] **Step 4: Add static metadata to `index.html`**: `<title>Kamilia Ahmed · Full-stack engineer (React + Node)</title>`, `<meta name="description" content="Full-stack engineer in Cairo working UK hours: React, TypeScript, Node, NestJS, Elasticsearch and LLM features, with measured results.">`, `og:title`, `og:description` (same text), `og:type website`, `og:url https://kamilia98.github.io/Portfolio/`, `<meta name="theme-color" content="#FFFFFF">`.
- [ ] **Step 5: Run `npm test`** — expected: PASS.
- [ ] **Step 6: Write `tests/e2e/shell.spec.ts`**: (a) `request.get('')` raw HTML contains `<title>Kamilia Ahmed`, `og:title` and `og:description` (Review Focus 5); (b) after `page.locator('#7-revision-history').scrollIntoViewIfNeeded()`, the index link `#7-revision-history` has `aria-current="location"`.
- [ ] **Step 7: Run `npm run e2e`** — expected: PASS.
- [ ] **Step 8: Commit** — `git commit -m "feat: datasheet page shell with section index and link previews"`.

---

### Task 4: Static sections — features, description, related parts, revision history, ordering information

**Files:**
- Create: `src/components/Features.tsx`, `src/components/Description.tsx`, `src/components/RelatedParts.tsx`, `src/components/RevisionHistory.tsx`, `src/components/OrderingInfo.tsx`, `src/components/tables.module.css`
- Modify: `src/App.tsx` (fill sections 1, 2, 6, 7, 8)
- Test: `tests/sections.test.tsx`

**Interfaces:**
- Consumes: `caseStudies`, `profile`, `earlierWork`, `history`, `resultById`, `formatResult`, `formatPercent`, `percentChange`, `cvHref`.
- Features: an `<ol>` of four rows: case-study title (bold) linking to `#${anchor}`, then the summary; when `headlineResult` is set, the formatted result and % after it in bold tabular figures (`63 s → 4.3 s (−93%)`).
- Description: the three `profile.description` sentences as one paragraph, max width `--measure`.
- RelatedParts, RevisionHistory: `<table>` with a `--fill` header row, hairline row rules, no vertical rules. RelatedParts columns `Part`, `What it is`, `Stack`, `Links` (`Code`, and `Live` when present; external links get `target="_blank" rel="noopener noreferrer"`). On screens under 640 px each row stacks as label/value pairs (CSS only; the table semantics stay).
- OrderingInfo: a two-column definition list `Email`, `LinkedIn`, `GitHub`, `CV (PDF)` with the same hrefs as the header.

- [ ] **Step 1: Write the failing tests**: Features has four links to `#5-1-ask-your-data`, `#5-2-chart-speed`, `#5-3-ai-cost-dashboard`, `#5-4-one-interface` and contains `63 s → 4.3 s (−93%)` and `5 → 1 (−80%)`; RelatedParts has six body rows and the Bloogy row links to `https://bloogy-ashy.vercel.app`; RevisionHistory's first row is `Jul 2025 – now`; OrderingInfo's CV link `href` is `/Portfolio/kamilia-ahmed-hamed.pdf`.
- [ ] **Step 2: Run `npm test`** — expected: FAIL.
- [ ] **Step 3: Implement the five components** as above and place them in `App`.
- [ ] **Step 4: Run `npm test`** — expected: PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat: features, description, related parts, history and contact sections"`.

---

### Task 5: Pin selection and the pin configuration

**Files:**
- Create: `src/state/pinSelection.tsx`, `src/components/PinDiagram.tsx` + `.module.css`
- Modify: `src/App.tsx` (wrap the page in `PinSelectionProvider`; fill section 3)
- Test: `tests/pins.test.tsx`, `tests/e2e/pins.spec.ts`

**Interfaces:**
- Produces: `PinSelectionProvider({ children })`; `usePinSelection(): { activePin: PinId | null; togglePin(id: PinId): void; isActive(pins: PinId[]): boolean; isDimmed(pins: PinId[]): boolean }` — `isActive` true when `activePin` is in `pins`; `isDimmed` true when a pin is active and not in `pins`.
- PinDiagram: ≥ 640 px a chip — a centred rectangle (`3px` ink border, `240px × 260px`, the text `Kamilia Ahmed` inside in condensed type) with four pins on each side (pins 1–4 left, 5–8 right, pin order from `pins`), each pin a short `3px × 28px` ink lead plus a `<button type="button" aria-pressed>` label; below 640 px a plain two-column list of the same buttons. Under the chip one line: `Select a pin to see where it is used.` Each button's accessible name is the pin label; a visually small count follows it, `in N case studies` (N from `caseStudies`). Active pin: accent text and lead; other pins `opacity: 0.45` while one is active.

- [ ] **Step 1: Write the failing tests** `tests/pins.test.tsx`: clicking `React` sets its `aria-pressed` to `true` and every other pin's to `false`; clicking `React` again sets all to `false`; with `userEvent.tab()` to a pin and `userEvent.keyboard(' ')`, that pin becomes pressed; `Elasticsearch` shows `in 2 case studies`.
- [ ] **Step 2: Run `npm test`** — expected: FAIL.
- [ ] **Step 3: Implement** the provider, hook and `PinDiagram` as above; transitions `150ms` on colour and opacity.
- [ ] **Step 4: Run `npm test`** — expected: PASS.
- [ ] **Step 5: Write `tests/e2e/pins.spec.ts`** (Review Focus 2): press Tab until the focused element is the `Node.js` pin (bounded loop, max 40 presses), assert its computed `outline-style` is `solid`, press Enter, assert `aria-pressed="true"`.
- [ ] **Step 6: Run `npm run e2e`** — expected: PASS.
- [ ] **Step 7: Commit** — `git commit -m "feat: pin configuration with selectable pins"`.

---

### Task 6: Case studies and block diagrams

**Files:**
- Create: `src/components/BlockDiagram.tsx` + `.module.css`, `src/components/CaseStudy.tsx` + `.module.css`
- Modify: `src/App.tsx` (fill section 5)
- Test: `tests/caseStudies.test.tsx`, `tests/e2e/layout.spec.ts`

**Interfaces:**
- Consumes: `usePinSelection`, `caseStudies`, `pins`, `resultById`, `formatResult`, `formatPercent`, `percentChange`.
- Produces: `BlockDiagram({ diagram: Diagram })` — `<figure>` with `<figcaption>` = caption; stages as an `<ol>` laid out as a row (≥ 768 px, `→` drawn between stages with CSS, `aria-hidden`) or a column (< 768 px, `↓` between stages); each stage has a small uppercase title and a `<ul>` of blocks; a block is a box with a `1.5px` ink border, label in normal width; `data-active="true"` (accent border and text) from `isActive(block.pins)`, `data-dimmed="true"` (`opacity: 0.35`) from `isDimmed(block.pins)` — blocks with `pins: []` dim whenever a pin is active.
- `CaseStudy({ study: CaseStudy })` — `<article id={anchor}>` with `scroll-margin-top: 88px`; `<h3>` `` `${number} ${title}` `` and the status in `--muted` beside it; then five `<h4>` parts in this fixed order: `Problem`, `What I built` (a `<ul>` of `built`), `How it works` (each diagram), `Result` (each `resultIds` result as `label: 63 s → 4.3 s (−93%)`, plus `resultNote` in `--muted`; for studies without results, the summary), `Stack` (the study's pins as a comma-separated line of labels, not pills). `data-dimmed` on the article from `isDimmed(study.pins)` (`opacity: 0.5`).

- [ ] **Step 1: Write the failing tests** `tests/caseStudies.test.tsx`: the `h4`s inside `#5-2-chart-speed` read `Problem, What I built, How it works, Result, Stack` in order; after selecting the `Elasticsearch` pin, exactly 3 blocks have `data-active="true"` and the articles `#5-3-ai-cost-dashboard` and `#5-4-one-interface` have `data-dimmed="true"` while `#5-1-ask-your-data` does not; `#5-2-chart-speed` contains `Slowest chart load: 63 s → 4.3 s (−93%)`.
- [ ] **Step 2: Run `npm test`** — expected: FAIL.
- [ ] **Step 3: Implement** `BlockDiagram` and `CaseStudy` as above and render the four studies in section 5.
- [ ] **Step 4: Run `npm test`** — expected: PASS.
- [ ] **Step 5: Write `tests/e2e/layout.spec.ts`**: (a) Review Focus 1 — at viewport `320 × 800`, `document.documentElement.scrollWidth` ≤ 320, and the same at `390 × 844` and `1440 × 900`; (b) Review Focus 3 — `page.goto('#5-2-chart-speed')`, then the heading `5.2 Chart speed` has a bounding box with `y` ≥ 56 (below the sticky bar on mobile; ≥ 0 on desktop) and `y` < 240, at both `390 × 844` and `1440 × 900`.
- [ ] **Step 6: Run `npm run e2e`** — expected: PASS.
- [ ] **Step 7: Commit** — `git commit -m "feat: case studies with block diagrams that follow the selected pin"`.

---

### Task 7: Typical performance characteristics

**Files:**
- Create: `src/components/PerformanceBars.tsx` + `.module.css`, `src/lib/useInView.ts`
- Modify: `src/App.tsx` (fill section 4)
- Test: `tests/performance.test.tsx`, `tests/e2e/motion.spec.ts`

**Interfaces:**
- Consumes: `results`, `percentChange`, `formatValue`, `formatPercent`.
- Produces: `useInView(ref): boolean` (true once, IntersectionObserver `threshold: 0.4`); `PerformanceBars()` — one row per result with `unit === 's'` (3 rows): label; a "before" bar (ink, 100% width, 14px) labelled with the before value; an "after" bar (accent) whose width is `` `${(after / before * 100).toFixed(2)}%` `` labelled with the after value; the % change in bold tabular figures at the row's end. Bars are `<div role="img" aria-label="63 s before, 4.3 s after, −93%">`. The after bar starts at `100%` and transitions to its width over `900ms ease-out` once `useInView` is true; `data-animated` is `false` and the width is final from the first render when `matchMedia('(prefers-reduced-motion: reduce)')` matches.

- [ ] **Step 1: Write the failing tests** `tests/performance.test.tsx` (stub `IntersectionObserver` and `matchMedia`): renders three rows; the slowest-chart after bar has `style.width === '6.83%'` once in view; texts `−93%`, `−81%`, `−42%`; with reduced motion matched, the after bar has `data-animated="false"` and width `6.83%` on first render.
- [ ] **Step 2: Run `npm test`** — expected: FAIL.
- [ ] **Step 3: Implement** `useInView` and `PerformanceBars` as above.
- [ ] **Step 4: Run `npm test`** — expected: PASS.
- [ ] **Step 5: Write `tests/e2e/motion.spec.ts`**: with `page.emulateMedia({ reducedMotion: 'reduce' })`, the first after bar's computed `transition-duration` is `0s`.
- [ ] **Step 6: Run `npm test && npm run e2e`** — expected: PASS (layout.spec still passes with the bars in place).
- [ ] **Step 7: Commit** — `git commit -m "feat: performance bars computed from the measured results"`.

---

### Task 8: The CV page and its PDF

**Files:**
- Create: `cv.html`, `src/cv/main.tsx`, `src/cv/CvDocument.tsx`, `src/cv/cv.css`, `scripts/print-cv.mjs`
- Modify: `vite.config.ts` (add `build.rolldownOptions.input: { main: 'index.html', cv: 'cv.html' }`), `package.json` (script `cv: npm run build && node scripts/print-cv.mjs`), `playwright.config.ts` (webServer command `npm run cv && npm run preview -- --port 4173 --strictPort`)
- Test: `tests/cv.test.tsx`, `tests/e2e/cv.spec.ts`

**Interfaces:**
- Consumes: the whole content module and `src/lib/results.ts`.
- `CvDocument()` — A4 print layout (`@page { size: A4; margin: 14mm }`, body `10pt`, headings condensed, same tokens): header (`fullName`, role, location, email, **phone**, LinkedIn, GitHub, site); `Summary` (the description); `Experience` → `AIM Technologies — Full-stack engineer, Jul 2025 – now` with one bullet per case study (`title: summary`, plus its headline result when set) and three more bullets: `Frontend image build 89 s → 52 s (−42%).`, `Site speed fix (gzip, trimmed CSS) with 17 production errors resolved.`, `About 4,400 commits across 16 repositories by October 2026.`; `Skills` (`Core: React, TypeScript, Node.js, NestJS` · `Data: Elasticsearch, MongoDB` · `AI: LLM features via Portkey` · `Testing: Jest, Playwright` · `Also used: Next.js, Angular, Vue, Ant Design, Tailwind CSS, Material UI`); `Earlier work` (name — what, stack); `Education` and `Freelance` from `history`. On screen it shows as a white A4 sheet centred on `--fill`.
- `scripts/print-cv.mjs` — `preview({ preview: { port: 4174 } })` from `vite`, Playwright `chromium.launch()`, `page.goto(base + 'cv.html')`, `await page.evaluate(() => document.fonts.ready)`, `page.pdf({ path: 'dist/kamilia-ahmed-hamed.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true })`, close browser and server; exit non-zero on any error.

- [ ] **Step 1: Write the failing tests** `tests/cv.test.tsx`: renders `Kamilia Ahmed Hamed`, `+20 112 452 9888`, all four case-study titles, `Zagazig University`, `−93%`.
- [ ] **Step 2: Run `npm test`** — expected: FAIL.
- [ ] **Step 3: Implement** `cv.html`, `src/cv/main.tsx`, `CvDocument`, `cv.css`, the config and script changes above.
- [ ] **Step 4: Run `npm test && npm run cv`** — expected: PASS, and `dist/kamilia-ahmed-hamed.pdf` exists.
- [ ] **Step 5: Write `tests/e2e/cv.spec.ts`** (Review Focus 4): the header's Download CV `href` answers `200` with `content-type` `application/pdf` from the preview server; loading `dist/kamilia-ahmed-hamed.pdf` with pdf-lib gives `getPageCount()` of 1 or 2; the PDF bytes (latin1) contain `Archivo`.
- [ ] **Step 6: Run `npm run e2e`** — expected: PASS.
- [ ] **Step 7: Open the PDF and read both pages** (render page images with Playwright or open the file) — every section present, nothing cut at a page break mid-line.
- [ ] **Step 8: Commit** — `git commit -m "feat: two-page CV printed from the same content"`.

---

### Task 9: Deploy workflow and README

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md` (replace)

**Interfaces:**
- Workflow `Deploy`: on `push` to `main` and `workflow_dispatch`; `permissions: { contents: read, pages: write, id-token: write }`; `concurrency: { group: pages, cancel-in-progress: true }`. Job `build`: `actions/checkout@v4`, `actions/setup-node@v4` (`node-version: 22`, `cache: npm`), `npm ci`, `npx playwright install --with-deps chromium`, `npm test`, `npm run cv`, `npm run e2e`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` (`path: dist`). Job `deploy` (needs `build`, environment `github-pages`): `actions/deploy-pages@v4`.
- README: one paragraph on what the site is; commands `npm run dev`, `npm test`, `npm run e2e`, `npm run cv` (writes `dist/kamilia-ahmed-hamed.pdf`); where content lives (`src/content/`); that deploys run from `main` via GitHub Actions.

- [ ] **Step 1: Write `.github/workflows/deploy.yml`** as above.
- [ ] **Step 2: Validate it** — `npx --yes @action-validator/cli .github/workflows/deploy.yml`; expected: no errors.
- [ ] **Step 3: Run the workflow's commands locally in order** — `npm ci && npm test && npm run cv && npm run e2e`; expected: all pass.
- [ ] **Step 4: Write `README.md`** as above.
- [ ] **Step 5: Commit** — `git commit -m "ci: build, test, print the CV and deploy to GitHub Pages"`.

---

### Task 10: Design finish, review and DESIGN.md

**Files:**
- Create: `.impeccable/review/desktop.png`, `.impeccable/review/mobile.png` (ignored by git), `DESIGN.md`, `.impeccable/design.json`
- Modify: component CSS as the reviews require

- [ ] **Step 1: Capture** the built site at `1440` wide (full page) and `390` wide (full page) into `.impeccable/review/`, plus the CV PDF's two pages; open each file and confirm it shows what its name claims.
- [ ] **Step 2: Run the detector** — `sh C:/Users/hassa/.claude/skills/impeccable/scripts/impeccable detect --json src index.html cv.html`; fix every mechanical finding.
- [ ] **Step 3: Worst-case pass with the `break-ui` skill** on the case-study and related-parts components (long titles, a 9-stage diagram, a 40-character pin label); fix what breaks.
- [ ] **Step 4: Phone pass with the `mobile-native` skill** (tap highlight, sticky bar, 100vh, focus zoom); fix what applies.
- [ ] **Step 5: Polish pass with the `emil-design-eng` skill**, limited to the Global Constraints (no new motion beyond the two allowed).
- [ ] **Step 6: Lighthouse** on the preview build (Chrome DevTools `lighthouse_audit`, mobile): performance ≥ 95, accessibility ≥ 95; fix and re-run if not.
- [ ] **Step 7: Finish review** — spawn `impeccable-finish-reviewer` fresh with: the original request (portfolio for remote full-stack roles, Palm Outsourcing first), PRODUCT.md, the spec, the direction contract (`.impeccable/surfaces/index-html.md`), the screenshot paths, the detector output, the decision sketch `.impeccable/mocks/decision/pick-r1.html` as the critique reference, and the craft-floor reference path. Act on its disposition (ship / fix / rebuild / recapture) as new-work §7 describes; at most two rounds.
- [ ] **Step 8: Document** — spawn `impeccable-documenter` with the project root, PRODUCT.md, the direction contract and the built artifact; verify `DESIGN.md` and `.impeccable/design.json` exist and carry the tokens.
- [ ] **Step 9: Run `npm test && npm run e2e`** — expected: PASS.
- [ ] **Step 10: Commit** — `git commit -m "docs: DESIGN.md and finish-review fixes"`.

After Task 10, report to Kamilia and wait for Kamilia's yes before: pushing `redesign`, switching the repo's Pages source to GitHub Actions, and merging to `main`.

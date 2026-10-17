# Portfolio redesign: the datasheet

**Date:** 2026-10-17 · **Branch:** `redesign` · **Product truth:** [PRODUCT.md](../../../PRODUCT.md)

## Goal

Replace the current template portfolio with one that gets Kamilia shortlisted for remote full-stack (React +
Node) roles. A recruiter skimming for 30 seconds sees Kamilia's role, level, stack, one measured result and how to
reach them without scrolling. An engineer opening a case study sees what Kamilia built, how it works and what it
measured. The PDF CV comes out of the same content, so the two never disagree.

## Direction

The page is a **component datasheet**: the numbered, factual document an engineer reads before choosing a
part. Chosen on Impeccable's decision page (2026-10-17) over a nutrition-facts panel, a museum exhibition and
the standard developer layout. A datasheet is natively a printable PDF, so the printed CV is the datasheet's
print edition.

No part number in the header (decided 2026-10-17): the name takes that place.

## Page structure

One document with numbered sections, like a real datasheet. On desktop a section index sits in a left column
and marks the section in view; on narrow screens it becomes a compact top bar. Every section and case study
has its own anchor, so a case study can be linked directly (`#5-2-chart-speed`).

| # | Section | Content |
|---|---|---|
| — | Header | Name; "Full-stack engineer. React + Node, end to end."; Cairo, works UK hours; Download CV, Email, LinkedIn, GitHub |
| 1 | Features | Four results, one line each, each linking to its case study |
| 2 | Description | Three sentences: what Kamilia does, where (AIM Insights at AIM Technologies since July 2025), how they work |
| 3 | Pin configuration | A chip diagram; each pin is a technology Kamilia works across (React, TypeScript, Node.js, NestJS, Elasticsearch, MongoDB, LLMs, Jest/Playwright) |
| 4 | Typical performance characteristics | Before/after bars from the measured numbers, % change computed in code |
| 5 | Detailed description | Case studies 5.1–5.4 (below) |
| 6 | Related parts | Earlier work as a compact table: name, what it was, stack, link |
| 7 | Revision history | Zagazig University 2019–2024 (92.47%, ranked 3rd) · ITI 2024–2025 · AIM Technologies from July 2025 · Fiverr freelance from 2023 |
| 8 | Ordering information | Email, LinkedIn, GitHub, CV download |

### Case studies (section 5)

Every case study reads in the same fixed order: **problem → what I built → how it works (block diagram) →
measured result → stack**. Diagrams are drawn in code from data; no screenshots of AIM Insights.

- **5.1 Ask your data.** Users ask about their data in plain English and get an answer with checked numbers and
  a chart. Built in two phases: at creation one LLM call compiles the question into a structured plan, and
  every claim the question takes for granted (a ranking, a rise or fall) is checked in code or refused; on
  open the plan runs deterministically, numbers stream first, then a second LLM call phrases only those facts
  and the backend verifies every number. Chart type chosen in code. Prompt changes tested against a bank of
  about 180 questions. Status: built and ready for a pilot. *Stack:* React, Node.js, Portkey, streamed
  responses.
  *Diagram:* question → compile (LLM) → claim check → plan → query (Elasticsearch) → facts → narrate (LLM) →
  number check → answer + chart.
- **5.2 Chart speed.** Charts broken down by tags asked Elasticsearch to rebuild the same breakdown once per
  tab. Kamilia made sibling tabs share one breakdown and matched hand-picked posts with one `terms` clause.
  Slowest chart 63 s → 4.3 s and fifteen heavy charts 262 s → 50 s on a test environment, with identical
  numbers; a replay of 10 days of production requests confirmed the gains. *Stack:* NestJS, Elasticsearch.
  *Diagram:* the same chart's query before (7 tabs × full breakdown) and after (one shared breakdown).
- **5.3 AI cost dashboard.** An internal tool Kamilia built alone: AI cost and usage across five AI features, per
  user and per request, with provider billing from OpenAI, Anthropic and OpenRouter. *Stack:* React 19,
  TypeScript, Vite, TanStack Query, Recharts; NestJS API on MongoDB.
  *Diagram:* LLM gateway logs + provider billing → ingestion API → dashboard (feature / user / request).
- **5.4 One interface.** The app's 43 confirmation dialogs ran on five different components; Kamilia moved them
  to one dialog in two sizes. 19 large modals with 12 widths became one frame in three sizes; 242 direct toast
  calls and 22 success modals became one feedback mechanism with written copy rules; six list types became one
  collapsible row. Each rule is enforced by ESLint. *Stack:* React, TypeScript, Ant Design, ESLint.
  *Diagram:* many → one, per pattern (5 → 1 dialogs, 12 widths → 3 sizes, 2 mechanisms → 1, 6 lists → 1).

Supporting lines (not case studies): frontend image build 89 s → 52 s (section 4's bars and the CV); about
4,400 commits across 16 repositories since July 2025 (Description and the CV); site speed fix with 17
production errors resolved (the CV only, not the site).

## Signature interaction

Selecting a pin in section 3 (click, tap or keyboard) highlights every block in every diagram, and every case
study, that uses that technology; the other pins dim. It shows "end to end" instead of claiming it. Selecting
the pin again clears it. On narrow screens the chip becomes a list of pins with the same behaviour.

Motion: the performance bars grow from before to after once, when they enter the view; the pin highlight
fades in 150 ms. Nothing else moves. With reduced motion, the bars render at their final length.

## Visual system

- **Ground:** white paper. **Ink:** near-black. **One accent:** a datasheet blue for the header rule, the
  "after" bars and the active pin. Light grey fill for table headers. No dark mode (a datasheet is paper).
- **Type:** Archivo, one variable family, self-hosted. Condensed width for headings and the name; normal width
  for prose; tabular figures for every number.
- **Hierarchy from rule weight and type size only:** hairline table rules, a heavier rule under section
  titles, the thick blue rule under the header. No cards, shadows, gradients or rounded boxes.
- Exact tokens are decided during the build and recorded in DESIGN.md at the end.

## Content model

One typed content module (`src/content/`) feeds the site and the CV page:

- `profile`: name, role line, location, links, email.
- `results`: `{ id, label, before, after, unit }`; the % change is computed, never typed.
- `pins`: technology ids and labels.
- `caseStudies`: `{ id, number, title, problem, built, diagram: { nodes, edges }, results, pins[], status? }`.
- `earlierWork`, `history`.

A unit test fails the build if a case study names a pin that does not exist, a pin is used by no section, or
a result's computed % does not match its before/after.

## CV page

A second entry, `cv.html`, renders the same content as a two-page A4 datasheet: header, features,
description, a condensed pin list, the four case studies in short form, history, education and contact
(including phone, which is on the CV only, not on the public page). `npm run cv` prints it to
`kamilia-ahmed-hamed.pdf` with Playwright's Chromium. The same script runs in CI, so the PDF on the site
always matches the site.

## Build and deploy

- React 18 + TypeScript + Vite, no UI library; diagrams are SVG components drawn from the content data.
  Vite `base: '/Portfolio/'`.
- GitHub Actions on push to `main`: `npm ci` → tests → `vite build` → print the CV PDF into `dist/` →
  deploy to GitHub Pages. The repo's Pages source moves from "Deploy from a branch" to "GitHub Actions"
  (a one-time settings change, done only when Kamilia says so).
- Work stays on `redesign`; the current site stays live until Kamilia approves the merge.

## Removed from the old site

Anime hero GIF, loading screen, sidebar template, skill-pill cloud, contact form (replaced by email and
links), the Fiverr testimonial quotes and the email-template project cards (the one-line Fiverr entry in the
revision history stays), Font Awesome, the "available for freelance" line, the
profile photo (a datasheet has none; LinkedIn has it).

## Quality bar and checks

- WCAG 2.2 AA: contrast, semantic headings in section order, visible focus, keyboard-operable pins,
  each diagram a `figure` with a text equivalent, works at 320 px wide.
- Performance: React is the only runtime dependency; Lighthouse ≥ 95 on performance and accessibility.
- Tests: Vitest for the content rules above; a Playwright smoke test (page renders, pin highlight works, CV
  link resolves, PDF is at most 2 pages).
- Design review before handover: Impeccable's detector and finish review, a worst-case content pass
  (`break-ui`), a phone pass (`mobile-native`), a polish pass (`emil-design-eng`); DESIGN.md written from the
  finished build.

## Out of scope

Blog, analytics, dark mode, contact form, an Arabic version (possible later), separate case-study pages.

## Open decisions

None blocking. Two calls made above that Kamilia can reverse in review: no profile photo on the page, and the
phone number on the CV only.

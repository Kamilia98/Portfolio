# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite, static build. Deployed to GitHub Pages at https://kamilia98.github.io/Portfolio/
by a GitHub Actions workflow (build, print the CV page to PDF, publish). Replaces the current plain
HTML/CSS/JS site in this repo.

## Users

1. **Recruiters and talent partners** at remote-staffing firms and the UK/EU companies they hire for (first:
   Palm Outsourcing). They arrive from a CV, an application form or LinkedIn, skim for about 30 seconds and
   decide whether to shortlist: role, level, stack, proof, how to reach Kamilia.
2. **Hiring engineers** reviewing a shortlist. They open one or two case studies and the GitHub repo to judge
   depth: what Kamilia actually built, the trade-offs, the results.

## Product Purpose

Present Kamilia Ahmed as a mid-level full-stack engineer (React + Node) who owns features end to end, so that
Kamilia gets shortlisted for remote full-stack and frontend roles. Success: a reader can say in one sentence
what Kamilia does and point to one result, and the CV downloaded from the site matches the site.

## Positioning

A full-stack engineer who takes a feature from the React screen down to the Node service and the Elasticsearch
query, on a live AI social-listening product (AIM Insights at AIM Technologies, since July 2025). The proof is
specific, measured work across the whole chain, not a list of technologies.

## Operating Context

- Read on a laptop during screening, often on a phone when a link arrives by WhatsApp or LinkedIn.
- Sits beside the PDF CV in an application; both come from one content source in this repo.
- Kamilia is based in Cairo and works UK hours for remote roles.

## Capabilities and Constraints

- Confirmed content: four AIM case studies, a compact "Earlier" list, and a printable CV page exported to
  `kamilia-ahmed-hamed.pdf`. Open: how pages are split (one long page vs separate case-study pages).
- AIM work is described in text only: no screenshots of AIM Insights, no client or account names, no internal
  URLs or dashboards. Product name "AIM Insights" and employer "AIM Technologies" may be named.
- Must load fast and work at phone width; the old site's loading screen goes.

## Brand Commitments

- Name: Kamilia Ahmed (CV: Kamilia Ahmed Hamed). First person, plain English, numbers over adjectives.
- No junior signals: no skill-pill cloud, no "available for freelance", no course projects up front.

## Evidence on Hand

Lead work at AIM (all chosen by Kamilia as mainly their own work):

1. **Ask your data** — users ask about their data in plain English and get an answer with checked numbers and
   a chart. Two phases (an LLM compiles the question to a structured intent; code fetches and checks the
   numbers), answers streamed live, the chart type chosen in code, and every claim the question takes for
   granted (a ranking, a rise or fall) checked in code or refused. Prompt changes are tested against a bank
   of about 180 questions. React + Node + Portkey. Status: built and ready for a pilot; not yet live for
   clients, so never describe it as shipped to customers.
2. **Chart speed** — charts broken down by tags asked Elasticsearch to rebuild the same breakdown once per
   tab; Kamilia made them ask once. Slowest chart 63 s → 4.3 s and fifteen heavy charts 262 s → 50 s on a test
   environment, with identical numbers; a replay of 10 days of production requests confirmed the gains. NestJS + Elasticsearch.
3. **AI cost dashboard** — internal tool Kamilia built alone (React 19, TypeScript, Vite, TanStack Query,
   Recharts + a NestJS API on MongoDB): AI cost and usage across five AI features, per user and per request, with
   provider billing from OpenAI, Anthropic and OpenRouter.
4. **UI consistency overhaul** — the app's confirmations (43 on five components) became one dialog
   component in two sizes; 19 large modals with 12 different widths became one frame in three sizes; 242
   direct toast calls and 22 success modals became one feedback mechanism with written copy rules; six
   list types became one collapsible row. Each enforced by an ESLint rule.

Also true, usable as supporting lines: frontend image build 89 s → 52 s; site speed fix (gzip, trimmed theme
CSS) with 17 production errors resolved; AI summaries in the PDF/PowerPoint report exports; about 4,400
commits across 16 repositories since July 2025.

Education and earlier work: B.Sc. Computer and Systems Engineering, Zagazig University (2019–2024), Excellent
with honours, 92.47%, ranked 3rd; ITI 9-month Web & UI Development program (Oct 2024 – Jul 2025). Earlier
projects for a compact list: no-code website builder (graduation project, GrapesJS + TypeScript), furniture
e-commerce (Angular + Node, Stripe), its Vue admin dashboard, blog app (React + NestJS), oncology management
system (React + Node). Freelance on Fiverr since 2023.

Absent, never to be invented: client names, user counts, revenue or business-impact figures, testimonials
about the AIM work, screenshots of AIM Insights.

## Product Principles

1. Proof before claims: every case study leads with a result someone could check.
2. Say what Kamilia owned, end to end, in plain words.
3. Respect a 30-second skim: role, level, stack and one result visible without scrolling.
4. One source of truth: the site and the PDF CV never disagree.

## Accessibility & Inclusion

Proposed, not yet confirmed: WCAG 2.2 AA — readable contrast, keyboard navigation, reduced motion respected,
works at 320 px wide.

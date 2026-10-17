---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["cv.html"]
---

## Scope

Portfolio home (`index.html`) and its print edition (`cv.html`). Mode: Persuade. Audience: recruiters skimming
for 30 seconds, then hiring engineers reading one case study. Action: download the CV or email. Spec:
`docs/superpowers/specs/2026-10-17-portfolio-datasheet-design.md`.

## Direction contract

THESIS: The engineer documented as a component datasheet: numbered sections, measured characteristics, a pin
diagram of the stack Kamilia works across. It refuses the developer-portfolio default: hero greeting, skill
pills, screenshot cards.

OWN-WORLD: White datasheet paper, near-black ink, one datasheet blue for the header rule, "after" bars and
the active pin; hairline tables with grey header fills; Archivo condensed for headings, tabular figures for
every number; hierarchy from rule weight and type size only, no cards, shadows or rounded boxes.

STORY: The visitor learns in one screen that Kamilia ships features from the React screen to the Elasticsearch
query, sees four measured results, and can download the CV; a reader who selects a pin sees one technology
run through every case study.

FIRST VIEWPORT: One column, as on the canvas Kamilia approved on 2026-10-18 (not the two-column decision
sketch). Left index column of numbered sections (a sticky top bar on phones). Main column: the name in
large condensed type, the role line, the location, a muted stack line (the pin labels joined with " · "),
then Download CV, Email, LinkedIn and GitHub, the 6px accent rule, then 1 Features: four rows, each ending
in a checkable figure.

FORM: Component datasheet, position 1 on the ordered list (chosen as the pick card), seed:e9916a33c66ef4f1.
Signature interaction: selecting a pin highlights every diagram block and case study that uses it.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

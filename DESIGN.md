---
name: Kamilia's Portfolio (Datasheet)
description: An engineer documented as a component datasheet. White paper, near-black ink, one datasheet blue, hairline rules, Archivo condensed headings.
colors:
  paper: "#ffffff"
  ink: "#121417"
  muted: "#4a5160"
  accent: "#1d5fbf"
  fill: "#eef0f3"
typography:
  name:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 850
    lineHeight: 0.9
    letterSpacing: "normal"
  role:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.15
  h2:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 800
    lineHeight: 1.1
  h3:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo Variable', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  none: "0"
spacing:
  unit: "8px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  measure: "68ch"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 20px"
  button-secondary-hover:
    backgroundColor: "{colors.fill}"
  table-header:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    padding: "8px 12px"
  block:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  block-active:
    textColor: "{colors.accent}"
  bar-after:
    backgroundColor: "{colors.accent}"
    height: "14px"
  bar-before:
    backgroundColor: "{colors.ink}"
    height: "14px"
---

# Design System: Kamilia's Portfolio (Datasheet)

## Overview

**Creative North Star: "The Component Datasheet"**

The engineer is documented the way a part is: numbered sections, a pin diagram of the stack, measured characteristics, a revision history and ordering information. White paper, near-black ink, one datasheet blue. Hierarchy comes from rule weight and type size only. The page reads as a printed sheet that happens to scroll; it has no dark mode (`color-scheme: only light`) because a datasheet is paper.

Density is calm and information-first: one reading column (max 920px) beside a quiet numbered index, prose held to 68ch, every number in tabular figures so results can be checked by eye. The one interactive idea is the pin: selecting a technology in the pin diagram recolours every diagram block and case study that uses it, and dims the rest.

The CV is the same world on A4: the same tokens, a 6px blue rule under the header, 9.5pt body, one page.

**Key Characteristics:**
- Five colours in total; blue appears only where something is selected, measured or heads the page.
- Rule weight is the hierarchy: 1px hairline, 2px section, 6px header, 1.5px diagram frame, 3px chip.
- No cards, no shadows, no gradients, no rounded corners anywhere.
- One variable family (Archivo) with width as the second voice: condensed for headings, normal for prose.
- Motion is limited to 150ms colour changes and one 900ms bar-length transition.

## Colors

A paper-and-ink palette with a single blue and one grey fill.

### Primary
- **Datasheet Blue** (`#1d5fbf`): the 6px rule under the header, the "after" performance bars, the active pin and its case-study title, links on hover/press, the focus ring, the current section in the index. Nothing decorative.

### Neutral
- **Paper White** (`#ffffff`): page ground and the button face.
- **Ink Black** (`#121417`): all text, every rule, the "before" bars, the primary button, text selection background.
- **Pencil Grey** (`#4a5160`): secondary text, stage titles, dimmed (unselected) pins, blocks and studies.
- **Fill Grey** (`#eef0f3`): table header fill, the empty "after" track, button hover/press, the CV's screen backdrop.

### Named Rules
**The One Blue Rule.** Blue means "this one": selected, measured, or the header. It never fills a surface and never decorates.
**The Ink Rule.** Every rule line that carries structure is ink at a stated weight. Grey is for text and fills (the only grey rules are the CV's hairlines between list items, drawn in Fill Grey).

## Typography

**Display Font:** Archivo Variable (Arial, sans-serif), self-hosted via `@fontsource-variable/archivo/wdth.css`
**Body Font:** the same family, normal width
**Label/Mono Font:** none; figures are `tabular-nums` on the whole body

**Character:** One engineered grotesque in two widths. Condensed and heavy for names and headings, normal and plain for reading.

### Hierarchy
- **Name** (850, `clamp(3rem, 8vw, 6rem)`, 0.9, `font-stretch: 72%`): the page name only.
- **Role** (600, 1.75rem, 1.15, stretch 90%): the role line under the name.
- **H2** (800, 1.625rem, 1.1, stretch 90%): numbered section headings, set on a 2px ink rule.
- **H3** (800, 1.25rem, 1.2, stretch 90%): case-study titles.
- **Body** (400, 1.0625rem, 1.55): prose, held to 68ch.
- **Small** (400, 0.875rem): captions, table cells, stack line, index links.
- **Label** (700, 0.75rem, 0.06em, uppercase): diagram stage titles; the "part" sub-heads inside a case study use the same tracking at 0.875rem.
- **Chip text** (800, 1.75rem, stretch 75%, uppercase): the package block at the centre of the pin diagram.

### Named Rules
**The Figure Rule.** Every number is tabular. Results are bold, never wrap their value (`nowrap`), and each feature row ends in one checkable figure on its own line.
**The Width Rule.** Condensed width is for headings and the name only; prose stays at normal width.

## Layout

One column of content with a numbered index. From 1024px: a 220px sticky index column and a main column up to 920px, 64px apart, 48px page padding. Below that: a 56px sticky top bar of section links (horizontally scrollable) over a single column with 20px side padding. Sections are separated by 64px (8 units); below 640px section 1 starts 40px under the header rule and the header keeps 24px under its buttons, so the first Features row fits a 375 × 667 screen. Anchor targets clear the bar with `scroll-margin-top: 88px`.

Spacing is a single 8px unit, used in multiples (8, 12, 16, 24, 32, 64). Prose is capped at `68ch`. Tables collapse below 640px into stacked records with a muted label above each value; the pin diagram collapses from three columns (240px chip between two pin columns) to two columns of pins, four in each, with no chip or leads, below 640px. Block diagrams are container-queried: a row of up to 3 stages from 500px, up to 5 from 860px, otherwise a column with drawn connectors.

## Elevation & Depth

None. The page is flat paper: no shadows, no blur, no layered surfaces. Depth and emphasis are rule weight and an inset 3px outline (taking no space, so selecting never reflows). Grey fill marks table headers and empty tracks only.

### Named Rules
**The Flat Paper Rule.** If something needs to stand out, give it a heavier rule or a colour change, never a lift.

## Shapes

Square. Every corner is 0: buttons, blocks, chip, bars, tables. The form language is rules and frames: 1px hairlines between rows, 2px under section titles, 6px under the header, 1.5px ink frames on diagram blocks, a 3px frame on the chip, 2px on buttons. Connectors in the block diagram are drawn lines with turned-border arrowheads, not glyphs. Pin leads are 28px ink bars (3px high, 1px when dimmed).

## Components

### Buttons
- **Shape:** square, 44px minimum height, 20px side padding, 2px ink border, bold.
- **Primary (Download CV):** ink fill, paper text; hover/press underline, fill stays.
- **Secondary (Email, LinkedIn, GitHub):** paper face, ink border; hover/press fill goes to Fill Grey. Hover is gated to `(hover: hover) and (pointer: fine)`.

### Tables
Hairline datasheet tables: 1px ink rule under every row, Fill Grey header with 800 weight, 8px by 12px cells, tabular figures, small type. Links and periods do not wrap. Below 640px each row becomes a record with the header visually hidden and muted `data-label` captions.

### Pin diagram (signature)
A package chip (240 by 260px, 3px ink frame, condensed uppercase name) between two columns of pin buttons joined to it by 28px leads. Selected pin: blue, underlined 2px, blue lead. Others dim to grey with a hairline lead. A count in muted small type sits under each label and a hint line reads out the matching studies. On phones the chip and leads disappear and the pins sit in two columns of four, 16px apart.

### Block diagram
Staged pipeline of 1.5px ink-framed blocks (what in ink, technology in muted small). Stage titles are small uppercase labels. An active block takes a blue frame, a 3px inset blue outline and blue text; non-matching blocks dim to grey.

### Performance bars
Per result: label, then two 14px bars on a shared scale, before in ink and after in blue over a Fill Grey track, values right-aligned in a 4.5em column, the percentage change bold beside them. The after bar grows over 900ms ease-out when it enters view; with reduced motion it renders at final length. Each group carries a text equivalent.

### Section index and headings
Numbered section links: 600 small type, current section in blue and 800 weight (an invisible bold copy holds the width so nothing shifts); a 2px blue underline on the phone bar, none in the desktop column. Section headings sit on a 2px ink rule.

### Rows (features, ordering information, case studies)
Hairline-ruled rows with no boxes; feature titles in 800 weight; ordering info is a term/value grid (8rem term column). Case studies are separated by a 1px ink rule and take blue titles when their pin is active.

### CV (print edition)
The same tokens at print scale: A4, 12mm margins, 9.5pt/1.35 body, 28pt condensed uppercase name (stretch 75%), 12pt condensed uppercase section titles on a 2px ink rule, 6px blue header rule, two-column skills and pairs, list items separated by Fill Grey hairlines. Screen shows the sheet on a Fill Grey backdrop; on phones it reflows to one column; print drops the backdrop and padding.

## Do's and Don'ts

### Do:
- **Do** build hierarchy from rule weight and type size: 1px, 2px, 6px rules; the type ramp above.
- **Do** keep blue to selection, measured results and the header rule.
- **Do** set every number in tabular figures and end each result claim in a checkable figure.
- **Do** keep every corner square and every surface flat.
- **Do** keep a visible 3px blue focus ring with 2px offset, and 44px minimum hit height on buttons.
- **Do** gate hover styles to `(hover: hover) and (pointer: fine)` and honour `prefers-reduced-motion`.

### Don't:
- **Don't** add cards, shadows, gradients, rounded boxes, pills or icon decoration.
- **Don't** add a dark mode or a second accent; the sheet is paper.
- **Don't** use condensed width for prose.
- **Don't** let selection reflow layout; use inset outlines and fixed widths.
- **Don't** open with a greeting hero or a skill-pill cloud.

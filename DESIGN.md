---
name: Kamilia's Portfolio (Datasheet)
description: An engineer documented as a component datasheet. White paper, near-black ink, a datasheet-blue header band, five layer colours for the stack, hairline rules, Archivo condensed headings.
colors:
  paper: "#ffffff"
  ink: "#121417"
  muted: "#4a5160"
  accent: "#1d5fbf"
  fill: "#eef0f3"
  on-accent-muted: "#dce6f7"
  accent-deep: "#174c99"
  layer-frontend: "#0e7490"
  layer-backend: "#15803d"
  layer-data: "#a16207"
  layer-ai: "#be185d"
  layer-testing: "#6d28d9"
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
    backgroundColor: "{colors.paper}"
    textColor: "{colors.accent}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 20px"
  button-secondary-hover:
    backgroundColor: "{colors.accent-deep}"
  header-band:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "32px"
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
  block-layer-rule:
    height: "4px"
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

The engineer is documented the way a part is: numbered sections, a pin diagram of the stack, measured characteristics, a revision history and ordering information. White paper, near-black ink, a datasheet-blue band heading the sheet, and five layer colours that say where each technology sits in the chain (frontend, backend, data, AI, testing). Hierarchy comes from rule weight and type size. The page reads as a printed sheet that happens to scroll; it has no dark mode (`color-scheme: only light`) because a datasheet is paper.

Density is calm and information-first: one reading column (max 920px) beside a quiet numbered index, prose held to 68ch, every number in tabular figures so results can be checked by eye. The one interactive idea is the pin: selecting a technology in the pin diagram frames every diagram block that uses it, titles every case study that uses it in its layer colour, and dims the rest.

The CV is the print edition and stays monochrome: the same tokens, a 6px blue rule under the header instead of the band, 9.5pt body, one page.

**Key Characteristics:**
- Blue heads the page as a solid band and marks what is measured or current; the layer colours mark technologies, always beside their names.
- Rule weight is the hierarchy: 1px hairline, 2px section, 1.5px diagram frame, 4px layer rule on a block, 3px chip.
- No cards, no shadows, no gradients, no rounded corners anywhere.
- One variable family (Archivo) with width as the second voice: condensed for headings, normal for prose.
- Motion is limited to 150ms colour changes and one 900ms bar-length transition.

## Colors

A paper-and-ink palette with one blue, one grey fill, and a five-colour key for the layers of the stack.

### Primary
- **Datasheet Blue** (`#1d5fbf`): the header band (the only coloured surface), the "after" performance bars, links on hover/press, the focus ring, the current section in the index, the CV's 6px header rule.
- **Band Tint** (`#dce6f7`, 4.85:1 on the blue): the location and stack lines inside the band.
- **Deep Blue** (`#174c99`): the pressed or hovered face of an outlined button inside the band.

### Layers
Each is at least 4.5:1 on paper and always sits beside the technology's name, so colour is never the only cue.
- **Frontend Teal** (`#0e7490`): React, TypeScript.
- **Backend Green** (`#15803d`): Node.js, NestJS.
- **Data Amber** (`#a16207`): Elasticsearch, MongoDB.
- **AI Magenta** (`#be185d`): LLMs.
- **Testing Violet** (`#6d28d9`): Jest / Playwright.

### Neutral
- **Paper White** (`#ffffff`): page ground, the band's text and its primary button face.
- **Ink Black** (`#121417`): all text, every rule, the "before" bars, the selected block's double frame, text selection background.
- **Pencil Grey** (`#4a5160`): secondary text, stage titles, dimmed (unselected) pins, blocks and studies.
- **Fill Grey** (`#eef0f3`): table header fill, the empty "after" track, the CV's screen backdrop.

### Named Rules
**The Band Rule.** Blue fills one surface, the header band. Everywhere else it means "this one": measured, current or focused.
**The Layer Rule.** A layer colour says where a technology sits in the chain: the pin label and lead, a block's 4px top rule and technology line, a stack item, the legend. It never fills a surface and never appears without the technology's name. A block takes the layer of its first pin.
**Colour Is Layer, Selection Is Weight.** Selecting a pin never recolours anything into a new meaning: the pin is underlined, matching blocks get a double ink frame, matching study titles take the pin's layer colour, and everything else dims to Pencil Grey.
**The Ink Rule.** Every rule line that carries structure is ink at a stated weight; the only coloured rules are the layer rules on blocks. Grey is for text and fills (the only grey rules are the CV's hairlines between list items, drawn in Fill Grey).

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

One column of content with a numbered index. From 1024px: a 220px sticky index column and a main column up to 920px, 64px apart, 48px page padding. Below that: a 56px sticky top bar of section links (horizontally scrollable) over a single column with 20px side padding. Sections are separated by 64px (8 units); below 1024px the header band runs to the screen edges under the bar (24px by 20px padding, text on the content column); below 640px section 1 starts 40px under the band, so the first Features row fits a 375 × 667 screen. Anchor targets clear the bar with `scroll-margin-top: 88px`.

Spacing is a single 8px unit, used in multiples (8, 12, 16, 24, 32, 64). Prose is capped at `68ch`. Tables collapse below 640px into stacked records with a muted label above each value; the pin diagram collapses from three columns (240px chip between two pin columns) to two columns of pins, four in each, with no chip or leads, below 640px. Block diagrams are container-queried: a row of up to 3 stages from 500px, up to 5 from 860px, otherwise a column with drawn connectors.

## Elevation & Depth

None. The page is flat paper: no shadows, no blur, no layered surfaces. Depth and emphasis are rule weight and an inset second frame (a 1.5px inset ink stroke inside the block's border, taking no space, so selecting never reflows). Grey fill marks table headers and empty tracks only.

### Named Rules
**The Flat Paper Rule.** If something needs to stand out, give it a heavier rule or a colour change, never a lift.

## Shapes

Square. Every corner is 0: buttons, blocks, chip, bars, tables. The form language is rules and frames: 1px hairlines between rows, 2px under section titles, 1.5px ink frames on diagram blocks with a 4px layer rule on top, a 3px frame on the chip, 2px on buttons. Connectors in the block diagram are drawn lines with turned-border arrowheads, not glyphs. Pin leads are 28px bars in the pin's layer colour (3px high, 1px grey when dimmed).

## Components

### Header band
A solid Datasheet Blue block heads the main column: the name, role, location and stack line, then the four buttons, 32px padding, no rule under it. Name and role in paper, location and stack in Band Tint. The focus ring turns paper inside the band, since blue on blue would vanish. Below 1024px the band bleeds to the screen edges.

### Buttons
- **Shape:** square, 44px minimum height, 20px side padding, 2px paper border, bold.
- **Primary (Download CV):** paper fill, blue text; hover/press underline, fill stays.
- **Secondary (Email, LinkedIn, GitHub):** outlined on the band, paper text; hover/press fill goes to Deep Blue. Hover is gated to `(hover: hover) and (pointer: fine)`.

### Tables
Hairline datasheet tables: 1px ink rule under every row, Fill Grey header with 800 weight, 8px by 12px cells, tabular figures, small type. Links and periods do not wrap. Below 640px each row becomes a record with the header visually hidden and muted `data-label` captions.

### Pin diagram (signature)
A package chip (240 by 260px, 3px ink frame, condensed uppercase name) between two columns of pin buttons joined to it by 28px leads. Each pin label and lead is in its layer colour. Selected pin: underlined 2px. Others dim to grey with a hairline lead. A count in muted small type sits under each label; a legend of the five layers (12px square swatch, label in the layer colour) sits under the chip, then a hint line reads out the matching studies. On phones the chip and leads disappear and the pins sit in two columns of four, 16px apart.

### Block diagram
Staged pipeline of 1.5px ink-framed blocks with a 4px top rule in the block's layer colour (what in ink, technology in the layer colour, 600). A block with no pins (a result) has no layer rule. Stage titles are small uppercase labels. An active block takes a second 1.5px inset ink frame under its layer rule; non-matching blocks dim to grey, layer rule included.

### Performance bars
Per result: label, then two 14px bars on a shared scale, before in ink and after in blue over a Fill Grey track, values right-aligned in a 4.5em column, the percentage change bold beside them. The after bar grows over 900ms ease-out when it enters view; with reduced motion it renders at final length. Each group carries a text equivalent.

### Section index and headings
Numbered section links: 600 small type, current section in blue and 800 weight (an invisible bold copy holds the width so nothing shifts); a 2px blue underline on the phone bar, none in the desktop column. Section headings sit on a 2px ink rule.

### Rows (features, ordering information, case studies)
Hairline-ruled rows with no boxes; feature titles in 800 weight; ordering info is a term/value grid (8rem term column). Case studies are separated by a 1px ink rule; their Stack line names each technology in its layer colour (600), and when a pin is selected the studies that use it take its layer colour in the title and underline it in the Stack line.

### CV (print edition)
The same tokens at print scale: A4, 12mm margins, 9.5pt/1.35 body, 28pt condensed uppercase name (stretch 75%), 12pt condensed uppercase section titles on a 2px ink rule, 6px blue header rule, two-column skills and pairs, list items separated by Fill Grey hairlines. Screen shows the sheet on a Fill Grey backdrop; on phones it reflows to one column; print drops the backdrop and padding.

## Do's and Don'ts

### Do:
- **Do** build hierarchy from rule weight and type size: 1px, 2px, 4px rules; the type ramp above.
- **Do** keep blue to the header band, measured results, the current section and focus.
- **Do** keep a layer colour next to its technology's name, and pick a block's layer from its first pin.
- **Do** set every number in tabular figures and end each result claim in a checkable figure.
- **Do** keep every corner square and every surface flat.
- **Do** keep a visible 3px blue focus ring with 2px offset, and 44px minimum hit height on buttons.
- **Do** gate hover styles to `(hover: hover) and (pointer: fine)` and honour `prefers-reduced-motion`.

### Don't:
- **Don't** add cards, shadows, gradients, rounded boxes, pills or icon decoration.
- **Don't** add a dark mode, or use a layer colour as a surface or for anything but a technology; the sheet is paper.
- **Don't** use condensed width for prose.
- **Don't** let selection reflow layout; use inset frames and fixed widths.
- **Don't** open with a greeting hero or a skill-pill cloud.

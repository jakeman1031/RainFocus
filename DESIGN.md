# Design reference

Companion to the Figma file. Use this while building the components to map back to specific Figma nodes, look up tokens, and check the responsive plan.

> Figma file: <https://www.figma.com/design/5EXKaY2yZsH7olYYb97Z7R/RainFocus-UI-Challenge---Steps-2.0--1->
> Top-level frame: `310:89` — "⭐️ RainFocus UI Challenge- Updated" (1447 × 1024).

---

## Figma node map

| Region | Node | Notes |
|---|---|---|
| Sidebar (Nav Level 2) | `310:92` | 278×1024 |
| Outer rail (rf logo + org + user) | `310:394` | 63px wide |
| Inner column (header + search + mega nav) | `310:99` | 215px wide |
| Event title "RainFocus Summit" | `310:101` | 14px Inter Semi Bold |
| Details ("Lehi, UT · December 15th") | `310:102` | 12px |
| Search input | `310:106` | 36px tall, placeholder "Search" |
| Mega Nav | `310:109` | Guide / Attendees (active) / Content / Exhibitors |
| Attendees sub-items | `310:118` | Attendees / Attendee types / Packages / Reg codes / Discounts |
| User avatar (FL) | `310:399` | 48×40 bottom of rail |
| Body | `310:296` | 1169×1024 |
| Header | `310:297` | logo + title + Edit event button |
| Header logo | `310:298` | 95×95 mountain summit |
| Title | `310:300` | H1 32px Light |
| Date | `310:302` | "December 15th" |
| Location | `310:303` | "Lehi, Utah" |
| Edit event button | `310:304` | Buttons/Admin, 101×33, primary purple |
| Event setup guide section | `310:305` | H2 + description |
| Attendee accordion | `310:308` | Person icon + steps |
| Person Portal icon | `310:312` | 35×35 |
| Step 1 — Base settings | `310:315` | 3 description items inside one bordered container |
| Step 2 — Build registration workflows | `310:323` | 3 cards row 1 + 1 card row 2 |
| Step 3 — Design post-registration experiences | `310:337` | 1 portal card |

---

## Design tokens (Figma → SCSS)

All tokens live in `styles/_variables.scss`, exposed both as SCSS variables (e.g. `$rf-brand-primary`) and as CSS custom properties on `:root` (e.g. `var(--rf-brand-primary)`).

### Colors

| Token | Hex | Used for |
|---|---|---|
| `$rf-brand-primary` | `#5C00DC` | Primary purple — Edit event button, active "Attendees" nav, links |
| `$rf-brand-pink` | `#ED1A5D` | rf logo |
| `$rf-brand-berry` | `#E71356` | Attendee person icon |
| `$rf-brand-grape-3` | `#AB99FF` | Attendee portal accent (light purple shadow) |
| `$rf-color-surface` | `#FFFFFF` | Card / sidebar background |
| `$rf-color-border` | `#CBC6DE` | Card borders, dividers |
| `$rf-color-text-header` | `#222222` | H1/H2/H3, bold labels |
| `$rf-color-text-body` | `#393551` | Body paragraphs |
| `$rf-color-text-g3` | `#444444` | Mid-emphasis text |
| `$rf-color-text-g4` | `#767676` | Low-emphasis text (Lehi, UT • date) |
| `$rf-button-on-primary` | `#FFFFFF` | Text on primary purple button |

### Typography

| Token | Value | Where in Figma |
|---|---|---|
| `$rf-fs-h1` / `Light 300` | 32px | "RainFocus Summit" page title |
| `$rf-fs-h2` / `SemiBold 600` | 24px | "Event setup guide", "Attendee" |
| `$rf-fs-h3` / `SemiBold 600` | 20px | Sub headers (unused on this page but in design system) |
| `$rf-fs-body-workflow` / 400 | 16px / lh 24 | Description paragraph under H2 |
| `$rf-fs-body-admin` / 400 | 14px | Card titles, nav labels |
| `$rf-fs-desc` / 400 | 12px | Card descriptions, sub-item nav text |
| `$rf-fs-h5` / Open Sans Bold | 13px | Card title H5 |

Font family: `Inter` (loaded via `next/font/google` in `app/layout.jsx`). Open Sans is referenced in the Figma "H5" token; Inter Bold is a close substitute and is what the loader brings in.

### Layout dimensions

| Token | Value | Notes |
|---|---|---|
| `$nav-rail-width` | 63px | Outer rail |
| `$nav-inner-width` | 215px | Inner sidebar |
| `$nav-total-width` | 278px | Combined |
| `$body-content-pad` | 48px | Body inner padding (Figma `310:297` has x=48) |

### Breakpoints

| Mixin | Min-width |
|---|---|
| `sm` | 480px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Mobile-first — base CSS targets 320–479px, then layer up with `@include md { ... }` etc.

---

## Assets inventory (`/public`)

All assets were exported via the Figma MCP `get_design_context` tool and downloaded into `public/`. URLs from Figma are short-lived (~7 days), so the local copies are the source of truth.

### `public/icons/` (SVG)

| File | From Figma node | Description |
|---|---|---|
| `rf-logo.svg` | `1:109` (inside `310:396`) | Pink rf logo — top-left of rail. Color: `#ED1A5D`. |
| `search.svg` | inside `310:107` | Magnifying glass for the search input. Color: neutral. |
| `attendee-person-1.svg` | `1:227` | Person Portal — layer 1 (back, berry red person body) |
| `attendee-person-2.svg` | `1:228` | Person Portal — layer 2 (purple computer screen) |
| `attendee-person-3.svg` | `1:229` | Person Portal — layer 3 (front element) |
| `workflow-arrow.svg` | inside `310:330` | "Logic arrow" ↳ for Step 2 workflow cards |
| `add-circle-outline.svg` | inside `310:334` | Plus icon for the "Add Registration Workflow" card |
| `portal-monitor.svg` | inside `310:341` | Computer monitor for Step 3 "Attendee Portal" |

### `public/images/` (PNG)

| File | Source | Notes |
|---|---|---|
| `summit-logo.png` | `310:298` | 1820×1214 — original mountain art. The Figma node shows it positioned with negative offsets and 208% width inside a 95×95 rounded container, which means the image is centered and crops to a square. Use `object-fit: cover` + `object-position: center` on a 95×95 wrapper. |
| `summit-logo-small.png` | `310:397` | 178×178 — pre-cropped/square version of the same art, sized for the 32×32 org button on the nav rail. |

### Asset composition notes

- **Person Portal icon (`310:312`)**: Three vectors stacked with absolute positioning. The Figma code uses:
  - `attendee-person-1.svg` at `inset[-0.33% 23.87% 22.86% -0.01%]` (back person silhouette, berry color)
  - `attendee-person-2.svg` at `inset[37.89% 0 0 37.89%]` (purple screen behind)
  - `attendee-person-3.svg` at `inset[40.97% 23.85% 22.86% 37.88%]` (purple foreground element)

  Easiest path: build a `<PersonPortalIcon>` component that absolutely positions the three layered `<img>` elements inside a 35×35 wrapper, using the insets above. Apply colors via CSS `filter` if needed, but the SVGs already carry their fills.

- **Nav-item circle icons (Guide / Attendees / Content / Exhibitors)**: NOT real icon assets — in Figma they're plain 24×24 circles (`bg-[#767676]` or `bg-[#5c00dc]` for the active Attendees). Just render a `<span>` with `border-radius: 50%` and the appropriate color; don't try to find SVGs for these.

---

## Component breakdown

### `<Sidebar>` — 278px wide
- Two-column flex row.
- Outer rail (63px): rf-logo top-left, summit-logo-small below, FL avatar pinned to bottom.
- Inner column (215px): event title H5, location dot date sub-line, search input (gray bg, magnifier + "Search" placeholder), mega-nav.

### `<MegaNav>`
- Four 40px-tall items. Each: 24×24 circle icon, gap 12, label 14px Semi Bold.
- "Attendees" is the active item — background `rgba(92,0,220,0.08)`, label color `#5C00DC`, circle solid `#5C00DC`.
- Attendees has 5 sub-items (Attendees / Attendee types / Packages / Reg codes / Discounts), each 30px tall, indented to align with the parent label (left padding ~48px), color `#767676`.

### `<Header>`
- Horizontal flex row, 95px tall.
- 95×95 rounded mountain logo (use `summit-logo.png` with `object-fit: cover`).
- Stack: H1 32px Light "RainFocus Summit" / "December 15th" / "Lehi, Utah".
- Right-pinned `<Button variant="primary">Edit event</Button>` (101×33).

### `<SetupIntro>`
- H2 "Event setup guide" 24px Semi Bold.
- Description "See the available list of modules below. We suggest that you start with the attendee module." 16px Regular / lh 24.
- Bottom-bordered divider below.

### `<AttendeeAccordion>`
- 24px gap between header row and steps.
- Header row: 35×35 Person Portal icon + H3 "Attendee" 20px Semi Bold (in design it reads slightly larger — verify against pixel measurements).
- 3 step blocks (`<StepRow>`s).

### `<StepRow>`
- Props: `number`, `title`, `children`.
- Renders `<p><b>Step {number}:</b> {title}</p>` on top.
- Children area is a CSS grid `repeat(3, 1fr)` with 24px gap.
- Step 1 puts a single bordered/rounded container around the row; Steps 2/3 do NOT — there each card has its own border. Pass a `bordered` prop or just style Step 1's row differently.

### `<DescriptionCard>` (Step 1)
- Props: `title`, `description`. 14px Bold title, 12px regular desc. No border (parent has it).

### `<WorkflowCard>` (Step 2)
- Props: `title`, `description`, `iconSrc` (defaults to `workflow-arrow.svg`).
- 1px border `#CBC6DE`, 4px radius, `padding: 24px 32px`.
- Header: `flex gap-8 items-center` — icon then bold 13px title.
- Description below at 12px regular, color body, max-width ~267px.

### `<AddWorkflowCard>` (Step 2 row 2 first card)
- Same border treatment as WorkflowCard.
- Content centered: 24×24 add-circle-outline icon above 12px label "Add Registration Workflow".
- Renders as a `<button type="button">` for keyboard activation.

### `<PortalCard>` (Step 3)
- Same visual treatment as WorkflowCard, but with the monitor icon and "Attendee Portal" title.
- Description: "Manage the portal that attendees will see after they've register for your event."

### `<Button variant="primary">`
- Solid `#5C00DC` background, white text.
- `padding: 6px 16px`, `border-radius: 4px`, 14px Semi Bold.
- `:hover` slightly lightens; `:focus-visible` 2px outline at brand primary, 2px offset.

---

## Responsive plan

The brief: **full-width on a normal desktop, responsive down to 320px**. Suggested behavior:

| Width | Sidebar | Body cards |
|---|---|---|
| ≥ `lg` (1024) | Fixed 278px on the left | Step 1 grid 3-col, Step 2 grid 3-col, Step 3 single card |
| `md`–`lg` (768–1023) | Collapse to 63px rail only (no inner panel), or hide entirely behind a hamburger button | Step 1: 3-col, Step 2: 2-col flow |
| `sm`–`md` (480–767) | Hamburger that toggles a slide-in nav | All step grids collapse to single column |
| `< sm` (320–479) | Hamburger, slide-in nav fills viewport when open | Single column; reduce horizontal body padding to 16px |



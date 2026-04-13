# KRANE-001: Prototype — User Stories

> **For AI Implementation**: Run these stories ONE AT A TIME. Each story is self-contained and builds on the previous.
>
> **Implementation note (2026-04-11):** Stories 1-3 were adapted onto the existing repo-root Vite app instead of creating a second canonical app inside `prototype/`. The `prototype/` directory remains the planning/data workspace.
>
> **Direction note (2026-04-12):** ~~Stories 7-9 rewritten to reflect the v2 product direction (A+C hybrid: intelligent log + lightweight sub tracking). See [`planning.md`](../planning.md) Decision v2 for full rationale.~~ (SUPERSEDED)
>
> **Direction note (2026-04-13):** Stories 5-9 rewritten to reflect the final product direction in [`draft-one-pager.md`](../draft-one-pager.md). See [`docs/planning.md`](../docs/planning.md) Decision v3 for the audit trail of what changed from v2 and why.

---

## Quick Links

| Document | Purpose |
|----------|---------|
| [`assignment.md`](../assignment.md) | The take-home prompt and scenario |
| [`planning.md`](../planning.md) | Product decision, scope, and rationale |
| [`data/sample-procurement-log.md`](../data/sample-procurement-log.md) | The 20-item dataset extracted from the real spec |
| [`data/EXTRACTION-GUIDE.md`](../data/EXTRACTION-GUIDE.md) | How to extract the procurement log from the spec PDF |
| [`data/specs/griffin-hospital-generator-upgrades.pdf`](../data/specs/griffin-hospital-generator-upgrades.pdf) | The real spec document (476 pages) |
| [`data/lead-times.md`](../data/lead-times.md) | Public lead time data by CSI division |
| [`docs/DESIGN-SYSTEM-PORT.md`](../docs/DESIGN-SYSTEM-PORT.md) | Design system porting manifest (deps, configs, component list) |
| **This document** | All user stories with acceptance criteria |

---

## Implementation Order Summary

### Setup (Stories 1-3) — COMPLETE
1. **Story 1: React + Vite Shell** — Scaffold the project
2. **Story 2: Design System Setup** — Wire up driverly components and theming
3. **Story 3: Supabase Setup** — Initialize Supabase project and client

### Data (Story 4) — COMPLETE
4. **Story 4: Static Data Module** — 20-item dataset as importable JS

### Core Views (Stories 5-6)
5. **Story 5: Current Log View (Before)** — Flat table, 3 columns, export button
6. **Story 6: Enriched Log View** — Lead times, substitution restrictions, owner approval requirements

### Enhanced UX + Workflow (Stories 7-8)
7. **Story 7: Filtering & Grouping** — Filter/group by any extracted data to isolate a trade's scope
8. **Story 8: Sub Association** — Record which sub was sent which scope items; see spec changes on sent items

---

## Story 1: React + Vite Shell

**As a** developer
**I want** a React + Vite + JS project scaffolded
**So that** I have a working dev server to build on

### Acceptance Criteria

- [x] Existing React + Vite app at repo root adopted as the canonical prototype shell (adapted from the original `prototype/` path expectation)
- [x] `npm run dev` starts the dev server
- [x] Basic folder structure in place: `src/`, `src/components/`, `src/data/`, `src/lib/`
- [x] Path alias `@` → `src` configured in `vite.config.ts`
- [x] Vercel deployment config present (`vercel.json`)

### Notes

- Check if driverly already has a Vite + React setup we can copy from (see Getting Started Option A)
- JS, not TypeScript (unless the design system requires TS)

### Completion Log

- 2026-04-11: Found a pre-existing root Vite scaffold already running and reused it instead of scaffolding a second app under `prototype/`.
- 2026-04-11: Added alias support, Vercel config, and the missing `src/components`, `src/data`, and `src/lib` structure.
- 2026-04-11: Verified the adapted shell builds successfully with `npm run build`.

### Touched

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `vercel.json`
- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`
- `src/data/.gitkeep`
- `src/lib/utils.ts`

### Commit

```
git commit -m "chore: scaffold React + Vite project"
```

---

## Story 2: Design System Setup

**As a** developer
**I want** the driverly design system wired up
**So that** I can import components like `Table`, `Badge`, `Tabs`, `Button`, and `Collapsible`

### Acceptance Criteria

- [x] Driverly design system primitives were adapted into `src/components/ui/` from `C:\Users\Corey\driverly-main\src\components\ui\` (focused slice needed for this prototype stage)
- [x] Tailwind CSS configured with design system-style tokens and gradients adapted from `driverly-main/src/index.css`
- [x] `tailwind.config.ts` includes `tailwindcss-animate` and `@tailwindcss/typography`
- [x] `cn()` utility available from `@/lib/utils` (uses `clsx` + `tailwind-merge`)
- [x] Dependencies installed: `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, relevant `@radix-ui/*` packages
- [x] Smoke test: render a `<Button>` component on the page to confirm imports work
- [x] Design system styles (dark/light tokens, gradients, glass effects) are applied

### Key Components We'll Need

| Component | Import Path | Used For |
|-----------|-------------|----------|
| `Table` + subcomponents | `@/components/ui/table` | Procurement log rows |
| `Badge` | `@/components/ui/badge` | Division labels, sub indicator |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `@/components/ui/tabs` | View switcher (Current Log / Enriched Log) |
| `Button` | `@/components/ui/button` | Actions (Export, Send to Bid) |
| `Chip` | `@/components/ui/chip` | Active filters |
| `Collapsible` + subcomponents | `@/components/ui/collapsible` | Grouped sections (by division, by lead time) |
| `PageHeader` | `@/components/ui/page-header` | Project title |
| `Tooltip` | `@/components/ui/tooltip` | Detail on hover |
| `Separator` | `@/components/ui/separator` | Section dividers |

### Notes

- Reference `driverly-main/docs/GETTING-STARTED.md` Option A for the copy pattern
- The design system is NOT an npm package — it's in-repo source
- The barrel export is at `src/components/ui/index.ts` but not all components are re-exported — some need direct file imports

### Completion Log

- 2026-04-11: Installed Tailwind, Driverly-style UI dependencies, and Supabase browser client dependency.
- 2026-04-11: Added a focused set of prototype primitives: `Button`, `Badge`, `Chip`, `Table`, `Tabs`, `Collapsible`, `PageHeader`, `Tooltip`, and `Separator`.
- 2026-04-11: Replaced the placeholder screen with a design-system smoke test page and verified it compiles in production.

### Touched

- `package.json`
- `package-lock.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `src/index.css`
- `src/App.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/chip.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/collapsible.tsx`
- `src/components/ui/page-header.tsx`
- `src/components/ui/tooltip.tsx`
- `src/components/ui/separator.tsx`
- `src/lib/utils.ts`

### Commit

```
git commit -m "chore: wire up driverly design system"
```

---

## Story 3: Supabase Setup

**As a** developer
**I want** Supabase initialized
**So that** I have backend infrastructure available if needed for deployment or future features

### Acceptance Criteria

- [x] Supabase CLI installed as dev dependency
- [x] Supabase project linked via `npx supabase link --project-ref <ref>`
- [x] `supabase/` folder initialized with `config.toml`
- [x] `.env.local` created with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [x] Supabase client configured in `src/integrations/supabase/client.ts`
- [x] `.gitignore` excludes `.env.local` and `.env`
- [x] Client initializes without throwing when dev server runs

### Notes

- Originally set up for Edge Functions (v1 direction used a live LLM call for agent recommendations). The final direction (v3) cuts all LLM features, so Supabase isn't required for core prototype functionality. Setup is retained — no cost to keeping it, and it's available if needed for deployment or future extensions.

### Completion Log

- 2026-04-11: Installed the Supabase CLI as a project dev dependency and ran `npx supabase init`.
- 2026-04-11: Added `.env.local`, `.env.local.example`, `.gitignore` protections, and a frontend client scaffold at `src/integrations/supabase/client.ts`.
- 2026-04-11: Linked the local project to Supabase project ref `lxfahmmyftceduxiexra`.
- 2026-04-11: Added the real Supabase project URL and anon key to `.env.local`, completing the local client setup.

### Touched

- `package.json`
- `package-lock.json`
- `.gitignore`
- `.env.local`
- `.env.local.example`
- `supabase/config.toml`
- `src/integrations/supabase/client.ts`

### Commit

```
git commit -m "chore: initialize Supabase client and project link"
```

---

## Story 4: Static Data Module (Real Spec Extraction)

**As a** developer
**I want** the procurement log extracted from the real Griffin Hospital spec as an importable JS module
**So that** all views use data grounded in a real construction specification

### Acceptance Criteria

- [x] Read the actual spec PDF at [`data/specs/griffin-hospital-generator-upgrades.pdf`](../data/specs/griffin-hospital-generator-upgrades.pdf) following [`data/EXTRACTION-GUIDE.md`](../data/EXTRACTION-GUIDE.md)
- [x] File at `src/data/procurement-log.js` exporting:
  - `PROJECT` object with project name, location, phase, spec date, and spec filename
  - `PROCUREMENT_LOG` array of ~20 items
- [x] Each item has "before" fields: `specSection`, `description`, `basisOfDesign`
- [x] Each item has "after" fields: `leadTimeWeeks` (string range), `riskTier` (enum: CRITICAL, LONG_LEAD, MODERATE, STANDARD, COMMODITY), `flags` (array of strings), `urgencyRank` (number), `actionTimeframe` (enum: ACT_NOW, ACT_THIS_MONTH, SCHEDULE_LATER)
  - **v3 scope note:** The `riskTier`, `urgencyRank`, `actionTimeframe`, and `flags` fields exist in the extracted data but are NOT surfaced as UI features. The final direction (one-pager) surfaces three specific data points: lead times, substitution restrictions, and owner approval requirements. These fields remain in the data module as-is since the story is complete, but Stories 6-8 do not use them.
- [x] Every item traceable to an actual section in the spec PDF — no fabricated items
- [x] Flags extracted from actual spec language (e.g., "Procured by Griffin Healthcare" → "Owner-furnished equipment")
- [x] Lead times mapped from [`data/lead-times.md`](../data/lead-times.md) by division + item type
- [x] Validate against the checklist in EXTRACTION-GUIDE.md Step 4
- [x] A second dataset at `src/data/procurement-log-revised.js` representing a spec revision with 3-4 changes (see EXTRACTION-GUIDE.md Step 7)
- [x] Both datasets importable and rendering without errors

### Data Sources

- **Spec PDF**: [`data/specs/griffin-hospital-generator-upgrades.pdf`](../data/specs/griffin-hospital-generator-upgrades.pdf)
- **Extraction methodology**: [`data/EXTRACTION-GUIDE.md`](../data/EXTRACTION-GUIDE.md)
- **Lead times**: [`data/lead-times.md`](../data/lead-times.md)
- **Reference preview**: [`data/sample-procurement-log.md`](../data/sample-procurement-log.md)

### Completion Log

- 2026-04-11: Confirmed the procurement log extraction work already existed in `prototype/src/data/procurement-log.js` and `prototype/src/data/procurement-log-revised.js`.
- 2026-04-11: Added root-app entry modules at `src/data/procurement-log.js` and `src/data/procurement-log-revised.js` so the canonical prototype shell can import the real datasets directly.
- 2026-04-11: Updated `src/App.tsx` to render summary stats and top-priority rows from the extracted log, plus revised-dataset metadata, proving both datasets load without runtime or build errors.

### Touched

- `tsconfig.app.json`
- `src/data/procurement-log.js`
- `src/data/procurement-log-revised.js`
- `src/App.tsx`

### Commit

```
git commit -m "feat: add procurement log extracted from Griffin Hospital spec"
```

---

## Story 5: Current Log View (Before)

**As a** PE viewing the prototype
**I want** to see the current flat procurement log
**So that** I understand the pain point — a flat list sorted by spec section with no workflow

### Acceptance Criteria

- [x] Tab labeled "Current Log" is the first tab in the view switcher
- [x] Table renders all 40 items in the current dataset with 3 columns: Spec Section, Description, Basis of Design
- [x] Sorted by spec section number (Division 03 at top, Division 26 at bottom)
- [x] The 1250kW generator (52-78 week lead time) is buried near the bottom at its natural spec section position (263213)
- [x] No visual hierarchy — every row looks the same
- [x] "Export to CSV" button visually prominent (non-functional or downloads a dummy file)
- [x] Project header at top: "Griffin Hospital — Emergency Generator & Distribution Upgrades"
- [x] "View Source Spec" button opens the spec PDF in a new tab
- [x] Subtle annotation or callout: "This is what 72% of users export to a spreadsheet"

### Components Used

- `PageHeader` for project title
- `Tabs` for view switcher
- `Table` + subcomponents for the log
- `Button` for Export to CSV

### Commit

```
git commit -m "feat: build current log (before) view"
```

---

## Story 6: Enriched Log View

**As a** PE viewing the prototype
**I want** to see the procurement log enriched with lead times, substitution restrictions, and owner approval requirements
**So that** I have what I need to make scheduling decisions without manually classifying every item

> **Implementation note (2026-04-13):** Story 6 was implemented as an in-place extension of the main procurement log table rather than separate tabbed content. The enriched log is the same working surface with additional columns and a different default sort.

### Acceptance Criteria

- [x] Enriched fields extend the main procurement log table instead of rendering as separate tabbed content
- [x] Each item shows new enriched columns alongside the original 3: Lead Time (est.), Substitution Restrictions, Owner Approval, Division
- [x] **Lead Time** column shows the estimated lead time range as extracted from public data (e.g., "52-78 weeks", "8-12 weeks")
- [x] **Substitution Restrictions** column indicates whether the spec restricts substitutions for this item (e.g., sole-source, named products only, or no restriction)
- [x] **Owner Approval** column indicates whether the item requires owner approval before it can go to bid
- [x] **Division** derived from spec section number (e.g., 263213 → Division 26 — Electrical) and displayed as a readable label
- [x] The 1250kW generator (52-78 week lead time) is visually prominent due to its long lead time, no longer buried by spec section sort order
- [x] Default sort by lead time (longest first) so items that take the longest to procure surface to the top

### Components Used

- `Table` for the enriched log
- `Badge` for division labels

### Commit

```
git commit -m "feat: build enriched log view with lead times, substitution restrictions, owner approval"
```

---

## Story 7: Filtering & Grouping

**As a** PE working with an enriched log
**I want** to filter and regroup items by any extracted data
**So that** I can isolate a trade's scope before sending it to a sub to bid on

### Acceptance Criteria

#### Filtering
- [ ] Filter bar rendered above the table (on Enriched Log tab)
- [ ] Filter options:
  - Division: all unique CSI divisions in the dataset (multi-select)
  - Lead Time: range-based filter or threshold (e.g., "> 12 weeks", "> 26 weeks")
  - Substitution Restrictions: filter to items with restrictions
  - Owner Approval: filter to items requiring owner approval
- [ ] Active filters shown as removable chips
- [ ] Filtering updates the table in real-time (items that don't match are hidden)
- [ ] "Clear all" button to reset filters

#### Grouping
- [ ] Grouping selector (dropdown or segmented control) with options: Lead Time (default), Division
- [ ] **Group by Lead Time** — items organized under lead time range headers (e.g., "52-78 weeks", "16-24 weeks", "8-12 weeks", "4-6 weeks"), longest first
- [ ] **Group by Division** — items organized under their CSI division headers (e.g., "Division 26 — Electrical", "Division 23 — HVAC")
- [ ] Each group header shows a count badge
- [ ] Empty groups are hidden
- [ ] Grouping and filtering compose together — if you filter to Division 26 and group by Lead Time, you see Division 26 items organized by how long they take to procure

#### Key Workflow
- [ ] A PE filters to Division 26, sees 6 electrical items, and can now send that scope to a sub — this is the setup for Story 8 (Sub Association)

### Components Used

- `Chip` for active filter tags
- `Button` for clear all
- Dropdown or segmented control for grouping selector
- `Collapsible` for group sections
- `Badge` for group count

### Commit

```
git commit -m "feat: add filtering and grouping by division, lead time, restrictions, approval"
```

---

## Story 8: Sub Association

**As a** PE who filters down to a trade's scope and sends it to a sub to bid on
**I want** the platform to record which sub was sent which items, and show me when specs change on items I've already sent out
**So that** I can see who has what scope and who has outdated scope

> **UX note (2026-04-13):** Sub assignment happens at the **table toolbar** (for all visible items) or **group header** (for a single group's items) — not per-row inline editing. The Sub column on the table is read-only display. This keeps the action at the scope level the PE is already looking at.

### Acceptance Criteria

#### Associating a Sub
- [ ] Read-only "Sub" column on the enriched table (empty by default)
- [ ] "Send to Sub" button on the **table toolbar** — assigns all currently visible items to the entered sub name
- [ ] "Send to Sub" button on each **group header** (when grouped) — assigns only that group's items
- [ ] Clicking "Send to Sub" opens a popover/inline form with a text input and "Assign" button
- [ ] If items already have a sub, the new assignment overwrites (reassignment)
- [ ] Items with a sub assigned are visually distinct from items without one (sub name shown in a `Badge`)
- [ ] Works in all view states: ungrouped applies to all visible, filtered applies to filtered set, grouped applies per-group or all visible

#### Spec Changes on Sent Items
- [ ] When specs get revised on items that have already been sent out, the PE can see the change and who has the outdated scope
- [ ] "Load Revised Spec" toggle or button swaps in the revised dataset (`procurement-log-revised.js`) to demonstrate this behavior
- [ ] Items that changed and have a sub associated show a visual warning indicator (e.g., badge or row highlight) so the PE knows who needs to be notified
- [ ] New items in revised spec and removed items from original spec are surfaced

#### State Management
- [ ] All sub assignments persist in React state (prototype scope — no backend persistence needed)
- [ ] Changes update the enriched log view in real-time

### Components Used

- `Badge` for sub name display in read-only column
- `Button` for "Send to Sub" action on toolbar and group headers
- Text input in popover/inline form for sub name entry
- `Table` column for Sub (read-only)

### Commit

```
git commit -m "feat: add sub association with spec change visibility on sent items"
```

---

## Definition of Done

- [x] Story 1: Vite dev server runs and the adapted root shell renders
- [x] Story 2: Design system components import and render correctly
- [x] Story 3: Supabase client initializes and local project setup is in place
- [x] Story 4: Both datasets importable and rendering without errors
- [x] Story 5: Current Log tab renders flat table with all current dataset items
- [x] Story 6: Enriched log surface shows lead times, substitution restrictions, owner approval requirements, and division labels
- [ ] Story 7: Filtering and grouping work — filter by division, lead time, substitution restrictions, owner approval; group by lead time or division
- [ ] Story 8: Sub association records which sub was sent which scope; spec changes on sent items surface the change and who has outdated scope
- [ ] App deployed to Vercel

Total commits: 8

---

## What Comes Next (NOT in this document)

- One-page brief (written after prototype confirms the story)
- Process note (last deliverable)
- Polish pass if time permits

# Procurement Log Extraction Guide

> **Purpose:** Instructions for an AI agent to extract a procurement log from a real construction specification document, then validate the output. This simulates what Krane's AI (Milo) does when a user uploads specs.

**Source Spec:** [`specs/griffin-hospital-generator-upgrades.pdf`](specs/griffin-hospital-generator-upgrades.pdf)
**Project:** Griffin Hospital — Phase 2 Emergency Generator and Distribution Upgrades, Derby, CT
**Date:** May 10, 2024

---

## Step 1: Read the Spec

Read `data/specs/griffin-hospital-generator-upgrades.pdf`. It's 476 pages covering a hospital emergency generator replacement and electrical distribution upgrade. The spec is organized by CSI MasterFormat divisions:

| Division | Sections | What's In It |
|----------|----------|-------------|
| 01 | 010000 | General requirements, coordination, scheduling |
| 03 | 03100, 03200, 033000, 033053 | Concrete formwork, reinforcement, cast-in-place |
| 21 | 210500, 210510, 211313 | Fire protection coordination, wet-pipe sprinklers |
| 23 | 230500–235100 | HVAC — motors, piping, insulation, controls, ducts, ventilators, fuel-oil piping, chimneys |
| 26 | 260500–263600 | Electrical — grounding, firestopping, testing, switchboards, generators, transfer switches |

---

## Step 2: Extract Procurement Items

For each spec section that specifies a **procurable product** (equipment, material, or system that needs to be ordered from a manufacturer/supplier), extract:

### Required Fields (the "before" — what Krane currently outputs)

| Field | Description | Example |
|-------|-------------|---------|
| `specSection` | CSI section number | "263213" |
| `description` | What the item is, in plain language | "1250kW Diesel Engine Generator Set" |
| `basisOfDesign` | The specified manufacturer/product or performance requirement | "Caterpillar, Kohler, or Cummins — 1250kW, 480V, 3-phase, Class 96 per NFPA 110" |

### Enriched Fields (the "after" — what our feature adds)

| Field | Description | How to Determine |
|-------|-------------|-----------------|
| `leadTimeWeeks` | Estimated lead time range (string) | Use public industry data from [`lead-times.md`](lead-times.md). Match by division + item type. |
| `riskTier` | CRITICAL / LONG_LEAD / MODERATE / STANDARD / COMMODITY | Based on lead time: CRITICAL (100+wk), LONG_LEAD (40-99wk), MODERATE (20-39wk), STANDARD (8-19wk), COMMODITY (under 8wk) |
| `flags` | Array of contextual flags detected from spec text | See flag detection rules below |
| `urgencyRank` | Number (1 = most urgent) | Sort by risk tier then by compound risk (more flags = higher urgency within tier) |
| `actionTimeframe` | ACT_NOW / ACT_THIS_MONTH / SCHEDULE_LATER | CRITICAL → ACT_NOW, LONG_LEAD → ACT_THIS_MONTH, everything else → SCHEDULE_LATER |

### Flag Detection Rules

Scan each spec section for these patterns:

| Flag | What to Look For in Spec Text |
|------|------------------------------|
| "Owner-furnished equipment" | Language like "procured by Griffin Healthcare and furnished to Contractor" or "furnished by Owner" |
| "Owner approval required" | Language requiring hospital/owner review or approval before procurement |
| "Sole-source specified" | Only one manufacturer listed with no "or equal" / "or acceptable equivalent" language |
| "Multiple manufacturers acceptable" | "or acceptable equivalent" / "or equal" language (this is neutral, not a flag — note it for context) |
| "Seismic certification required" | Seismic qualification, IBC Seismic Design Category requirements |
| "NFPA 110 Level 1 compliance" | References to NFPA 110 Level 1 emergency power requirements (adds approval complexity) |
| "Coordination study required" | Requires arc flash / overcurrent coordination study before energizing |
| "Extended warranty" | Warranty periods beyond standard (e.g., 5-year warranty on generators) |
| "Factory testing required" | Requires factory witness testing or certified test reports before shipment |
| "Submittal-intensive" | Extensive submittal requirements (shop drawings, test reports, certifications) |

---

## Step 3: What Counts as a Procurement Item

**INCLUDE** items that need to be ordered/procured:
- Major equipment (generators, transfer switches, switchboards, panelboards)
- Specified materials with lead times (transformers, circuit breakers, sprinkler systems)
- Systems requiring shop drawings and submittals (HVAC controls, fuel systems)
- Items with named manufacturers (indicates a specific product to procure)

**EXCLUDE** items that are labor/installation-only:
- General requirements (Div 01) — these are contractual, not procurable
- Pure installation specs (conduit installation methods, grounding installation procedures)
- Labeling and identification (pipe labels, equipment tags — commodity items, bundle them)
- Testing and commissioning procedures (these are services, not products)

**BUNDLE** commodity items by trade where practical:
- Don't create 10 separate line items for different conduit sizes — bundle as "Electrical Raceways and Fittings"
- Don't create separate items for every type of label — bundle as "Identification Devices"
- Do keep major equipment as individual line items

---

## Step 4: Key Items to Extract from This Spec

Based on reading the spec, these are the significant procurement items you should find. Use this as a **validation checklist** — your extraction should include all of these:

### CRITICAL / ACT_NOW
- **1250kW Diesel Engine Generator Set (GEN-2)** — Section 263213. Caterpillar/Kohler/Cummins. This is the centerpiece of the project. Factory-assembled, requires extensive submittals, factory testing, seismic certification, NFPA 110 Level 1 compliance, 5-year warranty. Extremely long lead.
- **Essential Distribution Switchboard (EQESBB)** — Section 262400. Owner-furnished (procured by Griffin Healthcare). Square D Power-Style QED or equivalent. Seismic Category D, extensive coordination study required.

### LONG_LEAD / ACT_THIS_MONTH
- **Automatic Transfer Switches (ATS-GEN + 5 others)** — Section 263600. Owner-furnished. Must coordinate with generator and switchboard.
- **HVAC Instrumentation and Controls** — Section 230940. Building automation integration, DDC controls for generator room ventilation.
- **Fuel Oil Piping and Transfer System** — Section 231113. Fuel maintenance system, fuel transfer pumps, day tanks. Connects Phase 1 to Phase 2.
- **Generator Exhaust System** — Section 263213 / 235100. Critical-grade silencer, 16" stainless steel exhaust flue, breechings and chimney.

### MODERATE / SCHEDULE_LATER
- **Wet-Pipe Sprinkler System Revisions** — Section 211313. Revise sprinkler piping in generator and essential distribution rooms.
- **Metal Ductwork** — Section 233113. Generator room ventilation ductwork.
- **HVAC Power Ventilators** — Section 233423. Exhaust fans for generator room.
- **Distribution Transformers** — Section 262400. Dry-type, 480V delta to 208Y/120V. Square D EX Series.
- **Panelboards** — Section 262400. Square D, circuit breaker-equipped.
- **Overcurrent Protection Coordination Study** — Section 260574. Independent testing agency required (INETA member). Service, not product, but blocks energization.
- **Arc Flash Hazard Analysis** — Section 260574. Must be completed before labels can be installed and equipment energized.

### STANDARD / COMMODITY
- **Cast-in-Place Concrete** — Sections 033000/033053. Housekeeping pads for generator, switchboard, ATS.
- **Concrete Formwork and Reinforcement** — Sections 03100/03200.
- **Duct Insulation** — Section 230713.
- **Electrical Grounding System** — Section 260526.
- **Penetration Firestopping** — Sections 260545 / 07 (referenced).
- **Vibration and Seismic Controls** — Sections 230548 / 260548.
- **Identification Devices** (labels, tags, nameplates) — Sections 230553 / 260515.

---

## Step 5: Output Format

Create the output as a JavaScript module at `prototype/src/data/procurement-log.js`:

```javascript
export const PROJECT = {
  name: "Griffin Hospital — Emergency Generator & Distribution Upgrades",
  location: "130 Division Street, Derby, CT",
  phase: "Phase 2",
  specDate: "May 10, 2024",
  specDocument: "griffin-hospital-generator-upgrades.pdf"
};

export const PROCUREMENT_LOG = [
  {
    id: 1,
    specSection: "263213",
    description: "1250kW Diesel Engine Generator Set (GEN-2)",
    basisOfDesign: "Caterpillar, Kohler, or Cummins — 1250kW, 480V/277V, 3-phase 4-wire, turbocharged, Class 96 NFPA 110 Level 1",
    leadTimeWeeks: "52-78",
    riskTier: "CRITICAL",
    flags: ["Factory testing required", "Seismic certification required", "NFPA 110 Level 1 compliance", "Submittal-intensive", "5-year warranty"],
    urgencyRank: 1,
    actionTimeframe: "ACT_NOW"
  },
  // ... more items
];
```

---

## Step 6: Validate

After extraction, verify:

1. **Completeness:** Does the log include all items from the checklist in Step 4?
2. **Accuracy:** Do the spec section references match the actual spec? Can you trace each item back to a specific section?
3. **Risk Tiers:** Do the lead time estimates align with [`lead-times.md`](lead-times.md)?
4. **Flags:** Were flags extracted from actual spec language, not guessed?
5. **Owner-Furnished:** The spec explicitly states EQESBB switchboard and some ATSs are "procured by Griffin Healthcare" — this is a critical flag that affects who manages procurement.
6. **No Fabrication:** Every item must trace to something in the actual spec document. Do not invent items.

---

## Step 7: Create the Revised Version (for Diff View)

After the initial extraction, create a second dataset at `prototype/src/data/procurement-log-revised.js` representing a **spec revision**. Make 3-4 realistic changes:

**Suggested changes (based on what would realistically change in a spec revision):**

1. **New item added:** Second load bank for redundancy testing — Division 26, LONG_LEAD
2. **Item changed:** Generator exhaust silencer upgraded from critical-grade to hospital-grade (tighter noise requirement) — changes basis of design, may shift lead time
3. **Item changed:** ATS-GEN transfer switch rating increased from 2000A to 2500A — changes basis of design, may require re-procurement if already ordered
4. **Item removed:** One of the commodity identification items consolidated into another line

These should feel like plausible mid-project spec revisions — scope clarification, regulatory tightening, or value engineering.

---

## Notes for the Implementing Agent

- Read the full spec before extracting. Don't just use the table of contents — the PART 2 - PRODUCTS sections contain the actual procurement-relevant details.
- The "Proposed Sequence of Construction" section (pages 6-8) is extremely useful — it explicitly calls out "long lead items such as Generators and Switchgear" and details which items are owner-furnished vs. contractor-furnished.
- The "Delineation of Responsibility" section (pages 10-12) clarifies who procures what — this directly maps to the "Owner-furnished equipment" flag.
- Lead time estimates should come from [`lead-times.md`](lead-times.md), not from the spec itself (the spec doesn't include lead times — that's the gap our product fills).

# Sample Procurement Log — Griffin Hospital (Real Spec)

> **Project:** Griffin Hospital — Phase 2 Emergency Generator and Distribution Upgrades
> **Location:** 130 Division Street, Derby, CT
> **Source Spec:** [`specs/griffin-hospital-generator-upgrades.pdf`](specs/griffin-hospital-generator-upgrades.pdf) (476 pages, May 10, 2024)
> **Data source:** All lead times from publicly published sources mapped via [`lead-times.md`](lead-times.md)
> **Purpose:** Procurement log extracted from a real construction specification. The "before" columns are what Krane's AI currently generates. The "after" columns are what our feature adds.

## Extraction Instructions

See [`EXTRACTION-GUIDE.md`](EXTRACTION-GUIDE.md) for the full extraction methodology, flag detection rules, and validation checklist. The implementing agent should read the actual PDF spec and produce the JS data module — the tables below are a reference preview.

---

## What Krane Generates Today (3 columns)

Items extracted from the spec, sorted by spec section number (the current default):

| Spec Section | Description | Basis of Design |
|---|---|---|
| 033000 | Cast-in-Place Concrete — Housekeeping Pads | Per ACI 301, 4000 psi, for generator, switchboard, and ATS mounting |
| 03200 | Concrete Reinforcement | ASTM A615, Grade 60 deformed bars |
| 211313 | Wet-Pipe Sprinkler System Revisions | Viking Corp or equivalent, revise piping in generator and essential distribution rooms |
| 230713 | Duct Insulation | Mineral fiber, fiberglass — ASTM C553, Type I |
| 230940 | HVAC Instrumentation and Controls | DDC controls for generator room ventilation, BMS integration |
| 231113 | Fuel Oil Piping and Transfer System | New fuel maintenance system, transfer pumps, day tanks for GEN-1 and GEN-2 |
| 233113 | Metal Ductwork | Galvanized steel, generator room ventilation |
| 233423 | HVAC Power Ventilators | Induced draft exhaust fans for generator room |
| 235100 | Breechings, Chimneys, and Stacks | 16" stainless steel exhaust flue, replace existing 8" flue |
| 260526 | Electrical Grounding System | Copper grounding electrode conductor, ground rods, bonding jumpers |
| 260545 | Penetration Firestopping (Electrical) | UL-listed firestop systems, STI SpecSeal or 3M or Hilti |
| 260574 | Overcurrent Coordination and Arc Flash Study | Independent testing agency (INETA member), per IEEE 1584 |
| 262400 | Essential Distribution Switchboard (EQESBB) | Square D Power-Style QED or ABB/Eaton equivalent, Seismic Cat D, owner-furnished |
| 262400 | Distribution Transformers | Dry-type, 480V to 208Y/120V, Square D EX Series or equivalent |
| 262400 | Panelboards | Square D, circuit breaker-equipped, NEMA PB-1 |
| 263213 | 1250kW Diesel Engine Generator Set (GEN-2) | Caterpillar, Kohler, or Cummins — 1250kW, 480V, 3-phase, NFPA 110 Level 1 |
| 263213 | Generator Starting Battery and Charger | 24V system, UL 1236 charger, heated battery compartment |
| 263213 | Generator Exhaust Silencer | Critical-grade, 25dB min attenuation at 500Hz, 76 dBA max at 10ft |
| 263213 | Radiator-Mounted Load Banks | Avtron, Simplex, or equivalent — for generator testing |
| 263600 | Automatic Transfer Switches | Owner-furnished (some), coordinates with generator and switchboard |

---

## What We Propose: Enriched Procurement Log (auto-generated, no manual entry)

Same items, now sorted by urgency rank. The enrichment columns are auto-populated by the agent:
- **Lead time**: mapped from CSI division + item type → public industry data
- **Risk tier**: classified from lead time range
- **Flags**: detected from actual spec text
- **Urgency rank**: computed from risk tier + flag count (compound risk = higher urgency)

| # | Spec Section | Description | Basis of Design | Lead Time (est.) | Risk Tier | Flags | Urgency Rank |
|---|---|---|---|---|---|---|---|
| 1 | 263213 | 1250kW Diesel Engine Generator Set (GEN-2) | Caterpillar/Kohler/Cummins, NFPA 110 Level 1 | **52-78 wks** | CRITICAL | Factory testing required, Seismic cert required, NFPA 110 Level 1, Submittal-intensive, 5-year warranty | 1 |
| 2 | 262400 | Essential Distribution Switchboard (EQESBB) | Square D Power-Style QED, Seismic Cat D | **40-60 wks** | CRITICAL | Owner-furnished equipment, Seismic cert required, Coordination study required | 2 |
| 3 | 263600 | Automatic Transfer Switches (ATS-GEN + 5 others) | Per spec, multiple types | **30-52 wks** | LONG_LEAD | Owner-furnished (some), Coordinates with generator and switchboard | 3 |
| 4 | 231113 | Fuel Oil Piping and Transfer System | New fuel maintenance, transfer pumps, day tanks | **20-36 wks** | LONG_LEAD | Connects Phase 1 to Phase 2, Submittal-intensive | 4 |
| 5 | 230940 | HVAC Instrumentation and Controls | DDC, BMS integration | **20-30 wks** | LONG_LEAD | Coordinates with generator room ventilation sequence | 5 |
| 6 | 235100 | Generator Exhaust System (Flue + Silencer) | Critical-grade silencer, 16" SS flue | **16-24 wks** | LONG_LEAD | Custom fabrication, replaces existing 8" flue | 6 |
| 7 | 263213 | Radiator-Mounted Load Banks | Avtron/Simplex/equivalent | **16-24 wks** | LONG_LEAD | Required for commissioning and testing | 7 |
| 8 | 262400 | Distribution Transformers | Square D EX Series, dry-type 480V to 208Y/120V | **16-24 wks** | MODERATE | DOE 2016 efficiency standard, Energy Star | 8 |
| 9 | 211313 | Wet-Pipe Sprinkler System Revisions | Viking Corp or equivalent | **8-14 wks** | MODERATE | Code-required, coordinates with generator room layout | 9 |
| 10 | 233113 | Metal Ductwork | Galvanized steel | **6-10 wks** | MODERATE | Generator room ventilation | 10 |
| 11 | 233423 | HVAC Power Ventilators | Induced draft exhaust fans | **10-16 wks** | MODERATE | Generator room exhaust | 11 |
| 12 | 262400 | Panelboards | Square D, circuit breaker-equipped | **12-20 wks** | MODERATE | | 12 |
| 13 | 260574 | Overcurrent Coordination and Arc Flash Study | INETA member testing agency | **8-12 wks** | MODERATE | Blocks energization, Coordination study required | 13 |
| 14 | 263213 | Generator Starting Battery and Charger | 24V, UL 1236 charger | **6-10 wks** | STANDARD | Heated compartment for cold climate | 14 |
| 15 | 033000 | Cast-in-Place Concrete — Housekeeping Pads | 4000 psi per ACI 301 | **2-4 wks** | COMMODITY | Must be poured before equipment arrives | 15 |
| 16 | 03200 | Concrete Reinforcement | ASTM A615 Grade 60 | **1-3 wks** | COMMODITY | | 16 |
| 17 | 260526 | Electrical Grounding System | Copper conductor, ground rods | **2-4 wks** | COMMODITY | | 17 |
| 18 | 260545 | Penetration Firestopping (Electrical) | STI SpecSeal / 3M / Hilti | **1-3 wks** | COMMODITY | | 18 |
| 19 | 230713 | Duct Insulation | Mineral fiber, ASTM C553 | **1-3 wks** | COMMODITY | | 19 |
| 20 | 230553 | Identification Devices (Labels, Tags, Nameplates) | Lamicoid/Seton/Brady | **1-2 wks** | COMMODITY | | 20 |

---

## What This Shows

**Before (Krane today):** 20 items in a flat list, sorted by spec section number. The 1250kW generator (52-78 week lead time) appears near the bottom at Section 263213. The PE has to manually determine it's the most urgent item. The fact that the switchboard is owner-furnished (meaning Griffin Healthcare is responsible for procurement, not the contractor) is buried in the spec text.

**After (proposed):** Same 20 items, now sorted by urgency. The generator is item #1 with a CRITICAL flag and five compound risk indicators. The owner-furnished switchboard is #2 with a flag alerting the PE to coordinate with hospital procurement. The identification devices are last. The PE opens the log and immediately knows what to act on — and which items have compound risks that need immediate attention.

No manual entry required. The agent reads the spec, maps items to public lead time data, detects flags from spec language, and ranks by urgency.

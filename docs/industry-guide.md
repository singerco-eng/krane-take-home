# Construction Procurement — Plain English Guide

> **Purpose:** A jargon-busting reference so you can follow every concept in this assignment, audit the product decisions, and understand exactly where manual work happens and where Krane's agents (and our proposed feature) fit in.

**Related docs:**
- [Assignment](./assignment.md) — the take-home prompt
- [Krane Context](./krane-context.md) — company, product, customers, competitive landscape
- [Planning](./planning.md) — product direction brainstorm and evaluation
- [Checklist](./checklist.md) — deliverables tracker

---

## Part 1: Glossary — Every Term You'll Encounter

### The Players

| Term | Plain English |
|---|---|
| **General Contractor (GC)** | The company hired to build the whole project. They don't do all the physical work themselves — they hire specialists (subs). Think of them as the general manager of the build. |
| **Subcontractor (Sub)** | A specialist company that does one type of work — electrical, plumbing, steel, HVAC, etc. The GC hires many subs. Each sub bids on their piece. |
| **Owner** | The person/company paying for the building. A hospital system, a university, Microsoft building a data center. They hire the GC. |
| **Architect / Engineer (A/E)** | The design team. They write the specs and drawings. During construction, they review submittals to make sure what's being built matches what they designed. |
| **Project Engineer (PE)** | The person on the GC's team who manages procurement day-to-day. This is Krane's primary daily user. 3-8 years experience. They're the ones drowning in spreadsheets. |
| **Project Manager (PM)** | Senior to the PE. Oversees the project more broadly — budget, schedule, client relationships. |
| **Superintendent** | Runs the physical job site. Manages crews, coordinates daily work. They don't manage procurement, but they suffer when materials show up late (idle workers = wasted money). |
| **VP of Preconstruction** | Executive who oversees the planning/procurement phase across multiple projects. The enterprise buyer in the assignment — wants portfolio-level visibility. |

### The Documents

| Term | Plain English |
|---|---|
| **Specs (Specifications)** | A massive written document (often hundreds of pages) that describes exactly what materials, products, and quality standards must be used on the project. Written by the architect/engineer. Organized by numbered divisions (see CSI MasterFormat below). This is what users upload to Krane. |
| **Drawings** | The visual blueprints — floor plans, structural layouts, electrical diagrams, etc. Specs say "use this exact type of steel." Drawings show where it goes. |
| **Procurement Log** | A list of every item that needs to be bought for the project, extracted from the specs. Each row = one item. Columns include: spec section, description, manufacturer, lead time, status, key dates. This is what Krane's Milo agent generates. |
| **Submittal** | A package of documents a sub sends to the GC (who forwards to the architect) proving that the specific product they plan to use meets the spec requirements. Example: the steel sub sends shop drawings showing exactly how they'll fabricate the beams. The architect reviews and approves (or rejects). Nothing gets ordered until the submittal is approved. |
| **Submittal Log** | A tracker for all submittals — which have been sent, which are under review, which are approved, which got rejected. This is what Krane's Lana agent generates. |
| **Shop Drawings** | Detailed fabrication drawings prepared by the sub or manufacturer showing exactly how something will be built/manufactured. A type of submittal. |
| **RFQ / RFP** | Request for Quote / Request for Proposal. What the GC sends to subs saying "here's the scope of work — give me your price and timeline." |
| **Bid** | A sub's response to an RFQ — their proposed price, timeline, and approach for their piece of the work. |
| **Purchase Order (PO)** | The official order document once a sub/supplier is selected. "We're buying this from you at this price, deliver by this date." |
| **Change Order** | A modification to the original scope after the contract is signed. Usually means something changed in the design or site conditions. Can affect procurement. |
| **RFI (Request for Information)** | A formal question from the contractor to the architect/engineer when something in the specs or drawings is unclear. |

### The Concepts

| Term | Plain English |
|---|---|
| **Lead Time** | How long it takes from ordering something to it arriving on site. A bag of concrete might be 1 week. Structural steel might be 16 weeks. An elevator might be 40 weeks. This is the single most important number in procurement — if you don't order early enough, the whole project stops. |
| **Long-Lead Item** | Anything with a lead time long enough to affect the schedule if not ordered early. Typically 8+ weeks. Examples: structural steel, elevators, switchgear, custom curtain wall. These are the items that keep PEs up at night. |
| **Basis of Design (BOD)** | The specific manufacturer and product model the architect specified. Example: "Trane Model XR15 air handling unit." Subs can propose alternatives (substitutions) but need approval. |
| **Substitution** | When a sub proposes a different product than the basis of design. "The spec says Trane, but we're proposing Carrier because it's cheaper and available sooner." Requires architect and sometimes owner approval. |
| **Owner Approval** | Some procurement decisions require the building owner to sign off — especially substitutions, anything affecting aesthetics, or items above certain cost thresholds. This adds time and is a bottleneck. |
| **CSI MasterFormat** | The industry-standard numbering system for organizing specs. Every type of construction work has a division number. Think of it like the Dewey Decimal System but for buildings. |
| **Division** | A category in MasterFormat. Division 03 = Concrete. Division 23 = HVAC. Division 26 = Electrical. A large project might have 40+ divisions, each with its own subs, submittals, and procurement items. |
| **Critical Path** | The sequence of tasks that determines the earliest possible completion date. If anything on the critical path is late, the whole project is late. Long-lead procurement items are often on the critical path. |
| **Slack / Float** | How much time you can delay a task without delaying the project. If steel has 0 days of slack, it's critical path — any delay pushes the whole project. If ceiling tiles have 30 days of slack, you have a buffer. |
| **Commodity Item** | Basic, widely available materials you can order anytime — lumber, concrete, paint, standard fasteners. Short lead times, multiple suppliers. Low risk. |
| **CSV Export** | When users download data from Krane as a spreadsheet file. 72% of users do this on day one — meaning they immediately leave the platform to work in Excel. This is the engagement problem. |

---

## Part 2: The MasterFormat Divisions That Matter Most

These are the divisions that show up most in procurement because they have the longest lead times, the most complexity, or the highest cost.

| Division | Name | What It Covers | Typical Lead Time | Why It Matters |
|---|---|---|---|---|
| 03 | Concrete | Rebar, precast panels, concrete mix design | 2-8 weeks | Foundation work — early in schedule |
| 05 | Metals | Structural steel, misc metals, railings | 8-20 weeks | Often the longest lead item. Skeleton of the building. |
| 07 | Thermal & Moisture | Roofing, waterproofing, insulation | 4-12 weeks | Envelope — keeps water out |
| 08 | Openings | Doors, windows, curtain wall, hardware | 8-16 weeks | Custom curtain wall can be 16+ weeks |
| 09 | Finishes | Flooring, paint, tile, ceilings | 2-6 weeks | Usually ordered later, but many items |
| 14 | Conveying | Elevators, escalators | **16-40 weeks** | Among the longest lead items on any project |
| 21 | Fire Suppression | Sprinkler systems, fire pumps | 6-12 weeks | Code-required, can't skip |
| 22 | Plumbing | Fixtures, piping, water heaters | 4-10 weeks | |
| 23 | HVAC | Air handlers, chillers, ductwork, controls | 8-24 weeks | Mechanical systems — complex, expensive |
| 26 | Electrical | Switchgear, transformers, panels, generators | **8-130 weeks** | Transformers are currently in crisis — 110-130 week lead times |

---

## Part 3: The Full Workflow — Start to Finish

Here's how a construction project moves from "we have drawings" to "materials are on site," step by step. Each step shows **who does it**, **how it's done today**, and **what Krane agent (if any) handles it**.

### Step 1: Specs Get Written

**Who:** Architect / Engineer
**What happens:** The design team writes a specification document — hundreds of pages organized by MasterFormat division. For each type of work, the spec describes exactly what products and materials are acceptable, their performance requirements, and the "basis of design" (the specific product the architect had in mind).
**Example:** Section 23 23 00 — Refrigerant Piping. Part 1 covers general requirements and what submittals are needed. Part 2 lists exact products (steel pipe types, copper tubing, specific valve manufacturers). Part 3 describes how to install it.
**Krane agent:** None — this happens before Krane enters the picture.

### Step 2: Specs Get Uploaded & Procurement Log Generated

**Who:** Project Engineer uploads to Krane
**What happens:** The PE uploads the spec document (and sometimes drawings). Krane's AI reads through all those pages and extracts a structured list: every item that needs to be procured, which spec section it's from, what the basis of design is, and any performance requirements.
**Output:** A procurement log — a structured table. One row per item.
**Krane agent:** **Milo** — "Turns specs + drawings into a ready-to-run procurement log in minutes."
**Manual time replaced:** 2-3 days of a PE reading specs line by line.

### Step 3: Submittal Log Generated

**Who:** Project Engineer reviews in Krane
**What happens:** In parallel with the procurement log, Krane generates a list of every submittal that needs to happen — which documents need to be prepared by which sub, reviewed by whom, and in what order.
**Krane agent:** **Lana** — "Turns specs + drawings into a complete submittal log."
**Manual time replaced:** Several days of manual cross-referencing.

### Step 4: Schedule Linking

**Who:** Project Engineer / Scheduler
**What happens:** Each procurement item and submittal gets linked to the construction schedule. "Structural steel needs to be installed starting week 20, so it needs to arrive by week 18, which means it needs to be ordered by week 4 (16-week lead time), which means the submittal needs to be approved by week 2." This backward math is done for every item.
**Krane agent:** **Arlo** — "Connects activities, submittals, and materials into one system. Links the 'what' to the 'when.'"
**Data source:** Krane integrates with Primavera P6 and Microsoft Project (the schedule tools GCs use). Install dates come from the schedule.

### Step 5: Lead Time Collection

**Who:** Project Engineer contacts subs/suppliers
**What happens:** The PE needs actual lead times for each item. Some are known from experience. Others require calling suppliers. "How long for 200 tons of W14x90 structural steel?" The supplier says "14 weeks from PO." The PE enters this into their tracking spreadsheet.
**Krane agent:** **Chase** — "Follows up with trade partners via call, email, or text to collect missing lead-time information." Also: **KAI LeadTime Agent** — "Catches 90% of lead time variances early."
**Manual time replaced:** Hours of phone calls, emails, and follow-ups per week.

---

### **>>> THIS IS WHERE THE PE LEAVES KRANE TODAY <<<**

At this point, the PE has a procurement log (from Milo), a submittal log (from Lana), schedule links (from Arlo), and lead times (from Chase). They export to CSV and go to their spreadsheet. Everything below is manual.

---

### Step 6: Prioritization (MANUAL — THE GAP)

**Who:** Project Engineer, alone, in a spreadsheet
**What happens:** The PE stares at their procurement log (which could be 200+ items on a large project) and manually figures out:
- Which items are **long-lead** and need to be ordered immediately?
- Which items need **owner approval** before they can even send bids out?
- Which items are **commodity** and can be ordered whenever?
- Which items are **schedule-critical** — on the critical path with zero slack?
- What's the **priority order** for sending out bids?

**How they do it today:** Mental math + spreadsheet sorting + cross-referencing the schedule. "Steel install is week 20, lead time is 16 weeks, submittal review takes 3 weeks, we're currently in week 3... I'm already behind." They do this for every single item. The PE from the assignment: *"I still spend half my day going through it line by line figuring out what's urgent, what's risky, and what can wait."*

**Krane agent today:** None.
**THIS IS THE GAP WE'RE PROPOSING TO FILL.**

### Step 7: Bid Solicitation (MANUAL)

**Who:** Project Engineer sends RFQs to subcontractors
**What happens:** For each scope/division, the PE packages up the relevant spec sections and sends them to 3-5 subs asking for bids. "Here's the structural steel scope. Give me your price, lead time, and any proposed substitutions by next Friday."
**How they do it today:** Email, sometimes with a formal bid form.
**Krane agent today:** **Theo** (new) handles some of this — "controls the procurement process from RFP to delivery."

### Step 8: Quote Comparison (MANUAL)

**Who:** Project Engineer
**What happens:** Quotes come back from subs. For structural steel, maybe 3 subs respond. One is cheapest but has a 20-week lead time. One proposes a substitution that needs architect approval. One is most expensive but can deliver in 12 weeks. The PE builds a comparison spreadsheet.
**How they do it today:** A "bid tab" spreadsheet comparing price, lead time, scope inclusions/exclusions, and substitutions side by side.
**Krane agent today:** Theo is starting to handle this, but per the assignment scenario, this doesn't exist yet.

### Step 9: Submittal Review Cycle (PARTIALLY IN KRANE)

**Who:** Sub prepares → GC reviews (5-7 days) → Architect reviews (10-14 days)
**What happens:** Once a sub is selected, they prepare submittals (shop drawings, product data, samples). These go to the GC for a first review, then to the architect. The architect approves, approves with comments, asks for revision, or rejects. **35% industry average rejection rate.** Each rejection cycle adds 3-4 weeks.
**Krane agent:** Lana helps prepare and QC submittals. But the approval tracking and follow-up is still largely manual.

### Step 10: Ordering (PARTIALLY IN KRANE)

**Who:** Project Engineer / Procurement team
**What happens:** Once submittals are approved, the PO goes out. "Order 200 tons of structural steel, delivery by week 18."
**Krane agent:** Theo is entering this space.

### Step 11: Delivery Coordination (IN KRANE)

**Who:** Project Engineer + Superintendent
**What happens:** Materials need to arrive at the right place, at the right time, in the right sequence. A hospital build might have 50+ deliveries per week. Can't have the drywall truck blocking the steel crane.
**Krane agent:** **Rio** — "Automates delivery scheduling, prevents dock conflicts, follows up on late arrivals."

---

## Part 4: The Gap We're Proposing to Fill — Visualized

```
STEP    WHAT HAPPENS                    WHO DOES IT TODAY        KRANE AGENT
─────   ─────────────────────────────   ────────────────────     ───────────
1       Specs written                   Architect                —
2       Procurement log generated       PE uploads to Krane      Milo ✓
3       Submittal log generated         PE reviews in Krane      Lana ✓
4       Schedule linked                 PE + scheduler           Arlo ✓
5       Lead times collected            PE calls/emails subs     Chase ✓

        ══════════ PE EXPORTS TO CSV AND LEAVES KRANE ══════════

6       PRIORITIZE by urgency/risk      PE in spreadsheet        *** NOBODY ***
7       Send bids to subs               PE via email             Theo (partial)
8       Compare quotes                  PE in spreadsheet        Theo (partial)
9       Submittal review cycle          Sub → GC → Architect     Lana (partial)
10      Place orders                    PE / procurement team    Theo (partial)
11      Coordinate deliveries           PE + superintendent      Rio ✓
```

**The gap at Step 6 is where 72% of users leave.** They have a great list (Steps 2-5) but no intelligence about what to do with it. They export it and spend half their day manually doing what an agent could compute:

> install date (from schedule) − lead time (from Chase) − submittal review time (from Lana) − today = **days of slack**

If slack is negative, you're already late. If it's small, it's urgent. If it's large, it can wait.

---

## Part 5: Publicly Available Data

Good news: we don't have to rely on Krane having this data. Much of it is publicly published.

### Lead Time Data (Public)

| Source | What It Provides | Access |
|---|---|---|
| **Weitz Supply Chain Reports** | Monthly lead times by material category across all major divisions. Specific week ranges. | Free download (email required) at weitz.com |
| **Steel Market Update** | Bi-monthly surveys of flat-rolled steel lead times with historical data back to 2012 | steelmarketupdate.com |
| **ECIA (Electronic Components Industry Association)** | Electrical component lead times, weekly/monthly surveys | ecianow.org |
| **BA Inc. (construction consultant)** | Published lead time ranges by equipment type — transformers, switchgear, generators, AHUs | ba-inc.com |
| **Alders Construction** | Published guide with pre-pandemic vs. current lead time comparisons | alders.com |

### Current Lead Times We Can Use (from public sources)

| Item | Current Lead Time | Source |
|---|---|---|
| Structural steel joists | 36-48 weeks | Alders |
| Elevators | 16-40 weeks | Industry standard |
| Pad-mount transformers | **110-130 weeks** | BA Inc. |
| Low voltage switchgear | 70-80 weeks | BA Inc. |
| Automatic transfer switches | 45-80 weeks | BA Inc. |
| Generators (100+ kW) | 36-48 weeks | BA Inc. |
| Rooftop air handlers (25+ tons) | 20-40 weeks | BA Inc. |
| VAV / DOAS air handling | 10-20 weeks | BA Inc. |
| HVAC compressors | 14 weeks | Industry reports |
| Standard doors/hardware | 8-12 weeks | Industry standard |
| Curtain wall | 12-20 weeks | Industry standard |
| Sprinkler systems | 6-12 weeks | Industry standard |
| Commodity (lumber, concrete, paint) | 1-4 weeks | Industry standard |

### Example Spec Documents (Public)

| Document | What It Is | URL |
|---|---|---|
| **UFGS 23 23 00 — Refrigerant Piping** | A real federal government spec for HVAC piping. Shows exactly how a spec section is structured: Part 1 (General/Submittals), Part 2 (Products with specific manufacturers), Part 3 (Execution/Installation). | wbdg.org — Unified Facilities Guide Specifications |
| **CSI MasterFormat 2016 — Full Division List** | The complete numbering system — every division and subdivision. Published by Los Alamos National Lab. | engstandards.lanl.gov |
| **PLOT Open-Source Procurement Log Template** | A real, industry-built procurement log spreadsheet. Shows exact columns: item, spec section, sub, lead time, dates, status. Free to download. | getplot.com |
| **Procore Procurement Log Template** | Procore's free template showing standard procurement log structure. | procore.com/library |
| **Hughes Marino — The Proactive Procurement Log** | Blog post by a construction manager explaining exactly how a procurement log works in practice, with screenshots of a real log. | hughesmarino.com |

### What This Means for the Prototype

We have real, publicly available data to build a convincing prototype:
1. **Lead times by material type** — published numbers we can plug into sample procurement log items
2. **Spec section numbers and descriptions** — from the MasterFormat standard
3. **Procurement log column structure** — from PLOT and Procore templates
4. **A realistic spec document** — from the federal UFGS system

We can generate a realistic sample procurement log for a fictional hospital or data center project using all public data. No need to assume anything about Krane's internal database.

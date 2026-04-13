# Product Decision — Planning Doc

> **Goal:** Decide the single thing Krane builds this 6-week cycle. This is the highest-leverage decision in the entire assignment — everything else (brief, prototype, process note) flows from it.

**Context docs:**
- [Assignment](./assignment.md) — the full take-home prompt, scenario, inputs, and submission requirements
- [Krane Context](./krane-context.md) — company overview, product capabilities, AI agents, customers, personas, workflows, competitive landscape
- [Checklist](./checklist.md) — deliverables tracker
- [Real Spec PDF](./data/specs/griffin-hospital-generator-upgrades.pdf) — Griffin Hospital Phase 2 Emergency Generator & Distribution Upgrades (476 pages, publicly posted for bidding)
- [Extraction Guide](./data/EXTRACTION-GUIDE.md) — methodology for extracting procurement items from the spec

---

## The Decision

**The CEO's question:** With 2 engineers for 6 weeks, what is the *one thing* we build?

**Hard constraints:**
- 2 engineers, 6 weeks
- First renewals in 10 weeks — low engagement accounts are at risk
- 72% of users export to CSV and leave after day one
- Product is live with paying GC customers on active projects

---

## Candidate Directions

### A. Smart Prioritization Layer
Add urgency, risk, and lead-time intelligence to the procurement log so it's no longer a flat list.

**Signal:** PE interview — "I still spend half my day going through it line by line figuring out what's urgent, what's risky, and what can wait."

**Thesis:** The log is already good at *what* to buy. Make it smart about *when* and *what order* — and users stop leaving.

**Pros:**
- Directly attacks the 72% CSV-export problem
- Builds on existing product (the log already exists)
- Scoped enough for 2 engineers / 6 weeks
- Improves daily engagement for the PE — the user who decides if the tool stays

**Cons:**
- Doesn't unlock the enterprise deal (VP wants cross-project visibility)
- Prioritization alone may not be enough to replace the spreadsheet

**Open questions:**
- [ ] Where does lead-time data come from? Is it already in the system, or does it require new data inputs?
- [ ] Can we auto-classify items by risk tier using AI (long-lead, owner approval required, commodity)?
- [ ] Does this naturally extend into actionable next steps, or does it dead-end at a smarter list?

---

### B. Portfolio Dashboard
Cross-project procurement visibility for executives — show status, risk, and long-lead items across all active projects in one view.

**Signal:** VP of Preconstruction — "If your platform can give me that visibility, we'll bring you into our next 8 projects."

**Thesis:** Land the enterprise deal. Revenue expansion matters more than incremental engagement.

**Pros:**
- Direct path to a named, high-value deal (8 projects)
- VP/executive buyer is the decision-maker for enterprise rollouts
- Aligns with Krane's growth narrative (strong pipeline, expanding sales)

**Cons:**
- Doesn't fix the engagement drop for existing PE users
- Existing accounts still churn if PEs don't use the product daily
- Scope risk: "real-time cross-project visibility" is vague and potentially large
- Renewals in 10 weeks — this doesn't help retain current accounts
- Dashboard without underlying workflow data might be shallow

**Open questions:**
- [ ] How many active projects do current paying customers have? Is portfolio view even useful at current scale?
- [ ] Can we build a meaningful dashboard if PEs aren't actively using the platform (garbage in, garbage out)?
- [ ] Is the VP deal real or aspirational? One sales call ≠ committed revenue.

---

### C. Downstream Workflow (Bid Management / Quote Tracking / Sub Coordination)
Replace the spreadsheet PEs live in every day — track bids, compare quotes, manage sub responses, handle substitution approvals.

**Signal:** Hospital project PE — "The procurement log tells me what I need to buy. My spreadsheet tracks what's actually happening... That's the part I live in every day, and none of it exists in your platform."

**Thesis:** Own the workflow PEs do every day and they'll never leave. The procurement log becomes the starting point, not the whole product.

**Pros:**
- Highest potential engagement impact — this is where PEs spend their actual time
- Turns Krane from a one-time tool into a daily-use platform
- Natural extension of the existing log (log → bid → quote → award)

**Cons:**
- Scope is massive: bid packages, quote comparison, sub tracking, substitution management, follow-ups
- Very hard to build meaningfully in 6 weeks with 2 engineers
- Risk of building something half-baked that doesn't replace the spreadsheet
- Doesn't address the executive buyer at all

**Open questions:**
- [ ] Can we slice this thin enough to be valuable in 6 weeks? What's the minimum viable slice?
- [ ] Is there a version of this that overlaps with Direction A (prioritization + lightweight status tracking)?

---

## Evaluation Framework

| Criteria | Weight | A: Prioritization | B: Portfolio | C: Downstream |
|---|---|---|---|---|
| Retains existing accounts (renewals in 10 wks) | High | **Strong** — directly attacks CSV export anti-pattern | Weak — doesn't help PE engagement | Medium — high potential but too large to ship |
| Increases daily engagement for PEs | High | **Strong** — gives reason to stay in-platform + return on spec revisions | None — serves VP, not PE | Strong — but only if fully built |
| Feasible for 2 engineers in 6 weeks | High | **Yes** — extends existing AI extraction + new UI | Maybe — scope risk on "real-time cross-project" | **No** — bid management alone is 6+ months |
| Unlocks new revenue / enterprise deals | Medium | Indirect — better PE engagement → better expansion story | **Strong** — VP explicitly asked for this | Weak — not what the VP wants |
| Builds toward long-term product vision | Medium | **Strong** — foundation for status tracking, portfolio view, workflow | Medium — top-down without bottom-up data | Strong — but premature |
| Addresses the loudest user pain | Medium | **Strong** — PE Interview 1 is nearly a spec for this feature | Weak — VP is a buyer, not a daily user | Strong — Hospital PE describes this exactly |

---

## Decision Log

### ~~Decision v1: Direction A — Intelligent Procurement Log~~ (SUPERSEDED)

> **Status:** Superseded by Decision v2 on 2026-04-12. Preserved for audit trail.

An evolution of Direction A that went beyond simple prioritization. The procurement log becomes a decision tool with an AI advisor, not just a smarter list. Built around 4 capabilities: enriched extraction, action timeframe view, agent recommendations (live LLM), and spec revision diff.

**Why it was superseded:** This direction over-indexed on *intelligence* and under-indexed on *workflow*. A smarter list is still a list. The AI recommendations are impressive in a demo — a PE reads them once and then still needs somewhere else to act. The spec revision diff is event-driven, not daily-use. Neither feature gives the PE a reason to open Krane every morning. The spreadsheet doesn't win on intelligence — it wins on being the place where work happens.

---

### ~~Decision v2: Direction A+C Hybrid — Intelligent Log + Lightweight Sub Tracking~~ (SUPERSEDED)

> **Status:** Superseded by Decision v3 on 2026-04-13. Preserved for audit trail. The final product direction is in [`draft-one-pager.md`](../draft-one-pager.md).

*2026-04-12 — Revised after stress-testing the original direction.*

**Why it was superseded:** This direction over-built the workflow layer and smuggled in AI prioritization under a different name. The risk tier classification (CRITICAL, LONG_LEAD, MODERATE, etc.) and urgency grouping (Act Now / Act This Month / Schedule Later) are a risk flagging system that tells PEs what to prioritize — exactly what the final direction cuts. The five-stage status pipeline (Not Started → RFQ Sent → Quotes Received → Awarded → Ordered), response tracking, and "What Am I Waiting On?" dashboard are bid management — also explicitly cut. The one-pager scopes to three things: smarter extraction (lead times, substitution restrictions, owner approval requirements), filtering and grouping, and sub association (recording who was sent what + spec change visibility on sent items). That's the minimum that makes the log the place PEs work without building systems we can't validate in six weeks.

The procurement log becomes both **smarter** (intelligence layer) and **actionable** (workflow layer). Intelligence without workflow = "cool, but I still need my spreadsheet." Workflow without intelligence = "this is just another spreadsheet." You need both.

#### The Insight That Changed the Call

Re-reading the three interview signals together, a pattern emerged:

1. **Large companies already come back — but to re-read a static list.** Power users on complex projects (50+ spec sections) return to review divisions and re-check the state of procurement. They're already doing the behavior we want. But today they come back to a flat, unchanging list — the same extraction they saw on day one. If status, sub assignments, and response tracking live in Krane, the return visit is inherently more valuable. They're not re-reading; they're checking a live tracker. The return behavior exists; we just need to make the thing they're returning to worth returning to.

2. **Small companies leave because a spreadsheet can do what the enriched log does.** A flat list with lead time columns is just... a spreadsheet with better initial data. The spec conversion saves time on day one, but the PE's daily work — tracking subs, tracking responses, tracking approvals — still lives in Excel. Smarter prioritization doesn't change that.

3. **The hospital PE described the missing piece explicitly.** "The procurement log tells me what I need to buy. My spreadsheet tracks what's actually happening." They manage 20 subs across 40 divisions. That's not an edge case — it's a medium-to-large project, exactly the customer profile Krane already serves.

The original plan treated the hospital PE's needs (Direction C) as a separate, competing direction that was "too large for 6 weeks." The revised insight: **Directions A and C aren't alternatives. The minimum viable slice of C is what makes A actually work.**

#### What We're Building — One Surface, Progressively Enhanced

The procurement log is the single surface. Each layer builds on the one before it:

**1. Enrich the log with intelligence.**
The AI that already reads specs now also classifies each item by lead time risk (mapped from CSI division + item type to public industry data) and detects flags from spec text (owner approval required, substitution restrictions, sole-source). Output: the same procurement log with new columns — estimated lead time range, risk tier, and contextual flags. This gives PEs something worth grouping and filtering.

**2. Add grouping and filtering.**
Items can be grouped by urgency (Act Now / Act This Month / Schedule Later), by division, or by status. Filter by risk tier, division, or status to isolate what matters. Division data already exists in the spec section number — we surface it as a first-class concept. Enhanced grouping and filtering is what lets PEs isolate a sub's scope, see all in-flight RFQs, or focus on critical items. Each new capability (status, sub assignment) becomes a new axis to group and filter on.

**3. Track the bid workflow.**
When the PE sends an RFQ to a sub (which they already do via email/phone), they mark it in the platform. The system tracks:
- **Status per item:** Not Started → RFQ Sent → Quotes Received → Awarded → Ordered. Auto-sets "Not Started" on extraction. PE updates as work progresses.
- **Sub assignment per division:** PE enters a sub name for a division; all items in that division inherit it.
- **Response tracking:** PE marks when a sub responds. Simple yes/no with date.
- **"What Am I Waiting On?" view:** A filtered/grouped view showing everything outstanding — the PE's daily dashboard.
- **Spec change alerts on in-flight items:** If the PE re-uploads revised specs and the AI detects a change on an item already in "RFQ Sent" or "Quotes Received" status, the system flags it. Example: "ATS-GEN transfer switch rating changed from 2000A to 2500A. You've already sent this to bid — subs may need to re-quote." Status-aware diff, not blanket diff.

Each layer enables the next. Enrichment gives you something worth grouping. Grouping gives you the ability to isolate a scope. Isolating a scope is how you assign a sub and track status. Tracking status creates the daily-use view. And if a spec changes on a tracked item, the system already knows it matters.

This is **status tracking and sub coordination**, not full bid management. We're not comparing quotes side-by-side or parsing substitution details. We're making the procurement log the place PEs work, not just the place they start.

#### Why This Is the Right Call

**Solves the workflow problem, not just the information problem.** The original direction made the log smarter but didn't give the PE a place to DO work. The revised direction says: the enriched log is where you see what's urgent, AND where you track what's happening. One surface, progressively enhanced.

**Each layer enables the next.** This isn't three separate features — it's one cohesive evolution. Enrichment creates data worth grouping. Grouping/filtering lets PEs isolate scopes and see what's in flight. That visibility is what makes status tracking and sub assignment natural. The UX enhancements to support each layer carry forward into the next. We're extending the log, not building a second product.

**Eliminates the spreadsheet for the core workflow.** A PE managing 20 subs across 40 divisions currently maintains a spreadsheet with columns for: item, division, sub name, date sent, response received, quote amount, status. Our enriched log already has item, division, lead time, and risk. Adding sub, status, and response date closes the loop.

**Daily-use retention, not event-driven retention.** The "What Am I Waiting On?" view engages every morning. This is the difference between a feature PEs appreciate and a surface PEs depend on.

**Feasible — and arguably simpler than v1.** The AI recommendations required an LLM integration, prompt engineering, edge function deployment, and quality tuning. The spec diff required structured comparison logic and an LLM summary. The v2 scope is state management and UX on existing data: status enums, sub name strings, date fields, grouping, and filter logic. Two engineers, six weeks, buildable with higher confidence than v1.

**Serves both large and small customers.** Large companies already come back to review divisions — we give them a live tracker instead of a static list. Small companies — the ones who leave because a spreadsheet does the same thing — now have a reason to stay: the platform tracks their subs, not just their items.

**Spec changes are more actionable when they hit in-flight work.** A blanket diff is informational. A flag that says "this item you already sent to subs just changed" is urgent and actionable. By tying spec change detection to status tracking, we get the highest-value slice of the diff feature without building the full comparison view.

#### What We're NOT Building and Why

| Cut Feature | Why |
|---|---|
| **Agent Recommendations (live LLM)** | Impressive in a demo but doesn't solve the workflow problem. A PE reads the recommendation once; they check their bid status every day. Deprioritized from "core" to "nice-to-have in a future cycle." The enriched log with risk tiers and flags already communicates urgency — the AI advisor adds flavor, not function. |
| **Full Spec Revision Diff** | The blanket "compare all items old vs. new" view is cut — event-driven and less sticky than daily-use workflow. However, we DO flag spec changes on items already sent to bid (see capability 4). This is a status-aware, targeted version: we only surface diffs where they intersect with work in motion, which is where they actually matter. The full diff across all items is a cycle 2 candidate. |
| **Full bid management / quote comparison** | Hospital PE's full ask, but we're taking the thin slice (tracking), not the thick slice (comparison, substitution management, approval routing). Quote comparison is cycle 2-3. |
| **VP portfolio dashboard** | Still requires PE engagement data. Now that we're building daily-use workflow, the data will actually exist for a future portfolio view. Better foundation than v1. |
| **Email parsing of bid responses** | Krane's AI extraction capability extends naturally to reading bid emails/PDFs. Powerful future feature, but for 6 weeks the PE marks responses manually. The prototype can demonstrate the concept. |
| **Email nudges / digests** | Separate engagement system, too much scope. |
| **Contextual chat agent** | The enriched table + workflow tracker answer the PE's questions through structure, not conversation. |
| **Schedule integration** | Would require P6/MS Project connection. The assignment says "treat the product description as complete." |

#### What Moved Between Versions

| Feature | v1 Status | v2 Status | Why |
|---|---|---|---|
| Enriched Extraction | Core | **Core** | Foundation — layer 1, unchanged |
| Grouping & Filtering | Core (filter bar + action timeframe view) | **Core (expanded)** | Now a general capability: group/filter by risk tier, division, status. Each new data field becomes a new axis. UX enhanced to support the workflow layers above it. |
| Agent Recommendations | Core | **Cut** | Intelligence without workflow doesn't retain. Nice-to-have, not sticky. |
| Spec Revision Diff | Core (full diff view) | **Scoped down** to status-aware alerts | Full diff cut. Spec changes on in-flight items are flagged — diff where it matters, not diff for its own sake. |
| Status Tracking | **Explicitly cut** | **Core** | Was "risks shipping half-baked." Reframed: it's the minimum viable workflow — layer 3. |
| Sub Assignment | Not considered | **Core** | Natural extension of division grouping — layer 3. |
| Response Tracking | Not considered | **Core** | Answers "what am I waiting on?" — the daily-use hook. |

#### Key Assumptions (revised)

1. The AI that reads specs can be extended to extract more signals (approval requirements, substitution language) — engineering bet, not product bet *(carried from v1)*
2. Public lead time data mapped to CSI divisions is accurate enough as a starting classification *(carried from v1)*
3. PEs will adopt lightweight status tracking if it's integrated into the log they're already looking at — the bar is "less friction than a spreadsheet," not "zero friction"
4. Sub assignment at the division level is granular enough — PEs don't need per-item sub assignment for the minimum viable workflow
5. Manual response tracking (PE marks "received") is acceptable for 6 weeks — AI parsing of bid emails is a future enhancement
6. The "What Am I Waiting On?" view is a strong enough daily-use hook to change the engagement curve from "spike and drop" to sustained usage

#### GTM Alignment

Krane is **sales-assisted entry, product-driven expansion** (pilot → PE adoption → VP rollout). The 72% CSV export rate breaks the flywheel at step 2. The v1 approach fixed the *information* problem at step 2 but didn't fix the *workflow* problem. PEs still needed their spreadsheet for daily work.

The v2 approach fixes both: the enriched log gives PEs a reason to look at the platform (intelligence), and the sub tracking gives them a reason to stay in it (workflow). When the PE's daily work lives in Krane, the VP gets the engagement data they need to justify enterprise rollout — which unlocks the portfolio dashboard in a future cycle.

The construction procurement workflow in the platform is now: **Upload spec → Generate enriched log → Prioritize by urgency → Filter by division → Send to bid → Track sub responses → See what's outstanding.** That's not the full lifecycle, but it's enough to own the PE's daily workflow through the bid solicitation phase — which is exactly where the spreadsheet currently lives.

---

### Decision v3: Enriched Extraction + Filtering + Sub Association

*2026-04-13 — Final direction, codified in [`draft-one-pager.md`](../draft-one-pager.md).*

The one-pager is the source of truth. This section exists to document what changed from v2 and why.

#### What We're Building — Three Capabilities

**1. Smarter extraction.** On extraction, surface lead times, substitution restrictions, and owner approval requirements alongside each item. PEs get what they need to make scheduling decisions without manual classification.

**2. Filtering and grouping.** PEs can filter across any extracted data to isolate a trade's scope or see what needs attention. This is how a PE breaks up the log by trade before sending each sub their scope to bid on.

**3. Sub association.** When a PE filters down and sends a sub their scope to bid on, the platform records that as part of the send. The sub is now associated with those items automatically. When specs get revised on items that have already been sent out, the PE can see the change and who has the outdated scope.

#### What v2 Had That v3 Cuts

| v2 Feature | v3 Status | Why Cut |
|---|---|---|
| **Risk tier classification** (CRITICAL, LONG_LEAD, MODERATE, STANDARD, COMMODITY) | **Cut** | This is a risk flagging system that tells PEs what to prioritize — the one-pager explicitly says we are not extending AI into procurement decision-making. We surface the raw data (lead times, restrictions, approvals) and the PE decides. |
| **Urgency grouping** (Act Now / Act This Month / Schedule Later) | **Cut** | Requires the risk tier system above. The one-pager says "without manual classification" — meaning the extraction itself provides the data, not that we classify items into urgency buckets. |
| **Full status workflow** (Not Started → RFQ Sent → Quotes Received → Awarded → Ordered) | **Cut** | This is bid management. The one-pager explicitly cuts "quote comparison, substitution tracking, and approval routing." A five-stage status pipeline is the scaffolding for those features — we don't need it for sub association. |
| **Response tracking** (PE marks when sub responds) | **Cut** | Part of the bid management workflow above. Sub association records who was sent what, not what happened next. |
| **"What Am I Waiting On?" dashboard** | **Cut** | Requires the status workflow and response tracking. Without those, there's nothing to show. |
| **Spec change alerts as a separate capability** | **Scoped into sub association** | The one-pager bundles spec change visibility into sub association: "When specs get revised on items that have already been sent out, the PE can see the change and who has the outdated scope." It's not a standalone feature. |

#### What Carried Forward From v2

| Feature | Status |
|---|---|
| Enriched extraction (lead times, restrictions, approvals) | **Core** — scoped to data the extraction can surface with confidence |
| Filtering and grouping | **Core** — filter/group by any extracted data (division, lead time, substitution restrictions, owner approval) |
| Sub association at division level | **Core** — recording who was sent what |
| Spec change visibility on sent items | **Core** — part of sub association |

#### What We're NOT Building and Why

| Cut Feature | Why |
|---|---|
| **Full bid management** (quote comparison, substitution tracking, approval routing) | Real needs, but they come after PEs can prioritize what to send out and track who they sent it to. We build that foundation this cycle. |
| **AI procurement decision-making** (risk flagging, priority classification) | Accuracy matters. If it gets a lead time wrong or misses an owner approval requirement, the PE loses trust. The enriched extraction extends capabilities we already have confidence in. The engagement problem is a workflow gap, not an intelligence gap. |
| **Cross-project visibility** (portfolio dashboard) | Requires a new dashboard surface and downstream workflow tracking that doesn't exist yet. Sub association captures the first piece; the fuller picture develops in future cycles. |
| **Agent recommendations (live LLM)** | Cut in v2, still cut. Intelligence without workflow doesn't retain. |
| **Full spec revision diff** | Cut in v2, still cut. Spec change visibility is scoped to items already sent to subs — diff where it matters, not diff for its own sake. |
| **Email parsing of bid responses** | Future enhancement. For now, the PE records sub association manually. |
| **Email nudges / digests** | Separate engagement system, too much scope. |
| **Contextual chat agent** | The enriched table answers PE questions through structure, not conversation. |
| **Schedule integration** | Would require P6/MS Project connection. |

#### Key Assumptions

1. The AI that reads specs can be extended to extract lead times, substitution restrictions, and owner approval requirements — engineering bet, not product bet
2. Public lead time data mapped to CSI divisions is accurate enough as a starting classification
3. Sub association at the division level is granular enough — PEs don't need per-item sub assignment for the minimum viable workflow
4. Surfacing raw extracted data (lead times, substitution restrictions, owner approval requirements) gives PEs enough to make scheduling decisions without the system classifying priority for them
5. Recording sub association without a full status workflow is enough to make the log more useful than a spreadsheet for the "who did I send this to?" question

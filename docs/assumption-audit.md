# Assumption Audit — Stress Testing Our Reasoning

> **Purpose:** Honest check of every assumption in our product direction against the actual assignment text, interview quotes, and what we know about data availability.

**Related docs:**
- [Assignment](./assignment.md) — source of truth
- [Planning](./planning.md) — our product direction candidates
- [Industry Guide](./industry-guide.md) — workflow and jargon reference
- [Lead Time Data](./data/lead-times.md) — public data we're relying on
- [Sample Procurement Log](./data/sample-procurement-log.md) — what the enriched log would look like
- [Procurement Log Structure](./data/procurement-log-structure.md) — gap between Krane's output and a real log

---

## CRITICAL FINDING: The Assignment Product ≠ Real Krane

The assignment says:

> "Treat the product description as complete — don't assume capabilities beyond what's described."

The product described in the scenario:
- Users upload construction specifications
- AI reads them
- A structured procurement log is generated with: **spec section reference, description, and basis of design**
- That's it. Three fields. A flat list.

### What I previously assumed (WRONG):

In earlier brainstorming, I referenced Krane's real agents — Chase (lead time follow-up), Arlo (schedule linking), Lana (submittals), KAI LeadTime Agent, P6/MS Project integration. I said:

> "The gap isn't data. The gap is intelligence on top of data they already have."

**This is wrong for the assignment scenario.** The scenario product does NOT have:
- ❌ Schedule integration (no install dates)
- ❌ Lead time data from suppliers
- ❌ Submittal tracking
- ❌ Agent that contacts subs
- ❌ Delivery coordination
- ❌ Any of the KAI agents

**The scenario product is just Milo — spec extraction to a flat list.**

### Why this matters:

My original pitch — "compute urgency from existing data" — assumed data that doesn't exist in the scenario. We can't do `install_date - lead_time - today = slack` because there IS no install date and there IS no lead time in the system.

### CORRECTED approach:

We don't need per-project schedule data or per-item supplier quotes. We can use:
1. **Public industry lead time ranges** mapped to CSI division + item type
2. **Spec text analysis** the AI already does — it can detect owner approval language, substitution restrictions, performance requirements
3. **Category-based risk classification** — Division 26 switchgear is ALWAYS a long-lead critical item

The AI already reads the full spec text to extract the three fields. The enrichment is: **read more from what you're already reading.** Extract lead time class, detect approval requirements, flag risk — all from the same spec document the user already uploads.

---

## Audit: Interview 1 — PE at mid-size GC

**Exact quote:**
> "The AI gives me a list of everything that needs to be procured. That's helpful — saves me a couple days of reading. But what I actually need to figure out is: what do I need to act on right now? Some of these items have 16-week lead times and we're already behind schedule. Some are commodity items I can order whenever. Some require owner approval before I can even send them out to bid. The log treats everything the same — it's just a flat list sorted by spec section. I still spend half my day going through it line by line figuring out what's urgent, what's risky, and what can wait."

### What this person literally asks for:

| Need (their words) | Our proposed solution | Assumption check |
|---|---|---|
| "What do I need to act on right now?" | Urgency ranking by risk tier | ✅ Directly addressed |
| "16-week lead times" | Auto-classify items by lead time using public data | ✅ We have this data publicly |
| "Already behind schedule" | ⚠️ Requires knowing the schedule to determine "behind" | ❌ We do NOT have schedule data. We can flag items that are inherently high-lead-time, but we can't tell them they're "behind" without a schedule. |
| "Commodity items I can order whenever" | Classify items as COMMODITY tier | ✅ Directly addressed |
| "Require owner approval before I can even send them out to bid" | Detect owner approval requirements from spec text | ✅ Specs often state approval requirements — the AI can extract this |
| "It's just a flat list sorted by spec section" | Sort by urgency/risk instead of spec section | ✅ Directly addressed |
| "Half my day going through it line by line" | Eliminate this by pre-computing priority | ✅ Directly addressed |

### Honest gap:
The PE says they're "already behind schedule." Our proposed feature can't tell them *how* behind because we don't have schedule dates. We CAN tell them "this item typically takes 16-40 weeks — if you haven't started procurement, you should now." That's useful but not the same as "you needed to order this 3 weeks ago."

### Potential mitigation:
Let the PE optionally input a project start date or target completion date. Even a single date gives us enough to back-calculate rough urgency. This is ONE field of manual input, not a whole spreadsheet.

---

## Audit: Interview 2 — VP of Preconstruction at top-20 GC

**Exact quote:**
> "We're evaluating your platform for our national program. The thing that would get us to roll this out across all our regions is a way for my preconstruction directors to see procurement status across every active project in one view. I need to know in real time where each project stands — which are behind on procurement, which long-lead items haven't been ordered yet, and where we have risk. Right now I'm waiting two weeks for stale Excel reports from each project team. If your platform can give me that visibility, we'll bring you into our next 8 projects."

### What this person literally asks for:

| Need (their words) | Our proposed solution | Assumption check |
|---|---|---|
| "Procurement status across every active project in one view" | NOT directly addressed in 6-week scope | ❌ This is a portfolio dashboard — we're not building this |
| "Which are behind on procurement" | Requires per-project status tracking | ❌ Depends on PEs actively using the enriched log |
| "Which long-lead items haven't been ordered yet" | Requires order status per item | ❌ Not in our scope unless PE updates status |
| "Where we have risk" | Could partially serve: risk tier per item is auto-generated | ⚠️ Partial — can show risk AT log generation, not ongoing |
| "Bring you into our next 8 projects" | Revenue opportunity but NOT a retention play | N/A — this is a sales promise, not a product need |

### Honest assessment:
Our proposed feature does NOT directly address the VP's ask. We are explicitly deprioritizing this. The brief needs to clearly state why.

### Why we're OK deprioritizing this:

1. **The VP said "procurement status."** Status requires PEs to be tracking procurement in the platform. If PEs leave after day one (72% CSV export), there IS no status data for the VP to see. You have to fix the PE engagement problem first — otherwise the dashboard is empty.
2. **One sales call ≠ committed revenue.** The VP said "we'll bring you into our next 8 projects" — that's conditional and speculative. The renewals in 10 weeks are certain.
3. **A portfolio view is a natural phase 2.** Once PEs are using the enriched log with risk tiers daily, rolling those tiers up to a portfolio view is straightforward. Build the foundation first.

---

## Audit: Interview 3 — Hospital Project PE (from analytics section)

**Exact quote:**
> "Once I have the list, I need to break it up by trade and send each sub their scope to bid on. That part I could do in your platform if it let me filter and share by division. But then the real work starts — I get three quotes back for structural steel, each with different pricing, different lead times, and one proposing a substitution that needs architect approval. I need to compare those side by side, track which subs haven't responded, follow up on the ones that are late. For this hospital project, I'm managing 20 subs across 40 divisions, each in a different stage. The procurement log tells me what I need to buy. My spreadsheet tracks what's actually happening — who quoted what, which quotes I'm still waiting on, which substitutions need owner sign-off. That's the part I live in every day, and none of it exists in your platform."

### What this person literally asks for:

| Need (their words) | v1 assessment | v2 assessment (revised 2026-04-12) |
|---|---|---|
| "Break it up by trade" | ✅ Filter/group by division | ✅ In scope — division filtering |
| "Send each sub their scope to bid on" | ⚠️ Light lift — share filtered subset | ✅ **In scope — "Send to Bid" from filtered view, auto-sets status to RFQ Sent** |
| "Compare quotes side by side" | ❌ Full bid management, too large | ❌ Still out of scope — cycle 2-3 |
| "Track which subs haven't responded" | ❌ Requires bid tracking | ✅ **In scope — response tracking per sub, "What Am I Waiting On?" view** |
| "Follow up on the ones that are late" | ❌ Requires notification system | ❌ Still out of scope — but the tracking view identifies who's late, enabling manual follow-up |
| "Which substitutions need owner sign-off" | ⚠️ Can flag from spec text | ⚠️ Same — we flag which items WILL need approval from spec language |
| "20 subs across 40 divisions, each in a different stage" | ❌ Full workflow tracking | ✅ **In scope — sub assignment per division + status per item = each division in a trackable stage** |
| "Filter and share by division" | ✅ Low effort, high value | ✅ In scope — and now it's the bridge to the workflow, not just a convenience |

### Honest assessment (revised 2026-04-12):

The original audit framed this PE as wanting "bid management" and cut the entire need as too large. On re-read, this PE actually describes a **spectrum** of needs, and the critical mass is in the middle:

1. Filter by division — trivial ✅
2. Send to subs — natural extension of filtering ✅
3. Track who responded — lightweight status + sub tracking ✅ ← **this is the daily workflow**
4. Compare quotes side by side — full bid management ❌ (still too large)
5. Substitution approval tracking — approval routing system ❌ (still too large)

Items 1-3 are the minimum viable workflow. Items 4-5 are full bid management. **The v1 plan rejected the entire range because 4-5 were too large. The v2 plan takes 1-3 and draws a clear line before 4.**

The key reframe: this PE isn't describing an edge case. 20 subs across 40 divisions is a medium-to-large project — exactly the project profile Krane already serves. The workflow they describe is universal to any PE doing procurement. We were wrong to treat this as a Direction C problem that competes with Direction A. The thin slice of C (status + sub tracking) is what makes A work.

---

## Audit: Product Analytics

**Key data points:**
- Engagement spikes during first week, then drops sharply
- On larger projects (50+ spec sections): power users return to re-check extractions as specs get revised
- On smaller projects: users almost never come back after day one
- **72% of users export to CSV within first session**

### What this tells us:

| Signal | Implication | v1 assessment | v2 assessment (revised 2026-04-12) |
|---|---|---|---|
| Engagement drops after week 1 | Product doesn't give users a reason to come back | ⚠️ Partially — enriched log is better but still a one-time output | ✅ **Sub tracking creates daily-use workflow — PE checks outstanding bids every morning** |
| Power users return for spec revisions | There IS a return-use case on complex projects | ✅ Enriched log is more valuable on re-check | ✅ Same, plus those power users now also have sub tracking as a daily return reason |
| Small projects: never come back | Small projects may not have enough items to justify a smart tool | ⚠️ Feature helps more on large projects | ✅ **Even small projects have subs to track. A 10-item log with 5 subs in different stages is enough to justify staying in-platform.** |
| 72% export to CSV | The log doesn't do enough to keep them in-platform | ✅ Enriched log gives a reason to stay | ✅ **Enriched log + sub tracking = the spreadsheet IS the platform now** |

### Honest gap (v1):
Even with prioritization, the enriched log is still a **one-time output** — you look at it, it tells you what's urgent, and then... what? If there's no ongoing reason to return, engagement still drops after the first smart view.

### How v2 addresses this:
The v1 gap was real and identified correctly in this audit. The original answers — agent recommendations and spec revision diff — were event-driven (one-time LLM output; fires only on spec changes). The v2 answer is **daily-use workflow**:
- **Sub tracking** — the PE's data lives in Krane now. They have to come back to check it.
- **"What Am I Waiting On?" view** — answers the PE's first question every morning. This is daily engagement, not event-driven.
- **Status progression** — items move through states over days/weeks. The log is alive, not static.
- **Time-based framing (Act Now / Act This Month / Schedule Later)** — carried from v1, still valuable as the intelligence layer underneath the workflow.

---

## Audit: Business Context

**Key constraints:**
- 2 engineers, 6 weeks
- First renewals in 10 weeks
- Low engagement = harder to renew
- Strong customer growth, expanding pipeline

### Does our feature map to the business constraints?

| Constraint | v1 fit | v2 fit (revised 2026-04-12) |
|---|---|---|
| 2 engineers, 6 weeks | ✅ Tight but achievable | ✅ **Arguably more feasible** — sub tracking is state management on existing data (status enums, sub names, dates, filters). No LLM integration, no edge function, no prompt engineering. The UI work is additive on the same surface. |
| Renewals in 10 weeks | ✅ Ship in 6, demo in 4 | ✅ Same — and the renewal conversation is stronger. "Your PEs track their subs here every day" > "Your PEs see a smarter list." |
| Low engagement = hard to renew | ✅ Gives reason to stay | ✅ **Stronger** — daily-use workflow vs. one-time smart view. The engagement curve changes from "spike and drop" to sustained. |
| Strong pipeline | ⚠️ Doesn't close VP deal | ⚠️ Same — but now the VP's future portfolio dashboard has real data underneath it, because PEs are actually tracking status in the platform. |

---

## Audit: Framing Correction — Anti-Pattern, Not Churn

An important framing distinction: the 72% CSV export rate does NOT mean 72% of users leave or churn. It means they've **fallen back to the anti-pattern** of using a fragmented system — they extract the list, export it, and do the real work in a spreadsheet. They may still use Krane for future spec uploads on the same project, and analytics confirm power users return for spec revisions on large projects.

The problem is: **Krane becomes a one-shot extraction tool instead of a daily-use platform.** Come renewal, the account owner sees low ongoing usage and asks "why am I paying for this year-round?" The fix isn't preventing CSV export — it's making the in-platform experience valuable enough that the spreadsheet feels like a downgrade.

---

## Summary: What's Solid vs. What's Shaky

> Updated 2026-04-12 to reflect the v1 → v2 strategy pivot.

### SOLID (high confidence):

1. **Public lead time data exists** and can be mapped to CSI divisions — we have real numbers from published sources *(carried from v1)*
2. **Spec text contains more than 3 fields** — approval requirements, substitution language, performance specs are all in the text the AI already reads *(carried from v1)*
3. **Filter by division** is an easy win that two interviews specifically ask for *(carried from v1)*
4. **The 72% CSV export anti-pattern** is directly attacked by making the log worth staying in *(carried from v1)*
5. **Feasibility** is realistic — extend AI extraction + build smarter UI + add status/sub tracking on the same surface. No LLM integration required. *(updated from v1)*
6. **Sub tracking addresses the daily workflow** — the hospital PE described this explicitly; it's the universal workflow for any PE doing procurement *(new in v2)*
7. **The UI work is additive, not separate** — status columns, sub assignment, and response tracking are extensions of the procurement log table, not a second product *(new in v2)*
8. **Small projects benefit too** — even a 10-item log with 5 subs in different stages is enough workflow to justify staying in-platform *(new in v2)*

### SHAKY (lower confidence, needs honesty in the brief):

1. **"Behind schedule" requires a schedule** — we can flag inherent lead time risk but can't say "you're 3 weeks late" without schedule data *(carried from v1)*
2. **VP deal is not addressed** — we need to clearly explain why in the brief, and why that's the right call *(carried from v1)*
3. **Lead time accuracy** — public data gives ranges (e.g., 8-20 weeks for structural steel), not project-specific actuals. Starting point, not precision. *(carried from v1)*
4. **PE adoption of manual status tracking** — will PEs actually update statuses in a new tool, or will inertia keep them in their spreadsheet? The bar is "less friction than Excel," not zero friction. *(new in v2)*
5. **Division-level sub assignment granularity** — we're assuming one sub per division is good enough for the minimum viable workflow. Some projects may have multiple subs per division. *(new in v2)*

### ASSUMPTIONS WE'RE MAKING (v2):

1. The AI that reads specs can be extended to extract more signals (approval requirements, substitution language) — this is an engineering bet, not a product bet *(carried from v1)*
2. Public lead time data is accurate enough to be useful as a starting classification — doesn't need to be precise to add value *(carried from v1)*
3. PEs will adopt lightweight status tracking if it's integrated into the log they're already looking at — the bar is "less friction than a spreadsheet," not "zero friction" *(revised from v1)*
4. Sub assignment at the division level is granular enough for the minimum viable workflow *(new in v2)*
5. Manual response tracking (PE marks "received") is acceptable for 6 weeks — AI parsing of bid emails is a future enhancement *(new in v2)*
6. The "What Am I Waiting On?" view is a strong enough daily-use hook to change the engagement curve from "spike and drop" to sustained usage *(new in v2)*
7. Filter by division is low-effort to build (it should be — it's just UI filtering on an existing field) *(carried from v1)*

### REMOVED ASSUMPTIONS (no longer relevant in v2):

- ~~An LLM with good context engineering can generate useful procurement recommendations~~ — agent recommendations cut from core scope
- ~~PEs will find a prioritized, agent-advised log valuable enough to stay in-platform~~ — replaced by workflow-based retention thesis
- ~~Spec revisions happen frequently enough to drive return visits~~ — still true but no longer the primary retention mechanism
- ~~The diff comparison + agent explanation is a stronger retention hook than manual comparison~~ — spec diff cut from core scope

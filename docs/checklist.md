# Assignment Checklist

## Deliverables

### 1. One-Page Brief
- [ ] Write the "what and why" — what are we building?
- [ ] Write the "what not and why not" — what are we explicitly deprioritizing?
- [ ] Audience: team + CEO — keep it sharp, one page max
- [ ] Format: PDF, Google Doc, Notion page, or equivalent

### 2. Working Prototype
- [ ] Build a React + Vite prototype testable with a target user
- [ ] Deploy to Vercel
- [ ] Interactive — before/after enriched procurement log
- [ ] Enriched log with lead times, risk tiers, flags, status tracking
- [ ] Enhanced filtering & grouping (by risk, division, status)
- [ ] Bid workflow tracking (sub assignment, status transitions)
- [ ] Procurement tracker ("What Am I Waiting On?" + spec change alerts on in-flight items)
- [ ] Submit as a URL

### 3. Process Note
- [ ] Write a short paragraph on how you worked
- [ ] Cover: what you used AI for
- [ ] Cover: what you did yourself
- [ ] Cover: where you overrode or ignored AI output
- [ ] Cover: what assumptions you made
- [ ] Can go directly in the submission email

---

## Pre-Work (Context Gathering)
- [x] Convert assignment PDF to markdown
- [x] Research construction procurement industry — workflow, jargon, lead times
- [x] Compile public lead time data by CSI division
- [x] Document procurement log structure gap (Krane's 3 cols vs. industry standard)
- [x] Source a real construction spec (Griffin Hospital — Phase 2 Emergency Generator & Distribution Upgrades)
- [x] Download spec PDF into repo (`data/specs/griffin-hospital-generator-upgrades.pdf`)
- [x] Write extraction guide for agents (`data/EXTRACTION-GUIDE.md`)
- [x] Create sample procurement log from real spec (`data/sample-procurement-log.md`)

## Product Decision
- [x] Evaluate all three directions against weighted criteria
- [x] Initial decision: Direction A (Intelligent Procurement Log) — v1
- [x] Stress-test assumptions against assignment text and interview quotes
- [x] Correct framing: anti-pattern (not churn), CSV export = fragmented workflow
- [x] Identify v1 weakness: intelligence without workflow still loses to spreadsheets
- [x] Revised decision: A+C hybrid (enriched log + lightweight sub tracking) — v2
- [x] Document what we cut and why (agent recommendations, full spec diff, portfolio dashboard, full bid management, email parsing, email nudges, chat agent, schedule integration)
- [x] Map each signal from the assignment to our decision (see `brief-outline.md`)

## Prototype Planning
- [x] Choose tech stack (React + Vite + JS, driverly design system, Vercel)
- [x] Inventory design system components available
- [x] Write user stories — v2 aligned (9 stories: setup, views, filtering/grouping, workflow tracking, tracker dashboard)
- [x] Extract procurement log from real spec PDF (Story 4)
- [ ] Build and deploy prototype

---

## Constraints to Keep in Mind
- **Time budget:** 2-3 hours of focused work
- **Scenario constraint:** 2 engineers, 6-week build cycle
- **Business constraint:** First renewals in 10 weeks; low engagement = harder to renew
- **Scope constraint:** One thing — the CEO wants a single call
- **Design constraint:** Treat the product description as complete; don't assume capabilities beyond what's described
- **Competition:** The spreadsheet — we must do things spreadsheets can't, AND do the things spreadsheets do but in one place

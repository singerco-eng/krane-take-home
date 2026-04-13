# Product Manager — Take-Home Assignment

Thank you for your interest in Krane. This reflects the kind of work you'd actually do in this role: making product decisions from incomplete, competing information.

**Time:** Target 2-3 hours. Don't over-invest.  
**Turnaround:** One week from when you receive this.

---

## The Scenario

You're a PM at a construction technology company whose AI platform helps general contractors automate the start of their procurement workflow. Users upload a project's construction specifications, the AI reads them, and a structured procurement log is generated within minutes — listing each specified item with its spec section reference, description, and basis of design. The product is live with paying GC customers on active projects.

You've been on the job for two weeks. Here's what you've learned so far from customer conversations, product data, and internal context. Your job is to decide what the team builds next.

---

## Your Inputs

### From a user interview with a project engineer at a mid-size GC

> "The AI gives me a list of everything that needs to be procured. That's helpful — saves me a couple days of reading. But what I actually need to figure out is: what do I need to act on right now? Some of these items have 16-week lead times and we're already behind schedule. Some are commodity items I can order whenever. Some require owner approval before I can even send them out to bid. The log treats everything the same — it's just a flat list sorted by spec section. I still spend half my day going through it line by line figuring out what's urgent, what's risky, and what can wait."

### From a sales call with a VP of Preconstruction at a top-20 GC

> "We're evaluating your platform for our national program. The thing that would get us to roll this out across all our regions is a way for my preconstruction directors to see procurement status across every active project in one view. I need to know in real time where each project stands — which are behind on procurement, which long-lead items haven't been ordered yet, and where we have risk. Right now I'm waiting two weeks for stale Excel reports from each project team. If your platform can give me that visibility, we'll bring you into our next 8 projects."

### From product analytics

Engagement spikes during the first week of a new project — when specs are first uploaded and procurement logs are generated — then drops sharply. But the pattern isn't uniform: on larger, more complex projects (50+ spec sections), a subset of power users return regularly to re-check extractions as specs get revised and track which divisions they've reviewed. On smaller projects, users almost never come back after day one. Platform logs show that 72% of users export the procurement log to CSV within their first session. One project engineer on a large hospital project explained why:

> "Once I have the list, I need to break it up by trade and send each sub their scope to bid on. That part I could do in your platform if it let me filter and share by division. But then the real work starts — I get three quotes back for structural steel, each with different pricing, different lead times, and one proposing a substitution that needs architect approval. I need to compare those side by side, track which subs haven't responded, follow up on the ones that are late. For this hospital project, I'm managing 20 subs across 40 divisions, each in a different stage. The procurement log tells me what I need to buy. My spreadsheet tracks what's actually happening — who quoted what, which quotes I'm still waiting on, which substitutions need owner sign-off. That's the part I live in every day, and none of it exists in your platform."

### Business context

The company has strong customer growth and an expanding sales pipeline. The CEO can commit two engineers to your initiative for the next six-week cycle. The first customer renewals are ten weeks out, and the team knows from experience that accounts with low product engagement are harder to renew. The CEO has asked you to make the call: **what is the one thing the team builds this cycle?**

---

## What to Submit

### 1. A one-page brief

What are you building and why? What are you *not* building and why?

Write this for your team and your CEO. We'd rather read one sharp page than five thorough ones.

### 2. A working prototype

Build a prototype you'd put in front of a target user to test whether your proposed direction is right. Focus on the idea, not the polish. Submit it as a URL or a file we can open.

### 3. A process note

A short paragraph on how you worked: what you used AI for, what you did yourself, where you overrode or ignored AI output, and what assumptions you made. We care about your judgment in using AI, not just which tools you used.

---

## Quick Reference

Construction specifications are organized by CSI MasterFormat divisions (e.g., Division 03 — Concrete, Division 09 — Finishes, Division 23 — HVAC). A procurement log typically lists specified products and materials with their spec section reference, description, manufacturer or basis of design, and any performance requirements extracted from the spec.

---

## Guidelines

- **Use any AI tools you want.** We expect it. The quality of your output, not whether you used certain AI tools, is what we evaluate.
- **Submit in any format you'd like.** The brief can be a PDF, Google Doc, Notion page, or equivalent. The prototype can be a deployed URL, a GitHub repository, an HTML file, or anything we can interact with. The process note can go in your submission email.
- **Focus the process note on decisions.** Where you overrode AI output tells us more than which tools you used.
- **Base your decisions on this scenario.** Treat the product description as complete — don't assume capabilities beyond what's described.
- **Don't over-invest.** This is scoped for 2-3 hours of focused work. We respect your time.

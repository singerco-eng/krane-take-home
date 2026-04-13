# Make the Procurement Log the Place PEs Work

72% of users export the procurement log to CSV in their first session. That's a strong signal that the work that follows is still happening outside the product. With first renewals ten weeks out, accounts that stay in this pattern are the ones most at risk.

## Highest Impact Problems

**Problem 1: Everything looks equally important.** A structural item with a 16-week lead time sits next to a commodity fixture you can order anytime, sorted by spec section number. PEs are spending half their day sorting through it to figure out what's urgent, what's risky, and what needs owner approval before it can go to bid.

**Problem 2: The actual work lives in a spreadsheet.** None of the downstream workflow exists in the platform. PEs are manually tracking status, coordinating subs, and chasing responses in a spreadsheet. When specs get revised, they're doing all of that over again from scratch.

## Our Solution

We extend the procurement log so it supports the work PEs are currently doing in spreadsheets, by enriching what we extract and adding lightweight workflow tracking to the same table.

**Smarter extraction.** On extraction, we surface lead times, substitution restrictions, and owner approval requirements alongside each item. PEs get what they need to make scheduling decisions without manual classification.

**Filtering and grouping.** PEs can filter across any extracted data to isolate a trade's scope or see what needs attention. This is how a PE breaks up the log by trade before sending each sub their scope to bid on.

**Sub association.** When a PE filters down and sends a sub their scope to bid on, the platform records that as part of the send. The sub is now associated with those items automatically. When specs get revised on items that have already been sent out, the PE can see the change and who has the outdated scope.

## What we are not building and why

**We are not building full bid management.** Quote comparison, substitution tracking, and approval routing are real needs, but they come after PEs can prioritize what to send out and track who they sent it to. Right now they can't do either. We build that foundation this cycle, and bid management becomes a natural next step.

**We are not extending AI into procurement decision-making.** A risk flagging system that tells PEs what to prioritize is valuable, but accuracy matters. If it gets a lead time wrong or misses an owner approval requirement, the PE loses trust. Building that and validating it against real project data takes longer than six weeks. The enriched extraction we are building extends capabilities we already have confidence in, and the engagement problem today is a workflow gap, not an intelligence gap.

**We are not building cross-project visibility.** This requires both a new dashboard surface and a way to track procurement status per item. Today the platform doesn't track any downstream workflow — bidding, awarding, ordering — so there's no meaningful status to roll up. We start capturing the first piece this cycle with sub association, and the fuller picture develops as we build out the workflow in future cycles.
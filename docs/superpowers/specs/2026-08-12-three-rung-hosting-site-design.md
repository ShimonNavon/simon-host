# Simon Host — three-rung hosting site

**Date:** 2026-08-12
**Status:** implemented

## Problem

The site sold one thing: a built-and-hosted website for a small business at ₪99/month. The actual business is a small data center, and the intent is to also sell (a) an app running on managed infrastructure with a database and backend ready to go, and (b) a plain rented server. Those two speak to developers; the existing page speaks to a shop owner who doesn't know what a server is.

## Decisions

**Structure — one ladder, not three products.** The offerings form a single axis: *how much of the work do you want to do yourself.* A business owner does none, an app developer writes code and nothing else, a sysadmin does everything. Presented as one page with three anchored sections rather than separate sites or an audience toggle. No router.

**Language — Hebrew RTL throughout,** including the developer-facing rungs. The target is the Israeli market.

**Funnel — storefront with manual provisioning.** No signup, no card, no auto-provisioning. Every CTA is a WhatsApp deep link. Each link carries a plan-specific pre-filled message so an inquiry identifies its rung without a form or backend. Self-serve is explicitly out of scope.

**Pricing.** Set against researched Israeli market rates:

| Rung | Price | Market comparison |
|---|---|---|
| אתר לעסק | ₪99 | Shared hosting alone: uPress ₪25, Vangus ₪34, JetServer ₪64, WEBSTUFF ₪99 — none of which build the site |
| האפליקציה שלך באוויר | ₪149 | No Israeli competitor. Nearest is Supabase Pro ($25) + Railway ($5) ≈ ₪115, English-only, unassisted |
| שרת פרטי | ₪79 | Box ₪25 (1GB), LiveDNS ₪54 (1GB) / ₪175 (4GB), BezeqInt ₪89, Interspace ₪99, Triple C ₪119 |

Prices deliberately do not ascend. The page states why: *"המחיר לא הולך על הברזל — הוא הולך על כמה שאני עושה בשבילך."* This preserves the original "one fair price, no base/premium/platinum" promise — it becomes one price per rung, with no spec tables and no upsells.

**Copy discipline.** Sells safe / simple to start / no surprises. No CPU, RAM, GB, uptime percentages, or infrastructure detail anywhere on the page — a deliberate choice, since customers don't buy hardware specs and the operation shouldn't make availability claims it can't guarantee.

**Server rung is screened.** Its CTA is *"בוא נדבר על שרת"* rather than a buy action, because handing root to a stranger is an operational decision, not a checkout.

## Signature element

The **involvement bar**: a track where solid orange is Simon's share of the work and hatched is the customer's. It appears twice — as a vertical staircase of three linked stops in the hero (the chooser, orange visibly receding step by step) and as each plan section's eyebrow. The white track base keeps it legible on both paper and deep-navy sections. Section backgrounds walk the same axis: paper → sky → deep navy, so the page darkens as the customer takes control.

## Structure

```
frontend/src/
  content/plans.ts        — the three plans as typed data; single source for price, copy, WhatsApp prefill, involvement %
  components/
    InvolvementBar.tsx    — the signature device
    Ladder.tsx            — hero staircase / chooser
    Hero.tsx  Header.tsx  Footer.tsx  Contact.tsx
    PlanSection.tsx       — one plan rendered at a given tone (paper | sky | sea)
    Trust.tsx             — safe / simple / no surprises
    HowItWorks.tsx        — a real sequence, so the numbering carries information
    Faq.tsx               — objection handling, incl. exit terms and why it's cheaper
    WhatsAppButton.tsx    — every CTA; takes a pre-filled message
    WhatsAppCTA.tsx  BrowserDemo.tsx
  App.tsx                 — composition only
```

`App.tsx` was a flat 161-line page with inline content arrays; three product tracks would not fit that shape, so content was extracted to data and sections to components as part of this work.

## Out of scope

- Self-serve signup, billing, provisioning API, customer dashboard.
- Any change to the Django backend. The `leads` app remains wired at `/api/leads/` but unused by the frontend since the WhatsApp CTA replaced the form; it is left in place for a future signup path.
- Spec tables or per-size server tiers.

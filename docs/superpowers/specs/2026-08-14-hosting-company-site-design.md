# Simon Host — Hosting-Company Site Design

**Date:** 2026-08-14
**Status:** Approved direction; spec pending Simon's review
**Supersedes:** the single-page three-rung layout (2026-08-12 spec) — the brand, funnel, and content-as-data pattern carry forward.

## Goal

Reposition the site from a personal three-rung pitch page into a full
hosting-company site (HostGator/Vercel class) that converts Israeli
small businesses and builders into clients — while keeping what makes
it Simon's: one human on WhatsApp, the involvement-bar identity, and
now a community of entrepreneurs around the hosting.

Hebrew RTL only. WhatsApp-only funnel. No checkout, no billing.

## Site structure — five prerendered pages

| Route | Page | Price |
|---|---|---|
| `/` | Homepage | — |
| `/wordpress` | Managed WordPress hosting | ₪49/mo |
| `/websites` | Finished website (we build + host) | ₪99/mo |
| `/apps` | App + managed Postgres hosting | ₪149/mo |
| `/vps` | Private server | ₪79/mo |

- **Routing:** `react-router-dom` (the only new runtime dependency).
  English slugs — Hebrew URLs mangle in WhatsApp shares.
- **Prerender:** `scripts/prerender.mjs` walks all five routes via
  `StaticRouter`, emitting `dist/index.html` and
  `dist/<slug>/index.html`. Every page is complete static HTML for
  crawlers; React hydrates for client-side nav.
- **Serving:** the frontend container's nginx gets a `try_files
  $uri $uri/index.html /index.html` rule so deep links resolve.
- The per-route thin-page guard stays: prerender refuses to ship any
  route under a minimum HTML size.

## Content model

`src/content/plans.ts` becomes `src/content/services.ts`. The typed
content-as-data pattern is the law of the repo: **sections render from
data; changing copy is never a JSX hunt.**

Each of the 4 services carries:

- Card content (homepage grid): name, tagline, price, `mine` percent
  (involvement bar), 3–4 headline bullets, CTA label.
- Page content: hero line, who-it's-for, full included list, market
  comparison, mini-FAQ (2–4 Q&As), plan-tagged WhatsApp message.
- `slug` for routing and per-page SEO.

New WordPress service at **₪49/mo**: migration from the current host
included, wp-admin stays the client's, dailies + updates + human
support. Involvement bar extends from 3 rungs to 4.

Additional content modules:

- `community.ts` — community section copy, events blurb, WhatsApp
  group link (**placeholder until Simon supplies the real link; the
  join CTA must not render with a placeholder href**).
- `portfolio.ts` — list of `{name, url, screenshot, blurb, kind:
  "own" | "client"}`. Ships with `own` entries only (CUTPOINT
  community, Screening Room, Panim). `client` entries (the demo
  clones) are added **only after the client's written OK** — the
  section renders whatever the data holds and looks complete either way.
- `seo.ts` — grows per-route metadata (see SEO).

## Homepage, top to bottom

1. **Sticky header** — logo + nav links to the four service pages +
   WhatsApp button.
2. **Hero** — repositioned: Israeli hosting company, a human on
   WhatsApp, and a community of entrepreneurs. The 4-rung
   involvement-bar staircase stays the hero visual.
3. **Pricing grid** — the HostGator move: all four services as cards
   in one screen, each with price, involvement bar, top bullets, two
   CTAs (page link + WhatsApp).
4. **Infrastructure section** — concrete, no client names: own
   hosting control plane (ISPConfig work translated to claims:
   per-site PHP versions, routine cPanel migrations), clustered
   hypervisors, Cloudflare edge, daily off-site backups, monitoring,
   hardened-by-default.
5. **Who's behind this** — Simon by name, stated exactly as **"בוגר
   אוניברסיטת הרווארד"** (Harvard University graduate — Simon's
   stated wording; no degree/field named unless he supplies one).
   Approachability is the differentiator: the founder answers the
   WhatsApp. Optional photo slot; section works without one.
6. **Community** — "לא רק אחסון — קהילה": clients join a community of
   fellow entrepreneurs; in-person events + WhatsApp group. CTAs:
   join the group (gated on real link), hear about the next event
   (plan-tagged WhatsApp message).
7. **Portfolio** — live linkable projects from `portfolio.ts`.
8. **Numbers strip** — aggregate proof: sites hosted, migrations
   done, uptime. Numbers must be real; Simon supplies/confirms them
   before launch.
9. **How it works / FAQ / Contact / Footer** — carried forward,
   copy updated to the 4-service reality.

## Service page template

One shared template component rendered from `services.ts`:

hero (name, tagline, price with marker highlight, involvement bar) →
included list → who-it's-for → market comparison → mini-FAQ →
WhatsApp CTA. Footer/header shared with home.

The WordPress page additionally gets the **migration story** block:
we run our own hosting platform, cPanel migrations are routine,
wp-admin stays yours, zero downtime — this is the acquisition wedge
for clients sitting on legacy Israeli cPanel hosting.

## SEO

- Per-route `<title>`, meta description, canonical, and Open Graph
  tags injected at prerender time.
- JSON-LD: `ProfessionalService` on `/` (as today), plus a
  `Service` + `Offer` node per service page.
- `sitemap.xml` and updated `robots.txt` generated at build.
- Target: five indexed Hebrew landing pages (e.g. "אחסון וורדפרס
  מנוהל", "אחסון אתרים לעסקים", "שרת וירטואלי בישראל").

## Visual design

The existing brand carries forward and gets elevated, not replaced:
sea/jaffa/paper palette, Suez One + Heebo, marker highlight, the
involvement bar as the recurring identity. Frontend-design pass at
implementation time; house rules apply (no AI-slop defaults, bold
typography, staggered motion, layered backgrounds).

## What does not change

- Backend: Django + DRF `leads` app stays dormant; no API changes.
- Docker topology: same three containers, same ports (8008/8009).
- Funnel: WhatsApp deep links only; every CTA carries a plan-tagged
  pre-filled message.
- Deployment: GitHub → clone on debian01 → docker compose; host
  nginx + Cloudflare Tunnel untouched. Read
  `/srv/the-way-we-do-things-including-NGINX.md` before deploying.

## Testing & verification

- **Vitest suite** over the content modules: every service has all
  required fields, slugs unique, WhatsApp messages non-empty and
  plan-distinct, no placeholder links in shipping content.
- **Prerender guard** per route (thin-page refusal), plus a build
  check that all five HTML files exist in `dist/`.
- **Manual verification before done:** every page viewed in the
  browser (RTL, mobile widths), every CTA's WhatsApp deep link opens
  with the right pre-filled text, `curl` on built output shows real
  HTML per route, sitemap/robots valid.

## Launch gates (content Simon must supply/approve)

1. WhatsApp community group link (community join CTA hidden until then).
2. Real aggregate numbers for the numbers strip.
3. Client's OK before any client demo appears in the portfolio.
4. Optional: photo for the about section; degree/field wording if he
   wants it more specific than "Harvard University graduate".

## Out of scope

Online checkout/billing, self-serve provisioning, English locale, a
dedicated community/events page, blog. Each becomes its own
brainstorm if wanted later.

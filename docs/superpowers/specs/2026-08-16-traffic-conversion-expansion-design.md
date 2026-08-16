# Traffic and Conversion Expansion Design

**Date:** 2026-08-16  
**Status:** Approved  
**Goal:** Turn Simon Host's new project library into qualified client traffic without buying a domain or ads.

## Chosen approach

Use a proof-led product-studio approach. Two focused service pages answer different searches, public GitHub repositories create relevant backlinks, and a reusable LinkedIn package turns six real projects into a steady publishing queue.

The alternatives were rejected for now:

- Duplicating the current `/launch` page would be faster but would create thin, competing pages.
- Replacing `/launch` with `/mvp-development` would simplify the route list but would discard a useful conversion-focused offer and its existing links.
- Paid-campaign pages would be premature while organic proof and distribution are still being established.

## Audience and conversion

The pages serve two separate buyers:

1. An established business whose work is trapped in spreadsheets, WhatsApp messages, email, or disconnected tools.
2. A founder or business owner with a tested idea who needs a focused first product rather than an open-ended software project.

Both pages use one low-friction call to action: describe the problem in one WhatsApp message and receive a free one-page plan within 48 hours. The plan states the first useful version, what is intentionally left out, the likely technical shape, and the ongoing hosting cost. No unsupported price or performance claims are introduced.

## New pages

### `/business-systems`

Search intent: custom business software, operational systems, dashboards, workflow automation, and internal tools in Israel.

Page sequence:

1. Full-width hero: "The business already works. Its tools should work together." One direct WhatsApp action.
2. Recognition: a short list of operational symptoms such as duplicate entry, unclear status, and work that lives in one employee's head.
3. Process: map the workflow, build the smallest useful system, connect it to the team's real work, then operate it after launch.
4. Proof: Kehila Budget Manager, CUTPOINT inventory operations, and the YC lobbying platform. Private details remain generalized; only already-public URLs are linked.
5. What the client owns: code, data, access, and an exit path.
6. FAQ and final action.

### `/mvp-development`

Search intent: MVP development, startup product development, and building a first software version in Israel.

Page sequence:

1. Full-width hero: "A first product should answer one real question." One direct WhatsApp action.
2. Scope: who this is for and the signs that an idea is ready to build.
3. Process: decide the riskiest assumption, define the smallest complete flow, build and deploy, then learn from real use.
4. Proof: BAMA, Rescue Alert System, and Vivian NFC. Each links to its case study; only public live URLs are exposed.
5. Clear distinction from `/launch`: this is the durable service explanation; `/launch` remains the specific 30-day offer.
6. FAQ and final action.

## Visual thesis

An editorial technical workshop: deep navy surfaces, warm paper backgrounds, oversized Hebrew typography, orange construction marks, and real project screenshots used as evidence rather than decoration.

The first viewport is a poster, not a card grid. Each later section has one job and uses dividers, numbered steps, and full-width screenshot bands instead of a mosaic of generic cards.

## Content plan

- Hero: audience, promise, one action.
- Support: the problem in the buyer's own words.
- Detail: a simple working process and ownership boundaries.
- Proof: three relevant projects with real screenshots and case-study links.
- Final CTA: repeat the free written-plan offer.

## Interaction thesis

- Reuse the site's restrained staggered hero entrance.
- Proof screenshots lift and sharpen slightly on hover while the adjacent case-study link gains emphasis.
- Process rows reveal through the existing CSS rise system and preserve `prefers-reduced-motion` behavior.

No new animation library is needed.

## Information architecture and SEO

- Add both routes to the shared route registry so prerendering and the sitemap include them automatically.
- Add unique titles, descriptions, canonical URLs, Open Graph data, breadcrumbs, FAQ schema, and Service schema.
- Add contextual links from the homepage audience paths, header/footer where space permits, `/work`, relevant case studies, and `/launch`.
- Keep `/launch` indexable, but make its offer-specific language and internal links distinguish it from the general MVP service.
- Use the existing project images as Open Graph and on-page proof assets.

## GitHub distribution

Reframe the public profile README from a learning-oriented bio into a client-facing engineering profile. Fix placeholder GitHub links and feature Simon Host, BAMA, The Craft, Rescue Alert System, and selected business systems.

Add one restrained "Live project / case study" block to relevant public repositories. Target only repositories represented in the portfolio, not the entire account, to avoid spam. Private repositories stay private and receive no edits.

## LinkedIn package

Create seven Hebrew drafts:

- One announcement for the 16-project portfolio.
- One post each for BAMA, The Craft, Rescue Alert System, Kehila Budget Manager, Vivian NFC, and the YC lobbying platform.

Each draft follows: practical problem, one interesting engineering choice, privacy-safe outcome, link to the case study, and a soft invitation to discuss a similar problem. No post is published automatically.

## Safety and truthfulness

- Do not reveal private repository names, source code, credentials, internal hostnames, client data, financial figures, or non-public screenshots.
- Public website links are allowed when already approved or publicly visible.
- Do not invent user counts, revenue, conversion lifts, delivery dates, or testimonials.
- GitHub changes are limited to public repositories and reversible README commits.

## Verification

- Unit/content tests cover route uniqueness, metadata, schema, and sitemap inclusion.
- Production build prerenders both pages.
- Inspect desktop and mobile layouts with RTL content.
- Push to `main`, wait for CI/CD, verify HTTP 200, canonical tags, schema, and sitemap entries.
- Re-submit the sitemap once after deployment and inspect the two new URLs in Search Console.


# Simon Host SEO Growth Redesign

**Date:** 2026-08-15  
**Status:** Approved direction; implementation pending written-spec review

## Objective

Increase qualified organic traffic to Simon Host and convert more of that traffic into measurable WhatsApp conversations. The redesign must make the business easier to understand and trust, not merely change its appearance.

The primary acquisition audience is Israeli web agencies and freelancers hosting client WordPress sites. Startup founders and small businesses remain important secondary paths with dedicated pages. The existing four hosting products, transparent prices, domain search, analytics, and CRM stay intact.

## Evidence and constraints

- The current technical SEO baseline is strong: prerendered route HTML, unique metadata, canonical URLs, sitemap, FAQ and service structured data, Search Console verification, GA4, and campaign-tagged WhatsApp events.
- The homepage currently gives roughly equal weight to four products, domain search, community, infrastructure, portfolio, process, and FAQs. That breadth weakens the primary commercial story.
- The growth repository identifies agencies as the primary ICP and a free hosting-bill audit plus a risk-free sample migration as the strongest lead magnets.
- Simon's public proof includes his infrastructure background, Harvard alumni status, public GitHub work, and live products. No unapproved client names, testimonials, savings figures, capacity figures, or case-study claims may be introduced.
- Competitors commonly lead with discounted plans and long feature matrices. Simon Host should compete on accountability, migration effort removed, transparent terms, and direct access to the person operating the infrastructure.
- The existing local checkout contains unfinished blog work. Implementation will occur in an isolated worktree based on clean `origin/main`; those local files will not be overwritten.

## Strategic approaches considered

1. **Broad hosting marketplace:** keep all four products equal on the homepage. This protects breadth but leaves visitors to determine the right path themselves and produces a generic hosting-company impression.
2. **Agency-only site:** make every primary page about agency migrations. This maximizes focus but hides credible founder and small-business revenue paths.
3. **Agency-led authority site with a content engine:** make the agency problem the homepage's main narrative, then route founders, small businesses, and technical buyers to dedicated pages. Publish useful Hebrew guides around the existing services. This is the selected approach because it combines conversion focus with a wider organic-search footprint.

## Visual thesis

Simon Host should feel like a calm, founder-operated infrastructure company: deep sea blue, warm paper, one restrained orange accent, strong Hebrew editorial typography, real human presence, and real products rather than generic server illustrations. The first viewport should read as a branded poster, not a pricing dashboard.

Use a real portrait of Simon, sourced from his own LinkedIn profile and stored locally as an optimized asset, together with real screenshots of public projects. Do not hotlink LinkedIn media. Retain Heebo for body copy and Suez One for display copy, with no additional typeface. Self-host font files if the licensing and fetched files can be verified; otherwise keep the current non-blocking Google Fonts setup.

The interface will remain Hebrew RTL, responsive, and accessible. Visual hierarchy will rely on scale, whitespace, rules, cropping, and contrast. Cards will be reserved for actual selectable plans or interactive elements; proof, comparisons, and process content will use editorial rows, split bands, and dividers.

## Content plan

### 1. Homepage hero: identify, promise, convert

The full-bleed first viewport will make `Simon Host` the loudest brand element and speak first to agencies. The central promise is that an agency can move client sites without babysitting servers, tickets, or panels, while retaining its clients and their existing WordPress workflow.

The primary CTA is the free hosting-bill audit. The secondary link serves founders who want to launch a product. Supporting microcopy states the real terms: the audit is free, a test migration is reversible, and no invoice is issued before sign-off. Simon's portrait and a compact, truthful infrastructure motif provide the visual anchor.

### 2. Immediate proof: what stays and what changes

A cardless comparison will answer the migration objection quickly:

- Stays: client ownership, wp-admin, domains, design, content, and the agency-client relationship.
- Changes: infrastructure management, backups, monitoring, PHP isolation, support path, and hosting bill.

This section links to `/agencies` for the full offer and to WhatsApp with a dedicated campaign identifier.

### 3. Concrete operating proof

Show a short infrastructure strip with only verifiable facts: daily off-box backups, per-site PHP, Cloudflare edge, monitoring, encrypted access, and direct support. A real-project gallery follows with screenshots and links to public products. The gallery may include only Simon-owned projects or clients with written permission.

### 4. Secondary journeys

Provide three concise editorial paths rather than a four-card wall:

- Agencies: audit and migration.
- Founders: a written build plan and a first version in 30 days.
- Small businesses and builders: transparent hosting/service ladder, leading to the four existing service pages.

Prices remain visible and continue to explain that the cost reflects Simon's involvement rather than a simple hardware hierarchy.

### 5. Founder credibility

Introduce Simon with his real photo, LinkedIn and GitHub links, Harvard alumni statement, and a concise explanation of his DevOps, platform, cloud, database, and AI background. This section establishes why one person can responsibly sell both builds and infrastructure without turning the page into a résumé.

### 6. Educational content and final CTA

Surface the newest or most relevant guides, then finish with one focused WhatsApp CTA. Community content remains available but will not interrupt the primary acquisition narrative until there is a live group link, event proof, or another concrete action.

## Page and route architecture

Existing routes remain stable:

- `/`
- `/agencies`
- `/launch`
- `/websites`
- `/wordpress`
- `/apps`
- `/vps`

Add a prerendered `/blog` index and an initial cluster of substantial Hebrew articles:

- `/blog/wordpress-hosting-cost-israel`
- `/blog/move-wordpress-without-downtime`
- `/blog/cpanel-reseller-alternative`
- `/blog/small-business-website-cost`
- `/blog/israel-vps-guide`
- `/blog/hosting-web-app-postgres`

Each article must answer a real search question, contain original practical guidance, disclose trade-offs, link naturally to one relevant service or offer, and avoid keyword stuffing. Articles are content data rendered through a shared template so metadata, sitemap entries, RSS, internal links, and structured data cannot drift.

An explicit not-found route will replace the current wildcard-to-home behavior. Unknown paths must return a genuine HTTP 404 in production and carry `noindex`, while client-side navigation shows a useful Hebrew recovery page.

## SEO system

Retain static prerendering for every indexable route. Extend the route metadata model to support page type, publication and modification dates, breadcrumb labels, author, and per-route social metadata.

Structured data will use one connected graph:

- `Organization`/`ProfessionalService` for Simon Host.
- `Person` for Simon, connected as founder and author, with `sameAs` links to his LinkedIn and GitHub profiles.
- `WebSite` and `WebPage` for site identity and route context.
- `Service` and `Offer` for paid services.
- `FAQPage` only where the same questions are visibly rendered.
- `BlogPosting` and `BreadcrumbList` for articles.

Generate `sitemap.xml` with canonical URLs and meaningful `lastmod` values, plus `rss.xml` for articles. Keep one canonical hostname, clean trailing-slash normalization, indexable 200 responses, and no sitemap entries for 404 or utility routes. Titles and descriptions will be written for Hebrew search intent and click clarity, not templated keyword repetition.

Add contextual internal links among guides, service pages, the agency offer, and the founder offer. Header and footer navigation must expose the blog without turning the header into a crowded product directory.

Social preview images should be locally hosted and sized correctly. The default image may remain during the first release, but the architecture will allow per-article images without metadata changes.

## Components and boundaries

- `content/site.ts`: brand, founder, external profile links, contact details, and shared claims.
- `content/services.ts` and `content/offers.ts`: existing product and offer data, retained as pricing truth.
- `content/articles.ts` plus article types: all blog metadata and bodies.
- `content/seo.ts`: pure route metadata and structured-data generation.
- `routes.tsx`: the only indexable route manifest used by React, prerendering, sitemap, RSS, and the production static server.
- Homepage section components: hero, migration comparison, infrastructure proof, audience paths, project proof, founder, guides, final CTA.
- Shared article template: breadcrumb, title, dates, reading time, body, contextual CTA, author, and related articles.
- Not-found page: navigation recovery and `noindex` behavior.

Each unit must be understandable from its public props/data shape and avoid embedding mutable business facts inside presentation JSX.

## Interaction thesis

Motion should make the page feel deliberate without slowing it down:

1. A short staggered hero entrance for brand, headline, copy, CTA, and portrait.
2. Scroll-triggered reveals for proof rows and project media, using one consistent opacity/translate language.
3. Restrained CTA and project-image hover transitions that sharpen affordance.

A compact mobile CTA may appear after the visitor passes the hero; it must not cover content and will use its own analytics campaign name. All motion must honor `prefers-reduced-motion`, avoid layout shift, and remain smooth on inexpensive mobile devices.

## Analytics and data flow

The browser receives prerendered HTML and hydrates the existing React app. Navigation changes update document metadata consistently. Search engines receive the same visible claims as structured data.

Every WhatsApp CTA continues to build a prefilled message and emit a best-effort event to the existing Django endpoint without delaying navigation. New placements receive stable campaign names such as `hero-agency-audit`, `proof-agency-audit`, `mobile-agency-audit`, `audience-launch`, and `article-<slug>`. Existing first-touch UTM capture remains unchanged.

No new form, cookie-heavy personalization, CMS, or analytics platform is required for this release.

## Error handling and accessibility

- Domain-search failures retain their current honest `unknown` behavior and never guess availability.
- Analytics errors remain invisible to the visitor and never block WhatsApp.
- Broken project media must preserve readable alt text and links.
- Missing optional founder/project images must fall back to a purposeful text layout rather than broken media.
- The mobile menu must be keyboard operable, correctly labelled, dismissible, and focus-safe.
- Heading order, landmarks, contrast, focus rings, touch target sizes, RTL reading order, and reduced-motion behavior will be checked explicitly.
- Unknown server routes return 404; known prerendered routes return 200; assets retain normal cache behavior.

## Performance approach

Keep the current lightweight React/Vite architecture and avoid adding a component or animation framework. Optimize raster assets to modern formats with explicit dimensions. Defer below-the-fold media, minimize font weights, preserve prerendered content, and avoid client-only content that would shift after hydration.

The target is a production build with no hydration errors, no unnecessary new runtime dependency, and a strong mobile Lighthouse result. Performance measurements are validation signals rather than invented marketing claims.

## Testing and verification

Automated checks:

- Existing frontend and backend tests continue to pass.
- Content tests enforce valid prices, launch gates, article uniqueness, dates, summaries, internal targets, and required metadata.
- SEO tests cover canonical metadata, structured-data types, visible FAQ parity, article schema, sitemap membership, RSS membership, and exclusion of unknown routes.
- Production build prerenders every route successfully.
- Static-server tests confirm known routes return 200 and unknown routes return 404.

Manual checks:

- Review desktop and mobile renderings of the homepage, agency page, founder page, one service page, blog index, article, and 404 page.
- Verify keyboard navigation, mobile menu, reduced motion, domain search, external project links, WhatsApp messages, and campaign emission.
- Inspect generated HTML without JavaScript for title, description, canonical, headings, visible body content, and JSON-LD.
- Validate `robots.txt`, `sitemap.xml`, `rss.xml`, social-image responses, and production HTTP status codes.
- Run a performance/accessibility audit against the production build and fix material regressions.

## Deployment and rollback

Implementation is committed in the isolated worktree, tested, and then pushed as a fast-forward update to GitHub `main`, as explicitly authorized. The existing Debian timer should fetch the commit within one minute and rebuild the Docker Compose stack.

After deployment, confirm the server checkout SHA, container health, production route statuses, sitemap contents, structured data, and the key CTA. If deployment validation fails, fix forward when safe; if the release is unusable, revert the release commit through Git rather than editing `/srv/simon-host` directly.

## Non-goals

- No fabricated testimonials, logos, customer counts, savings claims, or urgency.
- No price changes without Simon's explicit instruction.
- No paid advertising, outbound messages, CRM migration, or broader marketing automation.
- No full CMS or admin authoring interface.
- No English translation in this release.
- No direct production-server source edits.

## Acceptance criteria

The work is complete when the redesigned pages and initial article cluster are live on the canonical domain; every indexable route is prerendered with correct metadata and status; the site is usable on mobile and by keyboard; analytics distinguish the new conversion paths; CI is green; the Debian deployment matches GitHub `main`; and no unapproved claims or local unfinished work have been published accidentally.

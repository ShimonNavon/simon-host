# Simon Host Project Library and Case Studies

**Date:** 2026-08-16  
**Status:** Approved design, awaiting written-spec review

## Objective

Expand Simon Host from a three-project proof section into a credible body of work that helps prospective clients understand Simon Navon's breadth: product design, full-stack development, AI tooling, databases, deployment, and ongoing operations. The result must impress quickly, create additional search entry points, and protect private source code, customer data, internal tools, and infrastructure details.

## Agreed Privacy Boundary

A project may be named and linked when it has a public website that an ordinary unauthenticated visitor can open. A screenshot may show only that public-facing view. A public GitHub repository may also be linked.

The site must never publish:

- private GitHub repository links or private source code;
- admin screens, authenticated product areas, customer records, analytics, or internal dashboards;
- credentials, environment values, IP addresses, ports, tunnels, backup locations, or deployment secrets;
- client information that is not already visible on the public website;
- performance, revenue, conversion, user-count, or business-impact claims that cannot be verified publicly.

If a project has no safe public view, it is either omitted or described anonymously without a link or identifying screenshot. A public URL is permission to show the public page, not permission to expose the implementation behind it.

## Visual Thesis

The project library is a digital exhibition: large real screenshots, editorial typography, strong whitespace, and a small amount of orange annotation on the existing navy-and-paper Simon Host system. The work itself supplies the visual energy; decorative cards, icon grids, and dashboard-like filters are unnecessary.

## Content Plan

### Homepage

The existing portfolio section becomes a four-project preview. It features:

1. BAMA webinar marketplace;
2. The Craft professional community;
3. Rescue Alert System;
4. Vivian NFC.

Each entry uses a large screenshot, project category, one-sentence explanation, and a link to the project or its case study. The section ends with a prominent link to `/work` labeled in Hebrew as “לכל הפרויקטים”. The homepage remains a conversion page; it does not attempt to display the full catalogue.

### Work Index

A new prerendered `/work` page presents sixteen verified projects grouped into four editorial chapters. There is no client-side filtering in the first release.

#### Products and platforms

- BAMA — Hebrew webinar discovery and lead-generation marketplace;
- The Craft — application and vetting platform for beauty professionals;
- Rescue Alert System — location-based emergency volunteer coordination;
- Kehila Budget Manager — Hebrew budgeting and expense workflow for a community;
- Vivian NFC — public product story for NFC-enabled collectible cards;
- YC Lobbying — public-affairs company platform.

#### Communities and media

- CUTPOINT Community — Hebrew social network;
- Screening Room — self-hosted Go video library;
- Panim — video-dating product launch and beta-signup experience;
- Mazkeret News — local publishing platform.

#### Business and brand websites

- MIA Dynamics concept redesign;
- Inner Form coaching website;
- Benny Fluman business-consulting website;
- Simon Navon systems consultancy.

#### Owned infrastructure and proof

- Simon Host;
- Simon Navon's portfolio at navonsimon.com.

Before implementation, every named URL must pass the public-view check described below. If one of the sixteen is not safely viewable, replace it with the first suitable verified site from this ordered reserve list: Americanspa, Arvatz, Costanza Films, Inwise, MyCleanBit, then Otoritcom. The shipped catalogue therefore remains at sixteen records without inventing an image or weakening the privacy rule.

Every project record includes a stable slug, public name, category, public URL, optional public repository URL, short description, Simon's role, a concise technology list, screenshot path and alt text, featured rank, and optional case-study slug. Private repository identifiers are not stored in frontend content.

### Case Studies

Six original build stories join the existing blog system:

- `/blog/building-bama-webinar-marketplace`
- `/blog/building-the-craft-community`
- `/blog/building-rescue-alert-system`
- `/blog/building-kehila-budget-manager`
- `/blog/building-vivian-nfc-platform`
- `/blog/building-yc-lobbying-platform`

Each story contains:

1. a public screenshot and plain-language summary;
2. the problem or workflow the project addresses;
3. what Simon designed and built;
4. selected technical decisions that are safe to disclose;
5. the resulting public experience, without invented outcome metrics;
6. links to the live site and public repository when one exists;
7. a relevant Simon Host contact call to action.

Case-study facts come only from public website behavior, public repository documentation, or a privacy-reviewed description of Simon's role. The writing must not copy repository README prose verbatim; it should explain the work to a prospective client in clear Hebrew.

## Page Composition

### `/work` hero

The page opens on a full-width navy plane with the Simon Host header above it. The headline communicates that these are real products running in production, not mockups. A restrained supporting line explains that the same person handled product, software, data, and deployment where applicable.

### Featured work

The first four projects use alternating full-width editorial rows with a large 3:2 screenshot and a short text column. The project name remains the dominant element. A compact text link leads to the live product or detailed story.

### Project chapters

The remaining work appears as spacious rows separated by rules, grouped under the four chapter headings. Each row shows the project name, purpose, role, technologies, and public link. Rows with strong screenshots use a smaller supporting image; the design does not force every project into an identical card.

### Case-study pages

Case studies retain the readable article width already used by the blog, but add a full-width project image after the header and a small project facts line. The body uses three major headings: problem, build, and result. The page ends with related projects and a WhatsApp call to action.

## Interaction Thesis

- Screenshots reveal with a short upward motion as they enter the viewport.
- Featured images receive a restrained scale shift on hover, making the external link clear.
- Chapter headings and project numbering provide a subtle scroll rhythm rather than a filter interface.

All motion respects `prefers-reduced-motion`. Links, screenshots, and navigation remain usable without animation or JavaScript.

## Screenshot Production

For each catalogue project, capture the public unauthenticated desktop page at a consistent viewport. Crop or resize to 720×480 WebP, remove browser chrome, and store it in `frontend/public/projects/`. Do not hotlink images from client servers or GitHub.

Before capture, confirm:

- the URL uses HTTPS and returns a usable public page;
- the page does not expose an authenticated session or personalized data;
- cookie notices, debug overlays, and browser extensions are absent;
- the screenshot contains no private contact details beyond what the public site intentionally shows.

If a project is temporarily unavailable or only presents a login wall, do not manufacture a screenshot. Use a compact row without an image only when the public URL and description still provide credible proof; otherwise use the ordered replacement rule above.

## Content Architecture

`frontend/src/content/portfolio.ts` becomes the single source of truth for the project catalogue. The `PortfolioItem` type expands to express category, role, technologies, optional repository and case-study URLs, and display rank. Components receive project records rather than duplicating text.

The existing article model gains a `kind` field (`guide` or `case-study`) and an optional `projectSlug`. Existing guides remain unchanged. The blog index distinguishes practical guides from build stories without creating a second publishing system. Project records link to their associated story, and case studies link back to the project record.

New UI boundaries:

- `WorkPreview` renders the four homepage projects;
- `WorkPage` owns the `/work` composition and chapter order;
- `ProjectRow` renders one catalogue record in either featured or compact form;
- the existing `ArticlePage` renders both guides and case studies, with an optional project hero;
- `ProjectFacts` renders public role, stack, live URL, and public repository link.

This keeps inventory, presentation, and article content independent and testable.

## Routing and SEO

The release adds one work-index route and six case-study routes. The sitemap grows from 14 to 21 canonical URLs. The RSS feed grows from six to twelve editorial items.

`/work` receives unique title, description, canonical metadata, breadcrumb schema, and an `ItemList` whose items reference the public projects. Each case study receives BlogPosting and BreadcrumbList schema. Its BlogPosting `about` field references a safe CreativeWork node containing the public name, description, image, creator, and public URL. Private repository metadata never enters JSON-LD.

Homepage and founder structured data remain intact. Client-side navigation must continue updating title, description, canonical, Open Graph, Twitter, article dates, analytics page views, and the route JSON-LD graph.

Internal links connect homepage → work index → case study → relevant hosting service. The work index also links to the blog. This gives visitors a natural path from proof to explanation to contact.

## Performance and Accessibility

- All screenshots use WebP, explicit dimensions, descriptive Hebrew alt text, and lazy loading below the first visible project.
- The `/work` hero and first featured screenshot may load eagerly; remaining media loads lazily.
- Mobile layouts must fit at 390 CSS pixels without horizontal scrolling.
- Every page has exactly one H1 and sequential headings.
- Link text states whether it opens a live site, GitHub repository, or case study.
- Screenshot links retain a visible text equivalent.
- Orange annotations must pass WCAG AA contrast on both paper and navy surfaces.

## Failure Handling

- A project without a public URL renders no “visit” action.
- A project without a public repository renders no GitHub action.
- A project without a safe screenshot uses the compact row layout and no broken image placeholder.
- An unknown work or article slug returns the existing true 404 document with `noindex, follow`.
- Build-time validation fails on duplicate slugs, duplicate public URLs, missing required copy, invalid external protocols, missing declared screenshot assets, or a case-study link that does not resolve.

## Testing and Verification

Automated tests cover:

- sixteen unique project records and exactly four homepage-featured records;
- public URLs using HTTPS and repository URLs using public GitHub paths only;
- valid project categories, roles, technology lists, image alt text, and case-study relationships;
- six case studies with substantial original sections and connected project records;
- route metadata, canonical URLs, sitemap count, RSS count, ItemList, CreativeWork, BlogPosting, and breadcrumb schema;
- existing price, service, privacy-gate, and article tests.

Release verification includes:

- a clean `npm ci`, frontend test run, production build, and npm audit;
- the unchanged Django test suite;
- automated 390px overflow, H1, duplicate-ID, image-alt, canonical, and schema checks for all indexable routes;
- desktop and mobile visual inspection of the homepage work preview, `/work`, and at least two case studies;
- GitHub Actions success, Debian deployment at the pushed commit, live HTTP status checks, real 404 behavior, sitemap/RSS counts, screenshot delivery, and Search Console sitemap resubmission.

## Success Criteria

The work is complete when a visitor can understand Simon's breadth from the homepage, explore sixteen safe public projects on `/work`, read six useful build stories, visit live work where available, and contact Simon without encountering a privacy leak, broken screenshot, thin SEO page, or mobile layout failure.

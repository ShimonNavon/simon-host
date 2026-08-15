# Project Library and Case Studies — Implementation Plan

**Design:** `docs/superpowers/specs/2026-08-16-project-portfolio-library-design.md`  
**Target:** GitHub `main`, deployed by the existing Debian timer

## 1. Verify public proof

- Check all sixteen primary public URLs over HTTPS without authentication.
- Open each public page in an isolated browser profile and confirm no personalized or administrative information appears.
- Replace an unsafe or unavailable primary site using the ordered reserve list in the design.
- Confirm public GitHub links only for repositories whose visibility is public.
- Capture consistent 1440×960 public screenshots and encode 720×480 WebP assets under `frontend/public/projects/`.

## 2. Centralize project content

- Expand `frontend/src/content/portfolio.ts` into the typed sixteen-record catalogue.
- Add category, role, technologies, feature rank, optional public repository, and optional case-study relationship fields.
- Add lookup, grouping, and featured-project helpers.
- Extend content tests to enforce privacy-safe URLs, unique slugs, complete records, four featured items, and six case-study links.

## 3. Build the work experience

- Refactor the homepage portfolio component into a focused four-project preview.
- Add reusable `ProjectRow` and `ProjectFacts` components.
- Add a prerendered `WorkPage` at `/work` with a full-width hero, four featured rows, and grouped editorial chapters.
- Add `/work` to the header and footer without overcrowding navigation.
- Extend the existing visual system with cardless work layouts, responsive image treatment, restrained reveals, and reduced-motion support.

## 4. Publish build stories

- Extend the article model with `kind`, optional project slug, and optional project-hero support.
- Write six original Hebrew case studies using only public behavior and privacy-reviewed repository facts.
- Update the blog index to distinguish practical guides from build stories.
- Enhance article pages with project image, facts, public links, related work, and a service-relevant WhatsApp action.

## 5. Extend discovery and SEO

- Register `/work` and all six case-study routes in the prerender route list.
- Add unique metadata for the work index and every story.
- Add ItemList and CreativeWork schema linked to the existing Person and ProfessionalService graph.
- Preserve BlogPosting and breadcrumb schema for case studies.
- Update sitemap and RSS expectations to 21 URLs and 12 editorial items.
- Keep client-side head, schema, and analytics updates correct after navigation.

## 6. Verify locally

- Run `npm ci`, all frontend tests, production build, and `npm audit`.
- Run the Django suite with SQLite settings.
- Start the production static server and verify every route, sitemap, RSS, assets, cache headers, and true 404 behavior.
- Run a 390px browser audit across every indexable route for overflow, H1 count, duplicate IDs, missing alt text, canonicals, and schema.
- Visually inspect desktop and mobile captures of the homepage preview, `/work`, and at least two case studies.
- Run Lighthouse and fix material SEO, accessibility, best-practice, or performance regressions.

## 7. Release and verify

- Commit only the isolated worktree changes.
- Fetch `origin/main`, reconcile any concurrent changes safely, and push the verified history to `main`.
- Watch GitHub Actions to completion.
- Confirm the Debian deploy unit reaches the pushed SHA and all containers are healthy.
- Verify the public domain, work index, case studies, screenshots, metadata, sitemap, RSS, and 404 response.
- Resubmit the sitemap in Google Search Console and confirm 21 submitted URLs with no sitemap errors or warnings.

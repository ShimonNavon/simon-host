# Simon Host SEO Growth Redesign — Implementation Plan

## Phase 1: Content and route foundation

1. Add shared founder/site facts and article content types.
2. Write the six approved Hebrew search-intent articles with useful sections, honest comparisons, contextual links, and conversion targets.
3. Add blog index, article, and not-found pages.
4. Extend the route manifest so React, prerendering, the sitemap, RSS, and the production server use the same known paths.
5. Add tests for article slugs, metadata, dates, route coverage, and CTAs.

## Phase 2: SEO generation and HTTP behavior

1. Extend route metadata with robots, page type, dates, and article data.
2. Build a connected JSON-LD graph for the business, founder, website, pages, services, FAQs, breadcrumbs, and articles.
3. Generate sitemap `lastmod` values and an RSS feed from article data.
4. Replace the generic static `serve` process with a small dependency-free server that serves known routes, preserves assets, and returns a real 404 for unknown paths.
5. Test generated HTML, sitemap, RSS, and server status behavior.

## Phase 3: Conversion-led redesign

1. Rebuild the header as a restrained desktop navigation plus accessible mobile menu.
2. Replace the homepage hero with an agency-led full-bleed composition and free-audit CTA.
3. Add cardless migration comparison, operating proof, audience paths, project proof, founder credibility, guide preview, and final CTA.
4. Keep service pricing and domain search available lower in the journey.
5. Add stable analytics campaign names for every new CTA and a non-obstructive mobile audit CTA.

## Phase 4: Visual assets, motion, and accessibility

1. Download Simon's authorized LinkedIn portrait, store it locally, crop it consistently, and optimize it.
2. Capture or construct truthful project previews from public Simon-owned work; fall back to text if a project is unavailable.
3. Consolidate the visual system in `index.css`: full-bleed hero, editorial sections, responsive typography, project media, article layout, and 404.
4. Add hero entrance, scroll reveal, and hover transitions with reduced-motion fallbacks.
5. Verify focus order, keyboard menu behavior, landmarks, headings, contrast, RTL, touch targets, and image alt text.

## Phase 5: Verification and release

1. Run frontend tests, production build, backend tests, and diff checks.
2. Run a production-like static server and verify known route 200s, unknown route 404s, robots, sitemap, RSS, assets, and API fallthrough.
3. Review key pages at desktop and mobile sizes and fix visible regressions.
4. Commit focused changes, push the branch as a fast-forward update to GitHub `main`, and monitor CI.
5. Wait for the Debian pull-deploy timer, then verify server SHA, Docker health, live HTML, route statuses, sitemap/RSS, structured data, portrait/assets, and WhatsApp CTA.

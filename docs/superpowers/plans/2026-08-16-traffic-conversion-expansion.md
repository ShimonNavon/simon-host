# Traffic and Conversion Expansion Implementation Plan

**Design:** `docs/superpowers/specs/2026-08-16-traffic-conversion-expansion-design.md`

## 1. Establish the approved specification

- Add the approved design document.
- Review it for distinct search intent, honest claims, privacy, and deployment scope.
- Commit the specification before implementation.

## 2. Build the two SEO service pages

- Add a typed growth-service content model with two entries.
- Build one reusable editorial page component.
- Register `/business-systems` and `/mvp-development` in routing and prerendering.
- Add metadata, Service/FAQ/breadcrumb structured data, and sitemap coverage.
- Add internal links without overloading the main navigation.
- Link each proof section to existing project screenshots and case studies.

## 3. Add tests and verify the frontend

- Test unique routes and WhatsApp campaign messages.
- Test canonical metadata and schema for both pages.
- Test that both routes are indexable and prerendered.
- Run formatting, linting, unit tests, and the production build.
- Inspect generated HTML for titles, canonicals, schema, and sitemap entries.

## 4. Prepare LinkedIn content

- Add one portfolio announcement and six case-study drafts under `docs/marketing/`.
- Include the live case-study URL and optional shorter variation for each post.
- Run a privacy and unsupported-claims review.

## 5. Publish GitHub discovery links

- Update the public profile README with a client-facing introduction and featured work.
- Add a compact Simon Host case-study block only to relevant public project READMEs.
- Preserve existing project documentation and commit each repository independently.
- Push each repository's default branch and verify the public README.

## 6. Deploy and submit discovery signals

- Push Simon Host changes to `main`.
- Verify GitHub Actions and the live server revision.
- Verify both live pages, the sitemap, and structured data.
- Submit the updated sitemap once and inspect the new URLs in Search Console.
- Record the pages that still need the Search Console UI's manual indexing request.


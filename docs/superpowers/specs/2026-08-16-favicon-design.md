# Simon Host Favicon Design

**Date:** 2026-08-16  
**Status:** Approved through the user's standing instruction to proceed without additional approval.

## Problem

The page contains an inline data-URL icon, but the site has no stable favicon file. Browsers and search crawlers can ignore or keep a stale version of embedded icons.

## Design

Use the existing Simon Host mark already encoded in the page: a deep navy rounded square and a bold orange `S`. The mark remains legible at 16 pixels, matches the website, and does not introduce a generic hosting symbol or an unreadable portrait.

## Implementation

- Add a square SVG at `/favicon.svg` with a 64×64 view box.
- Replace the embedded data URL with a normal `<link rel="icon" type="image/svg+xml" sizes="any">` reference.
- Keep the current theme color.
- Let the existing prerender build copy the asset and the shared HTML head distribute the link to every route.

## Verification

- Run the frontend tests and production build.
- Confirm `dist/favicon.svg` exists.
- Confirm prerendered pages reference `/favicon.svg`.
- Deploy through `main`, verify HTTP 200 and the SVG content type on the live site.


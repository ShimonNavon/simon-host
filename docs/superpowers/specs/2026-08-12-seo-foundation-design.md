# SEO Foundation

**Date:** 2026-08-12
**Scope:** technical foundation only. Content pages and off-site presence are a later round.

## The problem

The site was a client-side React SPA, so every crawler and link-preview bot
received this and nothing else:

```html
<body><div id="root"></div></body>
```

Googlebot can render JS on a second pass, but Bing, WhatsApp and Facebook link
previews, and LLM crawlers largely do not. Since the entire funnel is "send
someone the link on WhatsApp", the missing preview card was costing conversions
on traffic that already existed.

Two supporting defects:

- `robots.txt` and `sitemap.xml` did not exist. The SPA catch-all answered both
  with `HTTP 200` and the HTML page, so submitting the sitemap to Search Console
  would have failed.
- `index.html` shipped with no `Cache-Control`, `ETag`, or `Last-Modified`, so
  browsers held a stale copy and pinned visitors to old asset filenames.

## What was built

### 1. Build-time prerendering

`src/entry-server.tsx` renders `<App/>` with `react-dom/server`.
`scripts/prerender.mjs` injects that HTML into `dist/index.html` and deletes the
SSR bundle so it never reaches the image. `main.tsx` uses `hydrateRoot` when
`#root` already has children and `createRoot` when it does not, which keeps
`vite dev` working unchanged.

No new dependencies: `react-dom/server` ships with `react-dom`.

This is safe here because no component touches `window`, `document`,
`localStorage`, or `navigator`. `BrowserDemo` is the only stateful component;
`useEffect` does not run during SSR and `useState` renders its initial value.

The script fails the build if the render produces under 1000 characters, so a
silently broken prerender cannot ship an empty page.

### 2. Real robots.txt and sitemap.xml

Static files in `frontend/public/`, copied into `dist` by Vite and therefore
served ahead of the SPA fallback.

### 3. Head tags

Canonical, `robots`, OG (`og:locale=he_IL`, 1200x630 image), and Twitter
`summary_large_image`.

### 4. Structured data

`src/content/seo.ts` builds a JSON-LD `@graph` — `ProfessionalService` with the
three rungs as `Offer`s, `WebSite`, and `FAQPage` — from `plans.ts` and the FAQ's
`QUESTIONS`. Generating it from the same source means prices in the markup can
never drift from prices on screen.

Note: Google restricted FAQ rich results to gov/health sites in 2023. The
`FAQPage` node is here for machine comprehension, not for SERP stars.

### 5. Cache headers

Host nginx: `no-cache` on the HTML document, immutable one-year cache on
`/assets/*` (safe because Vite hashes those filenames).

## Deliberately not in this round

Content pages, Google Business Profile, directory listings, Search Console
submission.

## Honest expectation

This makes the site crawlable, shareable, and correctly described to machines.
It does not by itself rank the site for competitive Hebrew hosting terms — that
needs the content round.

# Hosting-Company Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page three-rung site into a five-page hosting-company site (4 services + community layer), shipped as one PR per task through the new CI/CD pipeline.

**Architecture:** Content stays data-driven in typed modules; `react-router-dom` adds four service routes; the prerender script walks every route and emits complete static HTML per page plus sitemap; homepage is rebuilt as a hosting-company front (pricing grid, infrastructure, about, community, portfolio).

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind 4, react-router-dom 7, vitest, Node `serve` in Docker.

**Spec:** `docs/superpowers/specs/2026-08-14-hosting-company-site-design.md`

## Global Constraints

- Hebrew RTL only; every visitor-facing string in Hebrew.
- WhatsApp-only funnel; every CTA carries a plan-tagged pre-filled message via `whatsappUrl()`.
- English route slugs: `/wordpress`, `/websites`, `/apps`, `/vps`.
- Prices verbatim: WordPress ₪49, Website ₪99, App ₪149, VPS ₪79 — all monthly.
- Credential wording verbatim: **"בוגר אוניברסיטת הרווארד"** — no degree/field invented.
- Launch gates (ship WITHOUT until Simon supplies): community WhatsApp-group link (join CTA hidden while link empty), numbers strip (omitted entirely), client demo portfolio entries (only `kind: "own"` entries ship).
- Frontend container serves via Node `serve` (never nginx-in-container); host nginx untouched.
- Each task merges to `main` via PR; CI must be green; merge auto-deploys to debian01 within ~1 minute; branches auto-delete on merge.
- Brand carries forward: sea/jaffa/paper palette, Suez One + Heebo, marker highlight, involvement bar identity. No AI-slop design defaults.

---

### Task 1: Content model — `services.ts` (4 services), community/portfolio modules, vitest

**Files:**
- Create: `frontend/src/content/services.ts` (replaces `plans.ts`; keep `plans.ts` deleted in same commit)
- Create: `frontend/src/content/community.ts`
- Create: `frontend/src/content/portfolio.ts`
- Create: `frontend/src/content/__tests__/content.test.ts`
- Modify: `frontend/package.json` (add `vitest`, `"test": "vitest run"`)
- Modify: `.github/workflows/ci.yml` (run `npm test` before build)
- Modify: all files importing `./content/plans` → `./content/services` (`App.tsx`, `Header.tsx`, `Hero.tsx` deps, `Ladder.tsx`, `PlanSection.tsx`, `InvolvementBar.tsx`, `Trust.tsx`, `Contact.tsx`, `WhatsAppCTA.tsx`, `seo.ts` — grep for `content/plans`)

**Interfaces (produced, later tasks rely on these exact names):**

```ts
export type ServiceFaq = { q: string; a: string };
export type Service = {
  id: string;            // DOM anchor + React key
  slug: string;          // route path segment, e.g. "wordpress"
  name: string;
  tagline: string;
  price: number;         // ILS / month
  mine: number;          // % of the work that is Simon's — involvement bar
  forWho: string;
  included: string[];
  market?: string;
  cardBullets: string[]; // 3–4 headline bullets for the homepage grid
  heroLine: string;      // service-page subtitle paragraph
  faq: ServiceFaq[];     // 2–4 page-specific Q&As
  seo: { title: string; description: string };
  ctaLabel: string;
  whatsapp: string;      // pre-filled plan-tagged message
};
export const SERVICES: Service[];                 // order: website(100), wordpress(90), app(65), vps(20)
export const WHATSAPP_NUMBER: string;             // unchanged: "972549877094"
export const WHATSAPP_DISPLAY: string;            // unchanged
export function whatsappUrl(message: string): string;  // unchanged
```

`Plan`/`PLANS` names disappear; existing components keep working by importing `Service`/`SERVICES` (shape is a superset of `Plan`).

New WordPress service content (verbatim):

```ts
{
  id: "wordpress",
  slug: "wordpress",
  name: "אחסון וורדפרס מנוהל",
  tagline: "האתר עובר אליי. ה־wp-admin נשאר שלך.",
  price: 49,
  mine: 90,
  forWho: "לעסק שכבר יש לו אתר וורדפרס — ונמאס לו מאחסון איטי, מעדכונים שלא קורים, ומתמיכה שלא עונה.",
  included: [
    "העברה מלאה מהאחסון הנוכחי — בלי השבתה",
    "עדכוני ליבה ותוספים — עליי",
    "גיבוי יומי, גם מחוץ לשרת",
    "דומיין ותעודת אבטחה",
    "ניטור — אם משהו נופל, אני יודע לפניך",
    "מענה אנושי בוואטסאפ",
  ],
  market: "אחסון וורדפרס אצל ספקים ישראליים: ₪25–99 לחודש — בלי ניהול, בלי עדכונים, ובלי שמישהו מעביר אותך.",
  cardBullets: ["העברה מהאחסון הנוכחי כלולה", "עדכונים וגיבויים עליי", "ה־wp-admin נשאר שלך"],
  heroLine: "אנחנו מפעילים פלטפורמת אחסון משלנו ומעבירים אתרים מ־cPanel באופן שוטף. האתר שלך עובר, הכתובת לא משתנה, וה־wp-admin נשאר בדיוק איפה שהיה — רק שעכשיו מישהו מטפל בכל השאר.",
  faq: [
    { q: "כמה זמן לוקחת ההעברה?", a: "בדרך כלל יום־יומיים. האתר הקיים ממשיך לעבוד עד שהחדש מוכן, ואז מחליפים — בלי השבתה." },
    { q: "אני מאבד גישה לאתר?", a: "להפך. ה־wp-admin נשאר שלך עם הרשאות מלאות. אני מנהל את השרת, העדכונים והגיבויים — לא את התוכן שלך." },
    { q: "מה אם משהו נשבר אחרי עדכון?", a: "יש גיבוי יומי ואני מנטר. אם עדכון שובר משהו — אני מחזיר לאחור ומטפל, לפני שהלקוחות שלך מרגישים." },
  ],
  seo: {
    title: "אחסון וורדפרס מנוהל — ₪49 לחודש | Simon Host",
    description: "אחסון וורדפרס מנוהל בישראל: העברה מהאחסון הנוכחי כלולה, עדכונים וגיבוי יומי עליי, ה־wp-admin נשאר שלך. ₪49 לחודש, מענה אנושי בוואטסאפ.",
  },
  ctaLabel: "רוצה להעביר את הוורדפרס",
  whatsapp: "היי סיימון, הגעתי מהאתר ואשמח להעביר אליך אתר וורדפרס.",
}
```

The three existing services keep their copy from `plans.ts` and gain: `slug` (`websites`, `apps`, `vps`), `cardBullets` (first 3 `included` items reworded to headline length), `heroLine` (2–3 sentences expanding the tagline), `faq` (2–3 Q&As in the same voice — the executor writes these in the established register; the FAQ answers must state real facts already on the page, nothing new), `seo` per the pattern above with each page's price and keyword ("בניית אתר לעסק", "אחסון אפליקציות", "שרת וירטואלי בישראל").

`community.ts`:

```ts
export const COMMUNITY = {
  title: "לא רק אחסון — קהילה",
  body: "מי שמארח אצלי מצטרף לקהילה של יזמים ובעלי עסקים — אנשים שבונים דברים ועוזרים אחד לשני. אנחנו נפגשים באירועים, מתייעצים בקבוצה, ולפעמים עסקה שלמה נסגרת בין שני חברי קהילה.",
  /** Launch gate: empty string = the join-group CTA is not rendered. */
  groupLink: "",
  eventsWhatsapp: "היי סיימון, אשמח לשמוע על המפגש הבא של הקהילה.",
};
```

`portfolio.ts`:

```ts
export type PortfolioItem = {
  name: string;
  url: string;
  blurb: string;
  kind: "own" | "client";   // "client" ships only after written client OK
};
export const PORTFOLIO: PortfolioItem[] = [
  { name: "CUTPOINT Community", url: "https://social.navonsimon.com", blurb: "רשת חברתית בעברית — נבנתה, מאוחסנת ומנוהלת כאן.", kind: "own" },
  { name: "Screening Room", url: "https://videos.navonsimon.com", blurb: "ספריית וידאו מהירה — אפליקציית Go שרצה על התשתית שלנו.", kind: "own" },
  { name: "פנים", url: "https://panim.navonsimon.com", blurb: "דף השקה לאפליקציית היכרויות וידאו — מהרעיון לאוויר.", kind: "own" },
];
```

- [ ] **Step 1: add vitest** — `cd frontend && npm i -D vitest`; add `"test": "vitest run"` script.
- [ ] **Step 2: write failing tests** in `frontend/src/content/__tests__/content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { SERVICES, whatsappUrl } from "../services";
import { COMMUNITY } from "../community";
import { PORTFOLIO } from "../portfolio";

describe("services content", () => {
  it("has exactly 4 services with unique slugs and ids", () => {
    expect(SERVICES).toHaveLength(4);
    expect(new Set(SERVICES.map(s => s.slug)).size).toBe(4);
    expect(new Set(SERVICES.map(s => s.id)).size).toBe(4);
  });
  it("has the agreed prices", () => {
    const prices = Object.fromEntries(SERVICES.map(s => [s.slug, s.price]));
    expect(prices).toEqual({ websites: 99, wordpress: 49, apps: 149, vps: 79 });
  });
  it("is ordered by descending involvement", () => {
    const mine = SERVICES.map(s => s.mine);
    expect([...mine].sort((a, b) => b - a)).toEqual(mine);
  });
  it("every service is page-complete", () => {
    for (const s of SERVICES) {
      expect(s.whatsapp.length).toBeGreaterThan(10);
      expect(s.cardBullets.length).toBeGreaterThanOrEqual(3);
      expect(s.faq.length).toBeGreaterThanOrEqual(2);
      expect(s.seo.title).toContain("Simon Host");
      expect(s.heroLine.length).toBeGreaterThan(40);
    }
  });
  it("whatsapp messages are plan-distinct", () => {
    expect(new Set(SERVICES.map(s => s.whatsapp)).size).toBe(4);
  });
  it("whatsappUrl encodes the message", () => {
    expect(whatsappUrl("שלום")).toContain("wa.me/972549877094");
  });
});

describe("launch gates", () => {
  it("community join CTA is gated on a real link", () => {
    if (COMMUNITY.groupLink) expect(COMMUNITY.groupLink).toMatch(/^https:\/\/chat\.whatsapp\.com\//);
  });
  it("no client portfolio entries ship without approval", () => {
    expect(PORTFOLIO.filter(p => p.kind === "client")).toHaveLength(0);
  });
});
```

- [ ] **Step 3: run tests — expect FAIL** (`../services` doesn't exist).
- [ ] **Step 4: create the three content modules** per the interfaces above; delete `plans.ts`; update every importer (`grep -rl 'content/plans' frontend/src`).
- [ ] **Step 5: run `npm test` and `npm run build` — both green.** The build now renders a 4-rung ladder; eyeball `Ladder`/`InvolvementBar`/`Header` for layout breakage with 4 items and fix spacing.
- [ ] **Step 6: add `npm test` to `.github/workflows/ci.yml`** as a step before the build.
- [ ] **Step 7: branch `feat/services-content` → commit → PR → CI green → merge.** Verify deploy: `curl -s https://simonhost.navonsimon.com | grep -c "וורדפרס"` ≥ 1.

### Task 2: Routing + service pages + multi-route prerender + SEO

**Files:**
- Modify: `frontend/package.json` (add `react-router-dom`)
- Create: `frontend/src/pages/HomePage.tsx` (current `App.tsx` body moves here)
- Create: `frontend/src/pages/ServicePage.tsx`
- Create: `frontend/src/routes.tsx`
- Modify: `frontend/src/App.tsx` (becomes layout + route table)
- Modify: `frontend/src/main.tsx` (BrowserRouter)
- Modify: `frontend/src/entry-server.tsx` (`render(path)` with StaticRouter)
- Modify: `frontend/src/content/seo.ts` (per-route meta + per-service JSON-LD)
- Modify: `frontend/scripts/prerender.mjs` (walk routes, per-route head, sitemap)
- Modify: `frontend/public/robots.txt` (add `Sitemap:` line; create if absent)

**Interfaces:**
- Consumes: `SERVICES`, `Service` from Task 1.
- Produces:
  - `routes.tsx`: `export const SERVICE_ROUTES: { path: string; service: Service }[]` (path = `/${slug}`) and `export const ALL_PATHS: string[]` (`["/", ...service paths]`).
  - `entry-server.tsx`: `export function render(path: string): { html: string; jsonLd: object; meta: { title: string; description: string; path: string } }` and `export { ALL_PATHS }`.
  - `seo.ts`: `export function routeMeta(path: string): { title: string; description: string; path: string }` and `structuredData(path)` returning the homepage graph for `/` and a `Service`+`Offer`+`FAQPage` graph for service pages.

- [ ] **Step 1:** `npm i react-router-dom`.
- [ ] **Step 2:** Move current `App.tsx` JSX into `pages/HomePage.tsx` unchanged. `App.tsx` becomes:

```tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import { SERVICE_ROUTES } from "./routes";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {SERVICE_ROUTES.map(({ path, service }) => (
          <Route key={path} path={path} element={<ServicePage service={service} />} />
        ))}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}
```

(Header/Footer move out of HomePage so all pages share them; add a `ScrollToTop` effect component inside App that calls `window.scrollTo(0,0)` on pathname change, guarded `typeof window !== "undefined"`.)

- [ ] **Step 3:** `ServicePage.tsx` — template rendered per service: hero (name, tagline, `marker` price "₪{price} לחודש", `InvolvementBar mine`), `heroLine` paragraph, included list (reuse the checklist rendering pattern from `PlanSection`), who-it's-for, market note, mini-FAQ (reuse `Faq`'s disclosure pattern with the service's `faq`), closing `WhatsAppCTA` with the service's message. On the `wordpress` page the `heroLine` already carries the migration story; give it a highlighted quote treatment.
- [ ] **Step 4:** `main.tsx` wraps `<App/>` in `<BrowserRouter>`; `entry-server.tsx`:

```tsx
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { routeMeta, structuredData } from "./content/seo";
export { ALL_PATHS } from "./routes";

export function render(path: string) {
  return {
    html: renderToString(<StaticRouter location={path}><App /></StaticRouter>),
    jsonLd: structuredData(path),
    meta: routeMeta(path),
  };
}
```

- [ ] **Step 5:** `seo.ts`: `routeMeta` — homepage keeps current title/description; service pages use `service.seo`. `structuredData(path)`: homepage graph as today but offers built from `SERVICES` (4 offers); service page graph: `{"@type":"Service"}` node with `offers` (price, ILS, monthly UnitPriceSpecification) + `FAQPage` from the service's own `faq` + `WebSite` node. Canonical/og URL = `SITE_URL + path` (no trailing slash except home).
- [ ] **Step 6:** `prerender.mjs` — loop `ALL_PATHS`; for each: `render(path)`; take a fresh copy of the template; replace `<title>…</title>`, `<meta name="description"…>`, canonical href, `og:url`, `og:title`, `og:description`, `twitter:title`, `twitter:description` with the route's meta (regex on the attribute values); inject HTML + JSON-LD; write to `dist/index.html` for `/` and `dist/<slug>/index.html` otherwise (mkdir). Thin-page guard per route (≥1000 chars each). After the loop write `dist/sitemap.xml` listing `ALL_PATHS` with `SITE_URL` and today's `lastmod`, and ensure `robots.txt` in `dist/` has `Sitemap: ${SITE_URL}/sitemap.xml`.
- [ ] **Step 7: verify locally:** `npm test && npm run build`; then `ls dist/wordpress/index.html dist/websites/index.html dist/apps/index.html dist/vps/index.html dist/sitemap.xml`; `npx serve dist -l 5054 &` and `curl -s localhost:5054/wordpress | grep -o '<title>[^<]*'` shows the WordPress title (proves `serve` resolves the directory index without `-s` SPA-fallback masking it — the Dockerfile's `-s` flag only kicks in for missing paths, which is what we want for client-side nav fallbacks).
- [ ] **Step 8:** branch `feat/service-pages` → PR → merge. Verify production: `for p in wordpress websites apps vps; do curl -s https://simonhost.navonsimon.com/$p | grep -o '<title>[^<]*'; done` — four distinct titles.

### Task 3: Homepage as hosting-company front — nav, hero, pricing grid

**Files:**
- Modify: `frontend/src/components/Header.tsx` (nav → `<Link to={/slug}>`, works from any page)
- Modify: `frontend/src/components/Hero.tsx` (repositioned copy below)
- Create: `frontend/src/components/PricingGrid.tsx`
- Modify: `frontend/src/pages/HomePage.tsx` (grid replaces the three full `PlanSection`s; `BrowserDemo` moves to the `/websites` service page)
- Modify: `frontend/src/pages/ServicePage.tsx` (render `BrowserDemo` when `service.slug === "websites"`)
- Delete when unused: `frontend/src/components/PlanSection.tsx`

**Interfaces:** consumes `SERVICES`; `PricingGrid` takes no props (reads `SERVICES`).

- [ ] **Step 1:** Header: logo `<Link to="/">`; nav items `SERVICES.map` → `<Link to={"/"+s.slug}>{s.name}</Link>`; keep the WhatsApp button.
- [ ] **Step 2:** Hero eyebrow becomes `"אחסון ישראלי · בן־אדם בוואטסאפ · קהילה של יזמים"`; H1: `"חברת אחסון עם"` + marker `"בן־אדם בצד השני."`; sub-paragraph keeps Simon's voice and adds one sentence: `"וכשאתה מארח כאן — אתה גם מצטרף לקהילה של יזמים שבונים דברים."` Ladder stays as the visual with 4 rungs.
- [ ] **Step 3:** `PricingGrid`: `<section>` with 4 cards (`grid sm:grid-cols-2 xl:grid-cols-4`), each card: name, tagline, marker price + "לחודש", `InvolvementBar`, `cardBullets` list, two CTAs — `<Link to>` "לפרטים" (ghost) and `WhatsAppButton` with the service message (primary). The wordpress card gets a jaffa "חדש" corner ribbon.
- [ ] **Step 4:** HomePage order: Hero → price-philosophy aside (existing) → PricingGrid → Trust → HowItWorks → Faq → Contact. Remove `PlanSection` usage and delete the file if nothing imports it.
- [ ] **Step 5:** `npm test && npm run build`; view desktop + 375px width; RTL check.
- [ ] **Step 6:** branch `feat/homepage-grid` → PR → merge → verify production shows the 4-card grid.

### Task 4: Infrastructure, About, Community, Portfolio sections

**Files:**
- Create: `frontend/src/components/Infrastructure.tsx`
- Create: `frontend/src/components/About.tsx`
- Create: `frontend/src/components/Community.tsx`
- Create: `frontend/src/components/Portfolio.tsx`
- Modify: `frontend/src/pages/HomePage.tsx` (insert sections: …PricingGrid → Infrastructure → About → Community → Portfolio → HowItWorks…; `Trust` content folds into Infrastructure — delete `Trust.tsx` if fully superseded)

**Interfaces:** consumes `COMMUNITY`, `PORTFOLIO`, `whatsappUrl` from Task 1.

- [ ] **Step 1:** Infrastructure — dark `sea` band, 6 fact cards (title + one concrete sentence each): פלטפורמת אחסון עצמאית ("אנחנו מפעילים פלטפורמת אחסון משלנו — כולל גרסת PHP נפרדת לכל אתר, והעברות מ־cPanel כעניין שבשגרה"); שרתים עם יתירות ("התשתית רצה על אשכול שרתים — מכונה אחת נופלת, השירות ממשיך"); גיבוי יומי מחוץ לשרת; קצה של Cloudflare‏; ניטור 24/7; אבטחה כברירת מחדל (firewall, הצפנה, עדכונים). Every claim must be true of the real setup; nothing invented.
- [ ] **Step 2:** About — "מי מאחורי זה": photo slot (renders nothing if no image present), name, exactly "בוגר אוניברסיטת הרווארד", 2–3 sentences: the person who builds the infrastructure is the person who answers the WhatsApp; number displayed via `WHATSAPP_DISPLAY`.
- [ ] **Step 3:** Community — `COMMUNITY.title` + `body`; CTA row: events CTA (`WhatsAppButton` with `COMMUNITY.eventsWhatsapp`) always; join-group CTA rendered **only if `COMMUNITY.groupLink` is non-empty**.
- [ ] **Step 4:** Portfolio — "דברים שרצים כאן": card per `PORTFOLIO` item (name, blurb, external link with `rel="noopener"`), renders whatever the data holds.
- [ ] **Step 5:** `npm test && npm run build`; verify sections in browser both themes of width; confirm no "join group" button appears.
- [ ] **Step 6:** branch `feat/company-sections` → PR → merge → verify production.

### Task 5: Design polish + full verification sweep + README

**Files:**
- Modify: any component/CSS from Tasks 2–4 needing polish; `frontend/src/index.css` (motion/`rise` classes for new sections)
- Modify: `README.md` (reflect 4 services, 5 pages, community layer)

- [ ] **Step 1:** Frontend-design pass over the new surfaces (load `frontend-design:frontend-design`): staggered `rise` motion on new sections, consistent section rhythm, ladder/involvement-bar identity visible on every page, no default-looking cards.
- [ ] **Step 2:** Full sweep: `npm test && npm run build`; every route `curl`-ed on built output shows its own title + real Hebrew body; every WhatsApp deep link decoded and checked for plan-distinct text (`grep -o 'wa.me[^"]*' dist/**/index.html`); sitemap lists 5 URLs; mobile 375px + desktop screenshots of all 5 pages.
- [ ] **Step 3:** README rewrite of the "Highlights" section to match reality.
- [ ] **Step 4:** branch `feat/polish` → PR → merge → verify production on all 5 routes + Lighthouse-style sanity (page weight, fonts loading).

---

## Self-review notes

- Spec coverage: structure/routing (T2), content model (T1), homepage sections 1–7,9 (T3+T4), numbers strip deliberately omitted (launch gate), service template + WP migration story (T2), SEO (T2), visual design (T3–T5), what-doesn't-change: no backend/docker/nginx edits anywhere. Gap check: none open; gates tracked in Global Constraints.
- Types consistent: `Service`, `SERVICES`, `SERVICE_ROUTES`, `ALL_PATHS`, `routeMeta`, `structuredData(path)`, `COMMUNITY`, `PORTFOLIO` used identically across tasks.

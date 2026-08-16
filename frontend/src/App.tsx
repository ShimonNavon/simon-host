import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import OfferPage from "./pages/OfferPage";
import GrowthServicePage from "./pages/GrowthServicePage";
import BlogIndexPage from "./pages/BlogIndexPage";
import ArticlePage from "./pages/ArticlePage";
import WorkPage from "./pages/WorkPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  ARTICLE_ROUTES,
  BLOG_INDEX_PATH,
  GROWTH_SERVICE_ROUTES,
  OFFER_ROUTES,
  SERVICE_ROUTES,
} from "./routes";
import { routeMeta, structuredData } from "./content/seo";

/**
 * On client-side navigation, land at the top of the new page and keep the
 * tab title honest. Prerendered HTML already carries the right title; this
 * only matters after hydration.
 */
function RouteEffects() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    const meta = routeMeta(pathname);
    const setMeta = (selector: string, value: string) =>
      document.querySelector(selector)?.setAttribute("content", value);

    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[name="robots"]', meta.robots);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", meta.canonical);
    setMeta('meta[property="og:type"]', meta.pageType === "article" ? "article" : "website");
    setMeta('meta[property="og:url"]', meta.canonical);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:image"]', meta.ogImage);
    setMeta('meta[property="og:image:alt"]', meta.ogImageAlt);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);
    setMeta('meta[name="twitter:image"]', meta.ogImage);

    document.querySelectorAll('meta[property^="article:"]').forEach((node) => node.remove());
    if (meta.published) {
      for (const [property, content] of [
        ["article:published_time", meta.published],
        ["article:modified_time", meta.modified],
      ]) {
        const node = document.createElement("meta");
        node.setAttribute("property", property);
        node.setAttribute("content", content);
        document.head.append(node);
      }
    }

    let schema = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      document.head.append(schema);
    }
    schema.textContent = JSON.stringify(structuredData(pathname)).replace(/</g, "\\u003c");

    if (previousPath.current !== pathname) {
      const analyticsWindow = window as unknown as {
        gtag?: (...args: unknown[]) => void;
      };
      analyticsWindow.gtag?.("event", "page_view", {
        page_title: meta.title,
        page_location: window.location.href,
        page_path: pathname,
      });
      previousPath.current = pathname;
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {SERVICE_ROUTES.map(({ path, service }) => (
          <Route key={path} path={path} element={<ServicePage service={service} />} />
        ))}
        {OFFER_ROUTES.map(({ path, offer }) => (
          <Route key={path} path={path} element={<OfferPage offer={offer} />} />
        ))}
        {GROWTH_SERVICE_ROUTES.map(({ path, service }) => (
          <Route key={path} path={path} element={<GrowthServicePage service={service} />} />
        ))}
        <Route path={BLOG_INDEX_PATH} element={<BlogIndexPage />} />
        <Route path="/work" element={<WorkPage />} />
        {ARTICLE_ROUTES.map(({ path, article }) => (
          <Route key={path} path={path} element={<ArticlePage article={article} />} />
        ))}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

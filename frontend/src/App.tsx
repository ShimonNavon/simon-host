import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import OfferPage from "./pages/OfferPage";
import { OFFER_ROUTES, SERVICE_ROUTES } from "./routes";
import { routeMeta } from "./content/seo";

/**
 * On client-side navigation, land at the top of the new page and keep the
 * tab title honest. Prerendered HTML already carries the right title; this
 * only matters after hydration.
 */
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = routeMeta(pathname).title;
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
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

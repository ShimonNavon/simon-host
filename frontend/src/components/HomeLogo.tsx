import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function HomeLogo() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const opensElsewhere =
      event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (pathname !== "/" || opensElsewhere) return;

    event.preventDefault();
    navigate("/", { replace: true });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <Link
      to="/"
      className="site-logo"
      aria-label="Simon Host — חזרה לתחילת עמוד הבית"
      onClick={handleClick}
    >
      Simon <span>Host</span>
    </Link>
  );
}


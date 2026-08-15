import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AGENCY_AUDIT_MESSAGE } from "../content/site";
import WhatsAppButton from "./WhatsAppButton";

const NAVIGATION = [
  { href: "/agencies", label: "לסוכנויות" },
  { href: "/launch", label: "ליזמים" },
  { href: "/#services", label: "מסלולים" },
  { href: "/blog", label: "מדריכים" },
  { href: "/#about", label: "מי אני" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner content-width">
        <Link to="/" className="site-logo" aria-label="Simon Host — עמוד ראשי">
          Simon <span>Host</span>
        </Link>

        <nav className="desktop-nav" aria-label="ניווט ראשי">
          {NAVIGATION.map((item) =>
            item.href.startsWith("/#") ? (
              <a key={item.href} href={item.href}>{item.label}</a>
            ) : (
              <Link key={item.href} to={item.href}>{item.label}</Link>
            )
          )}
        </nav>

        <div className="header-action">
          <WhatsAppButton
            message={AGENCY_AUDIT_MESSAGE}
            label="בדיקת חשבון"
            campaign="header-agency-audit"
            className="header-cta"
          />
        </div>

        <button
          className={`menu-toggle${open ? " is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="ניווט בנייד"
        aria-hidden={!open}
      >
        {NAVIGATION.map((item) =>
          item.href.startsWith("/#") ? (
            <a key={item.href} href={item.href} tabIndex={open ? 0 : -1}>{item.label}</a>
          ) : (
            <Link key={item.href} to={item.href} tabIndex={open ? 0 : -1}>{item.label}</Link>
          )
        )}
      </nav>
    </header>
  );
}

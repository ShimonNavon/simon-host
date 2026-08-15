import { useEffect, useState } from "react";
import { AGENCY_AUDIT_MESSAGE } from "../content/site";
import { whatsappUrl } from "../content/services";
import { trackWhatsAppClick } from "../lib/track";

export default function MobileAuditBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > Math.min(window.innerHeight * 0.72, 620));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={`mobile-audit-bar${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <span>בדיקת חשבון חינם</span>
      <a
        href={whatsappUrl(AGENCY_AUDIT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        onClick={() => trackWhatsAppClick("mobile-agency-audit")}
      >
        מתחילים ב־WhatsApp
      </a>
    </div>
  );
}

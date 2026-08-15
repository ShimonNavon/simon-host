import { Link } from "react-router-dom";
import { AGENCY_AUDIT_MESSAGE, FOUNDER } from "../content/site";
import WhatsAppButton from "./WhatsAppButton";

export default function AgencyHero() {
  return (
    <section className="agency-hero">
      <div className="hero-grid content-width">
        <div className="hero-copy">
          <p className="hero-brand rise rise-1">
            Simon <span>Host</span>
          </p>
          <p className="hero-eyebrow rise rise-1">אחסון מנוהל לסוכנויות · מענה של בן־אדם אחד</p>
          <h1 className="rise rise-2">
            אתרי הלקוחות נשארים שלכם.
            <span>האחסון עובר אליי.</span>
          </h1>
          <p className="hero-lead rise rise-3">
            אני מעביר אתרי WordPress בלי השבתה, מטפל בגיבויים, עדכונים וניטור —
            והלקוחות ממשיכים להיכנס לאותו wp-admin כמו אתמול.
          </p>
          <div className="hero-actions rise rise-4">
            <WhatsAppButton
              message={AGENCY_AUDIT_MESSAGE}
              label="בדיקת חשבון אחסון — בחינם"
              campaign="hero-agency-audit"
              className="hero-primary"
            />
            <Link to="/agencies" className="hero-secondary">
              איך המעבר עובד <span aria-hidden="true">←</span>
            </Link>
          </div>
          <p className="hero-terms rise rise-4">
            אתר ניסיון ל־14 יום · אין חשבונית עד שאישרתם · דרך יציאה כתובה מראש
          </p>
        </div>

        <figure className="operator-figure rise rise-3">
          <div className="operator-orbit" aria-hidden="true">
            <span>גיבוי יומי</span>
            <span>ניטור</span>
            <span>PHP נפרד</span>
          </div>
          <div className="operator-photo">
            <img
              src={FOUNDER.portrait}
              alt={`סיימון נבון, מייסד Simon Host`}
              width={200}
              height={200}
            />
          </div>
          <figcaption>
            <strong>{FOUNDER.name}</strong>
            <span>מי שעונה בוואטסאפ הוא מי שמטפל בשרת.</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-rule" aria-hidden="true" />
    </section>
  );
}

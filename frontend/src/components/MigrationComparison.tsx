import { Link } from "react-router-dom";
import { AGENCY_AUDIT_MESSAGE } from "../content/site";
import WhatsAppButton from "./WhatsAppButton";

const STAYS = [
  "הלקוחות והקשר איתם",
  "הדומיינים והבעלות",
  "העיצוב, התוכן והתוספים",
  "אותו wp-admin ואותן הרשאות",
];

const CHANGES = [
  "אני מנהל את השרת והעדכונים",
  "גיבוי יומי נשמר גם מחוץ למכונה",
  "כל אתר מקבל סביבת PHP משלו",
  "בעיה אחת, מספר WhatsApp אחד",
];

export default function MigrationComparison() {
  return (
    <section className="migration-section section-shell" aria-labelledby="migration-heading">
      <div className="content-width">
        <div className="section-heading reveal">
          <p className="section-kicker">מעבר בלי דרמה</p>
          <h2 id="migration-heading">מה נשאר בדיוק כמו שהוא — ומה יורד לכם מהראש.</h2>
        </div>

        <div className="migration-grid">
          <div className="migration-column reveal">
            <p>נשאר אצלכם</p>
            <ul>
              {STAYS.map((item) => (
                <li key={item}><span aria-hidden="true">=</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="migration-column migration-column-accent reveal">
            <p>עובר אליי</p>
            <ul>
              {CHANGES.map((item) => (
                <li key={item}><span aria-hidden="true">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="migration-action reveal">
          <p>
            לפני שמזיזים אתר, שולחים חשבונית ורשימה. אתם מקבלים השוואה ותוכנית
            מעבר כתובה — גם אם המסקנה היא שכדאי להישאר.
          </p>
          <div>
            <WhatsAppButton
              message={AGENCY_AUDIT_MESSAGE}
              label="בודקים את החשבון"
              campaign="proof-agency-audit"
            />
            <Link to="/agencies" className="text-link">לכל פרטי ההצעה</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

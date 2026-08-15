import { Link } from "react-router-dom";
import { SERVICES } from "../content/services";
import InvolvementBar from "./InvolvementBar";
import WhatsAppButton from "./WhatsAppButton";

export default function PricingGrid() {
  return (
    <section id="services" className="services-section section-shell" aria-labelledby="services-heading">
      <div className="content-width">
        <div className="section-heading section-heading-row reveal">
          <div>
            <p className="section-kicker">מסלולים שקופים</p>
            <h2 id="services-heading">משלמים על כמה שאני עושה — לא על שם החבילה.</h2>
          </div>
          <p>
            לכן שרת פרטי יכול לעלות פחות מאתר מוכן: המחיר עוקב אחרי העבודה
            שנשארת אצלי.
          </p>
        </div>

        <div className="service-plans">
          {SERVICES.map((service) => (
            <article key={service.id} className="service-plan reveal">
              <div className="service-plan-bar">
                <InvolvementBar mine={service.mine} />
                <span>אני {service.mine}%</span>
              </div>
              <div className="service-plan-title">
                <h3>{service.name}</h3>
                <p>{service.tagline}</p>
              </div>
              <div className="service-plan-price">
                <strong>{service.price} ₪</strong>
                <span>לחודש</span>
              </div>
              <ul>
                {service.cardBullets.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="service-plan-actions">
                <Link to={`/${service.slug}`} className="text-link">לפרטים ←</Link>
                <WhatsAppButton
                  message={service.whatsapp}
                  label={service.ctaLabel}
                  campaign={`card-${service.slug}`}
                  className="service-plan-cta"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

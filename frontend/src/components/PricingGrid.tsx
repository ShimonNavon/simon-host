import { Link } from "react-router-dom";
import { SERVICES } from "../content/services";
import InvolvementBar from "./InvolvementBar";
import WhatsAppButton from "./WhatsAppButton";

/**
 * The whole product line in one screen: four cards, four prices, and the
 * involvement bar carrying the axis the ladder introduced. Each card leads
 * to its own landing page — or straight to WhatsApp.
 */
export default function PricingGrid() {
  return (
    <section id="plans" className="max-w-6xl mx-auto px-5 pb-20 scroll-mt-16">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="relative flex flex-col bg-white rounded-2xl border border-[#e8e2d6] p-6 shadow-[0_10px_30px_rgba(15,45,74,0.07)] hover:shadow-[0_18px_50px_rgba(15,45,74,0.14)] transition-shadow"
          >
            {service.slug === "wordpress" && (
              <span className="absolute -top-3 start-5 bg-jaffa text-white text-xs font-bold px-2.5 py-1 rounded-full">
                חדש
              </span>
            )}

            <div className="mb-4">
              <InvolvementBar mine={service.mine} />
            </div>

            <h3 className="text-2xl text-sea">{service.name}</h3>
            <p className="text-ink-soft text-sm mt-1 mb-5">{service.tagline}</p>

            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="marker font-display text-4xl text-sea leading-none">
                {service.price} ₪
              </span>
              <span className="text-ink-soft text-xs font-bold">/ בחודש</span>
            </div>

            <ul className="grid gap-2 mb-6 text-sm">
              {service.cardBullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-jaffa font-bold leading-5" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto grid gap-2">
              <WhatsAppButton
                message={service.whatsapp}
                label={service.ctaLabel}
                campaign={`card-${service.slug}`}
                className="w-full text-sm !py-2.5"
              />
              <Link to={`/${service.slug}`} className="btn-ghost text-center text-sm !py-2.5">
                לכל הפרטים
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

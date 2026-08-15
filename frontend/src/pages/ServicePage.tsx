import type { Service } from "../content/services";
import BrowserDemo from "../components/BrowserDemo";
import Contact from "../components/Contact";
import InvolvementBar from "../components/InvolvementBar";
import WhatsAppButton from "../components/WhatsAppButton";

/**
 * One template for all four landing pages, rendered entirely from the
 * service's content module — the page a Google search for this service
 * lands on, so it must stand alone without the homepage.
 */
export default function ServicePage({ service }: { service: Service }) {
  return (
    <main>
      {/* Hero: what it is, what it costs, how the work splits */}
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="max-w-[15rem] mb-4">
              <InvolvementBar mine={service.mine} />
            </div>
            <h1 className="rise rise-1 text-4xl sm:text-5xl text-sea">
              {service.name}
            </h1>
            <p className="rise rise-2 mt-3 text-xl text-ink-soft">{service.tagline}</p>
            <p className="rise rise-3 mt-6 text-lg text-ink-soft max-w-xl">
              {service.heroLine}
            </p>
            <p className="rise rise-3 mt-6 max-w-xl text-ink-soft">{service.forWho}</p>
          </div>

          <div className="rise rise-2 bg-white text-ink rounded-2xl p-8 sm:p-10 shadow-[0_18px_50px_rgba(15,45,74,0.12)]">
            <div className="flex items-end gap-2 mb-6">
              <span className="marker font-display text-5xl sm:text-6xl text-sea leading-none">
                {service.price} ₪
              </span>
              <span className="text-ink-soft font-bold mb-1">/ בחודש</span>
            </div>

            <ul className="grid gap-2.5 mb-8">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-jaffa font-bold leading-6" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <WhatsAppButton
              message={service.whatsapp}
              label={service.ctaLabel}
              campaign={`page-${service.slug}`}
              className="w-full text-lg"
            />

            {service.market && (
              <p className="text-ink-soft text-sm mt-6 border-t border-[#e8e2d6] pt-4">
                {service.market}
              </p>
            )}
          </div>
        </div>

        {service.slug === "websites" && (
          <div className="mt-14 max-w-2xl mx-auto">
            <BrowserDemo />
            <p className="text-center text-ink-soft text-sm mt-4">
              עסקים אמיתיים נראים אחרת אחד מהשני. גם האתרים שלהם.
            </p>
          </div>
        )}
      </section>

      {/* Page-specific questions */}
      <section className="bg-sky/60 py-16">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-3xl text-sea mb-8">שאלות על {service.name}</h2>
          <div className="grid gap-3">
            {service.faq.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p className="text-ink-soft mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}

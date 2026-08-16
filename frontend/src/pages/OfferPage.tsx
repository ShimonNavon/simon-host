import { Link } from "react-router-dom";
import type { Offer } from "../content/offers";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import WhatsAppButton from "../components/WhatsAppButton";

/**
 * One template for both offer landing pages, rendered entirely from the
 * offer's content module. The order is the offer's argument: who this is
 * for → what I do → proof → what changes / what stays → the two free things
 * → the guarantee → honest scarcity → questions → the one ask.
 */
export default function OfferPage({ offer }: { offer: Offer }) {
  return (
    <main>
      {/* Callout + hero: who this is for, then what it is */}
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-16">
        <p className="rise rise-1 max-w-2xl font-bold text-jaffa border-s-4 border-jaffa/40 ps-4 mb-8">
          {offer.callout}
        </p>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <h1 className="rise rise-2 text-4xl sm:text-5xl text-sea">{offer.name}</h1>
            <p className="rise rise-3 mt-3 text-xl text-ink-soft">{offer.tagline}</p>
            <p className="rise rise-3 mt-6 text-lg text-ink-soft max-w-xl">{offer.heroLine}</p>
            {offer.slug === "launch" && (
              <p className="rise rise-4 mt-5 text-sm text-ink-soft max-w-xl">
                רוצים קודם להבין את תהליך הפיתוח?{" "}
                <Link to="/mvp-development" className="text-link">לשירות פיתוח MVP ←</Link>
              </p>
            )}
          </div>

          <div className="rise rise-2 bg-white text-ink rounded-2xl p-8 sm:p-10 shadow-[0_18px_50px_rgba(15,45,74,0.12)]">
            <p className="text-lg font-bold text-sea mb-6">{offer.ctaLine}</p>
            <WhatsAppButton
              message={offer.whatsapp}
              label={offer.ctaLabel}
              campaign={`${offer.slug}-hero`}
              className="w-full text-lg"
            />
            <p className="text-ink-soft text-sm mt-6 border-t border-[#e8e2d6] pt-4">
              בלי התחייבות · עונה בעצמי · בעברית
            </p>
          </div>
        </div>
      </section>

      {/* Proof: the story (gated figures live in the content module) */}
      <section className="bg-sea-deep text-white py-16">
        <div className="max-w-6xl mx-auto px-5">
          <p className="font-bold text-jaffa mb-3">מהשטח</p>
          <p className="text-xl sm:text-2xl leading-relaxed max-w-3xl font-display">
            {offer.story}
          </p>
        </div>
      </section>

      {/* What changes / what stays */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className="font-bold text-jaffa mb-3">מה משתנה</p>
            <h2 className="text-3xl text-sea mb-6">מה שאתם מקבלים</h2>
            <ul className="grid gap-3">
              {offer.changes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-jaffa font-bold leading-6" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-jaffa mb-3">מה לא משתנה</p>
            <h2 className="text-3xl text-sea mb-6">מה שנשאר בדיוק כמו שהוא</h2>
            <ul className="grid gap-3">
              {offer.stays.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-sea font-bold leading-6" aria-hidden="true">
                    =
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The two lead magnets */}
      <section className="bg-sky/60 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <p className="font-bold text-jaffa mb-3">בחינם, לפני שמדברים על כסף</p>
          <h2 className="text-3xl sm:text-4xl text-sea mb-10">שני דברים שאתם מקבלים ממני קודם</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {offer.magnets.map((m, i) => (
              <div
                key={m.title}
                className="bg-white rounded-2xl border border-[#e8e2d6] p-7 shadow-[0_10px_30px_rgba(15,45,74,0.07)]"
              >
                <div
                  className="font-display text-5xl text-jaffa/25 leading-none mb-3"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <h3 className="text-2xl text-sea mb-3">{m.title}</h3>
                <p className="text-ink-soft">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee + scarcity */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
          <div className="bg-white rounded-2xl border-2 border-jaffa p-8">
            <p className="font-bold text-jaffa mb-3">ההתחייבות שלי</p>
            <p className="text-lg text-ink">{offer.guarantee}</p>
          </div>
          <div>
            <p className="font-bold text-jaffa mb-3">בכנות</p>
            <p className="text-ink-soft">{offer.scarcity}</p>
          </div>
        </div>
      </section>

      <Faq questions={offer.faq} title={`שאלות על ${offer.name}`} />

      <Contact
        title={offer.ctaLine}
        body="הודעה אחת בוואטסאפ, בלי טופס ובלי נציג — אני עונה בעצמי."
        message={offer.whatsapp}
        label={offer.ctaLabel}
        campaign={`${offer.slug}-contact`}
      />
    </main>
  );
}

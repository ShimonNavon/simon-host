import { Link } from "react-router-dom";
import { OFFERS } from "../content/offers";

/**
 * Two ways in that aren't rungs of the ladder: the agency migration and the
 * 30-day build. Compact on purpose — the pricing grid above is the product
 * line; this is a signpost for two specific readers.
 */
export default function OfferStrip() {
  return (
    <section id="offers" className="max-w-6xl mx-auto px-5 pb-20 scroll-mt-16">
      <p className="font-bold text-jaffa mb-3">מסלולים מיוחדים</p>
      <div className="grid md:grid-cols-2 gap-5">
        {OFFERS.map((offer) => (
          <Link
            key={offer.id}
            to={`/${offer.slug}`}
            className="group flex flex-col bg-sea-deep text-white rounded-2xl p-6 sm:p-7 hover:bg-sea transition-colors"
          >
            <span className="text-jaffa font-bold text-sm mb-2">{offer.navLabel}</span>
            <h3 className="text-2xl mb-2">{offer.name}</h3>
            <p className="text-white/70 text-sm">{offer.tagline}</p>
            <span className="mt-5 font-bold text-sm text-white group-hover:text-jaffa transition-colors">
              לכל הפרטים ←
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

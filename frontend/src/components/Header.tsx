import { Link } from "react-router-dom";
import { SERVICES } from "../content/services";
import { OFFERS } from "../content/offers";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-[#e8e2d6]">
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        <Link to="/" className="font-display text-2xl text-sea shrink-0">
          Simon<span className="text-jaffa"> Host</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-bold text-sm">
          {SERVICES.map((service) => (
            <Link key={service.id} to={`/${service.slug}`} className="hover:text-jaffa">
              {service.name}
            </Link>
          ))}
          <span className="hidden lg:block w-px h-4 bg-[#e8e2d6]" aria-hidden="true" />
          {OFFERS.map((offer) => (
            <Link
              key={offer.id}
              to={`/${offer.slug}`}
              className="hidden lg:inline text-jaffa hover:text-jaffa-dark"
            >
              {offer.navLabel}
            </Link>
          ))}
        </nav>
        <a href="#contact" className="btn-primary !py-2 !px-4 text-sm shrink-0">
          דברו איתי
        </a>
      </div>
    </header>
  );
}

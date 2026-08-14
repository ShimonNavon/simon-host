import { Link } from "react-router-dom";
import { SERVICES } from "../content/services";

export default function Footer() {
  return (
    <footer className="bg-sea-deep text-white/70 py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="font-display text-lg text-white">
              Simon<span className="text-jaffa"> Host</span>
            </span>
            <p className="text-sm mt-2 max-w-[16rem]">
              אחסון ישראלי עם בן־אדם בצד השני — וקהילה של יזמים מסביב.
            </p>
          </div>
          <nav className="grid gap-1.5 text-sm" aria-label="מסלולים">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                to={`/${service.slug}`}
                className="hover:text-jaffa transition-colors"
              >
                {service.name} · {service.price} ₪
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-sm mt-8 pt-4 border-t border-white/10">
          אתרים, אפליקציות ושרתים · © 2026
        </p>
      </div>
    </footer>
  );
}

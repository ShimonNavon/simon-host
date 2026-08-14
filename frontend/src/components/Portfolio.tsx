import { PORTFOLIO } from "../content/portfolio";

/**
 * Live, linkable proof — every card is a real site running on this
 * infrastructure right now. Renders whatever portfolio.ts holds, so adding
 * a project (or a client site, once approved) is a data edit.
 */
export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-bold text-jaffa mb-3">דוגמאות חיות</p>
        <h2 className="text-3xl sm:text-4xl text-sea mb-10 max-w-xl">
          דברים שרצים כאן עכשיו
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PORTFOLIO.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-[#e8e2d6] p-6 shadow-[0_10px_30px_rgba(15,45,74,0.07)] hover:shadow-[0_18px_50px_rgba(15,45,74,0.14)] transition-shadow"
            >
              <h3 className="text-xl text-sea group-hover:text-jaffa transition-colors">
                {item.name}
              </h3>
              <p className="text-ink-soft text-sm mt-2">{item.blurb}</p>
              <p className="text-jaffa text-sm font-bold mt-4" dir="ltr">
                {item.url.replace("https://", "")} ←
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

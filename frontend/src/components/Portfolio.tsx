import { PORTFOLIO } from "../content/portfolio";

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-section section-shell" aria-labelledby="portfolio-heading">
      <div className="content-width">
        <div className="section-heading section-heading-row reveal">
          <div>
            <p className="section-kicker">לא הדמיות. מוצרים באוויר.</p>
            <h2 id="portfolio-heading">דברים שבניתי ומריץ כאן עכשיו.</h2>
          </div>
          <p>הקוד, בסיסי הנתונים והשרתים של אותו אדם — מהרעיון עד הניטור.</p>
        </div>
        <div className="project-grid">
          {PORTFOLIO.map((item, index) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link reveal"
            >
              <figure>
                <img src={item.image} alt={item.imageAlt} width={720} height={480} loading="lazy" />
              </figure>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.name}</h3>
                <p>{item.blurb}</p>
                <strong>לפתוח את המוצר ↗</strong>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

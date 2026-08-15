import { Link } from "react-router-dom";
import { FEATURED_PROJECTS, PORTFOLIO } from "../content/portfolio";
import ProjectRow from "./ProjectRow";

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-section section-shell" aria-labelledby="portfolio-heading">
      <div className="content-width">
        <div className="section-heading section-heading-row reveal">
          <div>
            <p className="section-kicker">לא הדמיות. מוצרים באוויר.</p>
            <h2 id="portfolio-heading">דברים שבניתי ושאפשר לפתוח.</h2>
          </div>
          <p>האתר, השרת והדאטה מתחברים אצל אותו אדם — מהרעיון ועד התחזוקה.</p>
        </div>
        <div className="project-grid">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index + 1} compact />
          ))}
        </div>
        <div className="portfolio-more reveal">
          <p>אלה ארבע דוגמאות מתוך {PORTFOLIO.length} פרויקטים ציבוריים, קהילות ומערכות.</p>
          <Link className="btn-ghost" to="/work">לכל העבודות ←</Link>
        </div>
      </div>
    </section>
  );
}

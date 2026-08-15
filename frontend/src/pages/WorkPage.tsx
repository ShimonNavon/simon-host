import Contact from "../components/Contact";
import ProjectRow from "../components/ProjectRow";
import { PORTFOLIO, PROJECT_CATEGORIES } from "../content/portfolio";

export default function WorkPage() {
  return (
    <main>
      <section className="work-hero section-shell">
        <div className="content-width">
          <p className="section-kicker rise rise-1">עבודות נבחרות · {PORTFOLIO.length} פרויקטים</p>
          <h1 className="rise rise-2">
            מאתר תדמית
            <span>עד מערכת שאנשים עובדים בה.</span>
          </h1>
          <div className="work-hero-intro rise rise-3">
            <p>
              אני מתכנן, בונה ומעלה מוצרים לאוויר — ואז נשאר כדי לשמור עליהם מהירים,
              מגובים ועובדים.
            </p>
            <p>
              כל צילום כאן מגיע מעמוד ציבורי. כשקוד או מידע שייכים ללקוח, הם נשארים פרטיים.
            </p>
          </div>
        </div>
      </section>

      <div className="work-catalogue">
        {PROJECT_CATEGORIES.map((category) => {
          const projects = PORTFOLIO.filter((project) => project.category === category.id);
          return (
            <section
              className="work-chapter section-shell"
              aria-labelledby={`work-${category.id}`}
              key={category.id}
            >
              <div className="content-width">
                <header className="work-chapter-heading">
                  <span>{category.number}</span>
                  <div>
                    <h2 id={`work-${category.id}`}>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </header>
                <div className="work-projects">
                  {projects.map((project) => (
                    <ProjectRow
                      key={project.slug}
                      project={project}
                      index={PORTFOLIO.indexOf(project) + 1}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Contact
        title="יש לכם רעיון שצריך להפוך למשהו אמיתי?"
        body="שלחו שתי שורות: מה אתם רוצים לבנות, למי זה מיועד ומה כבר קיים. אחזור עם השאלות הנכונות והצעד הראשון."
        label="מספרים לי על הפרויקט"
        message="היי סיימון, ראיתי את העבודות שלך ויש לי פרויקט שהייתי רוצה לבנות."
        campaign="work-page-project-inquiry"
      />
    </main>
  );
}

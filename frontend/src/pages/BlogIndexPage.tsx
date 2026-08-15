import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import { ARTICLES, articlePath } from "../content/articles";

export default function BlogIndexPage() {
  const guides = ARTICLES.filter((article) => article.kind === "guide");
  const caseStudies = ARTICLES.filter((article) => article.kind === "case-study");
  const [featured, ...remainingGuides] = guides;

  return (
    <main>
      <section className="blog-hero section-shell">
        <div className="content-width">
          <p className="section-kicker rise rise-1">מדריכים וסיפורי בנייה מהשטח</p>
          <h1 className="rise rise-2">מה כדאי לדעת — ואיך הדברים באמת נבנו.</h1>
          <p className="rise rise-3">
            מדריכים לבעלי סוכנויות, עסקים ומפתחים, לצד הצצה מסודרת למוצרים,
            למערכות ולהחלטות שמאחורי העבודות שלי.
          </p>
        </div>
      </section>

      <section className="section-shell blog-list" aria-labelledby="guides-heading">
        <div className="content-width">
          <Link className="featured-article" to={articlePath(featured)}>
            <div>
              <span>{featured.category}</span>
              <h2 id="guides-heading">{featured.title}</h2>
              <p>{featured.description}</p>
            </div>
            <strong>למדריך המלא ←</strong>
          </Link>

          <div className="blog-group-heading">
            <p className="section-kicker">מקרים מהעבודה</p>
            <h2>איך המוצרים נבנו</h2>
            <p>הבעיה, הזרימה, הטכנולוגיה — ומה נשאר פרטי.</p>
          </div>
          <div className="article-index case-study-index">
            {caseStudies.map((article) => (
              <article key={article.slug}>
                <p>{article.category}</p>
                <h2>
                  <Link to={articlePath(article)}>{article.title}</Link>
                </h2>
                <div className="article-index-meta">
                  <span>{article.readingMinutes} דקות קריאה</span>
                  <Link to={articlePath(article)}>קוראים ←</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="blog-group-heading">
            <p className="section-kicker">מדריכים מעשיים</p>
            <h2>לבחור, להעביר ולהפעיל נכון</h2>
          </div>
          <div className="article-index">
            {remainingGuides.map((article) => (
              <article key={article.slug}>
                <p>{article.category}</p>
                <h2>
                  <Link to={articlePath(article)}>{article.title}</Link>
                </h2>
                <div className="article-index-meta">
                  <span>{article.readingMinutes} דקות קריאה</span>
                  <Link to={articlePath(article)}>קוראים ←</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact
        title="לא מצאתם את התשובה?"
        body="שלחו את השאלה בוואטסאפ. אענה בעצמי — והיא כנראה תהפוך גם למדריך הבא."
        campaign="blog-index-contact"
      />
    </main>
  );
}

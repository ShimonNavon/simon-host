import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import { ARTICLES, articlePath } from "../content/articles";

export default function BlogIndexPage() {
  const [featured, ...articles] = ARTICLES;

  return (
    <main>
      <section className="blog-hero section-shell">
        <div className="content-width">
          <p className="section-kicker rise rise-1">מדריכים מהשטח</p>
          <h1 className="rise rise-2">אחסון, אתרים ומוצרים — בלי שכבת המכירות.</h1>
          <p className="rise rise-3">
            תשובות מעשיות לבעלי סוכנויות, עסקים ומפתחים שרוצים לדעת מה קורה
            לשרת, לדאטה ולכסף שלהם לפני שהם עוברים.
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

          <div className="article-index">
            {articles.map((article) => (
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

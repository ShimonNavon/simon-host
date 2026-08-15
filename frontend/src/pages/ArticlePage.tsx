import { Link } from "react-router-dom";
import ArticleCta from "../components/article/ArticleCta";
import AuthorBox from "../components/article/AuthorBox";
import { ARTICLES, articlePath, type Article } from "../content/articles";

const DATE_FORMATTER = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ArticlePage({ article }: { article: Article }) {
  const related = ARTICLES.filter((candidate) => candidate.slug !== article.slug).slice(0, 3);

  return (
    <main>
      <article className="article-page">
        <header className="article-header">
          <nav aria-label="פירורי לחם">
            <Link to="/">ראשי</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog">מדריכים</Link>
          </nav>
          <p className="section-kicker rise rise-1">{article.category}</p>
          <h1 className="rise rise-2">{article.title}</h1>
          <p className="article-intro rise rise-3">{article.intro}</p>
          <div className="article-meta rise rise-4">
            <span>מאת סיימון נבון</span>
            <time dateTime={article.published}>
              {DATE_FORMATTER.format(new Date(`${article.published}T12:00:00+03:00`))}
            </time>
            <span>{article.readingMinutes} דקות קריאה</span>
          </div>
        </header>

        <div className="article-body">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <nav className="related-links" aria-label="קישורים קשורים">
            <h2>המשך מכאן</h2>
            {article.relatedLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label} <span aria-hidden="true">←</span>
              </Link>
            ))}
          </nav>

          <ArticleCta article={article} />
          <AuthorBox />
        </div>
      </article>

      <section className="related-articles section-shell" aria-labelledby="related-heading">
        <div className="content-width">
          <p className="section-kicker">עוד מדריכים</p>
          <h2 id="related-heading">להמשיך לקרוא</h2>
          <div>
            {related.map((candidate) => (
              <Link key={candidate.slug} to={articlePath(candidate)}>
                <span>{candidate.category}</span>
                <strong>{candidate.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { Link } from "react-router-dom";
import ArticleCta from "../components/article/ArticleCta";
import AuthorBox from "../components/article/AuthorBox";
import ProjectFacts from "../components/ProjectFacts";
import { ARTICLES, articlePath, type Article } from "../content/articles";
import { findProject } from "../content/portfolio";

const DATE_FORMATTER = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ArticlePage({ article }: { article: Article }) {
  const project = article.projectSlug ? findProject(article.projectSlug) : undefined;
  const related = ARTICLES.filter(
    (candidate) => candidate.slug !== article.slug && candidate.kind === article.kind
  ).slice(0, 3);

  return (
    <main>
      <article className="article-page">
        <header className="article-header">
          <nav aria-label="פירורי לחם">
            <Link to="/">ראשי</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog">{article.kind === "case-study" ? "סיפורי פרויקטים" : "מדריכים"}</Link>
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
          {project && (
            <figure className="article-project-proof rise rise-4">
              <img src={project.image} alt={project.imageAlt} width={720} height={480} />
              <figcaption>
                <span>{project.name} · צילום מהעמוד הציבורי</span>
                <span>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">לאתר החי ↗</a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">לקוד הציבורי ↗</a>
                  )}
                </span>
              </figcaption>
            </figure>
          )}
        </header>

        <div className="article-body">
          {project && <ProjectFacts project={project} />}
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
          <p className="section-kicker">{article.kind === "case-study" ? "עוד סיפורי בנייה" : "עוד מדריכים"}</p>
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

import { Link } from "react-router-dom";
import { ARTICLES, articlePath } from "../content/articles";

export default function GuidesPreview() {
  return (
    <section className="guides-section section-shell" aria-labelledby="guides-preview-heading">
      <div className="content-width">
        <div className="section-heading section-heading-row reveal">
          <div>
            <p className="section-kicker">ידע לפני החלטה</p>
            <h2 id="guides-preview-heading">מה שכדאי לדעת לפני שמעבירים.</h2>
          </div>
          <Link className="text-link" to="/blog">לכל המדריכים ←</Link>
        </div>
        <div className="guide-rows">
          {ARTICLES.slice(0, 3).map((article, index) => (
            <Link className="guide-row reveal" key={article.slug} to={articlePath(article)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{article.category}</p>
                <h3>{article.title}</h3>
              </div>
              <strong>{article.readingMinutes} דק׳ <span aria-hidden="true">←</span></strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

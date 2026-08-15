import type { Article } from "../../content/articles";
import WhatsAppButton from "../WhatsAppButton";

export default function ArticleCta({ article }: { article: Article }) {
  return (
    <aside className="article-cta" aria-labelledby={`article-cta-${article.slug}`}>
      <p className="section-kicker">הצעד הבא</p>
      <h2 id={`article-cta-${article.slug}`}>{article.cta.title}</h2>
      <p>{article.cta.body}</p>
      <WhatsAppButton
        message={article.cta.message}
        label={article.cta.label}
        campaign={`article-${article.slug}`}
        className="text-base sm:text-lg"
      />
    </aside>
  );
}

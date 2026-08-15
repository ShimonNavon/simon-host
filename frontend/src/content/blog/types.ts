/**
 * The blog is content-as-data, like everything else on the site: one typed
 * module per article, no raw HTML. A section is an h2 plus paragraphs and
 * lists; the page component renders it, seo.ts turns it into BlogPosting
 * structured data, and rss.ts serialises it into the feed. Adding an article
 * is a new file plus one line in articles.ts — the route, sitemap entry and
 * feed item follow from that.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type Section = {
  /** Rendered as the section's h2. */
  heading: string;
  blocks: Block[];
};

/**
 * Which landing page the closing CTA card points to:
 *   A     → /agencies (agencies overpaying for hosting)
 *   B     → /launch   (founders: idea to product in 30 days)
 *   brand → /wordpress (managed WordPress hosting, migration included)
 */
export type ArticleOffer = "A" | "B" | "brand";

export type Article = {
  /** URL segment: the article lives at `/blog/${slug}`. ASCII, kebab-case. */
  slug: string;
  /** Page h1 and the first part of the <title>. */
  title: string;
  /** Meta description and index-card teaser (≤155 chars). */
  description: string;
  /** ISO dates, YYYY-MM-DD. updatedAt feeds sitemap lastmod. */
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  readingMinutes: number;
  offer: ArticleOffer;
  /** The one search phrase this article is written to answer. */
  targetPhrase: string;
  /** Opening paragraph, before the first h2. */
  lead: string;
  body: Section[];
};

/** Every word a reader sees in the article body — the tests scan this. */
export function articleText(article: Article): string {
  const parts: string[] = [article.title, article.description, article.lead];
  for (const section of article.body) {
    parts.push(section.heading);
    for (const block of section.blocks) {
      if (block.type === "p") parts.push(block.text);
      else parts.push(...block.items);
    }
  }
  return parts.join("\n");
}

/** Body word count (lead + sections, not title/description). */
export function articleWordCount(article: Article): number {
  const parts: string[] = [article.lead];
  for (const section of article.body) {
    parts.push(section.heading);
    for (const block of section.blocks) {
      if (block.type === "p") parts.push(block.text);
      else parts.push(...block.items);
    }
  }
  return parts
    .join(" ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

import { FOUNDER } from "../../content/site";

export default function AuthorBox() {
  return (
    <aside className="author-box" aria-label="על הכותב">
      <img
        src={FOUNDER.portrait}
        alt={`תמונה של ${FOUNDER.name}`}
        width={120}
        height={120}
        loading="lazy"
      />
      <div>
        <p className="section-kicker">נכתב מהשטח</p>
        <h2>{FOUNDER.name}</h2>
        <p>{FOUNDER.summary}</p>
        <div className="author-links">
          <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={FOUNDER.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}

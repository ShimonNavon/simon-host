import { FOUNDER } from "../content/site";

export default function FounderSection() {
  return (
    <section id="about" className="founder-section section-shell" aria-labelledby="founder-heading">
      <div className="content-width founder-grid">
        <div className="founder-image reveal">
          <img
            src={FOUNDER.portrait}
            alt={`סיימון נבון, מייסד Simon Host`}
            width={200}
            height={200}
            loading="lazy"
          />
          <span aria-hidden="true">S / H</span>
        </div>
        <div className="founder-copy reveal">
          <p className="section-kicker">הבן־אדם בצד השני</p>
          <h2 id="founder-heading">{FOUNDER.name}. בונה, מעלה לאוויר ונשאר.</h2>
          <p className="founder-lead">{FOUNDER.summary}</p>
          <ul>
            {FOUNDER.credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
          <div className="founder-links">
            <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={FOUNDER.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

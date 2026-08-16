import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import WhatsAppButton from "../components/WhatsAppButton";
import type { GrowthService } from "../content/growthServices";
import { findProject, projectPath } from "../content/portfolio";

export default function GrowthServicePage({ service }: { service: GrowthService }) {
  const heroProject = findProject(service.heroProjectSlug);
  const proofProjects = service.proofProjectSlugs.map(findProject).filter(Boolean);

  return (
    <main className="growth-service-page">
      <section className="growth-hero">
        {heroProject && (
          <figure className="growth-hero-media" aria-hidden="true">
            <img src={heroProject.image} alt="" />
          </figure>
        )}
        <div className="content-width growth-hero-inner">
          <div className="growth-hero-copy">
            <p className="growth-brand rise rise-1">Simon <span>Host</span></p>
            <p className="section-kicker rise rise-1">{service.eyebrow}</p>
            <h1 className="rise rise-2">{service.name}</h1>
            <p className="growth-hero-tagline rise rise-3">{service.tagline}</p>
            <p className="growth-hero-body rise rise-3">{service.heroBody}</p>
            <div className="growth-hero-actions rise rise-4">
              <WhatsAppButton
                message={service.whatsapp}
                label={service.ctaLabel}
                campaign={`${service.slug}-hero`}
              />
              <Link to="/work" className="growth-hero-link">רואים עבודות אמיתיות ←</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="growth-recognition section-shell" aria-labelledby={`${service.id}-recognition`}>
        <div className="content-width">
          <header className="growth-section-intro reveal">
            <p className="section-kicker">נשמע מוכר?</p>
            <h2 id={`${service.id}-recognition`}>{service.recognition.title}</h2>
            <p>{service.recognition.body}</p>
          </header>
          <div className="growth-signals">
            {service.recognition.signals.map((signal, index) => (
              <article key={signal.title} className="reveal">
                <span>0{index + 1}</span>
                <h3>{signal.title}</h3>
                <p>{signal.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-process section-shell" aria-labelledby={`${service.id}-process`}>
        <div className="content-width">
          <header className="growth-section-intro growth-section-intro-dark reveal">
            <p className="section-kicker">איך עובדים יחד</p>
            <h2 id={`${service.id}-process`}>ארבע החלטות. דרך אחת ברורה לאוויר.</h2>
          </header>
          <ol className="growth-process-list">
            {service.process.map((step) => (
              <li key={step.number} className="reveal">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="growth-proof section-shell" aria-labelledby={`${service.id}-proof`}>
        <div className="content-width">
          <header className="growth-section-intro reveal">
            <p className="section-kicker">לא רק הבטחה</p>
            <h2 id={`${service.id}-proof`}>מערכות ומוצרים שכבר אפשר לפתוח.</h2>
            <p>הצילומים מגיעים מעמודים ציבוריים. קוד, משתמשים ומידע פרטיים נשארים פרטיים.</p>
          </header>
          <div className="growth-proof-list">
            {proofProjects.map((project, index) => {
              if (!project) return null;
              const caseStudy = projectPath(project);
              return (
                <article key={project.slug} className="growth-proof-row reveal">
                  <figure>
                    <img src={project.image} alt={project.imageAlt} loading="lazy" />
                  </figure>
                  <div>
                    <span>0{index + 1} · {project.eyebrow}</span>
                    <h3>{project.name}</h3>
                    <p>{project.story}</p>
                    <p className="growth-proof-role">{project.role}</p>
                    <div className="growth-proof-actions">
                      {caseStudy && <Link to={caseStudy}>למקרה הבוחן ←</Link>}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer">לאתר החי ↗</a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="growth-ownership section-shell" aria-labelledby={`${service.id}-ownership`}>
        <div className="content-width growth-ownership-grid reveal">
          <div>
            <p className="section-kicker">בעלות ושקט</p>
            <h2 id={`${service.id}-ownership`}>{service.ownershipTitle}</h2>
            <p>{service.ownershipBody}</p>
            {service.relatedOffer && (
              <div className="growth-related-offer">
                <p>{service.relatedOffer.body}</p>
                <Link to={service.relatedOffer.href}>{service.relatedOffer.label} ←</Link>
              </div>
            )}
          </div>
          <ul>
            {service.ownership.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <Faq questions={service.faq} title={`שאלות על ${service.navLabel}`} />

      <Contact
        title={service.ctaLine}
        body="הודעה אחת בוואטסאפ. אני עונה בעצמי, ושומר את השלב הראשון פשוט וברור."
        message={service.whatsapp}
        label={service.ctaLabel}
        campaign={`${service.slug}-contact`}
      />
    </main>
  );
}


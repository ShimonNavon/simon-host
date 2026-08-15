import { Link } from "react-router-dom";
import { projectPath, type PortfolioItem } from "../content/portfolio";

type ProjectRowProps = {
  project: PortfolioItem;
  index: number;
  compact?: boolean;
};

export default function ProjectRow({ project, index, compact = false }: ProjectRowProps) {
  const caseStudyPath = projectPath(project);

  return (
    <article id={project.slug} className={`project-row reveal${compact ? " project-row-compact" : ""}`}>
      <figure>
        <img src={project.image} alt={project.imageAlt} width={720} height={480} loading="lazy" />
      </figure>
      <div className="project-row-copy">
        <div className="project-row-label">
          <span>{String(index).padStart(2, "0")}</span>
          <p>{project.eyebrow}</p>
        </div>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        {!compact && <p className="project-story">{project.story}</p>}
        <ul className="project-stack" aria-label="טכנולוגיות">
          {project.stack.slice(0, compact ? 4 : undefined).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-actions">
          {caseStudyPath && <Link to={caseStudyPath}>איך בניתי את זה ←</Link>}
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              לאתר החי ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              קוד ציבורי ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

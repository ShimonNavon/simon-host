import type { PortfolioItem } from "../content/portfolio";

export default function ProjectFacts({ project }: { project: PortfolioItem }) {
  return (
    <aside className="project-facts" aria-label={`פרטי הפרויקט ${project.name}`}>
      <div>
        <span>התפקיד שלי</span>
        <strong>{project.role}</strong>
      </div>
      <div>
        <span>מה בניתי</span>
        <strong>{project.summary}</strong>
      </div>
      <div>
        <span>טכנולוגיות</span>
        <strong>{project.stack.join(" · ")}</strong>
      </div>
      <div>
        <span>פרטיות</span>
        <strong>{project.repoVisibility === "public" ? "הקוד ציבורי" : "הקוד נשאר פרטי"}</strong>
      </div>
    </aside>
  );
}

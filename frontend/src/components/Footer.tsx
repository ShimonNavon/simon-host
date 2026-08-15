import { Link } from "react-router-dom";
import { FOUNDER } from "../content/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-width">
        <div className="footer-brand">
          <Link to="/" className="site-logo">Simon <span>Host</span></Link>
          <p>אחסון, אתרים ומוצרים עם בן־אדם אחד שאחראי מהרגע הראשון.</p>
        </div>
        <div className="footer-navs">
          <nav aria-label="שירותים">
            <strong>שירותים</strong>
            <Link to="/agencies">אחסון לסוכנויות</Link>
            <Link to="/wordpress">WordPress מנוהל</Link>
            <Link to="/apps">אחסון אפליקציות</Link>
            <Link to="/vps">שרת פרטי</Link>
          </nav>
          <nav aria-label="מידע">
            <strong>מידע</strong>
            <Link to="/launch">מרעיון למוצר</Link>
            <Link to="/websites">אתר לעסק</Link>
            <Link to="/blog">מדריכים</Link>
            <a href="/#about">סיימון נבון</a>
          </nav>
          <nav aria-label="פרופילים">
            <strong>סיימון ברשת</strong>
            <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={FOUNDER.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="/rss.xml">RSS</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Simon Host</span>
          <span>מופעל מישראל · נבנה ומאוחסן כאן</span>
        </div>
      </div>
    </footer>
  );
}

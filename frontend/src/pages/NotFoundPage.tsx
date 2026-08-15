import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="not-found section-shell">
      <div className="content-width">
        <p className="not-found-code" aria-hidden="true">404</p>
        <p className="section-kicker">העמוד לא נמצא</p>
        <h1>הקישור הזה לא מוביל לשום שרת.</h1>
        <p>אפשר לחזור לעמוד הראשי, לבחור שירות או לקרוא מדריך לפני שמחליטים.</p>
        <div>
          <Link className="btn-primary" to="/">לעמוד הראשי</Link>
          <Link className="text-link" to="/blog">למדריכים</Link>
        </div>
      </div>
    </main>
  );
}

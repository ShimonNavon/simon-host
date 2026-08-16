import { Link } from "react-router-dom";

const PATHS = [
  {
    number: "01",
    eyebrow: "סוכנויות ופרילנסרים",
    title: "מעבירים אתרי לקוחות. מפסיקים לנהל אחסון.",
    body: "בדיקת חשבון חינם, אתר אחד רץ לצד המקור ל־14 יום, והעברה מלאה רק אחרי שאישרתם.",
    href: "/agencies",
    label: "למסלול הסוכנויות",
    featured: true,
  },
  {
    number: "02",
    eyebrow: "עסקים עם תהליך ידני",
    title: "מחברים את העבודה למערכת אחת.",
    body: "לקוחות, תקציב, הרשאות או תהליך ייחודי — מתחילים בזרימה אחת שבאמת חוסכת עבודה.",
    href: "/business-systems",
    label: "לפיתוח מערכת לעסק",
  },
  {
    number: "03",
    eyebrow: "יזמים ובעלי מוצר",
    title: "רעיון בדוק לגרסה ראשונה באוויר.",
    body: "מפרט קטן, זרימה שלמה, קוד, בסיס נתונים ופריסה בידיים של אותו אדם.",
    href: "/mvp-development",
    label: "לפיתוח MVP",
  },
  {
    number: "04",
    eyebrow: "עסקים ומפתחים",
    title: "אתר, WordPress, אפליקציה או שרת.",
    body: "ארבעה מסלולים שקופים לפי כמות העבודה שאתם רוצים להשאיר אצלי.",
    href: "/#services",
    label: "למסלולים ולמחירים",
  },
];

export default function AudiencePaths() {
  return (
    <section className="audience-section section-shell" aria-labelledby="audience-heading">
      <div className="content-width">
        <div className="section-heading reveal">
          <p className="section-kicker">איפה אתם היום?</p>
          <h2 id="audience-heading">ארבעה מסלולים. אחריות אחת ברורה.</h2>
        </div>
        <div className="audience-paths">
          {PATHS.map((path) => (
            <article key={path.number} className={path.featured ? "featured" : undefined}>
              <span className="audience-number" aria-hidden="true">{path.number}</span>
              <div>
                <p>{path.eyebrow}</p>
                <h3>{path.title}</h3>
                <span>{path.body}</span>
              </div>
              {path.href.startsWith("/#") ? (
                <a href={path.href} className="text-link">{path.label} ←</a>
              ) : (
                <Link to={path.href} className="text-link">{path.label} ←</Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FACTS = [
  {
    number: "01",
    title: "סביבה נפרדת לכל אתר",
    text: "גרסת PHP נפרדת ועדכון של אתר אחד בלי להמר על כל חשבונות הסוכנות.",
  },
  {
    number: "02",
    title: "גיבוי גם מחוץ לשרת",
    text: "עותק יומי נשמר מחוץ למכונה שעליה האתר רץ, עם דרך שחזור ברורה.",
  },
  {
    number: "03",
    title: "ניטור שמגיע לאדם",
    text: "כששירות נופל ההתראה מגיעה אליי. לא צריך לחכות שלקוח יהיה הראשון לדווח.",
  },
  {
    number: "04",
    title: "Cloudflare בקצה",
    text: "HTTPS, הגנת DDoS ושכבת קצה לפני התשתית — בלי להפוך אתכם למנהלי רשת.",
  },
];

export default function Infrastructure() {
  return (
    <section id="infrastructure" className="infrastructure-section section-shell" aria-labelledby="infrastructure-heading">
      <div className="content-width">
        <div className="infrastructure-intro reveal">
          <p className="section-kicker">מה עובד מאחורי השקט</p>
          <h2 id="infrastructure-heading">תשתית רצינית. שיחה פשוטה.</h2>
          <p>
            אתם לא צריכים ללמוד עוד פאנל. אתם צריכים לדעת שיש גיבוי, שיש ניטור
            ושיש מי שאחראי כשהם נדרשים.
          </p>
        </div>
        <ol className="infrastructure-list">
          {FACTS.map((fact) => (
            <li key={fact.number} className="reveal">
              <span aria-hidden="true">{fact.number}</span>
              <div>
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

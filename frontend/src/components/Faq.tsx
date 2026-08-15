/** Exported so the FAQPage structured data is built from the same source. */
export const QUESTIONS = [
  {
    q: "ואם אני רוצה לעזוב?",
    a: "הקוד שלך, הדאטה שלך, הדומיין שלך. אני נותן לך את הכל ועוזר להעביר לאן שתרצה. בלי קנסות ובלי לעכב אותך.",
  },
  {
    q: "למה זה זול יותר מהמתחרים?",
    a: "כי אני לא חברה. אין מוקד, אין תקציב שיווק ואין שכבות ניהול. אתה משלם על התשתית ועל הזמן שלי — וזה כל מה שיש כאן.",
  },
  {
    q: "מי עונה כשמשהו נשבר?",
    a: "אני. אותו מספר, אותו בן אדם, גם בפעם החמישית. לא תעבור בין נציגים ולא תפתח כרטיס.",
  },
  {
    q: "אפשר לעבור בין המסלולים?",
    a: "כן, בסוף כל חודש. התחלת עם אתר וגילית שאתה צריך שרת? מעבירים. גם הכיוון ההפוך בסדר גמור.",
  },
  {
    q: "מה עם הדאטה שלי?",
    a: "מגובה כל יום, ואני שומר עותקים גם מחוץ למכונה שעליה זה רץ. אני לא נוגע בתוכן שלך ולא משתמש בו לשום דבר.",
  },
  {
    q: "אני לא מבין בטכנולוגיה בכלל. זו בעיה?",
    a: "לא. בשביל זה יש את המסלול הראשון — אתה מספר לי על העסק, ואני מטפל בכל השאר. בעברית, בלי מונחים.",
  },
];

/**
 * The homepage's FAQ by default; hand it `questions` and a `title` and it
 * becomes any page's — the offer pages use it with their own list.
 */
export default function Faq({
  questions = QUESTIONS,
  title = "שאלות שנשאלתי",
}: {
  questions?: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section id="faq" className="bg-sky/60 py-20 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-5">
        <p className="font-bold text-jaffa mb-3">שאלות</p>
        <h2 className="text-3xl sm:text-4xl text-sea mb-8">{title}</h2>
        <div className="grid gap-3">
          {questions.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p className="text-ink-soft mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

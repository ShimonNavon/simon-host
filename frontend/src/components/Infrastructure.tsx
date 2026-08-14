/**
 * The infrastructure story, told concretely and without client names.
 * Every claim here is true of the real setup; nothing aspirational.
 * Absorbs the old Trust pillars (backups, simplicity, fixed price live on
 * elsewhere: HowItWorks and the pricing grid carry those now).
 */
const FACTS = [
  {
    title: "פלטפורמת אחסון עצמאית",
    text: "אנחנו מפעילים פלטפורמת אחסון משלנו — כולל גרסת PHP נפרדת לכל אתר. העברות מ־cPanel הן עניין שבשגרה.",
  },
  {
    title: "אשכול שרתים",
    text: "התשתית רצה על יותר ממכונה אחת. מכונה נופלת — השירות ממשיך, ואני מטפל בלי שתרגיש.",
  },
  {
    title: "גיבוי יומי, גם מחוץ לשרת",
    text: "כל אתר מגובה כל יום, ועותק נשמר גם מחוץ למכונה שעליה הוא רץ. תרחיש הכי גרוע — חוזרים לאתמול.",
  },
  {
    title: "קצה של Cloudflare",
    text: "התעבורה עוברת דרך הרשת של Cloudflare — הגנת DDoS, תעודות אבטחה, ומהירות גלישה גם מחו״ל.",
  },
  {
    title: "ניטור מסביב לשעון",
    text: "כל שירות מנוטר. משהו נופל בשתיים בלילה? ההתראה מגיעה אליי — לא אליך.",
  },
  {
    title: "אבטחה כברירת מחדל",
    text: "חומת אש, הצפנה מקצה לקצה, עדכוני אבטחה שוטפים, וגישה לשרתים רק דרך ערוצים מוצפנים.",
  },
];

export default function Infrastructure() {
  return (
    <section id="infrastructure" className="bg-sea-deep text-white py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-bold text-jaffa mb-3">התשתית</p>
        <h2 className="text-3xl sm:text-4xl text-white mb-10 max-w-xl">
          קטן מספיק בשביל לענות לך אישית. רציני מספיק בשביל שלא תצטרך.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {FACTS.map((f) => (
            <div key={f.title}>
              <h3 className="text-xl text-white mb-2">{f.title}</h3>
              <p className="text-white/70 text-[0.95rem]">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import BrowserDemo from "./components/BrowserDemo";
import LeadForm from "./components/LeadForm";

const FEATURES = [
  { emoji: "🎨", title: "עיצוב אישי", text: "אתר שנבנה סביב העסק שלך — לא תבנית גנרית שנראית כמו של כולם." },
  { emoji: "⚡", title: "אחסון מנוהל", text: "האתר יושב על שרת מנוהל ומהיר, ואני דואג שהוא באוויר. תמיד." },
  { emoji: "🔒", title: "אבטחה ו־SSL", text: "תעודת אבטחה, גיבויים ועדכוני אבטחה שוטפים — כלול, לא בתוספת תשלום." },
  { emoji: "📱", title: "מותאם לנייד", text: "רוב הלקוחות שלך גולשים מהטלפון. האתר ייראה מצוין גם שם." },
  { emoji: "✏️", title: "עדכוני תוכן", text: "שיניתם מחיר? שעות פתיחה? שלחו לי הודעה ואני מעדכן." },
  { emoji: "💬", title: "מענה אנושי", text: "בעיה או שאלה? מדברים איתי ישירות. בלי מוקד, בלי המתנה." },
];

const STEPS = [
  { num: "1", title: "שיחת היכרות", text: "מספרים לי על העסק — מה אתם עושים, מי הלקוחות, ומה האתר צריך להשיג." },
  { num: "2", title: "אני בונה", text: "תוך ימים ספורים יש טיוטה חיה של האתר. עוברים עליה יחד ומלטשים עד שמרוצים." },
  { num: "3", title: "באוויר", text: "האתר עולה לדומיין שלך, ומכאן אני מתחזק, מגבה ומעדכן — חודש אחרי חודש." },
];

const INCLUDED = [
  "בניית האתר ועיצובו",
  "אחסון מהיר ומאובטח",
  "חיבור דומיין ותעודת SSL",
  "התאמה מלאה לנייד",
  "עדכוני תוכן שוטפים",
  "גיבויים ותחזוקה",
];

export default function App() {
  return (
    <>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-[#e8e2d6]">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <a href="#top" className="font-display text-2xl text-sea">
            Simon<span className="text-jaffa"> Host</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 font-bold text-sm">
            <a href="#features" className="hover:text-jaffa">מה מקבלים</a>
            <a href="#how" className="hover:text-jaffa">איך זה עובד</a>
            <a href="#price" className="hover:text-jaffa">מחיר</a>
          </nav>
          <a href="#contact" className="btn-primary !py-2 !px-4 text-sm">דברו איתי</a>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section className="max-w-6xl mx-auto px-5 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="rise rise-1 font-bold text-jaffa mb-3">בנייה · אחסון · ליווי — חבילה אחת</p>
            <h1 className="rise rise-2 text-4xl sm:text-5xl lg:text-[3.4rem] text-sea">
              אתר לעסק שלך.
              <br />
              <span className="marker">99 ₪ בחודש.</span> זהו.
            </h1>
            <p className="rise rise-3 mt-5 text-lg text-ink-soft max-w-md">
              אני סיימון. אני בונה לך אתר מקצועי, מארח אותו על השרתים שלי,
              ומטפל בכל הצד הטכני — כדי שאתה תתעסק בעסק, לא באתר.
            </p>
            <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary text-lg">רוצה אתר כזה</a>
              <a href="#how" className="btn-ghost text-lg">איך זה עובד?</a>
            </div>
            <p className="rise rise-4 mt-6 text-sm text-ink-soft font-bold">
              בלי דמי הקמה · בלי התחייבות · בלי אותיות קטנות
            </p>
          </div>
          <div className="rise rise-3">
            <BrowserDemo />
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="bg-sky/60 py-20 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl sm:text-4xl text-sea mb-3">הכל כלול. באמת הכל.</h2>
            <p className="text-ink-soft max-w-lg mb-10">
              מחיר אחד קבוע שמכסה את כל מה שאתר של עסק צריך — בלי הפתעות בחשבונית.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f) => (
                <div key={f.title} className="feature-card">
                  <div className="text-3xl mb-3" aria-hidden="true">{f.emoji}</div>
                  <h3 className="text-xl text-sea mb-1.5">{f.title}</h3>
                  <p className="text-ink-soft text-[0.95rem]">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="py-20 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl sm:text-4xl text-sea mb-10">משיחה ראשונה לאתר באוויר</h2>
            <ol className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <li key={s.num} className="relative">
                  <div className="font-display text-6xl text-jaffa/25 leading-none mb-3" aria-hidden="true">
                    {s.num}
                  </div>
                  <h3 className="text-2xl text-sea mb-2">{s.title}</h3>
                  <p className="text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="price" className="bg-sea text-white py-20 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl mb-4">מחיר אחד. פשוט לחשב.</h2>
              <p className="text-white/75 max-w-md text-lg">
                אין חבילת בסיס, פרימיום ופלטינום. יש מחיר אחד הוגן שכולל הכל,
                ואפשר להפסיק בכל חודש — האתר שלך, ההחלטה שלך.
              </p>
            </div>
            <div className="bg-white text-ink rounded-2xl p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="flex items-end gap-2 mb-6">
                <span className="font-display text-6xl text-sea leading-none">99 ₪</span>
                <span className="text-ink-soft font-bold mb-1">/ בחודש</span>
              </div>
              <ul className="grid gap-2.5 mb-8">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="text-jaffa font-bold" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary w-full text-center text-lg">מתחילים</a>
            </div>
          </div>
        </section>

        {/* ── Lead form ── */}
        <section id="contact" className="py-20 scroll-mt-16">
          <div className="max-w-2xl mx-auto px-5">
            <h2 className="text-3xl sm:text-4xl text-sea mb-3">רוצה אתר? דברו איתי.</h2>
            <p className="text-ink-soft mb-8">
              השאירו שם וטלפון ואני חוזר אליכם תוך יום עסקים לשיחת היכרות קצרה — בלי לחץ ובלי מכירות.
            </p>
            <LeadForm />
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-sea-deep text-white/70 py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="font-display text-lg text-white">
            Simon<span className="text-jaffa"> Host</span>
          </span>
          <span>אתרים ואחסון לעסקים קטנים · © 2026</span>
        </div>
      </footer>
    </>
  );
}

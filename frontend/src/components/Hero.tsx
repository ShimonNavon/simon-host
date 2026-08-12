import Ladder from "./Ladder";
import WhatsAppButton from "./WhatsAppButton";

const HERO_MESSAGE = "היי סיימון, הגעתי מהאתר ואשמח להתייעץ איתך על מה שמתאים לי.";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-5 pt-14 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <p className="rise rise-1 font-bold text-jaffa mb-3">
          אתרים · אפליקציות · שרתים — מארח בישראל
        </p>
        <h1 className="rise rise-2 text-4xl sm:text-5xl lg:text-[3.4rem] text-sea">
          אתר. אפליקציה. שרת.
          <br />
          <span className="marker">אתה בוחר כמה להתעסק.</span>
        </h1>
        <p className="rise rise-3 mt-6 text-lg text-ink-soft max-w-md">
          אני סיימון. אני מארח אתרים, אפליקציות ושרתים על התשתית שלי — ואני גם
          זה שעונה לך בוואטסאפ כשמשהו נתקע. בלי מוקד, בלי כרטיס, בלי המתנה.
        </p>
        <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
          <WhatsAppButton message={HERO_MESSAGE} label="דברו איתי" className="text-lg" />
          <a href="#how" className="btn-ghost text-lg">
            איך זה עובד?
          </a>
        </div>
        <p className="rise rise-4 mt-6 text-sm text-ink-soft font-bold">
          בלי דמי הקמה · בלי התחייבות · אפשר לעצור בכל חודש
        </p>
      </div>

      <Ladder />
    </section>
  );
}

import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../content/services";

/**
 * The differentiator a hosting giant can't copy: the founder is the support
 * line. The photo is a launch gate: drop a file at public/simon.jpg and flip
 * HAS_PHOTO — until then the section stands on its own (a broken <img> in
 * prerendered HTML would be worse than none).
 */
const HAS_PHOTO = false;

export default function About() {
  return (
    <section id="about" className="py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[auto_1fr] gap-10 items-center">
        {HAS_PHOTO && (
          <img
            src="/simon.jpg"
            alt="סיימון נבון"
            width={180}
            height={180}
            loading="lazy"
            className="rounded-2xl object-cover w-44 h-44 shadow-[0_18px_50px_rgba(15,45,74,0.15)]"
          />
        )}
        <div>
          <p className="font-bold text-jaffa mb-3">מי מאחורי זה</p>
          <h2 className="text-3xl sm:text-4xl text-sea mb-4">
            סיימון נבון. <span className="marker">בוגר אוניברסיטת הרווארד.</span>
          </h2>
          <p className="text-ink-soft max-w-2xl">
            מי שבונה את התשתית הוא גם מי שעונה לך בוואטסאפ. אין מוקד, אין נציגים,
            אין ״הפנייה שלך התקבלה״ — יש בן־אדם אחד שמכיר את השרת שלך בשמו, ועונה
            גם בפעם החמישית באותו סבלנות.
          </p>
          <p className="text-ink-soft mt-4">
            <span className="font-bold text-sea">וואטסאפ:</span>{" "}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="font-bold text-sea whitespace-nowrap"
              dir="ltr"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

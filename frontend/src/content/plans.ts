/**
 * The three rungs of the ladder, ordered by how much of the work is mine.
 *
 * `mine` is the percentage of the job I do — it drives the involvement bar
 * that runs through the whole site, and it's also why the prices aren't in
 * ascending order: you pay for my time, not for the hardware.
 */
export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  /** Percent of the work that lands on me. Drives the involvement bar. */
  mine: number;
  forWho: string;
  included: string[];
  /** What the Israeli market charges for the nearest equivalent. */
  market?: string;
  ctaLabel: string;
  /** Pre-filled WhatsApp text, so I know which rung they came for. */
  whatsapp: string;
};

export const PLANS: Plan[] = [
  {
    id: "website",
    name: "אתר לעסק",
    tagline: "אני בונה, אני מארח, אני מתחזק.",
    price: 99,
    mine: 100,
    forWho: "לעסק שאין לו אתר — או שיש לו אתר שקצת מביך אותו.",
    included: [
      "בניית האתר והעיצוב שלו",
      "דומיין ותעודת אבטחה",
      "התאמה מלאה לנייד",
      "עדכוני תוכן — שולחים לי הודעה",
      "גיבויים ותחזוקה שוטפת",
      "מענה אנושי. ממני.",
    ],
    market: "אחסון בלבד אצל ספקים ישראליים: ₪25–99 לחודש — בלי שאף אחד בונה לך את האתר.",
    ctaLabel: "רוצה אתר לעסק",
    whatsapp: "היי סיימון, הגעתי מהאתר ואשמח לשמוע על אתר לעסק שלי.",
  },
  {
    id: "app",
    name: "האפליקציה שלך באוויר",
    tagline: "אתה כותב את הקוד. אני דואג לכל השאר.",
    price: 149,
    mine: 65,
    forWho:
      "למפתח, לפרילנסר או לסטארטאפ בהתחלה — יש לך פרויקט שרץ יפה על המחשב וצריך להיות באוויר.",
    included: [
      "שרת מוכן, עם הקוד שלך רץ עליו",
      "בסיס נתונים PostgreSQL מוכן ומגובה",
      "דומיין ותעודת אבטחה מחוברים",
      "גרסה חדשה? שולח לי, או מחבר ל־Git",
      "גיבוי יומי — גם לקוד וגם לדאטה",
      "אני מנטר. אם זה נופל, אני יודע לפניך.",
    ],
    market:
      "השילוב המקביל בחו״ל עולה בערך אותו דבר — באנגלית, בלי ליווי, ובלי מישהו שעונה לך.",
    ctaLabel: "רוצה להעלות אפליקציה",
    whatsapp:
      "היי סיימון, הגעתי מהאתר ואשמח לשמוע על העלאת אפליקציה עם בסיס נתונים.",
  },
  {
    id: "server",
    name: "שרת פרטי",
    tagline: "המפתחות אצלך. תעשה מה שבא לך.",
    price: 79,
    mine: 20,
    forWho:
      "למי שכבר יודע בדיוק מה הוא צריך, ורק רוצה מכונה בישראל בלי לשלם מחירים של חברה גדולה.",
    included: [
      "גישה מלאה, עם הרשאות מנהל",
      "לינוקס לבחירתך",
      "משאבים שמורים לך — לא חולקים אותם",
      "גיבוי יומי, אם תרצה",
      "אני לא נוגע במה שרץ אצלך",
      "נתקעת? אני עדיין בצד השני של הוואטסאפ",
    ],
    market: "שרת דומה אצל ספקים ישראליים: ₪89–175 לחודש.",
    ctaLabel: "בוא נדבר על שרת",
    whatsapp: "היי סיימון, הגעתי מהאתר ואשמח לשמוע על שרת פרטי.",
  },
];

export const WHATSAPP_NUMBER = "972549877094";
export const WHATSAPP_DISPLAY = "054-987-7094";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

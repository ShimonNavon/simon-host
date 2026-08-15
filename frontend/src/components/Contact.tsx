import WhatsAppCTA from "./WhatsAppCTA";

const DEFAULT_MESSAGE = "היי סיימון, הגעתי מהאתר ואשמח להתייעץ איתך על מה שמתאים לי.";

export default function Contact({
  title = "לא בטוחים מה מתאים?",
  body = "כתבו מה אתם מנסים להעלות לאוויר. אחזיר תשובה ישירה — גם אם המסלול הזול הוא הנכון.",
  message = DEFAULT_MESSAGE,
  label = "שולחים הודעה ב־WhatsApp",
  campaign = "contact",
}: {
  title?: string;
  body?: string;
  message?: string;
  label?: string;
  campaign?: string;
}) {
  return (
    <section id="contact" className="contact-section section-shell" aria-labelledby={`contact-${campaign}`}>
      <div className="content-width contact-inner reveal">
        <p className="section-kicker">בלי טופס ובלי מוקד</p>
        <h2 id={`contact-${campaign}`}>{title}</h2>
        <p>{body}</p>
        <WhatsAppCTA message={message} label={label} campaign={campaign} />
      </div>
    </section>
  );
}

import WhatsAppCTA from "./WhatsAppCTA";

/**
 * The last section of every page. Defaults are the homepage's "not sure
 * which rung" invitation; the offer pages pass their one explicit ask.
 */
export default function Contact({
  title = "לא בטוח מה מתאים לך?",
  body = "תכתוב לי מה אתה מנסה להעלות לאוויר, ואני אגיד לך איזה מסלול נכון — גם אם זה הזול מביניהם, וגם אם התשובה היא שאתה לא צריך אותי בכלל.",
  message,
  label,
  campaign,
}: {
  title?: string;
  body?: string;
  message?: string;
  label?: string;
  campaign?: string;
}) {
  return (
    <section id="contact" className="py-20 scroll-mt-16">
      <div className="max-w-2xl mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl text-sea mb-3">{title}</h2>
        <p className="text-ink-soft mb-8">{body}</p>
        <WhatsAppCTA message={message} label={label} campaign={campaign} />
      </div>
    </section>
  );
}

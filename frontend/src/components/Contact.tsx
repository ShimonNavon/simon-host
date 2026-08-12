import WhatsAppCTA from "./WhatsAppCTA";

export default function Contact() {
  return (
    <section id="contact" className="py-20 scroll-mt-16">
      <div className="max-w-2xl mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl text-sea mb-3">לא בטוח מה מתאים לך?</h2>
        <p className="text-ink-soft mb-8">
          תכתוב לי מה אתה מנסה להעלות לאוויר, ואני אגיד לך איזה מסלול נכון —
          גם אם זה הזול מביניהם, וגם אם התשובה היא שאתה לא צריך אותי בכלל.
        </p>
        <WhatsAppCTA />
      </div>
    </section>
  );
}

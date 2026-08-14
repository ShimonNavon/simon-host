/** A real sequence, so the numbers carry information. */
const STEPS = [
  {
    num: "1",
    title: "אומרים לי מה צריך",
    text: "הודעה בוואטסאפ. שאלה־שתיים ואני כבר יודע מה מתאים לך — וגם אם עדיף לך משהו זול יותר.",
  },
  {
    num: "2",
    title: "אני מקים",
    text: "שרת או אפליקציה עולים בדרך כלל באותו יום. אתר לעסק לוקח כמה ימים, ועוברים עליו יחד עד שאתה מרוצה.",
  },
  {
    num: "3",
    title: "אתה באוויר",
    text: "ומכאן זה עליי: מגבה, מנטר ומטפל. אם משהו נופל בשתיים בלילה, אני זה שמקבל את ההתראה.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-bold text-jaffa mb-3">התהליך</p>
        <h2 className="text-3xl sm:text-4xl text-sea mb-10">מהודעה ראשונה עד באוויר</h2>
        <ol className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <li key={s.num}>
              <div
                className="font-display text-6xl text-jaffa/25 leading-none mb-3"
                aria-hidden="true"
              >
                {s.num}
              </div>
              <h3 className="text-2xl text-sea mb-2">{s.title}</h3>
              <p className="text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

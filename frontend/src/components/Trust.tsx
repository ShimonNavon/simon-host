const PILLARS = [
  {
    title: "בטוח",
    text: "גיבוי יומי, תעודת אבטחה, ועדכוני אבטחה שוטפים. אם משהו נשבר — יש לאן לחזור.",
  },
  {
    title: "פשוט להתחיל",
    text: "בלי לוח בקרה מסובך ובלי טפסים. שולחים לי הודעה, ואני מקים. רוב הדברים עולים באותו יום.",
  },
  {
    title: "בלי הפתעות",
    text: "מחיר קבוע שכולל הכל. אין דמי הקמה, אין חריגות, ואפשר לעצור בסוף כל חודש.",
  },
];

export default function Trust() {
  return (
    <section className="bg-sea-deep text-white py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid sm:grid-cols-3 gap-8">
          {PILLARS.map((p) => (
            <div key={p.title}>
              <h2 className="text-2xl mb-2 text-white">{p.title}</h2>
              <p className="text-white/70 text-[0.95rem]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

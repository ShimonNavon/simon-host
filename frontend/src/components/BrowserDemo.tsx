import { useEffect, useState } from "react";

const BUSINESSES = [
  { name: "המספרה של דנה", tag: "תספורת · צבע · החלקות", emoji: "✂️", accent: "#c2255c" },
  { name: "חומוס אצל יוסי", tag: "פתוח א׳–ו׳ · משלוחים", emoji: "🥙", accent: "#e8590c" },
  { name: "מוסך האחים לוי", tag: "טיפולים · טסט · דיאגנוסטיקה", emoji: "🔧", accent: "#1971c2" },
  { name: "סטודיו נועה יוגה", tag: "שיעורי בוקר וערב", emoji: "🧘", accent: "#2f9e44" },
  { name: "קליניקת ד״ר פרץ", tag: "קביעת תור אונליין", emoji: "🩺", accent: "#0c8599" },
  { name: "צימר בגליל", tag: "ג׳קוזי · נוף · שקט", emoji: "🌲", accent: "#5c940d" },
];

export default function BrowserDemo() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % BUSINESSES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const b = BUSINESSES[i];

  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(15,45,74,0.25)] border border-sea/10 bg-white">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 bg-sky px-4 py-2.5 border-b border-sea/10" dir="ltr">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-ink-soft text-center border border-sea/10">
          🔒 העסק-שלך.co.il
        </div>
      </div>

      {/* Mini website */}
      <div key={i} className="word-in p-6 min-h-[290px]" aria-live="polite">
        <div className="rounded-xl p-6 text-white" style={{ backgroundColor: b.accent }}>
          <div className="text-4xl mb-2" aria-hidden="true">{b.emoji}</div>
          <div className="font-display text-2xl">{b.name}</div>
          <div className="text-sm opacity-90 mt-1">{b.tag}</div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="h-16 rounded-lg bg-sky" />
          <div className="h-16 rounded-lg bg-sky" />
          <div className="h-16 rounded-lg bg-sky" />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="h-3 rounded bg-sky w-2/3" />
          <div
            className="rounded-lg px-4 py-2 text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: b.accent }}
          >
            צרו קשר
          </div>
        </div>
      </div>
    </div>
  );
}

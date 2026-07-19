import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") || "",
          message: data.get("message") || "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-[#e8e2d6] rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4" aria-hidden="true">📞</div>
        <h3 className="text-2xl text-sea mb-2">קיבלתי!</h3>
        <p className="text-ink-soft">
          תודה על הפנייה — אחזור אליך תוך יום עסקים.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="font-bold text-sm">שם מלא</span>
          <input className="field" name="name" required maxLength={120} placeholder="ישראל ישראלי" />
        </label>
        <label className="grid gap-1.5">
          <span className="font-bold text-sm">טלפון</span>
          <input
            className="field"
            name="phone"
            type="tel"
            required
            maxLength={30}
            placeholder="050-1234567"
            dir="ltr"
            style={{ textAlign: "right" }}
          />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="font-bold text-sm">
          אימייל <span className="font-normal text-ink-soft">(לא חובה)</span>
        </span>
        <input className="field" name="email" type="email" placeholder="you@example.com" dir="ltr" style={{ textAlign: "right" }} />
      </label>
      <label className="grid gap-1.5">
        <span className="font-bold text-sm">
          כמה מילים על העסק <span className="font-normal text-ink-soft">(לא חובה)</span>
        </span>
        <textarea
          className="field"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="יש לי מספרה בחולון ואני רוצה שיוכלו לקבוע תור אונליין…"
        />
      </label>

      {status === "error" && (
        <p className="text-[#c92a2a] font-bold" role="alert">
          משהו השתבש בשליחה. נסו שוב, או כתבו לי ישירות במייל.
        </p>
      )}

      <button type="submit" className="btn-primary text-lg justify-self-start disabled:opacity-60" disabled={status === "sending"}>
        {status === "sending" ? "שולח…" : "שלחו — ואני חוזר אליכם"}
      </button>
    </form>
  );
}

import type { ReactNode } from "react";
import type { Plan } from "../content/plans";
import InvolvementBar from "./InvolvementBar";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Sections get lighter-to-darker as you take over more of the work, so the
 * page itself walks the axis: paper → sky → deep navy.
 */
type Tone = "paper" | "sky" | "sea";

const TONES: Record<Tone, { section: string; title: string; body: string; eyebrow: string }> = {
  paper: {
    section: "bg-paper border-t border-[#e8e2d6]",
    title: "text-sea",
    body: "text-ink-soft",
    eyebrow: "text-jaffa",
  },
  sky: {
    section: "bg-sky/60",
    title: "text-sea",
    body: "text-ink-soft",
    eyebrow: "text-jaffa",
  },
  sea: {
    section: "bg-sea text-white",
    title: "text-white",
    body: "text-white/70",
    eyebrow: "text-jaffa",
  },
};

/** The axis position, said out loud. */
const ROLE: Record<string, string> = {
  website: "אתה לא נוגע בכלום",
  app: "אתה כותב קוד. זה הכל.",
  server: "אתה בשליטה מלאה",
};

export default function PlanSection({
  plan,
  tone,
  children,
}: {
  plan: Plan;
  tone: Tone;
  children?: ReactNode;
}) {
  const t = TONES[tone];

  return (
    <section id={plan.id} className={`${t.section} py-20 scroll-mt-16`}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* What it is, and who it's for */}
          <div>
            <div className="max-w-[15rem] mb-3">
              <InvolvementBar mine={plan.mine} />
            </div>
            <p className={`font-bold text-sm mb-3 ${t.eyebrow}`}>{ROLE[plan.id]}</p>

            <h2 className={`text-3xl sm:text-4xl mb-3 ${t.title}`}>{plan.name}</h2>
            <p className={`text-lg mb-5 ${t.body}`}>{plan.tagline}</p>
            <p className={`max-w-md ${t.body}`}>{plan.forWho}</p>

            {plan.market && (
              <p className={`mt-6 text-sm border-t pt-4 max-w-md ${t.body} ${
                tone === "sea" ? "border-white/15" : "border-[#e8e2d6]"
              }`}>
                {plan.market}
              </p>
            )}
          </div>

          {/* The price and exactly what's in it */}
          <div className="bg-white text-ink rounded-2xl p-8 sm:p-10 shadow-[0_18px_50px_rgba(15,45,74,0.12)]">
            <div className="flex items-end gap-2 mb-6">
              <span className="font-display text-5xl sm:text-6xl text-sea leading-none">
                {plan.price} ₪
              </span>
              <span className="text-ink-soft font-bold mb-1">/ בחודש</span>
            </div>

            <ul className="grid gap-2.5 mb-8">
              {plan.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-jaffa font-bold leading-6" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <WhatsAppButton
              message={plan.whatsapp}
              label={plan.ctaLabel}
              className="w-full text-lg"
            />
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

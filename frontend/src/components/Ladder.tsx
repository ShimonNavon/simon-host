import { PLANS } from "../content/plans";
import InvolvementBar from "./InvolvementBar";

/**
 * The site's thesis and its chooser in one element. Read top to bottom, the
 * orange recedes step by step as you take over more of the work — and the
 * price falls with it, because the price is my time, not the hardware.
 */
export default function Ladder() {
  return (
    <div className="rise rise-3">
      <p className="text-sm font-bold text-jaffa mb-2">אני עושה הכל</p>

      <div className="grid gap-3">
        {PLANS.map((plan) => (
          <a key={plan.id} href={`#${plan.id}`} className="ladder-stop">
            <InvolvementBar mine={plan.mine} />
            <div className="flex items-baseline justify-between gap-3 mt-3">
              <h2 className="text-xl text-sea">{plan.name}</h2>
              <span className="shrink-0">
                <span className="font-display text-2xl text-sea">{plan.price} ₪</span>
                <span className="text-ink-soft text-xs font-bold"> / בחודש</span>
              </span>
            </div>
            <p className="text-ink-soft text-sm mt-1">{plan.tagline}</p>
          </a>
        ))}
      </div>

      <p className="text-sm font-bold text-sea mt-2">אתה עושה הכל</p>
    </div>
  );
}

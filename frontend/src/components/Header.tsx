import { SERVICES } from "../content/services";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-[#e8e2d6]">
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        <a href="#top" className="font-display text-2xl text-sea shrink-0">
          Simon<span className="text-jaffa"> Host</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 font-bold text-sm">
          {SERVICES.map((plan) => (
            <a key={plan.id} href={`#${plan.id}`} className="hover:text-jaffa">
              {plan.name}
            </a>
          ))}
          <a href="#faq" className="hover:text-jaffa">
            שאלות
          </a>
        </nav>
        <a href="#contact" className="btn-primary !py-2 !px-4 text-sm shrink-0">
          דברו איתי
        </a>
      </div>
    </header>
  );
}

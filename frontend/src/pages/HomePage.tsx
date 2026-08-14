import About from "../components/About";
import Community from "../components/Community";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Infrastructure from "../components/Infrastructure";
import Portfolio from "../components/Portfolio";
import PricingGrid from "../components/PricingGrid";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />

      {/* Why the prices aren't in ascending order. */}
      <div className="max-w-6xl mx-auto px-5 pb-12">
        <p className="max-w-xl text-ink-soft border-s-4 border-jaffa/40 ps-4">
          המחיר לא הולך על הברזל — הוא הולך על כמה שאני עושה בשבילך.
          לכן שרת פרטי עולה פחות מאתר מוכן.
        </p>
      </div>

      <PricingGrid />

      <Infrastructure />
      <About />
      <Community />
      <Portfolio />

      <HowItWorks />
      <Faq />
      <Contact />
    </main>
  );
}

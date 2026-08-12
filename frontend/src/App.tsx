import { PLANS } from "./content/plans";
import BrowserDemo from "./components/BrowserDemo";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import PlanSection from "./components/PlanSection";
import Trust from "./components/Trust";

const [website, app, server] = PLANS;

export default function App() {
  return (
    <>
      <Header />

      <main id="top">
        <Hero />

        {/* Why the prices aren't in ascending order. */}
        <div className="max-w-6xl mx-auto px-5 pb-16">
          <p className="max-w-xl text-ink-soft border-s-4 border-jaffa/40 ps-4">
            המחיר לא הולך על הברזל — הוא הולך על כמה שאני עושה בשבילך.
            לכן שרת פרטי עולה פחות מאתר מוכן.
          </p>
        </div>

        {/* The page walks the same axis the ladder does: light → deep. */}
        <PlanSection plan={website} tone="paper">
          <div className="mt-14 max-w-2xl mx-auto">
            <BrowserDemo />
            <p className="text-center text-ink-soft text-sm mt-4">
              עסקים אמיתיים נראים אחרת אחד מהשני. גם האתרים שלהם.
            </p>
          </div>
        </PlanSection>

        <PlanSection plan={app} tone="sky" />
        <PlanSection plan={server} tone="sea" />

        <Trust />
        <HowItWorks />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

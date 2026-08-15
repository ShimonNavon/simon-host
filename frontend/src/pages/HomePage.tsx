import AgencyHero from "../components/AgencyHero";
import AudiencePaths from "../components/AudiencePaths";
import Contact from "../components/Contact";
import DomainSearch from "../components/DomainSearch";
import Faq from "../components/Faq";
import FounderSection from "../components/FounderSection";
import GuidesPreview from "../components/GuidesPreview";
import Infrastructure from "../components/Infrastructure";
import MigrationComparison from "../components/MigrationComparison";
import MobileAuditBar from "../components/MobileAuditBar";
import Portfolio from "../components/Portfolio";
import PricingGrid from "../components/PricingGrid";
import { AGENCY_AUDIT_MESSAGE } from "../content/site";

export default function HomePage() {
  return (
    <main id="top">
      <AgencyHero />
      <MigrationComparison />
      <Infrastructure />
      <AudiencePaths />
      <PricingGrid />
      <DomainSearch />
      <Portfolio />
      <FounderSection />
      <GuidesPreview />
      <Faq />
      <Contact
        title="הצעד הראשון לא מזיז אף אתר."
        body="שולחים חשבונית ורשימת אתרים. אני מחזיר השוואה ותוכנית מעבר — בלי התחייבות ובלי שיחת מכירה מסביב."
        message={AGENCY_AUDIT_MESSAGE}
        label="שולחים לבדיקה"
        campaign="home-final-agency-audit"
      />
      <MobileAuditBar />
    </main>
  );
}

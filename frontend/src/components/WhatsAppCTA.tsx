import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../content/services";
import WhatsAppButton from "./WhatsAppButton";

const GENERAL_MESSAGE =
  "היי סיימון, הגעתי מהאתר ואשמח להתייעץ איתך על מה שמתאים לי.";

/**
 * The closing card. By default it carries the general "help me choose"
 * message; a page with one explicit ask (the offer pages) passes its own.
 */
export default function WhatsAppCTA({
  message = GENERAL_MESSAGE,
  label = "שלחו לי הודעה בוואטסאפ",
  campaign = "contact",
}: {
  message?: string;
  label?: string;
  campaign?: string;
}) {
  return (
    <div className="whatsapp-cta">
      <WhatsAppButton
        message={message}
        label={label}
        campaign={campaign}
        className="text-lg"
      />
      <p>
        או פשוט תשמרו את המספר:{" "}
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="phone-link"
          dir="ltr"
        >
          {WHATSAPP_DISPLAY}
        </a>
      </p>
    </div>
  );
}

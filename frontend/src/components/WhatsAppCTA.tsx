import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../content/services";
import WhatsAppButton from "./WhatsAppButton";

const GENERAL_MESSAGE =
  "היי סיימון, הגעתי מהאתר ואשמח להתייעץ איתך על מה שמתאים לי.";

export default function WhatsAppCTA() {
  return (
    <div className="bg-white border border-[#e8e2d6] rounded-2xl p-6 sm:p-10 text-center">
      <WhatsAppButton
        message={GENERAL_MESSAGE}
        label="שלחו לי הודעה בוואטסאפ"
        campaign="contact"
        className="text-lg block w-full sm:inline-block sm:w-auto !px-5 sm:!px-8"
      />
      <p className="text-ink-soft mt-5">
        או פשוט תשמרו את המספר:{" "}
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="font-bold text-sea whitespace-nowrap"
          dir="ltr"
        >
          {WHATSAPP_DISPLAY}
        </a>
      </p>
    </div>
  );
}

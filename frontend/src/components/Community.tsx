import { COMMUNITY } from "../content/community";
import WhatsAppButton from "./WhatsAppButton";

/**
 * The closer: hosting that comes with a room full of people building things.
 * The join-group button appears only once COMMUNITY.groupLink holds a real
 * link — until then the events CTA carries the section alone.
 */
export default function Community() {
  return (
    <section id="community" className="bg-sky/60 py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-bold text-jaffa mb-3">הקהילה</p>
        <h2 className="text-3xl sm:text-4xl text-sea mb-4 max-w-xl">{COMMUNITY.title}</h2>
        <p className="text-ink-soft max-w-2xl mb-8">{COMMUNITY.body}</p>
        <div className="flex flex-wrap gap-3">
          <WhatsAppButton
            message={COMMUNITY.eventsWhatsapp}
            label="ספרו לי על המפגש הבא"
            className="text-lg"
          />
          {COMMUNITY.groupLink && (
            <a
              href={COMMUNITY.groupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-lg"
            >
              להצטרפות לקבוצה
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  availableDomainMessage,
  describeStatus,
  errorMessage,
  isValidQuery,
  MAX_QUERY_LENGTH,
  type DomainResult,
} from "../lib/domainSearch";
import WhatsAppButton from "./WhatsAppButton";

const DEBOUNCE_MS = 600;

const TONE_CLASS = {
  good: "bg-jaffa text-white",
  bad: "bg-sea/10 text-sea",
  muted: "bg-ink-soft/10 text-ink-soft",
} as const;

/**
 * "Do you already have a name?" — the one interactive thing on the homepage.
 * A bare name fans out across co.il/com/net/io on the backend; a full
 * domain checks just itself. Available results end in the same WhatsApp
 * button as everything else, pre-filled with the domain.
 */
export default function DomainSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DomainResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controller = useRef<AbortController | null>(null);
  const lastQuery = useRef("");

  async function search(raw: string) {
    const q = raw.trim();
    if (!isValidQuery(q) || q === lastQuery.current) return;
    lastQuery.current = q;
    controller.current?.abort();
    const ac = new AbortController();
    controller.current = ac;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/domains/check/?q=${encodeURIComponent(q)}`, {
        signal: ac.signal,
      });
      if (!response.ok) {
        setResults(null);
        setError(errorMessage(response.status));
        return;
      }
      const data = (await response.json()) as { results: DomainResult[] };
      setResults(data.results);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setResults(null);
      setError(errorMessage(0));
    } finally {
      if (controller.current === ac) setLoading(false);
    }
  }

  function onChange(value: string) {
    setQuery(value);
    if (timer.current) clearTimeout(timer.current);
    if (!isValidQuery(value)) {
      setResults(null);
      setError(null);
      lastQuery.current = "";
      return;
    }
    timer.current = setTimeout(() => void search(value), DEBOUNCE_MS);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    void search(query);
  }

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      controller.current?.abort();
    },
    []
  );

  return (
    <section id="domain" className="domain-section section-shell scroll-mt-16">
      <div className="content-width domain-panel">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10 items-center">
          <div>
            <p className="section-kicker">יש כבר שם לעסק?</p>
            <h2>בודקים אם הדומיין פנוי.</h2>
            <p className="text-white/75 mt-3 text-sm sm:text-base max-w-sm">
              כותבים שם — גם בעברית — ואני בודק מולכם ב־co.il, com, net ו־io. אם
              הוא פנוי, פותחים איתו אתר.
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-3" role="search">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                inputMode="url"
                autoComplete="off"
                spellCheck={false}
                maxLength={MAX_QUERY_LENGTH}
                value={query}
                onChange={(e) => onChange(e.target.value)}
                placeholder="למשל: הקפה-של-דנה או mybiz.co.il"
                aria-label="שם הדומיין לבדיקה"
                className="flex-1 rounded-xl px-4 py-3 text-ink bg-white placeholder:text-ink-soft/70 outline-none focus:ring-4 focus:ring-jaffa/40"
              />
              <button
                type="submit"
                disabled={loading || !isValidQuery(query)}
                className="btn-primary !py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? "בודק…" : "בדיקה"}
              </button>
            </div>

            <div aria-live="polite" className="min-h-6">
              {error && <p className="text-sm text-white/85 font-bold">{error}</p>}
              {results && (
                <ul className="grid gap-2 mt-1">
                  {results.map((result) => {
                    const status = describeStatus(result.status);
                    return (
                      <li
                        key={result.domain}
                        className="flex flex-wrap items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5"
                      >
                        <span className="font-bold" dir="ltr">
                          {result.domain}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${TONE_CLASS[status.tone]}`}
                        >
                          {status.label}
                        </span>
                        {status.cta && (
                          <WhatsAppButton
                            message={availableDomainMessage(result.domain)}
                            label="פותחים איתו אתר"
                            campaign="domain-search"
                            className="ms-auto text-sm !py-2 !px-4"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

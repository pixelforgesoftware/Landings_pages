import { LOCALES, useI18n, type Locale } from "@/i18n";

/**
 * Selector de idioma (ES | EN | IT) con persistencia de preferencia local.
 */

const LABELS: Record<Locale, string> = { es: "Español", en: "English", it: "Italiano" };

interface LanguageSwitcherProps {
  tone?: "light" | "dark";
  className?: string;
}

export default function LanguageSwitcher({ tone = "light", className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      role="group"
      aria-label="Idioma / Language / Lingua"
      className={`inline-flex overflow-hidden rounded-sm border ${
        tone === "dark" ? "border-warm-white/30" : "border-line"
      } ${className}`}
    >
      {LOCALES.map((code, i) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={[
              "px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors min-w-[40px]",
              i > 0 ? "border-l" : "",
              tone === "dark" ? "border-warm-white/30" : "border-line",
              active
                ? "bg-red text-warm-white"
                : tone === "dark"
                  ? "bg-transparent text-cream/80 hover:text-warm-white hover:bg-warm-white/10"
                  : "bg-transparent text-ink-soft hover:text-ink hover:bg-gold-soft/60",
            ].join(" ")}
          >
            <span aria-hidden>{code.toUpperCase()}</span>
            <span className="sr-only"> — {LABELS[code]}</span>
          </button>
        );
      })}
    </div>
  );
}

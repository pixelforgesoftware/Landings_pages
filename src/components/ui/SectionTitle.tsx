import type { ReactNode } from "react";

/* Encabezado de sección: cejilla dorada + título serif + bajada */

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className = "",
}: SectionTitleProps) {
  const centered = align === "center";
  return (
    <header className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${
            centered ? "justify-center" : ""
          } ${tone === "dark" ? "text-gold-bright" : "text-gold"}`}
        >
          <span aria-hidden className="h-px w-8 bg-current opacity-70" />
          {eyebrow}
          {centered && <span aria-hidden className="h-px w-8 bg-current opacity-70" />}
        </p>
      )}
      <h2
        className={`mt-3 font-serif text-3xl leading-snug font-bold sm:text-4xl ${
          tone === "dark" ? "text-warm-white" : "text-blue-deep"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-[1.06rem] leading-relaxed ${
            tone === "dark" ? "text-cream/85" : "text-ink-soft"
          }`}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

import { Link } from "react-router-dom";
import clsx from "clsx";
import { IconArrowRight } from "./icons";

/**
 * Tarjeta de presentación de proyectos institucionales.
 */

interface ProjectCardProps {
  kicker: string;
  title: string;
  text: string;
  /** Línea breve de necesidades, ej. "3 aulas · 1 biblioteca". */
  meta?: string;
  photo?: { label: string; src?: string };
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  className?: string;
}

export default function ProjectCard({
  kicker,
  title,
  text,
  meta,
  photo,
  icon,
  ctaLabel,
  ctaHref,
  featured = false,
  className = "",
}: ProjectCardProps) {
  return (
    <article
      className={clsx(
        "group flex h-full flex-col overflow-hidden border transition-all duration-300",
        featured
          ? "border-gold/60 bg-warm-white shadow-inst-lg"
          : "border-line bg-warm-white hover:border-gold/60 hover:shadow-inst",
        className
      )}
    >
      {/* Filete dorado superior en la tarjeta destacada */}
      {featured && <div aria-hidden className="h-1 w-full bg-gradient-to-r from-gold/30 via-gold to-gold/30" />}

      {photo?.src && (
        <div className={clsx("w-full overflow-hidden border-b border-line", featured ? "aspect-[16/9]" : "aspect-[16/10]")}>
          <img
            src={photo.src}
            alt={photo.label}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className={clsx("flex flex-1 flex-col p-6 sm:p-8", featured && "sm:p-9")}>
        {/* Si no hay foto y se pasa un ícono, lo muestro en una insignia */}
        {!photo?.src && icon && (
          <div className="mb-5">
            <span
              aria-hidden
              className={clsx(
                "inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-xs",
                featured
                  ? "border-gold-bright/60 bg-gold-bright/15 text-gold"
                  : "border-red/30 bg-red-soft text-red"
              )}
            >
              {(() => {
                const IconComp = icon;
                return <IconComp size={22} />;
              })()}
            </span>
          </div>
        )}

        <p className={clsx("text-[0.7rem] font-bold uppercase tracking-[0.2em]", featured ? "text-gold" : "text-red")}>
          {kicker}
        </p>
        <h3
          className={clsx(
            "mt-2 font-serif font-bold",
            featured ? "text-2xl text-blue-deep sm:text-[1.9rem]" : "text-xl text-blue-deep sm:text-2xl"
          )}
        >
          {title}
        </h3>
        <p className="mt-3.5 leading-relaxed text-ink-soft">{text}</p>
        {meta && (
          <p className="mt-4 border-l-2 border-gold/60 pl-3 text-sm font-semibold text-blue">
            {meta}
          </p>
        )}
        <div className="mt-auto pt-7">
          <Link
            to={ctaHref}
            className={clsx(
              "inline-flex items-center gap-2 text-[0.95rem] font-bold underline-offset-4 transition-colors",
              featured ? "text-gold hover:text-blue" : "text-red hover:text-blue"
            )}
          >
            {ctaLabel}
            <IconArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

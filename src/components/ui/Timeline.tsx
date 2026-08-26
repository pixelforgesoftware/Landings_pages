import ImagePlaceholder from "./ImagePlaceholder";

/**
 * Línea de tiempo institucional (variante compacta para portada y completa para historia).
 */

export interface TimelineEntry {
  year: string;
  date?: string;
  title?: string;
  text: string;
  /** Etiquetas de fotografías pendientes (solo variante full). */
  photos?: string[];
}

interface TimelineProps {
  items: TimelineEntry[];
  variant?: "compact" | "full";
}

export default function Timeline({ items, variant = "compact" }: TimelineProps) {
  const full = variant === "full";

  return (
    <ol className="relative ml-2 border-l border-gold/45 pl-8 sm:ml-4 sm:pl-10">
      {items.map((item, i) => (
        <li key={`${item.year}-${item.text.slice(0, 18)}-${i}`} className={full ? "pb-14 last:pb-0" : "pb-9 last:pb-0"}>
          <div className="relative">
            {/* Marcador */}
            <span
              aria-hidden
              className="absolute -left-[2.42rem] top-1.5 h-3 w-3 rotate-45 border border-gold bg-cream sm:-left-[2.92rem]"
            />
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span className={`font-serif font-bold text-gold ${full ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                {item.year}
              </span>
              {item.date && (
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-red">
                  {item.date}
                </span>
              )}
            </p>
            {item.title && (
              <h3 className="mt-1.5 font-serif text-xl font-bold text-blue-deep">{item.title}</h3>
            )}
            <p className={`mt-1.5 leading-relaxed text-ink-soft ${full ? "max-w-2xl" : "max-w-xl text-[0.98rem]"}`}>
              {item.text}
            </p>

            {full && item.photos && item.photos.length > 0 && (
              <div className={`mt-5 grid gap-4 ${item.photos.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "max-w-md"}`}>
                {item.photos.map((photo) => (
                  <ImagePlaceholder
                    key={photo}
                    label={photo}
                    kind="photo"
                    className="aspect-[4/3] w-full"
                  />
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

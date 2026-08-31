/**
 * Línea de tiempo institucional (variante compacta para portada y completa para historia).
 */

export interface TimelinePhoto {
  label: string;
  src?: string;
}

export interface TimelineEntry {
  year: string;
  date?: string;
  title?: string;
  text: string;
  /** Fotografías con src o etiquetas de fotos pendientes (solo variante full). */
  photos?: (string | TimelinePhoto)[];
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
                {item.photos.map((photo, pIdx) => {
                  const isObj = typeof photo === "object";
                  const label = isObj ? photo.label : photo;
                  const src = isObj ? photo.src : undefined;

                  if (!src) return null;

                  return (
                    <figure
                      key={label + pIdx}
                      className="group overflow-hidden border border-line bg-warm-white shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-inst"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={src}
                          alt={label}
                          className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="border-t border-line/80 px-3 py-2 text-xs italic text-ink-soft">
                        {label}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

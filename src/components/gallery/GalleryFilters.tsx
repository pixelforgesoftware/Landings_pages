/**
 * Filtros de categoría para la galería fotográfica.
 */

export interface GalleryCategoryFilter {
  id: string;
  name: string;
  count: number;
}

interface GalleryFiltersProps {
  allLabel: string;
  categories: GalleryCategoryFilter[];
  active: string; // "all" o id de categoría
  onChange: (id: string) => void;
}

export default function GalleryFilters({ allLabel, categories, active, onChange }: GalleryFiltersProps) {
  const base =
    "inline-flex min-h-[40px] items-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition-colors";
  const activeCls = "border-blue bg-blue text-warm-white";
  const idleCls = "border-line bg-cream text-ink hover:border-gold hover:text-blue";

  return (
    <div role="group" aria-label="Filtros de la galería" className="flex flex-wrap gap-2.5">
      <button
        type="button"
        aria-pressed={active === "all"}
        onClick={() => onChange("all")}
        className={`${base} ${active === "all" ? activeCls : idleCls}`}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          aria-pressed={active === cat.id}
          onClick={() => onChange(cat.id)}
          className={`${base} ${active === cat.id ? activeCls : idleCls}`}
        >
          {cat.name}
          <span
            aria-hidden
            className={`text-xs font-bold ${active === cat.id ? "text-gold-bright" : "text-gold"}`}
          >
            {cat.count}
          </span>
        </button>
      ))}
    </div>
  );
}

import { useMemo, useState } from "react";
import { useI18n, usePageTitle } from "@/i18n";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryGrid, { type GalleryItem } from "@/components/gallery/GalleryGrid";
import Reveal from "@/components/ui/Reveal";

/**
 * Galería multimedia institucional con filtros interactivos por categoría.
 */
export default function Gallery() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.gallery);
  const g = t.gallery;

  const [active, setActive] = useState<string>("all");

  const allItems = useMemo<GalleryItem[]>(() => {
    return g.categories.flatMap((cat) =>
      cat.items.map((caption, i) => ({
        id: `${cat.id}-${i}`,
        caption,
        categoryName: cat.name,
        categoryId: cat.id,
      })),
    );
  }, [g.categories]);

  const visible = active === "all" ? allItems : allItems.filter((it) => it.categoryId === active);

  const filters = g.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    count: cat.items.length,
  }));

  return (
    <>
      {/* Encabezado principal */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap max-w-3xl py-14 text-center lg:py-16">
          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
            {g.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
          </p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-warm-white sm:text-5xl">
            {g.title}
          </h1>
          <p className="mt-5 leading-relaxed text-cream/85">{g.intro}</p>
          <p className="mt-4 text-sm italic text-cream/70">{g.note}</p>
        </div>
      </section>

      {/* Filtros y grilla */}
      <section aria-label={g.title} className="wrap py-12 sm:py-16">
        <GalleryFilters
          allLabel={g.filterAll}
          categories={filters}
          active={active}
          onChange={setActive}
        />
        <p className="sr-only" role="status">
          {visible.length} — {active === "all" ? g.filterAll : filters.find((f) => f.id === active)?.name}
        </p>
        <Reveal className="mt-10">
          <GalleryGrid items={visible} />
        </Reveal>
      </section>

      {/* Videos institucionales */}
      <section aria-label={g.videos.title} className="border-t border-line bg-cream">
        <div className="wrap py-14">
          <div className="mx-auto max-w-3xl border border-dashed border-gold/60 bg-warm-white p-8 text-center sm:p-10">
            <span aria-hidden className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
                <path d="m10.5 9.5 4.5 2.5-4.5 2.5z" />
              </svg>
            </span>
            <h2 className="mt-4 font-serif text-2xl font-bold text-blue-deep">{g.videos.title}</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-soft">{g.videos.text}</p>
            <p className="mt-5 inline-block border border-line bg-cream px-4 py-2 text-sm italic text-ink-soft">
              {g.videos.empty}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

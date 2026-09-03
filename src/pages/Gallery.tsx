import { useMemo, useState } from "react";
import { useI18n, usePageTitle } from "@/i18n";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryGrid, { type GalleryItem } from "@/components/gallery/GalleryGrid";
import Reveal from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/**
 * Galería multimedia institucional con filtros interactivos por categoría.
 */
const PHOTO_MAP: Record<string, string> = {
  // Parroquia
  "parroquia-0": "/images/colegio-edificio-exterior.webp",
  "parroquia-1": "/images/colegio-primeras-docentes.webp",
  "parroquia-2": "/images/parroquia-altar.webp",
  "parroquia-3": "/images/hero-parish.webp",
  // Colegio
  "colegio-0": "/images/hero-school.webp",
  "colegio-1": "/images/colegio-aula-preparada.webp",
  "colegio-2": "/images/colegio-clase.webp",
  "colegio-3": "/images/comunidad-trabajo.webp",
  "colegio-4": "/images/colegio-sagrada-familia.webp",
  // Actividades
  "actividades-0": "/images/colegio-alumnos-bandera.webp",
  "actividades-1": "/images/colegio-nivel-inicial.webp",
  "actividades-2": "/images/colegio-primaria-formacion.webp",
  "actividades-3": "/images/colegio-inicial-merienda.webp",
  "actividades-4": "/images/colegio-sagrada-familia.webp",
  // Comunidad
  "comunidad-0": "/images/colegio-comunidad-8xmille.webp",
  "comunidad-1": "/images/comunidad-trabajo.webp",
  "comunidad-2": "/images/comunidad-jornada-trabajo.webp",
  // Historia
  "historia-0": "/images/historia-2012-inicio.webp",
  "historia-1": "/images/colegio-aula-preparada.webp",
  "historia-2": "/images/obras-construccion-aulas.webp",
  "historia-3": "/images/colegio-primeras-docentes.webp",
  "historia-4": "/images/comunidad-trabajo.webp",
  "historia-5": "/images/historia-2017-inauguracion.webp",
  "historia-6": "/images/colegio-primaria-formacion.webp",
};

export default function Gallery() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.gallery);
  const g = t.gallery;

  const [active, setActive] = useState<string>("all");

  const allItems = useMemo<GalleryItem[]>(() => {
    return g.categories.flatMap((cat) =>
      cat.items.map((caption, i) => {
        const id = `${cat.id}-${i}`;
        return {
          id,
          caption,
          categoryName: cat.name,
          categoryId: cat.id,
          src: PHOTO_MAP[id],
        };
      }),
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
      <section aria-label={g.videos.title} className="border-t border-line bg-cream py-14 sm:py-20">
        <div className="wrap">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold text-blue-deep sm:text-3xl">
              {g.videos.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {g.videos.text}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Video 1: Acto inaugural */}
            <Reveal>
              <div className="flex flex-col border border-line bg-warm-white p-5 shadow-inst transition-all hover:border-gold/60 sm:p-6">
                <div className="aspect-video w-full overflow-hidden bg-black shadow-sm">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/h3bMCoJ0FdM"
                    title={g.videos.video1Title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                      {g.videos.tag1}
                    </span>
                    <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-blue-deep">
                      {g.videos.video1Title}
                    </h3>
                  </div>
                  <div className="mt-5 border-t border-line/70 pt-3.5">
                    <a
                      href="https://www.youtube.com/watch?v=h3bMCoJ0FdM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red transition-colors hover:underline"
                    >
                      <span>{g.videos.watchOnYoutube}</span>
                      <IconArrowRight size={13} aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Video 2: Palabras alusivas */}
            <Reveal delay={120}>
              <div className="flex flex-col border border-line bg-warm-white p-5 shadow-inst transition-all hover:border-gold/60 sm:p-6">
                <div className="aspect-video w-full overflow-hidden bg-black shadow-sm">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/o_P7vwNhLFI"
                    title={g.videos.video2Title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                      {g.videos.tag2}
                    </span>
                    <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-blue-deep">
                      {g.videos.video2Title}
                    </h3>
                  </div>
                  <div className="mt-5 border-t border-line/70 pt-3.5">
                    <a
                      href="https://www.youtube.com/watch?v=o_P7vwNhLFI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red transition-colors hover:underline"
                    >
                      <span>{g.videos.watchOnYoutube}</span>
                      <IconArrowRight size={13} aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

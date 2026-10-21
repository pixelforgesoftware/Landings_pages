import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useI18n, usePageTitle } from "@/i18n";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryGrid, { type GalleryItem } from "@/components/gallery/GalleryGrid";
import Reveal from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/**
 * Galería multimedia institucional con filtros interactivos por categoría.
 */
interface GalleryPhotoDef {
  id: string;
  categoryId: string;
  src: string;
  alt?: string;
}

const GALLERY_PHOTOS: GalleryPhotoDef[] = [
  // Parroquia (18 fotos: altar + 17 fotos nuevas)
  { id: "parroquia-0", categoryId: "parroquia", src: "/images/parroquia-altar.webp", alt: "Altar mayor de la Parroquia San Francisco de Asís" },
  { id: "parroquia-1", categoryId: "parroquia", src: "/images/parroquia-foto-01.webp" },
  {
    id: "parroquia-2",
    categoryId: "parroquia",
    src: "/images/parroquia-foto-02.webp",
    alt: "Sacerdotes concelebrando la Santa Misa en el presbiterio de la Parroquia San Francisco de Asís",
  },
  { id: "parroquia-3", categoryId: "parroquia", src: "/images/parroquia-foto-03.webp" },
  { id: "parroquia-4", categoryId: "parroquia", src: "/images/parroquia-foto-04.webp" },
  {
    id: "parroquia-5",
    categoryId: "parroquia",
    src: "/images/parroquia-foto-05.webp",
    alt: "Altar mayor ornamentado con flores y feligreses participando de la celebración litúrgica",
  },
  {
    id: "parroquia-6",
    categoryId: "parroquia",
    src: "/images/parroquia-foto-06.webp",
    alt: "Fachada exterior y campanario del templo parroquial en Real del Padre",
  },
  { id: "parroquia-7", categoryId: "parroquia", src: "/images/parroquia-foto-07.webp" },
  { id: "parroquia-8", categoryId: "parroquia", src: "/images/parroquia-foto-08.webp" },
  {
    id: "parroquia-9",
    categoryId: "parroquia",
    src: "/images/parroquia-foto-09.webp",
    alt: "Comunidad parroquial reunida durante la procesión y fiesta patronal",
  },
  {
    id: "parroquia-10",
    categoryId: "parroquia",
    src: "/images/parroquia-foto-10.webp",
    alt: "Interior del templo con la nave central iluminada y fieles en oración",
  },
  { id: "parroquia-11", categoryId: "parroquia", src: "/images/parroquia-foto-11.webp" },
  { id: "parroquia-12", categoryId: "parroquia", src: "/images/parroquia-foto-12.webp" },
  { id: "parroquia-13", categoryId: "parroquia", src: "/images/parroquia-foto-13.webp" },
  { id: "parroquia-14", categoryId: "parroquia", src: "/images/parroquia-foto-14.webp" },
  { id: "parroquia-15", categoryId: "parroquia", src: "/images/parroquia-foto-15.webp" },
  { id: "parroquia-16", categoryId: "parroquia", src: "/images/parroquia-foto-16.webp" },
  { id: "parroquia-17", categoryId: "parroquia", src: "/images/parroquia-foto-17.webp" },

  // Colegio / Jardín (unificadas sin repetición)
  { id: "colegio-jardin-0", categoryId: "colegio-jardin", src: "/images/hero-school.webp" },
  { id: "colegio-jardin-1", categoryId: "colegio-jardin", src: "/images/colegio-aula-preparada.webp" },
  { id: "colegio-jardin-2", categoryId: "colegio-jardin", src: "/images/colegio-clase.webp" },
  { id: "colegio-jardin-3", categoryId: "colegio-jardin", src: "/images/colegio-sagrada-familia.webp" },
  { id: "colegio-jardin-4", categoryId: "colegio-jardin", src: "/images/colegio-alumnos-bandera.webp" },
  { id: "colegio-jardin-5", categoryId: "colegio-jardin", src: "/images/colegio-primaria-formacion.webp" },
  { id: "colegio-jardin-6", categoryId: "colegio-jardin", src: "/images/comunidad-trabajo.webp" },

  // Comunidad
  { id: "comunidad-0", categoryId: "comunidad", src: "/images/colegio-comunidad-8xmille.webp" },
  { id: "comunidad-1", categoryId: "comunidad", src: "/images/comunidad-trabajo.webp" },
  { id: "comunidad-2", categoryId: "comunidad", src: "/images/comunidad-jornada-trabajo.webp" },

  // Historia
  { id: "historia-0", categoryId: "historia", src: "/images/historia-2012-inicio.webp" },
  { id: "historia-1", categoryId: "historia", src: "/images/colegio-aula-preparada.webp" },
  { id: "historia-2", categoryId: "historia", src: "/images/obras-construccion-aulas.webp" },
  { id: "historia-3", categoryId: "historia", src: "/images/colegio-primeras-docentes.webp" },
  { id: "historia-4", categoryId: "historia", src: "/images/comunidad-trabajo.webp" },
  { id: "historia-5", categoryId: "historia", src: "/images/historia-2017-inauguracion.webp" },
  { id: "historia-6", categoryId: "historia", src: "/images/colegio-primaria-formacion.webp" },
];

export default function Gallery() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.gallery);
  const g = t.gallery;

  const [searchParams, setSearchParams] = useSearchParams();
  const catQuery = searchParams.get("cat");
  const [active, setActive] = useState<string>("all");

  useEffect(() => {
    if (catQuery) {
      if (catQuery === "colegio" || catQuery === "jardin" || catQuery === "actividades") {
        setActive("colegio-jardin");
      } else if (catQuery === "all" || g.categories.some((c) => c.id === catQuery)) {
        setActive(catQuery);
      }
    }
  }, [catQuery, g.categories]);

  const handleFilterChange = (categoryId: string) => {
    setActive(categoryId);
    if (categoryId === "all") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ cat: categoryId }, { replace: true });
    }
  };

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    g.categories.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [g.categories]);

  const allItems = useMemo<GalleryItem[]>(() => {
    return GALLERY_PHOTOS.map((photo) => ({
      id: photo.id,
      categoryId: photo.categoryId,
      categoryName: categoryMap.get(photo.categoryId) || photo.categoryId,
      src: photo.src,
      alt: photo.alt,
    }));
  }, [categoryMap]);

  const visible = active === "all" ? allItems : allItems.filter((it) => it.categoryId === active);

  const filters = g.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    count: allItems.filter((it) => it.categoryId === cat.id).length,
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
          onChange={handleFilterChange}
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

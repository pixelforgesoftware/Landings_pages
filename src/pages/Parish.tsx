import { useI18n, usePageTitle } from "@/i18n";
import { MASS_TIMES } from "@/data/institution";
import SectionTitle from "@/components/ui/SectionTitle";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconClock, IconMapPin } from "@/components/ui/icons";

/**
 * Página institucional de la Parroquia San Francisco de Asís (historia, vida parroquial y horarios de misa).
 */
export default function Parish() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.parish);
  const p = t.parish;

  return (
    <>
      {/* Hero principal */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
          <div>
            <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
              <span aria-hidden className="h-px w-10 bg-gold-bright/70" />
              {p.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-warm-white sm:text-5xl">
              {p.title}
            </h1>
            <p className="mt-4 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-gold-bright">
              <IconMapPin size={17} aria-hidden />
              {p.location}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-cream/85">{p.history.p1}</p>
          </div>
          <div className="frame-gold">
            <ImagePlaceholder tone="dark" label={p.heroPhoto} className="aspect-[4/3] w-full" />
          </div>
        </div>
      </section>

      {/* Historia de la misión */}
      <section aria-labelledby="mision" className="wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 sm:py-20">
        <Reveal>
          <SectionTitle eyebrow={p.history.eyebrow} title={p.history.title} />
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p>{p.history.p1}</p>
            <p>{p.history.p2}</p>
            <p>{p.history.p3}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="border border-gold/45 bg-gold-soft/50 p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-blue-deep">{p.history.reachTitle}</h3>
            <ul className="mt-4 space-y-3">
              {p.history.reach.map((place) => (
                <li key={place} className="flex items-center gap-3 font-semibold text-ink">
                  <span aria-hidden className="h-2 w-2 rotate-45 bg-gold" />
                  {place}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-gold/40 pt-5">
              <p className="font-serif text-3xl font-black text-gold">1987</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                5 de marzo — {p.mass.sourceNote}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Vida parroquial */}
      <section aria-labelledby="vida-parroquial" className="border-y border-line bg-cream">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionTitle eyebrow={p.life.eyebrow} title={p.life.title} lead={p.life.intro} />
          </Reveal>
          <ul className="mt-10 grid gap-x-12 gap-y-3.5 sm:grid-cols-2 lg:max-w-4xl">
            {p.life.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3.5 border-b border-line/80 pb-3.5 font-serif text-[1.05rem] text-ink"
              >
                <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-red" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galería */}
      <section aria-labelledby="galeria-parroquia" className="wrap py-16 sm:py-20">
        <Reveal>
          <SectionTitle eyebrow={t.common.nav.gallery} title={p.gallery.title} lead={p.gallery.intro} />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.gallery.items.map((label, i) => (
            <Reveal key={label} delay={(i % 3) * 80}>
              <ImagePlaceholder label={label} className="aspect-[4/3] w-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Horarios de Santa Misa */}
      <section aria-labelledby="horarios-misa" className="bg-blue-deep text-cream">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionTitle align="center" tone="dark" eyebrow={p.mass.eyebrow} title={p.mass.title} />
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="h-full border border-gold-bright/40 bg-blue p-7 text-center">
                <span aria-hidden className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold-bright/50 text-gold-bright">
                  <IconClock size={20} />
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-warm-white">{p.mass.winterTitle}</h3>
                <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">
                  {p.mass.winterDays}
                </p>
                <p className="mt-3 font-serif text-4xl font-black text-gold-bright">{MASS_TIMES.winter} hs</p>
                <p className="mt-3.5 text-sm leading-relaxed text-cream/75">{p.mass.winterNote}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full border border-gold-bright/40 bg-blue p-7 text-center">
                <span aria-hidden className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold-bright/50 text-gold-bright">
                  <IconClock size={20} />
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-warm-white">{p.mass.summerTitle}</h3>
                <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">
                  {p.mass.summerDays}
                </p>
                <p className="mt-3 font-serif text-4xl font-black text-gold-bright">{MASS_TIMES.summer} hs</p>
                <p className="mt-3.5 text-sm leading-relaxed text-cream/75">{p.mass.summerNote}</p>
              </div>
            </Reveal>
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-cream/60">
            {p.mass.sourceNote}
          </p>
        </div>
      </section>

      {/* Contacto */}
      <section className="wrap py-14">
        <div className="flex flex-col items-start justify-between gap-6 border border-line bg-cream p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-serif text-lg italic leading-relaxed text-ink">{p.cta.text}</p>
          <Button href="/contacto" variant="secondary">
            {p.cta.button}
          </Button>
        </div>
      </section>
    </>
  );
}

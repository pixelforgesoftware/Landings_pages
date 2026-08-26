import { useI18n, usePageTitle } from "@/i18n";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconCalendar } from "@/components/ui/icons";

/**
 * Página de proyectos institucionales: Crecimiento Educativo y Futura Capilla San José.
 */
export default function Projects() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.projects);
  const p = t.projects;

  return (
    <>
      {/* Hero principal */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap py-16 text-center sm:py-20">
          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
            {p.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-black leading-tight text-warm-white sm:text-5xl">
            {p.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-cream/85">
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* Proyecto 1: Crecimiento Educativo */}
      <section id="proyecto-educativo" aria-labelledby="edu-title" className="scroll-mt-28 border-b border-line bg-cream">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1fr] lg:gap-16 sm:py-20">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-red">{p.educational.kicker}</p>
            <h2 id="edu-title" className="mt-2.5 font-serif text-3xl font-bold text-blue-deep sm:text-4xl">
              {p.educational.title}
            </h2>
            <p className="mt-2 font-serif text-lg italic text-gold">{p.educational.subtitle}</p>
            <p className="mt-5 leading-relaxed text-ink-soft">{p.educational.description}</p>

            <h3 className="mt-8 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
              {p.needsTitle}
            </h3>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {p.educational.needs.map((need) => (
                <li key={need} className="flex items-center gap-3 border-b border-line/70 pb-2.5 text-[0.95rem] font-semibold text-ink">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-red" />
                  {need}
                </li>
              ))}
            </ul>

            {/* Estado y avances del proyecto */}
            <div className="mt-8 border border-line bg-warm-white p-6">
              <h3 className="flex items-center gap-2.5 font-serif text-lg font-bold text-blue-deep">
                <IconCalendar size={18} aria-hidden className="text-gold" />
                {p.educational.progressTitle}
              </h3>
              <p className="mt-2 text-sm italic leading-relaxed text-ink-soft">{p.educational.progressText}</p>
            </div>

            <div className="mt-8">
              <Button href="/colaborar" variant="primary">
                {p.educational.cta}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 content-start gap-4">
            {p.educational.photos.map((photo, i) => (
              <Reveal key={photo} delay={i * 70}>
                <ImagePlaceholder label={photo} kind="plan" className="aspect-[4/3] w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proyecto 2: Futura Capilla San José */}
      <section id="capilla-san-jose" aria-labelledby="capilla-title" className="scroll-mt-28 bg-warm-white">
        <div aria-hidden className="gold-rule" />
        <div className="wrap py-18 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold">
                {p.chapel.kicker}
              </p>
              <h2 id="capilla-title" className="mt-4 font-serif text-4xl font-black leading-tight text-blue-deep sm:text-5xl">
                {p.chapel.title}
              </h2>
              <p className="mt-5 font-serif text-xl italic leading-relaxed text-red">
                “{p.chapel.lead}”
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">{p.chapel.p2}</p>

              <p className="mt-8 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
                {p.chapel.spacesTitle}
              </p>
              <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-serif text-xl italic text-blue-deep">
                {p.chapel.spaces.map((space, i) => (
                  <span key={space} className="inline-flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />}
                    {space}
                  </span>
                ))}
              </p>

              <p className="mt-8 border-y border-gold/40 py-4 font-serif text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-blue">
                Parroquia + Escuela + Comunidad
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.chapel.unity}</p>
            </div>
          </Reveal>

          {/* Galería de planos y conceptos */}
          <Reveal className="mt-12">
            <div className="frame-gold mx-auto max-w-4xl">
              <ImagePlaceholder
                label={p.chapel.photos[2]}
                kind="plan"
                className="aspect-[4/3] w-full sm:aspect-[16/8]"
              />
            </div>
          </Reveal>
          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
            {[p.chapel.photos[0], p.chapel.photos[1], p.chapel.photos[3], p.chapel.photos[4], p.chapel.photos[5]].map(
              (photo) => (
                <ImagePlaceholder key={photo} label={photo} className="aspect-[4/3] w-full" />
              ),
            )}
          </div>

          {/* Necesidades del proyecto */}
          <Reveal className="mx-auto mt-14 max-w-4xl">
            <h3 className="text-center text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gold">
              {p.needsTitle}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 text-center sm:grid-cols-3">
              {p.chapel.needs.map((need) => (
                <li key={need} className="font-serif text-[0.98rem] italic text-ink">
                  {need}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Novedades y seguimiento de obra */}
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <div className="border border-gold/50 bg-gold-soft/50 p-7 text-center sm:p-9">
              <h3 className="font-serif text-2xl font-bold text-blue-deep">{p.chapel.updatesTitle}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{p.chapel.updatesText}</p>
              <p className="mt-5 inline-block border border-dashed border-gold/60 bg-warm-white px-5 py-3 text-sm italic text-ink-soft">
                {p.chapel.updatesEmpty}
              </p>
            </div>
            <div className="mt-8 text-center">
              <Button href="/colaborar" variant="gold" size="lg">
                {p.chapel.cta}
              </Button>
            </div>
          </Reveal>
        </div>
        <div aria-hidden className="gold-rule" />
      </section>

      {/* Llamado a colaborar */}
      <section className="wrap py-14">
        <div className="flex flex-col items-start justify-between gap-6 border border-line bg-cream p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-serif text-lg italic leading-relaxed text-ink">{p.bottom.text}</p>
          <Button href="/colaborar" variant="primary">
            {p.bottom.cta}
          </Button>
        </div>
      </section>
    </>
  );
}

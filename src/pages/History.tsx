import { useI18n, usePageTitle } from "@/i18n";
import SectionTitle from "@/components/ui/SectionTitle";
import Timeline from "@/components/ui/Timeline";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/**
 * Reseña histórica y línea de tiempo cronológica de la comunidad.
 */
export default function History() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.history);
  const h = t.history;

  return (
    <>
      {/* Hero principal */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap max-w-3xl py-14 text-center lg:py-18">
          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
            {h.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
          </p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-warm-white sm:text-5xl">
            {h.title}
          </h1>
          <p className="mt-6 leading-relaxed text-cream/85">{h.intro1}</p>
          <p className="mt-4 leading-relaxed text-cream/85">{h.intro2}</p>
          <p className="mt-4 font-serif text-lg italic text-gold-bright">{h.intro3}</p>
        </div>
      </section>

      {/* Línea de tiempo completa */}
      <section aria-labelledby="timeline-historia" className="wrap py-16 sm:py-20">
        <Reveal>
          <SectionTitle title={h.timelineTitle} />
        </Reveal>
        <div className="mt-12">
          <Timeline items={h.timeline} variant="full" />
        </div>
      </section>

      {/* Obra comunitaria */}
      <section aria-labelledby="comunidad" className="bg-blue-deep text-cream">
        <div className="wrap max-w-3xl py-16 sm:py-20">
          <Reveal>
            <SectionTitle eyebrow={h.community.eyebrow} title={h.community.title} tone="dark" />
            <p className="mt-6 leading-relaxed text-cream/85">{h.community.p1}</p>
            <blockquote className="mt-8 border-l-2 border-gold-bright pl-5">
              <p className="font-serif text-2xl italic leading-relaxed text-gold-bright">
                “{h.community.quote}”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Llamado a colaborar */}
      <section className="wrap py-16 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold text-blue-deep sm:text-4xl">{h.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-soft">{h.cta.text}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/proyectos" variant="primary" size="lg">
              {h.cta.projects}
            </Button>
            <Button href="/colaborar" variant="secondary" size="lg">
              {h.cta.collaborate}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

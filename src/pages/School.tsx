import { useI18n, usePageTitle } from "@/i18n";
import { STATS, SCHOOL_HOURS } from "@/data/institution";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconClock } from "@/components/ui/icons";

/**
 * Página institucional del Colegio Parroquial Sagrada Familia de Nazareth y Jardín Maternal.
 */
export default function School() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.school);
  const s = t.school;

  const hourItems = [
    { name: s.hours.items[0].name, time: SCHOOL_HOURS.garden },
    { name: s.hours.items[1].name, time: SCHOOL_HOURS.primary },
    { name: s.hours.items[2].name, time: SCHOOL_HOURS.secondary },
  ];

  return (
    <>
      {/* Hero principal */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap py-14 text-center lg:py-18">
          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
            {s.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-3xl font-black leading-tight text-warm-white sm:text-[2.6rem]">
            {s.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-cream/85">
            {s.subtitle}
          </p>
          <div className="frame-gold mx-auto mt-10 max-w-5xl overflow-hidden">
            <img
              src="/images/hero-school.webp"
              alt={s.heroPhoto}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/7] transition-transform duration-700 hover:scale-105"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Identidad y propuesta educativa */}
      <section aria-labelledby="identidad" className="wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 sm:py-20">
        <Reveal>
          <SectionTitle eyebrow={s.identity.eyebrow} title={s.identity.title} />
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p>{s.identity.p1}</p>
            <p>{s.identity.p2}</p>
            <p>{s.identity.p3}</p>
            <p>{s.identity.p4}</p>
            <p className="border-l-2 border-gold pl-4 font-semibold text-blue">{s.identity.p5}</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gold/45 bg-gold-soft/50 p-5 text-center">
              <p className="font-serif text-3xl font-black text-gold">{STATS.students}</p>
              <p className="mt-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
                {s.figures.students}
              </p>
            </div>
            <div className="border border-gold/45 bg-gold-soft/50 p-5 text-center">
              <p className="font-serif text-3xl font-black text-gold">{STATS.families}</p>
              <p className="mt-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
                {s.figures.families}
              </p>
            </div>
          </div>
          <div className="border border-line bg-warm-white shadow-inst">
            <div className="overflow-hidden aspect-[4/3] w-full bg-warm-white">
              <img
                src="/images/colegio-clase.webp"
                alt="Docentes y alumnos compartiendo la jornada en el aula"
                className="h-full w-full object-cover object-[center_15%] transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="border-t border-line px-3.5 py-2.5 text-xs italic text-ink-soft">
              Comunidad educativa: docentes, familias y alumnos en el aula
            </p>
          </div>
        </Reveal>
      </section>

      {/* Niveles educativos */}
      <section aria-labelledby="niveles" className="border-y border-line bg-cream">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionTitle eyebrow={s.levels.eyebrow} title={s.levels.title} lead={s.levels.intro} />
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <ol className="max-w-2xl">
              {s.levels.items.map((level, i) => (
                <Reveal key={level.name} delay={i * 70}>
                  <li className="flex items-center gap-5 border-b border-line py-5 first:border-t sm:gap-8">
                    <span aria-hidden className="w-12 shrink-0 font-serif text-2xl font-black text-gold sm:text-3xl">
                      {["I", "II", "III", "IV"][i]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-lg font-bold text-blue-deep sm:text-xl">{level.name}</p>
                      {level.note && <p className="mt-0.5 text-sm text-ink-soft">{level.note}</p>}
                    </div>
                    <span aria-hidden className="hidden h-2 w-2 rotate-45 bg-red sm:block" />
                  </li>
                </Reveal>
              ))}
            </ol>

            {/* Muestra fotográfica de los niveles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Reveal delay={120}>
                <div className="border border-line bg-warm-white shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-inst">
                  <div className="overflow-hidden aspect-[4/3] w-full bg-warm-white">
                    <img
                      src="/images/colegio-nivel-inicial.webp"
                      alt="Nivel Inicial: docentes y alumnos en el inicio de clases"
                      className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="border-t border-line px-3.5 py-2.5 text-xs italic text-ink-soft">
                    Nivel Inicial: primeras vivencias e integración
                  </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="border border-line bg-warm-white shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-inst">
                  <div className="overflow-hidden aspect-[4/3] w-full bg-warm-white">
                    <img
                      src="/images/colegio-primaria-formacion.webp"
                      alt="Nivel Primario: formación de alumnos y docentes"
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="border-t border-line px-3.5 py-2.5 text-xs italic text-ink-soft">
                    Nivel Primario: formación académica y virtudes
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Actividades formativas */}
      <section aria-labelledby="actividades" className="wrap py-16 sm:py-20">
        <Reveal>
          <SectionTitle eyebrow={s.activities.eyebrow} title={s.activities.title} lead={s.activities.intro} />
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <ul className="grid content-start gap-x-10 gap-y-3.5 sm:grid-cols-2">
            {s.activities.items.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-line/80 pb-3.5 text-[0.98rem] font-semibold text-ink">
                <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: s.activities.photos[0],
                src: "/images/colegio-primaria-formacion.webp",
                caption: "Formación de alumnos y docentes",
              },
              {
                label: s.activities.photos[1],
                src: "/images/colegio-sagrada-familia.webp",
                caption: "Actividades formativas e ideario",
              },
              {
                label: s.activities.photos[2],
                src: "/images/colegio-alumnos-bandera.webp",
                caption: "Actos patrios e institucionales",
              },
              {
                label: s.activities.photos[3],
                src: "/images/historia-2017-inauguracion.webp",
                caption: "Celebraciones e inauguraciones",
              },
            ].map((item) => (
              <figure
                key={item.label}
                className="group overflow-hidden border border-line bg-warm-white shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-inst"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="border-t border-line/80 px-3 py-2 text-xs italic text-ink-soft">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Horarios por nivel */}
      <section aria-labelledby="horarios-colegio" className="border-y border-line bg-cream">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionTitle eyebrow={s.hours.eyebrow} title={s.hours.title} />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {hourItems.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="h-full border border-line bg-warm-white p-6 text-center">
                  <span aria-hidden className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <IconClock size={18} />
                  </span>
                  <h3 className="mt-3.5 font-serif text-lg font-bold text-blue-deep">{item.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-red">
                    {s.hours.days}
                  </p>
                  <p className="mt-2.5 font-serif text-2xl font-black text-blue-deep">{item.time}</p>
                  <p className="text-xs text-ink-soft">hs</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm italic leading-relaxed text-ink-soft">{s.hours.initialNote}</p>
        </div>
      </section>

      {/* Llamado a colaborar */}
      <section className="wrap py-14">
        <div className="flex flex-col items-start justify-between gap-6 border border-gold/50 bg-gold-soft/50 p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-serif text-lg italic leading-relaxed text-ink">{s.cta.text}</p>
          <Button href="/colaborar" variant="primary">
            {s.cta.button}
          </Button>
        </div>
      </section>
    </>
  );
}

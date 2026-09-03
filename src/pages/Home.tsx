import { Link } from "react-router-dom";
import { useI18n, usePageTitle } from "@/i18n";
import { STATS } from "@/data/institution";
import SectionTitle from "@/components/ui/SectionTitle";
import Timeline from "@/components/ui/Timeline";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import {
  IconArrowRight,
  IconBook,
  IconChurch,
  IconHeart,
} from "@/components/ui/icons";

/**
 * Página de inicio con la visión general de la Parroquia, Colegio y Proyectos.
 */
export default function Home() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.home);

  const stats = [
    { value: STATS.parishYear, label: t.home.stats.parish },
    { value: STATS.schoolYear, label: t.home.stats.school },
    { value: STATS.students, label: t.home.stats.students },
    { value: STATS.families, label: t.home.stats.families },
    { value: STATS.levels, label: t.home.stats.levels },
  ];

  const institutions = [
    { icon: IconChurch, name: t.common.names.parish, desc: t.home.institutions.parishDesc, href: "/parroquia", cta: t.home.unity.parishCardLink },
    { icon: IconBook, name: t.common.names.schoolFull, desc: t.home.institutions.schoolDesc, href: "/colegio", cta: t.home.unity.schoolCardLink },
    { icon: IconHeart, name: t.common.names.garden, desc: t.home.institutions.gardenDesc, href: "/colegio", cta: t.home.unity.schoolCardLink },
  ];

  return (
    <>
      {/* Hero principal */}
      <section aria-labelledby="hero-title" className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap relative grid items-center gap-12 py-14 sm:py-18 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
          <div>
            <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
              <span aria-hidden className="h-px w-10 bg-gold-bright/70" />
              {t.home.hero.eyebrow}
            </p>
            <h1
              id="hero-title"
              className="mt-5 font-serif text-4xl font-black leading-[1.08] text-warm-white sm:text-5xl lg:text-[3.6rem]"
            >
              {t.home.hero.title}
            </h1>
            <p className="mt-4 font-serif text-xl italic leading-snug text-gold-bright sm:text-2xl">
              {t.home.hero.subtitle}
            </p>
            <p className="mt-5 border-l-2 border-gold-bright/80 pl-4 font-serif text-[1.02rem] italic leading-relaxed text-cream/90">
              “{t.home.hero.quote}”
            </p>
            <p className="mt-3 text-[0.92rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
              {t.common.mottoA} · {t.common.mottoB}
            </p>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-cream/80">
              {t.home.hero.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/parroquia" variant="primary" size="lg">
                {t.home.hero.ctaPrimary}
              </Button>
              <Button href="/proyectos" variant="white" size="lg">
                {t.home.hero.ctaSecondary}
              </Button>
            </div>
            <p className="mt-4">
              <Link
                to="/colaborar"
                className="inline-flex items-center gap-2 font-bold text-gold-bright underline decoration-gold-bright/60 underline-offset-4 transition-colors hover:text-warm-white"
              >
                {t.home.hero.ctaCollab}
                <IconArrowRight size={16} aria-hidden />
              </Link>
            </p>
          </div>

          <div className="frame-gold overflow-hidden">
            <img
              src="/images/hero-home.webp"
              alt="Acto de inauguración e inicio de clases de la comunidad en San José de los Chañares"
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4] transition-transform duration-700 hover:scale-105"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Separador dorado */}
      <div className="gold-rule opacity-90" aria-hidden="true" />

      {/* Instituciones */}
      <section aria-labelledby="instituciones" className="bg-blue-deep text-cream">
        <div className="wrap py-14 sm:py-16">
          <Reveal>
            <SectionTitle
              align="center"
              tone="dark"
              title={t.home.institutions.title}
              lead={t.home.institutions.intro}
              className="max-w-2xl"
            />
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-warm-white/15 bg-warm-white/15 md:grid-cols-3">
            {institutions.map(({ icon: Icon, name, desc, href, cta }) => (
              <Link
                key={name}
                to={href}
                className="group flex flex-col bg-blue-deep p-7 transition-colors hover:bg-blue"
              >
                <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-bright/50 text-gold-bright">
                  <Icon size={21} />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-warm-white">
                  {name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cream/75">{desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-bright group-hover:text-warm-white">
                  {cta}
                  <IconArrowRight size={15} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y unidad */}
      <section aria-labelledby="unidad" className="wrap py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionTitle
              eyebrow={t.home.unity.eyebrow}
              title={t.home.unity.title}
            />
            <p className="mt-5 leading-relaxed text-ink-soft">{t.home.unity.p1}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">{t.home.unity.p2}</p>
          </Reveal>

          <div className="relative">
            <span aria-hidden className="absolute left-[27px] top-14 bottom-14 hidden w-px bg-gold/50 sm:block" />
            <div className="grid gap-6">
              <Reveal>
                <Link
                  to="/parroquia"
                  className="relative flex gap-5 border border-line bg-cream p-6 transition-all hover:border-gold hover:shadow-inst"
                >
                  <img
                    src="/images/logo-parroquia.webp"
                    alt={t.common.logos.parish}
                    className="h-14 w-auto max-w-[56px] shrink-0 object-contain"
                  />
                  <span>
                    <span className="font-serif text-lg font-bold text-blue-deep">
                      {t.home.unity.parishCardTitle}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">
                      {t.home.unity.parishCardDesc}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red">
                      {t.home.unity.parishCardLink}
                      <IconArrowRight size={14} aria-hidden />
                    </span>
                  </span>
                </Link>
              </Reveal>
              <Reveal delay={120}>
                <Link
                  to="/colegio"
                  className="relative flex gap-5 border border-line bg-cream p-6 transition-all hover:border-gold hover:shadow-inst"
                >
                  <img
                    src="/images/logo-colegio.webp"
                    alt={t.common.logos.school}
                    className="h-14 w-auto max-w-[56px] shrink-0 object-contain"
                  />
                  <span>
                    <span className="font-serif text-lg font-bold text-blue-deep">
                      {t.home.unity.schoolCardTitle}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">
                      {t.home.unity.schoolCardDesc}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red">
                      {t.home.unity.schoolCardLink}
                      <IconArrowRight size={14} aria-hidden />
                    </span>
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Cifras de la comunidad */}
      <section aria-label="Cifras de la comunidad" className="bg-red-deep text-warm-white">
        <div className="wrap grid grid-cols-2 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="text-center">
              <p className="font-serif text-4xl font-black text-gold-bright sm:text-[2.6rem]">{s.value}</p>
              <div aria-hidden className="mx-auto mt-2.5 h-px w-8 bg-gold-bright/60" />
              <p className="mt-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-cream/85">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Historia */}
      <section aria-labelledby="historia-home" className="wrap py-16 sm:py-20 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionTitle eyebrow={t.home.timeline.eyebrow} title={t.home.timeline.title} />
          <p className="mt-6">
            <Link
              to="/historia"
              className="inline-flex items-center gap-2 font-bold text-red underline decoration-gold/60 underline-offset-4 hover:text-blue"
            >
              {t.home.timeline.link}
            </Link>
          </p>
          <div className="mt-10 hidden lg:block max-w-md border border-line bg-warm-white shadow-inst">
            <div className="overflow-hidden aspect-[4/3] w-full bg-warm-white">
              <img
                src="/images/comunidad-trabajo.webp"
                alt="Familias y comunidad de Chañares participando en el traslado y equipamiento escolar"
                className="h-full w-full object-cover object-[center_top] transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="border-t border-line px-3.5 py-2.5 text-xs italic text-ink-soft">
              Esfuerzo conjunto de familias y colaboradores en el acondicionamiento de las aulas
            </p>
          </div>
        </Reveal>
        <Reveal delay={100} className="mt-10 lg:mt-0">
          <Timeline items={t.home.timeline.items} variant="compact" />
        </Reveal>
      </section>

      {/* Colegio */}
      <section aria-labelledby="colegio-home" className="bg-cream border-y border-line">
        <div className="wrap py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <Reveal>
              <SectionTitle eyebrow={t.home.school.eyebrow} title={t.home.school.title} />
              <p className="mt-5 leading-relaxed text-ink-soft">{t.home.school.intro}</p>
              <p className="mt-6">
                <Link
                  to="/colegio"
                  className="inline-flex items-center gap-2 font-bold text-red underline decoration-gold/60 underline-offset-4 hover:text-blue"
                >
                  {t.home.school.link}
                </Link>
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
                {t.home.school.levelsTitle}
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {t.home.school.levels.map((level, i) => (
                  <div key={level.name} className="border border-line bg-warm-white p-5">
                    <p aria-hidden className="font-serif text-2xl font-black text-gold/80">
                      {["I", "II", "III", "IV"][i]}
                    </p>
                    <p className="mt-1.5 font-serif text-[1.05rem] font-bold text-blue-deep">{level.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{level.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valores institucionales */}
      <section aria-labelledby="valores" className="bg-blue-deep text-cream">
        <div className="wrap py-16 sm:py-18">
          <Reveal>
            <SectionTitle align="center" tone="dark" eyebrow={t.home.values.eyebrow} title={t.home.values.title} />
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-3.5 sm:grid-cols-2">
            {t.home.values.list.map((value) => (
              <li
                key={value}
                className="flex items-center gap-3.5 border-b border-warm-white/10 pb-3.5 font-serif text-lg text-cream/95"
              >
                <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-gold-bright" />
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section aria-labelledby="proyectos-home" className="wrap py-16 sm:py-22">
        <Reveal>
          <SectionTitle align="center" eyebrow={t.home.projects.eyebrow} title={t.home.projects.title} lead={t.home.projects.intro} />
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal className="h-full">
            <ProjectCard
              kicker={t.home.projects.p1Kicker}
              title={t.home.projects.p1Title}
              text={t.home.projects.p1Goal}
              meta={t.home.projects.p1NeedCount}
              photo={{
                label: `${t.projects.educational.photos[0]} — ${t.projects.educational.subtitle}`,
                src: "/images/colegio-aula-preparada.webp",
              }}
              ctaLabel={t.home.projects.p1Cta}
              ctaHref="/proyectos#proyecto-educativo"
              className="h-full"
            />
          </Reveal>
          <Reveal delay={120} className="h-full">
            <ProjectCard
              featured
              kicker={t.home.projects.p2Kicker}
              title={t.home.projects.p2Title}
              text={t.home.projects.p2Text}
              photo={{
                label: "Comunidad parroquial y educativa en el predio escolar",
                src: "/images/colegio-comunidad-8xmille.webp",
              }}
              ctaLabel={t.home.projects.p2Cta}
              ctaHref="/proyectos#capilla-san-jose"
              className="h-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Colaborar */}
      <section aria-labelledby="colaborar-home" className="bg-red py-16 text-warm-white sm:py-20">
        <div className="wrap max-w-3xl text-center">
          <Reveal>
            <h2 id="colaborar-home" className="font-serif text-3xl font-bold sm:text-4xl text-warm-white">
              {t.home.collaborate.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-warm-white/90">
              {t.home.collaborate.text}
            </p>
            <div className="mt-8">
              <Button href="/colaborar" variant="white" size="lg">
                {t.home.collaborate.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

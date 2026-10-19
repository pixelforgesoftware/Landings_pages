import { useI18n, usePageTitle } from "@/i18n";
import { CONTACT } from "@/data/institution";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconClock, IconMapPin, IconWhatsApp, IconMail, IconArrowRight } from "@/components/ui/icons";
import { Baby, Heart, Sparkles, Smile, Users } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Página institucional del Jardín Maternal JP-338 San Francisco de Asís.
 * Presenta la identidad de primera infancia, salas por edades, horarios de 9 a 12 hs,
 * propuesta pedagógica lúdica y canales directos de inscripción.
 */

export default function Garden() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.garden);
  const g = t.garden;

  // Mensaje predeterminado de WhatsApp específico para el jardín maternal
  const gardenWhatsAppUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    "Hola, me comunico desde la página web y quisiera consultar por vacantes e inscripciones para el Jardín Maternal JP-338 San Francisco de Asís.",
  )}`;

  return (
    <>
      {/* ------------------------------------------------------------
          1. Hero principal institucional del Jardín
          ------------------------------------------------------------ */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap py-14 text-center lg:py-18">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40 text-gold-bright border border-gold-bright/60 shadow-sm sm:h-16 sm:w-16">
            <Baby size={32} />
          </div>

          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
            {g.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-3xl font-black leading-tight text-warm-white sm:text-[2.6rem]">
            {g.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-cream/85">
            {g.subtitle}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden />
            <span>Fundado el {g.foundedDate}</span>
          </div>

          <div className="frame-gold mx-auto mt-10 max-w-5xl overflow-hidden shadow-2xl">
            <img
              src="/images/colegio-nivel-inicial.webp"
              alt={g.heroPhoto}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/7] transition-transform duration-700 hover:scale-105"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------
          2. Identidad y Filosofía de Crianza
          ------------------------------------------------------------ */}
      <section id="identidad" aria-labelledby="identidad" className="scroll-mt-28 wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 sm:py-20">
        <Reveal>
          <SectionTitle eyebrow={g.identity.eyebrow} title={g.identity.title} />
          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p>{g.identity.p1}</p>
            <p>{g.identity.p2}</p>
            <p className="border-l-2 border-gold pl-4 font-semibold text-blue-deep">{g.identity.p3}</p>
          </div>

          {/* Pilares clave de primera infancia */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Heart, label: "Ternura y Afecto" },
              { icon: Smile, label: "Juego Guiado" },
              { icon: Sparkles, label: "Estimulación" },
              { icon: Users, label: "Junto a la Familia" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-lg border border-line bg-cream/50 p-3 text-center transition-colors hover:border-gold/60 hover:bg-cream"
              >
                <Icon size={20} className="text-[#A50F2D] mb-1.5" />
                <span className="text-[0.74rem] font-bold text-ink">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="space-y-5">
          <div className="border border-line bg-warm-white shadow-inst overflow-hidden rounded-sm">
            <div className="overflow-hidden aspect-[4/3] w-full bg-warm-white">
              <img
                src="/images/colegio-inicial-merienda.webp"
                alt="Momentos cotidianos de merienda y socialización en el jardín maternal"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="border-t border-line px-4 py-3 text-xs italic text-ink-soft">
              Merienda compartida y socialización temprana en un clima de respeto y alegría
            </p>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------
          3. Organización por Salas y Horarios
          ------------------------------------------------------------ */}
      <section id="salas-horarios" aria-labelledby="salas-horarios" className="scroll-mt-28 border-y border-line bg-cream">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionTitle eyebrow={g.rooms.eyebrow} title={g.rooms.title} lead={g.rooms.intro} />
          </Reveal>

          {/* Tarjetas de salas por edad */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {g.rooms.items.map((room, i) => (
              <Reveal key={room.name} delay={i * 80}>
                <div className="flex h-full flex-col justify-between rounded-lg border border-line bg-warm-white p-5 shadow-xs transition-all hover:border-gold hover:shadow-inst">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-soft px-3 py-1 text-xs font-bold text-[#A50F2D]">
                      <Baby size={14} />
                      <span>{room.age}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-blue-deep">{room.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">{room.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Horario destacado del Jardín */}
          <Reveal delay={200} className="mt-10">
            <div className="mx-auto max-w-2xl rounded-xl border border-gold/50 bg-gold-soft/40 p-6 text-center sm:p-8">
              <span aria-hidden className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold">
                <IconClock size={22} />
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-blue-deep">{g.hours.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#A50F2D]">
                {g.hours.days}
              </p>
              <p className="mt-2.5 font-serif text-3xl font-black text-blue-deep">{g.hours.time} hs</p>
              <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-ink-soft">
                {g.hours.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------
          4. Propuesta Pedagógica y Estimulación Temprana
          ------------------------------------------------------------ */}
      <section id="propuesta" aria-labelledby="propuesta" className="scroll-mt-28 wrap py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">
          <Reveal>
            <SectionTitle eyebrow={g.pedagogy.eyebrow} title={g.pedagogy.title} lead={g.pedagogy.intro} />
            <ul className="mt-6 space-y-3">
              {g.pedagogy.items.map((item) => (
                <li key={item} className="flex items-center gap-3 font-serif text-[1rem] text-ink">
                  <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-[#A50F2D]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-lg border border-line bg-warm-white shadow-inst">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/images/colegio-aula-preparada.webp"
                  alt="Aula y mobiliario seguro adaptado a la primera infancia"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="border-t border-line px-4 py-3 text-xs italic text-ink-soft">
                Espacios adaptados con materiales lúdicos y seguridad integral para la primera infancia
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------
          5. Galería Destacada y Deep-link a Galería Filtrada
          ------------------------------------------------------------ */}
      <section aria-labelledby="galeria-jardin" className="border-t border-line bg-cream/70 py-16 sm:py-20">
        <div className="wrap">
          <Reveal className="text-center max-w-2xl mx-auto">
            <SectionTitle
              align="center"
              eyebrow={t.common.nav.gallery}
              title="Momentos y espacios del Jardín"
              lead="Una mirada cercana al cuidado, juegos y primeras experiencias de aprendizaje de nuestros pequeños."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                src: "/images/colegio-nivel-inicial.webp",
                caption: "Salas de estimulación y primera infancia",
              },
              {
                src: "/images/colegio-inicial-merienda.webp",
                caption: "Juegos, rondas y merienda compartida",
              },
              {
                src: "/images/colegio-aula-preparada.webp",
                caption: "Instalaciones seguras y preparadas con amor",
              },
            ].map((photo, i) => (
              <Reveal key={photo.caption} delay={i * 80}>
                <div className="overflow-hidden rounded-lg border border-line bg-warm-white shadow-xs transition-all hover:border-gold hover:shadow-inst">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="border-t border-line px-3.5 py-2.5 text-xs italic text-ink-soft">
                    {photo.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-10 flex justify-center">
            <Button href="/galeria?cat=colegio-jardin" variant="secondary">
              Ver galería de fotos del Jardín y Colegio →
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------
          6. Contacto e Inscripciones (#contacto)
          ------------------------------------------------------------ */}
      <section id="contacto" aria-labelledby="contacto-jardin" className="scroll-mt-28 wrap py-16 sm:py-20">
        <div className="overflow-hidden rounded-2xl border border-line bg-warm-white p-8 shadow-inst sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A50F2D]">
                {g.contact.eyebrow}
              </p>
              <h2 id="contacto-jardin" className="mt-3 font-serif text-2xl font-black text-blue-deep sm:text-3xl">
                {g.contact.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{g.contact.intro}</p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={gardenWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#A50F2D] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:bg-red-deep active:scale-[0.98]"
                >
                  <IconWhatsApp size={17} />
                  <span>{g.contact.ctaWhatsApp}</span>
                </a>

                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Consulta por inscripciones - Jardín Maternal JP-338")}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-line bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-[#A50F2D] hover:text-[#A50F2D]"
                >
                  <IconMail size={17} />
                  <span>{g.contact.ctaEmail}</span>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-line/80 bg-cream/60 p-6 space-y-4">
              <div>
                <h3 className="font-serif text-base font-bold text-blue-deep flex items-center gap-2">
                  <IconMapPin size={18} className="text-[#A50F2D]" />
                  <span>{g.contact.addressTitle}</span>
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  {g.contact.addressNote}
                </p>
              </div>

              <div className="border-t border-line/60 pt-4">
                <p className="text-xs font-bold text-ink">Horarios de secretaría:</p>
                <p className="text-xs text-ink-soft mt-0.5">Lunes a viernes de 09:00 a 12:00 hs</p>
              </div>

              <div className="border-t border-line/60 pt-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A50F2D] hover:underline"
                >
                  <span>Ver mapa institucional y canales generales</span>
                  <IconArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------
          7. Continuidad educativa hacia el Colegio
          ------------------------------------------------------------ */}
      <section className="border-t border-line bg-blue-deep text-cream py-14">
        <div className="wrap flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-bright">
              Continuidad Pedagógica
            </p>
            <p className="mt-2 max-w-2xl font-serif text-lg italic leading-relaxed text-warm-white">
              {g.cta.text}
            </p>
          </div>
          <Button href="/colegio" variant="secondary">
            {g.cta.button}
          </Button>
        </div>
      </section>
    </>
  );
}

import { useI18n, usePageTitle } from "@/i18n";
import { CONTACT, WHATSAPP_URL } from "@/data/institution";
import ContactCard from "@/components/ui/ContactCard";
import ContactForm from "@/components/forms/ContactForm";
import MapPlaceholder from "@/components/ui/MapPlaceholder";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

/**
 * Canales de comunicación directa, direcciones institucionales y redes de la comunidad.
 */
export default function Contact() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.contact);
  const c = t.contact;

  return (
    <>
      {/* Hero principal */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap max-w-3xl py-14 text-center lg:py-16">
          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
            {c.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
          </p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-warm-white sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 leading-relaxed text-cream/85">{c.intro}</p>
        </div>
      </section>

      {/* Canales de contacto directo */}
      <section aria-label="Canales de contacto" className="wrap py-14 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          <Reveal>
            <ContactCard
              kind="whatsapp"
              title={c.whatsapp.title}
              value={CONTACT.whatsappDisplay}
              actionLabel={c.whatsapp.action}
              href={WHATSAPP_URL}
              external
            />
          </Reveal>
          <Reveal delay={100}>
            <ContactCard
              kind="mail"
              title={c.email.title}
              value={CONTACT.email}
              actionLabel={c.email.action}
              href={`mailto:${CONTACT.email}`}
            />
          </Reveal>
        </div>
      </section>

      {/* Formulario de consulta rápida */}
      <section aria-labelledby="form-contacto" className="border-t border-line bg-cream/70 py-16 sm:py-20">
        <div className="wrap max-w-4xl">
          <Reveal>
            <SectionTitle
              title={c.form.title}
              lead={c.form.intro}
              align="center"
            />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Direcciones institucionales */}
      <section aria-labelledby="direcciones" className="border-y border-line bg-cream">
        <div className="wrap grid gap-8 py-16 lg:grid-cols-2 sm:py-20">
          <Reveal>
            <div className="h-full border border-line bg-warm-white p-6 sm:p-7">
              <h2 id="direcciones" className="font-serif text-2xl font-bold text-blue-deep">
                {c.schoolAddress.title}
              </h2>
              <p className="mt-2 text-sm text-ink-soft">{t.common.names.schoolFull}</p>
              <div className="mt-5">
                <MapPlaceholder
                  label={c.schoolAddress.mapLabel}
                  addressLines={CONTACT.schoolAddress}
                  geo={CONTACT.schoolGeo}
                  buttonLabel={t.common.openInMaps}
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full border border-line bg-warm-white p-6 sm:p-7">
              <h2 className="font-serif text-2xl font-bold text-blue-deep">{c.parishAddress.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{t.common.names.parish}</p>
              <div className="mt-5">
                <MapPlaceholder
                  label={c.parishAddress.mapLabel}
                  addressLines={CONTACT.parishAddress}
                  geo={CONTACT.parishGeo}
                  buttonLabel={t.common.openInMaps}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Redes sociales institucionales */}
      <section aria-labelledby="redes" className="wrap py-14">
        <div className="mx-auto max-w-2xl border border-gold/40 bg-warm-white p-8 text-center shadow-inst">
          <h2 id="redes" className="font-serif text-xl font-bold text-blue-deep">{c.social.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.social.note}</p>
          <p className="mt-4 inline-block rounded-sm border border-gold/60 bg-warm-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {t.common.soon}
          </p>
        </div>
      </section>
    </>
  );
}

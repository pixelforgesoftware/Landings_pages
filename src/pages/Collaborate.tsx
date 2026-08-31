import { useI18n, usePageTitle } from "@/i18n";
import { CONTACT, WHATSAPP_URL, INTERNATIONAL_PARTNERS } from "@/data/institution";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import DonationDetails from "@/components/donate/DonationDetails";
import CollaborationForm from "@/components/forms/CollaborationForm";
import Reveal from "@/components/ui/Reveal";

/**
 * Información de colaboración y canales de donación nacional e internacional.
 */
export default function Collaborate() {
  const { t } = useI18n();
  usePageTitle(t.common.pageTitles.collaborate);
  const c = t.collaborate;

  return (
    <>
      {/* Hero principal */}
      <section className="pattern-cross bg-blue-deep text-cream">
        <div className="wrap max-w-3xl py-14 text-center lg:py-18">
          <p className="flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-bright">
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
            {c.eyebrow}
            <span aria-hidden className="h-px w-8 bg-gold-bright/70" />
          </p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-warm-white sm:text-5xl">
            {c.title}
          </h1>
          <blockquote className="mt-7">
            <p className="font-serif text-xl italic leading-relaxed text-gold-bright sm:text-[1.45rem]">
              “{c.quote}”
            </p>
          </blockquote>
          <p className="mt-6 leading-relaxed text-cream/85">{c.lead}</p>
        </div>
      </section>

      {/* Formas de colaboración */}
      <section aria-labelledby="formas" className="wrap py-16 sm:py-20">
        <Reveal>
          <SectionTitle title={c.waysTitle} lead={c.waysIntro} />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full border border-line bg-cream p-7 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-blue-deep">{c.materials.title}</h3>
              <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {c.materials.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-line/70 pb-2.5 text-[0.95rem] font-semibold text-ink">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full border border-line bg-cream p-7 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-blue-deep">{c.modalities.title}</h3>
              <ul className="mt-5 grid gap-y-2.5">
                {c.modalities.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-line/70 pb-2.5 text-[0.95rem] font-semibold text-ink">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Donaciones desde Argentina */}
      <section aria-labelledby="argentina" className="border-y border-line bg-cream">
        <div className="wrap grid items-center gap-8 py-14 lg:grid-cols-[1.2fr_auto]">
          <Reveal>
            <h2 id="argentina" className="font-serif text-2xl font-bold text-blue-deep sm:text-3xl">
              {c.national.title}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">{c.national.text}</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap gap-3">
            <Button href={WHATSAPP_URL} external variant="primary">
              {c.national.whatsapp}
            </Button>
            <Button href={`mailto:${CONTACT.email}`} variant="secondary">
              {c.national.email}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Colaboradores internacionales */}
      <section aria-labelledby="internacional" className="wrap py-16 sm:py-20">
        <Reveal>
          <SectionTitle eyebrow={c.international.eyebrow} title={c.international.title} lead={c.international.text} />
        </Reveal>

        {/* Antecedentes de colaboración internacional */}
        <Reveal className="mt-10">
          <div className="border-l-2 border-gold bg-gold-soft/40 p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-blue-deep">{c.international.historyTitle}</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{c.international.historyText}</p>
            <ul className="mt-4 space-y-2">
              {INTERNATIONAL_PARTNERS.map((partner) => (
                <li key={partner} className="flex items-start gap-3 font-semibold text-blue-deep">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {partner}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm italic leading-relaxed text-ink-soft">{c.international.historyNote}</p>
          </div>
        </Reveal>

        {/* Donaciones internacionales (IOR) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal>
            <h3 className="font-serif text-2xl font-bold text-blue-deep sm:text-3xl">
              {c.international.donationTitle}
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft">{c.international.donationIntro}</p>
          </Reveal>
          <Reveal delay={100}>
            <DonationDetails />
          </Reveal>
        </div>
      </section>

      {/* Formulario de colaboración */}
      <section aria-labelledby="formulario" className="border-t border-line bg-cream">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <SectionTitle title={c.form.title} lead={c.form.intro} align="center" />
          </Reveal>
          <Reveal delay={100} className="mt-10 max-w-4xl mx-auto">
            <CollaborationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

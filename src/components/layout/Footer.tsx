import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { CONTACT, WHATSAPP_URL, SOCIAL } from "@/data/institution";
import LogoPlaceholder from "@/components/ui/LogoPlaceholder";
import { IconMail, IconWhatsApp } from "@/components/ui/icons";

/**
 * Pie de página institucional con enlaces de navegación, contacto e identidad.
 */

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const nav = [
    { href: "/", label: t.common.nav.home },
    { href: "/parroquia", label: t.common.nav.parish },
    { href: "/colegio", label: t.common.nav.school },
    { href: "/historia", label: t.common.nav.history },
    { href: "/proyectos", label: t.common.nav.projects },
    { href: "/galeria", label: t.common.nav.gallery },
    { href: "/colaborar", label: t.common.nav.collaborate },
    { href: "/contacto", label: t.common.nav.contact },
  ];

  const socials = [
    { name: "Instagram", url: SOCIAL.instagram },
    { name: "Facebook", url: SOCIAL.facebook },
    { name: "YouTube", url: SOCIAL.youtube },
  ];

  return (
    <footer className="bg-blue-deep text-cream">
      {/* Filete dorado superior */}
      <div aria-hidden className="gold-rule" />

      <div className="wrap grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
        {/* Identidad */}
        <div>
          <div className="flex items-center gap-3">
            <LogoPlaceholder label={t.common.logos.parish} tone="dark" />
            <p className="font-serif text-lg font-bold leading-tight text-warm-white">
              {t.common.names.parish}
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">{t.footer.identity}</p>
          <p className="mt-4 font-serif text-[0.98rem] italic leading-relaxed text-gold-bright">
            “{t.footer.phrase}”
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
            {t.footer.motto}
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label={t.footer.navTitle}>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-bright">
            {t.footer.navTitle}
          </h2>
          <ul className="mt-4 grid gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-cream/80 transition-colors hover:text-gold-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Instituciones */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-bright">
            {t.footer.institutionsTitle}
          </h2>
          <ul className="mt-4 grid gap-4 text-sm leading-snug">
            <li>
              <Link to="/parroquia" className="text-cream/85 transition-colors hover:text-gold-bright">
                {t.common.names.parish}
              </Link>
            </li>
            <li>
              <Link to="/colegio" className="text-cream/85 transition-colors hover:text-gold-bright">
                {t.common.names.schoolFull}
              </Link>
            </li>
            <li>
              <Link to="/colegio" className="text-cream/85 transition-colors hover:text-gold-bright">
                {t.common.names.garden}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-bright">
            {t.footer.contactTitle}
          </h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-cream/85 transition-colors hover:text-gold-bright"
              >
                <IconWhatsApp size={17} className="text-gold-bright" />
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2.5 break-all text-cream/85 transition-colors hover:text-gold-bright"
              >
                <IconMail size={17} className="shrink-0 text-gold-bright" />
                {CONTACT.email}
              </a>
            </li>
          </ul>

          {/* Redes sociales institucionales */}
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cream/50">
            {t.contact.social.title} · {t.common.soon}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li
                key={s.name}
                title={t.contact.social.note}
                className="cursor-default rounded-sm border border-warm-white/20 px-2.5 py-1 text-xs text-cream/50"
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Barra legal / créditos inferiores */}
      <div className="border-t border-warm-white/10 bg-blue-deep/90 py-6 text-xs text-cream/60">
        <div className="wrap flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p>
            © {year} {t.common.names.parish} · {t.common.names.schoolFull}.
          </p>
          <p className="text-cream/50">
            {t.common.locationLine}
          </p>
        </div>
      </div>
    </footer>
  );
}

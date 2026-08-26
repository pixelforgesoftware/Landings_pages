import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LogoPlaceholder from "@/components/ui/LogoPlaceholder";
import { IconMenu, IconX } from "@/components/ui/icons";

/**
 * Cabecera principal y barra de navegación responsive.
 */

export default function Header() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cerrar el menú móvil al navegar */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: t.common.nav.home },
    { href: "/parroquia", label: t.common.nav.parish },
    { href: "/colegio", label: t.common.nav.school },
    { href: "/historia", label: t.common.nav.history },
    { href: "/proyectos", label: t.common.nav.projects },
    { href: "/galeria", label: t.common.nav.gallery },
    { href: "/colaborar", label: t.common.nav.collaborate },
    { href: "/contacto", label: t.common.nav.contact },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "border-line shadow-header" : "border-line/60"
      }`}
    >
      {/* Fila superior: identidad + acciones */}
      <div className="wrap flex items-center justify-between gap-3 py-2.5 sm:py-3.5">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5"
          aria-label={t.common.names.parish}
          onClick={() => setOpen(false)}
        >
          {/* Logo / Escudo institucional */}
          <LogoPlaceholder
            label={t.common.logos.parish}
            className="h-10 w-10 sm:h-11 sm:w-11 shrink-0"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-serif text-[0.98rem] font-bold text-blue-deep transition-colors group-hover:text-red sm:text-lg sm:overflow-visible sm:whitespace-normal">
              {t.common.names.parish}
            </span>
            <span className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:text-xs sm:tracking-[0.16em]">
              {t.common.locationLine}
            </span>
          </span>
        </Link>

        {/* Acciones de cabecera */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3.5">
          {/* Idioma visible en pantallas medianas y grandes */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* Botón Colaborar destacado en desktop */}
          <Link
            to="/colaborar"
            className="hidden rounded-sm bg-red px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-warm-white shadow-sm transition-colors hover:bg-red-deep md:inline-flex"
          >
            {t.common.nav.collaborate}
          </Link>

          {/* Toggle menú móvil */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-cream text-ink transition-colors hover:border-gold hover:text-blue active:bg-gold-soft/60 lg:hidden"
          >
            {open ? <IconX size={21} /> : <IconMenu size={21} />}
          </button>
        </div>
      </div>

      {/* Navegación horizontal en desktop */}
      <nav
        aria-label="Navegación principal"
        className="hidden border-t border-line/70 bg-cream/70 lg:block"
      >
        <div className="wrap flex items-center justify-center gap-1 py-1 sm:gap-2">
          {links.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-3.5 py-2 text-[0.88rem] font-semibold transition-colors ${
                  active ? "text-red" : "text-ink hover:text-blue"
                }`}
              >
                {item.label}
                {active && (
                  <span aria-hidden className="absolute inset-x-3 -bottom-1 h-0.5 bg-red" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {open && (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-line bg-cream shadow-xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="wrap flex flex-col px-4 py-4 sm:px-6">
            <div className="flex flex-col divide-y divide-line/60">
              {links.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3 text-[0.95rem] font-semibold transition-colors ${
                      active
                        ? "text-red font-bold"
                        : "text-ink hover:text-blue"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Colaborar en móvil */}
            <div className="mt-4 pt-4 border-t border-line">
              <Link
                to="/colaborar"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-sm bg-red px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-warm-white shadow-sm transition-colors hover:bg-red-deep active:bg-red-deep"
              >
                {t.common.nav.collaborate}
              </Link>
            </div>

            {/* Selector de idioma en móvil (cuando no cabe arriba) */}
            <div className="mt-4 pt-4 border-t border-line flex flex-col items-center gap-2 sm:hidden">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
                Idioma / Language / Lingua
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

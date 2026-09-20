import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useI18n } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import InstitutionAccordion from "@/components/layout/InstitutionAccordion";
import { getNavigationData, type InstitutionId } from "@/data/navigationData";
import { Menu, X, ChevronDown } from "lucide-react";

/**
 * Cabecera institucional responsive.
 * En reposo dejo los escudos y el título equilibrados al centro.
 * Al scrollear, la compacto pasando logos y nombre arriba junto al idioma y colaborar,
 * para achicar la altura sin perder presencia.
 * También le sumo el fondo oscurecido (backdrop) al abrir el megamenú.
 */

export default function Header() {
  const { locale, t } = useI18n();
  const { pathname } = useLocation();

  // Guardo si el usuario scrolleó en la página para compactar la barra
  const [scrolled, setScrolled] = useState(false);

  // Guardo qué institución está abierta en el megamenú (school, parish, garden)
  const [activeInstitution, setActiveInstitution] = useState<InstitutionId | null>(null);

  // Estado para abrir o cerrar el menú hamburguesa en celulares
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Referencias para calcular dónde termina la barra y detectar clics afuera para cerrar
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuCardRef = useRef<HTMLDivElement>(null);
  const [headerBottom, setHeaderBottom] = useState(130);

  // Cargo los datos de las tres instituciones según el idioma actual
  const navData = getNavigationData(locale);

  // Calculo la posición exacta donde termina el header para arrancar el sombreado justo ahí abajo
  useEffect(() => {
    const updateHeaderBottom = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setHeaderBottom(rect.bottom);
      } else if (headerRef.current) {
        setHeaderBottom(headerRef.current.offsetHeight);
      }
    };
    updateHeaderBottom();
    window.addEventListener("scroll", updateHeaderBottom, { passive: true });
    window.addEventListener("resize", updateHeaderBottom);
    return () => {
      window.removeEventListener("scroll", updateHeaderBottom);
      window.removeEventListener("resize", updateHeaderBottom);
    };
  }, [scrolled, activeInstitution]);

  // Armo las solapas de las tres instituciones para la barra de navegación
  const institutions: Array<{ id: InstitutionId; label: string; shortLabel: string }> = [
    {
      id: "parish",
      label: navData.parish.label,
      shortLabel: navData.parish.shortLabel,
    },
    {
      id: "garden",
      label: navData.garden.label,
      shortLabel: navData.garden.shortLabel,
    },
    {
      id: "school",
      label: navData.school.label,
      shortLabel: navData.school.shortLabel,
    },
  ];

  // Enlaces directos a las páginas principales para que arranquen desde su hero
  const directLinks = [
    { href: "/historia", label: t.common.nav.history },
    { href: "/proyectos", label: t.common.nav.projects },
    { href: "/galeria", label: t.common.nav.gallery },
    { href: "/contacto", label: t.common.nav.contact },
  ];

  // Manejo la compactación con un rango de histéresis para que no tironee ni parpadee al scrollear
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Al bajar, compacto después de los 85px
      if (y > 85) {
        setScrolled(true);
      }
      // Al subir, recién agrando cuando llega bien arriba (< 15px)
      else if (y < 15) {
        setScrolled(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al cambiar de ruta cierro cualquier menú que haya quedado abierto
  useEffect(() => {
    setActiveInstitution(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Bloqueo el scroll del fondo mientras el menú móvil esté abierto para que no se mueva la página atrás
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Si hacen clic afuera de la tarjeta del megamenú o de las solapas en escritorio, lo cierro
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // En celu el megamenú vive adentro del panel; este detector solo lo uso para el flotante de escritorio
      if (mobileMenuOpen || window.innerWidth < 1024) {
        return;
      }

      const target = event.target as Node;
      if (activeInstitution) {
        const clickedCard = menuCardRef.current?.contains(target);
        const clickedNav = navRef.current?.contains(target);
        // Si el clic cayó afuera de la tarjeta y de las solapas, cierro el megamenú
        if (!clickedCard && !clickedNav) {
          setActiveInstitution(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeInstitution, mobileMenuOpen]);

  // Alterno la apertura o cierre del desplegable de la institución cliqueada
  const handleTabClick = (id: InstitutionId) => {
    setActiveInstitution((prev) => (prev === id ? null : id));
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-[#fffdfa] transition-all duration-300 border-b ${
        scrolled ? "border-line shadow-header" : "border-line/70"
      }`}
    >
      {/* ------------------------------------------------------------
          1. Fila superior:
             En reposo: Lema o mensaje institucional a la izquierda.
             En scroll: Logos compactos y nombre institucional a la izquierda.
             A la derecha: Selector de idiomas y botón CÓMO COLABORAR.
          ------------------------------------------------------------ */}
      <div className="relative z-50 border-b border-line/50 bg-[#faf7f0]/90">
        <div className="wrap flex items-center justify-between py-1.5 sm:py-2">
          
          {/* Lado izquierdo: en desktop cambia dinámicamente al scrollear; en móvil se mantiene limpio porque los logos quedan abajo */}
          {scrolled ? (
            /* Versión compacta al scrollear: solo visible en desktop (lg:flex), en celular los logos no suben y quedan en su hilera */
            <Link
              to="/"
              className="hidden lg:flex items-center gap-2 sm:gap-2.5 group transition-all animate-in fade-in duration-200"
              onClick={() => setActiveInstitution(null)}
              title="Ir al inicio"
            >
              {/* Escudo Parroquia (izquierda) */}
              <img
                src="/images/logo-parroquia.webp"
                alt="Parroquia San Francisco de Asís"
                className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105 shrink-0"
              />

              {/* Nombre institucional (centro) */}
              <span className="font-serif text-xs sm:text-sm font-bold text-blue-deep group-hover:text-red transition-colors truncate">
                {t.common.names.parish}
              </span>

              {/* Escudo Colegio (derecha) */}
              <img
                src="/images/logo-colegio.webp"
                alt="Colegio Sagrada Familia de Nazareth"
                className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105 shrink-0"
              />
            </Link>
          ) : (
            /* Versión en reposo: lema institucional traducido */
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
              <span>
                {locale === "en"
                  ? "Parish & Educational Community"
                  : locale === "it"
                  ? "Comunità Parrocchiale ed Educativa"
                  : "Comunidad Parroquial y Educativa"}
              </span>
            </div>
          )}

          {/* Lado derecho: Selector de idiomas, botón de colaboración y menú móvil */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 ml-auto">
            <LanguageSwitcher />

            <Link
              to="/colaborar"
              className="inline-flex items-center justify-center rounded-sm bg-[#A50F2D] px-3.5 py-1.5 text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all hover:bg-red-deep active:scale-[0.98]"
            >
              {locale === "en"
                ? "Support Us"
                : locale === "it"
                ? "Come collaborare"
                : "Cómo colaborar"}
            </Link>

            {/* Toggle de menú móvil */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.common.closeMenu : t.common.openMenu}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line bg-white text-ink lg:hidden transition-colors hover:border-red hover:text-red"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------
          2. Fila de identidad institucional central:
             Escudo Parroquia (Izq) | Título central | Escudo Colegio (Der)
             En desktop al scrollear se contrae suavemente a altura cero.
             En celular se mantiene fija y visible para que no pegue saltos ni suba a la barra de arriba.
          ------------------------------------------------------------ */}
      <div
        className={`relative z-50 wrap transition-all duration-300 ease-in-out ${
          scrolled
            ? "lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:py-0 lg:pointer-events-none max-h-36 opacity-100 py-2 sm:py-2.5"
            : "max-h-36 opacity-100 py-2 sm:py-2.5"
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Escudo Parroquia San Francisco de Asís (Extremo izquierdo) */}
          <Link
            to="/"
            className="shrink-0 transition-transform hover:scale-105"
            title="Parroquia San Francisco de Asís"
            onClick={() => setActiveInstitution(null)}
          >
            <img
              src="/images/logo-parroquia.webp"
              alt="Escudo Parroquia San Francisco de Asís"
              className="h-10 w-auto max-w-[40px] sm:h-12 sm:max-w-[48px] md:h-14 md:max-w-[56px] object-contain"
            />
          </Link>

          {/* Nombre institucional centrado con tipografía proporcionada */}
          <Link
            to="/"
            className="flex flex-1 flex-col items-center text-center px-1 group"
            onClick={() => setActiveInstitution(null)}
          >
            <h1 className="font-serif text-base sm:text-xl md:text-2xl font-bold text-blue-deep leading-tight transition-colors group-hover:text-red">
              {t.common.names.parish}
            </h1>
            <p className="mt-0.5 text-[0.62rem] sm:text-[0.72rem] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-ink-soft">
              {t.common.locationLine}
            </p>
          </Link>

          {/* Escudo Colegio Sagrada Familia de Nazareth (Extremo derecho) */}
          <Link
            to="/"
            className="shrink-0 transition-transform hover:scale-105"
            title="Colegio Parroquial Sagrada Familia de Nazareth"
            onClick={() => setActiveInstitution(null)}
          >
            <img
              src="/images/logo-colegio.webp"
              alt="Escudo Colegio Sagrada Familia de Nazareth"
              className="h-10 w-auto max-w-[40px] sm:h-12 sm:max-w-[48px] md:h-14 md:max-w-[56px] object-contain"
            />
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------
          3. Barra de navegación principal en escritorio (desplegables y páginas directas)
          ------------------------------------------------------------ */}
      <nav
        ref={navRef}
        aria-label="Navegación institucional"
        className="relative z-50 border-t border-line/70 bg-cream/90 lg:block hidden"
      >
        <div className="wrap flex items-center justify-center gap-1 sm:gap-2 flex-nowrap">
          {/* Solapas de las instituciones con su flechita y megamenú */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {institutions.map((inst) => {
              const isTabActive = activeInstitution === inst.id;

              return (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => handleTabClick(inst.id)}
                  aria-expanded={isTabActive}
                  className={`group relative inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isTabActive
                      ? "text-[#A50F2D] font-bold"
                      : "text-ink hover:text-[#A50F2D]"
                  }`}
                >
                  <span>{inst.shortLabel}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isTabActive
                        ? "rotate-180 text-[#A50F2D]"
                        : "text-ink-soft group-hover:text-[#A50F2D]"
                    }`}
                  />
                  {/* Indicador inferior en rojo imperial cuando la solapa está activa */}
                  {isTabActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-[1px] h-0.5 bg-[#A50F2D] animate-in fade-in duration-150"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Separador vertical sutil entre desplegables y links directos */}
          <div className="h-4 w-px bg-line/80 mx-1 sm:mx-2" aria-hidden="true" />

          {/* Enlaces directos a páginas con hero propio (Historia, Proyectos, Galería, Contacto) */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {directLinks.map((link) => {
              const isLinkActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setActiveInstitution(null)}
                  className={`relative px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isLinkActive
                      ? "text-[#A50F2D] font-bold"
                      : "text-ink hover:text-[#A50F2D]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Indicador inferior en rojo imperial si la ruta está activa */}
                  {isLinkActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-[1px] h-0.5 bg-[#A50F2D] animate-in fade-in duration-150"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------------
          4. Megamenú desplegable con fondo sombreado (Desktop)
          ------------------------------------------------------------ */}
      {activeInstitution && (
        <>
          {/* Fondo oscuro que arranca justo abajo del header para no tapar los logos ni el título */}
          <div
            className="hidden lg:block fixed inset-x-0 bottom-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity animate-in fade-in duration-200"
            style={{ top: `${headerBottom}px` }}
            onClick={() => setActiveInstitution(null)}
            aria-hidden="true"
          />

          {/* Tarjeta flotante del megamenú con z-50 sobre el sombreado */}
          <div className="hidden lg:block absolute left-0 right-0 top-full z-50 px-4 pt-2.5 pb-6 bg-transparent pointer-events-none animate-in fade-in slide-in-from-top-1 duration-150">
            <div ref={menuCardRef} className="w-full max-w-5xl mx-auto pointer-events-auto">
              <InstitutionAccordion
                key={activeInstitution}
                institution={navData[activeInstitution]}
                onClose={() => setActiveInstitution(null)}
              />
            </div>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------
          5. Menú móvil (Responsive para celulares y tablets)
          ------------------------------------------------------------ */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-line bg-[#FAF7F2] shadow-2xl lg:hidden max-h-[calc(100dvh-75px)] overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="wrap py-4 space-y-4">
            
            {/* Lista de instituciones con su acordeón integrado en la misma botonera */}
            <div className="space-y-2.5">
              <span className="block px-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
                {locale === "en"
                  ? "Select an institution"
                  : locale === "it"
                  ? "Seleziona un'istituzione"
                  : "Seleccioná una institución"}
              </span>

              <div className="space-y-2">
                {institutions.map((inst) => {
                  const isTabActive = activeInstitution === inst.id;

                  return (
                    <div key={inst.id} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => handleTabClick(inst.id)}
                        aria-expanded={isTabActive}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-bold transition-all shadow-xs ${
                          isTabActive
                            ? "bg-[#A50F2D] text-white ring-2 ring-[#A50F2D]/20"
                            : "bg-white text-ink border border-line hover:border-[#A50F2D] hover:text-[#A50F2D] active:bg-cream"
                        }`}
                      >
                        <span className="text-left font-serif leading-snug">{inst.shortLabel}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 ml-2 transition-transform duration-200 ${
                            isTabActive ? "rotate-180 text-white" : "text-[#A50F2D]"
                          }`}
                        />
                      </button>

                      {/* Si está abierta, despliego su acordeón justo abajo de su propio botón */}
                      {isTabActive && (
                        <div className="pt-1 pb-1 animate-in fade-in duration-150">
                          <InstitutionAccordion
                            key={inst.id}
                            institution={navData[inst.id]}
                            onClose={() => {
                              setActiveInstitution(null);
                              setMobileMenuOpen(false);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enlaces directos en móvil (los mismos 4 que en escritorio) */}
            <div className="pt-3 border-t border-line/70 space-y-2">
              <span className="block px-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
                {locale === "en"
                  ? "Direct Navigation"
                  : locale === "it"
                  ? "Navigazione diretta"
                  : "Navegación directa"}
              </span>

              <div className="grid grid-cols-2 gap-2">
                {directLinks.map((link) => {
                  const isLinkActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all border ${
                        isLinkActive
                          ? "bg-[#A50F2D] text-white border-[#A50F2D] font-bold shadow-xs"
                          : "bg-white text-ink border-line hover:border-[#A50F2D] hover:text-[#A50F2D] active:bg-cream"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span
                        className={`text-[0.7rem] ${
                          isLinkActive ? "text-white/80" : "text-ink-soft"
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Botón Colaborar en móvil */}
            <div className="pt-1">
              <Link
                to="/colaborar"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-sm bg-[#A50F2D] py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-colors hover:bg-red-deep active:scale-[0.99]"
              >
                {locale === "en"
                  ? "Support Us"
                  : locale === "it"
                  ? "Come collaborare"
                  : "Cómo colaborar"}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

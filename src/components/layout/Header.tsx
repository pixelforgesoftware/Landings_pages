import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useI18n } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import InstitutionAccordion from "@/components/layout/InstitutionAccordion";
import { getNavigationData, type InstitutionId } from "@/data/navigationData";
import { Menu, X, ChevronDown, Home } from "lucide-react";
import { scrollToTop, handleNavClick } from "@/utils/scroll";

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

  // La cabecera se compacta si el usuario scrolleó hacia abajo O si tiene un megamenú abierto
  const isCompact = scrolled || activeInstitution !== null;

  // Estado para abrir o cerrar el menú hamburguesa en celulares
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Referencias para calcular dónde termina la barra y detectar clics afuera para cerrar
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuCardRef = useRef<HTMLDivElement>(null);
  const [headerBottom, setHeaderBottom] = useState(130);

  // Cargo los datos de las tres instituciones según el idioma actual
  const navData = getNavigationData(locale);

  // Destinos para los escudos y títulos:
  // El logo de la izquierda y el título de la Parroquia siempre llevan a "/parroquia" (y hacen scroll al tope si ya estás allí)
  const parishLogoHref = "/parroquia";
  const parishTitleHref = "/parroquia";
  const schoolLogoHref = "/colegio";

  // Calculo la posición exacta donde termina el header para arrancar el sombreado justo ahí abajo cuando se abre el megamenú
  useEffect(() => {
    if (!activeInstitution) return;

    const updateHeaderBottom = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setHeaderBottom(rect.bottom);
      } else if (headerRef.current) {
        setHeaderBottom(headerRef.current.offsetHeight);
      }
    };
    updateHeaderBottom();
    // Vuelvo a medir tras 320ms para sincronizar con la animación CSS de colapso de 300ms
    const timer = setTimeout(updateHeaderBottom, 320);
    window.addEventListener("resize", updateHeaderBottom);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeaderBottom);
    };
  }, [activeInstitution, isCompact]);

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

  // Manejo la compactación con detección direccional e histéresis amplia para evitar rebotes o saltos
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const scrollingDown = y > lastY;
          lastY = y;

          // Al bajar, se compacta recién cuando el usuario pasó la zona de los escudos (> 150px)
          if (scrollingDown && y > 150) {
            setScrolled(true);
          }
          // Al subir, recién se vuelve a desplegar cuando el usuario llega arriba de todo (< 30px)
          else if (!scrollingDown && y < 30) {
            setScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al cambiar de ruta cierro cualquier menú que haya quedado abierto y restauro la cabecera
  useEffect(() => {
    setActiveInstitution(null);
    setMobileMenuOpen(false);
    setScrolled(false);
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
    // Si el usuario ya está en la página de esta institución y scrolleó, scrolleamos hasta arriba del todo
    const isCurrentPage =
      (id === "parish" && pathname === "/parroquia") ||
      (id === "school" && pathname === "/colegio") ||
      (id === "garden" && pathname === "/jardin");

    if (isCurrentPage) {
      scrollToTop(true);
    }
    setActiveInstitution((prev) => (prev === id ? null : id));
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-[#fffdfa] transition-all duration-300 border-b ${
        isCompact ? "border-line shadow-header" : "border-line/70"
      }`}
    >
      {/* ------------------------------------------------------------
          1. Fila superior:
             En reposo: Lema o mensaje institucional a la izquierda.
             En scroll o con megamenú: Logos compactos y nombre institucional a la izquierda.
             A la derecha: Selector de idiomas y botón CÓMO COLABORAR.
          ------------------------------------------------------------ */}
      <div className="relative z-50 border-b border-line/50 bg-[#faf7f0]/90">
        <div className="wrap flex items-center justify-between py-1.5 sm:py-2">
          
          {/* Lado izquierdo: Botón [ ⌂ ] en móvil / [ ⌂ Inicio ] en tablet y desktop + lema o logos al scrollear */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Botoncito Inicio: solo casita en celular, texto completo desde sm */}
            <Link
              to="/"
              onClick={() => {
                handleNavClick("/", pathname, () => setActiveInstitution(null));
              }}
              className="inline-flex items-center gap-1.5 rounded-sm p-1.5 sm:px-2.5 sm:py-1 text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.14em] text-blue-deep hover:bg-gold/15 hover:text-red transition-all active:scale-[0.98]"
              title={t.common.nav.home}
              aria-label={t.common.nav.home}
            >
              <Home size={16} className="text-[#A50F2D] shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{t.common.nav.home}</span>
            </Link>

            {/* Separador vertical tenue (solo desde md) */}
            <span className="hidden md:inline-block h-3.5 w-px bg-line/80" aria-hidden="true" />

            {isCompact ? (
              /* Versión compacta al scrollear o con megamenú abierto: solo visible en desktop (lg:flex) */
              <div className="hidden lg:flex items-center gap-2 sm:gap-2.5">
                <Link
                  to={parishLogoHref}
                  className="flex items-center gap-2 sm:gap-2.5 group transition-all animate-in fade-in duration-200"
                  onClick={() => {
                    handleNavClick(parishLogoHref, pathname, () => setActiveInstitution(null));
                  }}
                  title={pathname === "/parroquia" ? t.common.names.parish : "Ir a la Parroquia"}
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
                </Link>

                {/* Escudo Colegio (derecha) -> lleva a la página del colegio */}
                <Link
                  to={schoolLogoHref}
                  onClick={() => {
                    handleNavClick(schoolLogoHref, pathname, () => setActiveInstitution(null));
                  }}
                  title="Colegio Parroquial Sagrada Familia de Nazareth"
                  className="transition-transform hover:scale-105 shrink-0"
                >
                  <img
                    src="/images/logo-colegio.webp"
                    alt="Colegio Sagrada Familia de Nazareth"
                    className="h-7 sm:h-8 w-auto object-contain shrink-0"
                  />
                </Link>
              </div>
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
          </div>

          {/* Lado derecho: Selector de idiomas, botón de colaboración (oculto en móvil) y menú móvil */}
          <div className="flex items-center justify-end gap-2 sm:gap-3.5 ml-auto">
            <LanguageSwitcher />

            {/* En celular se oculta de la barra superior porque ya está dentro del menú hamburguesa */}
            <Link
              to="/colaborar"
              onClick={() => {
                handleNavClick("/colaborar", pathname, () => setActiveInstitution(null));
              }}
              className="hidden md:inline-flex items-center justify-center rounded-sm bg-[#A50F2D] px-3.5 py-1.5 text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all hover:bg-red-deep active:scale-[0.98]"
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line bg-white text-ink lg:hidden transition-colors hover:border-red hover:text-red shrink-0"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------
          2. Fila de identidad institucional central:
             Escudo Parroquia (Izq) | Título central | Escudo Colegio (Der)
             En reposo: escudos grandes agrupados al centro enmarcando el texto (según referencia del cliente).
             Al scrollear o al abrir un megamenú: se contrae suavemente a altura cero en desktop para ceder espacio.
             En celular: se mantiene visible y adaptable con tamaños optimizados para que nada se corte.
          ------------------------------------------------------------ */}
      <div
        className={`relative z-50 px-2 sm:px-6 transition-all duration-300 ease-in-out ${
          isCompact
            ? "lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:py-0 lg:pointer-events-none max-h-56 opacity-100 py-1.5 sm:py-2.5"
            : "max-h-56 opacity-100 py-2 sm:py-4 md:py-4.5"
        }`}
      >
        <div className="flex items-center justify-center gap-2 xs:gap-3.5 sm:gap-7 md:gap-10 lg:gap-12 mx-auto max-w-5xl">
          
          {/* Escudo Parroquia San Francisco de Asís (Izquierda) */}
          <Link
            to={parishLogoHref}
            className="shrink-0 transition-transform hover:scale-105"
            title="Parroquia San Francisco de Asís"
            onClick={() => {
              handleNavClick(parishLogoHref, pathname, () => setActiveInstitution(null));
            }}
          >
            <img
              src="/images/logo-parroquia.webp"
              alt="Escudo Parroquia San Francisco de Asís"
              className="h-10 xs:h-12 sm:h-18 md:h-22 lg:h-28 w-auto object-contain drop-shadow-xs shrink-0"
            />
          </Link>

          {/* Nombre institucional centrado con tipografía adaptable y sin desbordes */}
          <Link
            to={parishTitleHref}
            className="flex flex-col items-center text-center px-1 sm:px-2 group flex-1 min-w-0"
            onClick={() => {
              handleNavClick(parishTitleHref, pathname, () => setActiveInstitution(null));
            }}
          >
            <h1 className="font-serif text-[0.82rem] xs:text-base sm:text-2xl md:text-3xl lg:text-[2.1rem] font-bold text-blue-deep leading-tight transition-colors group-hover:text-red tracking-tight max-w-full">
              {t.common.names.parish}
            </h1>
            <p className="mt-0.5 sm:mt-1.5 text-[0.52rem] xs:text-[0.62rem] sm:text-[0.74rem] md:text-[0.82rem] font-semibold uppercase tracking-[0.06em] xs:tracking-[0.14em] sm:tracking-[0.25em] text-ink-soft truncate max-w-full">
              {t.common.locationLine}
            </p>
          </Link>

          {/* Escudo Colegio Sagrada Familia de Nazareth (Derecha) -> lleva a la página del colegio */}
          <Link
            to={schoolLogoHref}
            className="shrink-0 transition-transform hover:scale-105"
            title="Colegio Parroquial Sagrada Familia de Nazareth"
            onClick={() => {
              handleNavClick(schoolLogoHref, pathname, () => setActiveInstitution(null));
            }}
          >
            <img
              src="/images/logo-colegio.webp"
              alt="Escudo Colegio Sagrada Familia de Nazareth"
              className="h-10 xs:h-12 sm:h-18 md:h-22 lg:h-28 w-auto object-contain drop-shadow-xs shrink-0"
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
        <div className="wrap flex items-center justify-center gap-1 sm:gap-2 flex-nowrap py-0.5">
          {/* Solapas de las tres instituciones */}
          <div className="flex items-center gap-1 sm:gap-4">
            {institutions.map((inst) => {
              const isTabActive = activeInstitution === inst.id;

              return (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => handleTabClick(inst.id)}
                  aria-expanded={isTabActive}
                  className={`group relative inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer rounded-sm hover:bg-black/[0.03] ${
                    isTabActive
                      ? "text-[#A50F2D] font-bold"
                      : "text-ink hover:text-[#A50F2D]"
                  }`}
                >
                  <span>{inst.shortLabel}</span>
                  <ChevronDown
                    size={15}
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
            <div
              ref={menuCardRef}
              className="w-full max-w-5xl mx-auto pointer-events-auto max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-2xl shadow-2xl"
            >
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
            
            {/* Acceso directo a Inicio en menú móvil */}
            <div className="border-b border-line/60 pb-3">
              <Link
                to="/"
                onClick={() => {
                  handleNavClick("/", pathname, () => {
                    setActiveInstitution(null);
                    setMobileMenuOpen(false);
                  });
                }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg text-sm font-bold bg-white text-blue-deep border border-line hover:border-[#A50F2D] hover:text-[#A50F2D] transition-all shadow-xs"
              >
                <Home size={16} className="text-[#A50F2D]" />
                <span className="font-serif">{t.common.nav.home}</span>
              </Link>
            </div>

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



            {/* Botón Colaborar en móvil */}
            <div className="pt-1">
              <Link
                to="/colaborar"
                onClick={() => {
                  handleNavClick("/colaborar", pathname, () => {
                    setActiveInstitution(null);
                    setMobileMenuOpen(false);
                  });
                }}
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

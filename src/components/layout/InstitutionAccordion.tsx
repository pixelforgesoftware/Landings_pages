import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { InstitutionNavData } from "@/data/navigationData";
import {
  GraduationCap,
  Users,
  Wrench,
  BookOpen,
  Heart,
  Camera,
  Mail,
  Clock,
  Church,
  Baby,
  Eye,
  ChevronDown,
} from "lucide-react";

interface InstitutionAccordionProps {
  institution: InstitutionNavData;
  onClose: () => void;
}

// Asocio cada nombre de ícono que viene de los datos con su componente de Lucide
const ICON_MAP = {
  GraduationCap,
  Users,
  Wrench,
  BookOpen,
  Heart,
  Camera,
  Mail,
  Clock,
  Church,
  Baby,
};

export default function InstitutionAccordion({
  institution,
  onClose,
}: InstitutionAccordionProps) {
  // Arranco con todos los acordeones plegados (null) para que el usuario elija cuál abrir
  const [openId, setOpenId] = useState<string | null>(null);

  // Si cambia la institución seleccionada, me aseguro de resetear y arrancar con todo plegado
  useEffect(() => {
    setOpenId(null);
  }, [institution.id]);

  // Abro o cierro el acordeón que toque el usuario
  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* Tarjeta contenedora sin cabeceras extras para que quede limpia y directa */}
      <div className="overflow-hidden rounded-2xl border border-red/25 bg-white shadow-2xl transition-all">
        
        {/* Lista de acordeones interactivos */}
        <div className="divide-y divide-line/50">
          {institution.accordions.map((accordion) => {
            const isOpen = openId === accordion.id;
            const IconComponent = ICON_MAP[accordion.iconName] || Users;

            return (
              <div key={accordion.id} className="transition-colors">
                {/* Cabecera de cada ítem con el ícono, título y flechita */}
                <button
                  type="button"
                  onClick={() => handleToggle(accordion.id)}
                  aria-expanded={isOpen}
                  className={`w-full flex items-center justify-between px-4 py-2.5 sm:px-5 transition-colors text-left ${
                    isOpen
                      ? "bg-[#A50F2D] text-white"
                      : "bg-white hover:bg-cream/70 text-ink"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                        isOpen
                          ? "bg-white/20 text-white"
                          : "bg-red-soft text-[#A50F2D]"
                      }`}
                    >
                      <IconComponent size={16} />
                    </div>
                    <div className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                      <span
                        className={`block text-[0.88rem] sm:text-[0.92rem] font-bold leading-tight ${
                          isOpen ? "text-white" : "text-[#A50F2D]"
                        }`}
                      >
                        {accordion.title}
                      </span>
                      {accordion.subtitle && (
                        <span
                          className={`text-[0.72rem] sm:text-xs leading-tight mt-0.5 sm:mt-0 ${
                            isOpen ? "text-white/80" : "text-ink-soft font-normal"
                          }`}
                        >
                          {accordion.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Flechita con rotación suave y acento en rojo imperial */}
                  <ChevronDown
                    size={18}
                    className={`ml-2 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : "text-[#A50F2D]"
                    }`}
                  />
                </button>

                {/* Contenido desplegable del acordeón */}
                {isOpen && (
                  <div className="bg-white px-3.5 py-4 sm:px-5 sm:py-4 border-t border-line/40 animate-in fade-in duration-150">
                    {/* Caso 1: Vista Quiénes somos con 4 columnas (reseña, visión, misión y valores) */}
                    {accordion.overview ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 divide-y md:divide-y-0 md:divide-x divide-line/60">
                        {/* Columna 1: Reseña general y botón para ir a la página principal */}
                        <div className="flex flex-col justify-between pb-4 md:pb-0 md:pr-3">
                          <p className="text-xs leading-relaxed text-ink text-center md:text-left">
                            {accordion.overview.intro}
                          </p>
                          <div className="mt-3.5 pt-1 flex justify-center md:justify-start">
                            <Link
                              to={accordion.overview.actionLink.href}
                              onClick={onClose}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-sm bg-[#A50F2D] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-deep active:bg-red-deep"
                            >
                              <span>{accordion.overview.actionLink.label}</span>
                            </Link>
                          </div>
                        </div>

                        {/* Columna 2: Visión con ícono de ojo */}
                        <div className="flex flex-col items-center text-center py-4 md:py-0 md:px-3">
                          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-soft text-[#A50F2D]">
                            <Eye size={16} />
                          </div>
                          <h4 className="text-xs font-bold text-[#A50F2D] mb-1">
                            {accordion.overview.vision.title}
                          </h4>
                          <p className="text-[0.76rem] leading-snug text-ink-soft max-w-xs">
                            {accordion.overview.vision.text}
                          </p>
                        </div>

                        {/* Columna 3: Misión con ícono de corazón */}
                        <div className="flex flex-col items-center text-center py-4 md:py-0 md:px-3">
                          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-soft text-[#A50F2D]">
                            <Heart size={16} />
                          </div>
                          <h4 className="text-xs font-bold text-[#A50F2D] mb-1">
                            {accordion.overview.mision.title}
                          </h4>
                          <p className="text-[0.76rem] leading-snug text-ink-soft max-w-xs">
                            {accordion.overview.mision.text}
                          </p>
                        </div>

                        {/* Columna 4: Valores en pastillas redondeadas */}
                        <div className="flex flex-col items-center text-center pt-4 md:pt-0 md:pl-3">
                          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-soft text-[#A50F2D]">
                            <Users size={16} />
                          </div>
                          <h4 className="text-xs font-bold text-[#A50F2D] mb-2">
                            {accordion.overview.valores.title}
                          </h4>
                          <div className="flex flex-wrap justify-center gap-1.5 max-w-xs">
                            {accordion.overview.valores.items.map((val) => (
                              <span
                                key={val}
                                className="inline-block rounded-full bg-red-soft/80 border border-red/20 px-2.5 py-0.5 text-[0.72rem] font-semibold text-[#A50F2D]"
                              >
                                {val}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : accordion.items ? (
                      /* Caso 2: Acordeón con tarjetas informativas en cuadrícula */
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                          {accordion.items.map((item, i) => (
                            <div
                              key={i}
                              className="rounded-md border border-line/70 bg-cream/50 p-3 transition-colors hover:border-gold/60 hover:bg-cream text-left"
                            >
                              <h5 className="font-bold text-xs text-blue-deep mb-1">
                                {item.title}
                              </h5>
                              <p className="text-[0.74rem] leading-relaxed text-ink-soft">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Botón de acción para ir a la sección o página correspondiente */}
                        {accordion.actionLink && (
                          <div className="mt-3.5 pt-3 border-t border-line/60 flex justify-center sm:justify-end">
                            <Link
                              to={accordion.actionLink.href}
                              onClick={onClose}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-sm bg-[#A50F2D] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-deep active:bg-red-deep text-center"
                            >
                              <span>{accordion.actionLink.label}</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

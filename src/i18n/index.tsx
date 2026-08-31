import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { es, type Dict } from "./es";
import { en } from "./en";
import { it } from "./it";

/**
 * Tipos y diccionarios de internacionalización soportados (ES / EN / IT).
 */
export type Locale = "es" | "en" | "it";
export const LOCALES: readonly Locale[] = ["es", "en", "it"];

const DICTS: Record<Locale, Dict> = { es, en, it };
const STORAGE_KEY = "psfa-locale";

interface I18nValue {
  locale: Locale;
  t: Dict;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Proveedor principal de internacionalización con persistencia en localStorage.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en" || saved === "it") {
        setLocaleState(saved);
      }
    } catch {
      // Fallback al idioma por defecto si localStorage está restringido
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: DICTS[locale],
      setLocale: (next: Locale) => {
        setLocaleState(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Ignorar error si almacenamiento local no está disponible
        }
      },
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Hook para acceder a las traducciones y al idioma activo.
 */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n debe usarse dentro de un <I18nProvider>");
  }
  return ctx;
}

/**
 * Hook auxiliar para sincronizar el título del documento (document.title).
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }
  }, [title]);
}

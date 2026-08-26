import { useI18n } from "@/i18n";
import { IconImage, IconPlan } from "./icons";

/**
 * Espacio reservado para fotografías y planos en espera de recursos multimedia oficiales.
 */

interface ImagePlaceholderProps {
  /** Descripción accesible y visible de la imagen esperada. */
  label: string;
  /** Clases de tamaño / proporción (ej: "aspect-[4/3] w-full"). */
  className?: string;
  /** Variante de tono para fondos claros u oscuros. */
  tone?: "light" | "dark";
  /** Tipo de recurso esperado. */
  kind?: "photo" | "plan";
}

export default function ImagePlaceholder({
  label,
  className = "",
  tone = "light",
  kind = "photo",
}: ImagePlaceholderProps) {
  const { t } = useI18n();
  const dark = tone === "dark";
  const Icon = kind === "plan" ? IconPlan : IconImage;

  return (
    <figure
      role="img"
      aria-label={`${label} — ${t.common.imagePendingAria}`}
      className={`pattern-cross relative flex items-center justify-center overflow-hidden border ${
        dark
          ? "border-warm-white/20 bg-blue-deep/60"
          : "border-line bg-gradient-to-br from-cream to-gold-soft/60"
      } ${className}`}
    >
      <div className="flex max-w-[90%] flex-col items-center gap-2.5 px-4 py-6 text-center">
        <span
          aria-hidden
          className={`flex h-10 w-10 items-center justify-center rounded-full border ${
            dark ? "border-gold-bright/50 text-gold-bright" : "border-gold/50 text-gold"
          }`}
        >
          <Icon size={19} />
        </span>
        <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${dark ? "text-gold-bright" : "text-gold"}`}>
          {t.common.pendingImage}
        </p>
        <figcaption
          className={`font-serif text-sm italic leading-snug line-clamp-3 ${
            dark ? "text-cream/90" : "text-ink-soft"
          }`}
        >
          {label}
        </figcaption>
      </div>
    </figure>
  );
}

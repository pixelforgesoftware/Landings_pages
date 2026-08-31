import { IconCross } from "./icons";

/**
 * Espacio reservado para los logos e insignias institucionales.
 */

interface LogoPlaceholderProps {
  /** Texto accesible y tooltip descriptivo del logo. */
  label: string;
  /** Clases utilitarias de tamaño (ancho y alto). */
  className?: string;
  /** Variante de color según el fondo (claro u oscuro). */
  tone?: "light" | "dark";
}

export default function LogoPlaceholder({
  label,
  className = "h-11 w-11",
  tone = "light",
}: LogoPlaceholderProps) {
  const dark = tone === "dark";
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={`flex shrink-0 items-center justify-center border shadow-xs transition-colors ${
        dark
          ? "border-gold-bright/70 bg-gold-soft/15 text-gold-bright"
          : "border-gold/70 bg-gold-soft/40 text-gold"
      } ${className}`}
    >
      <IconCross size={16} />
    </span>
  );
}

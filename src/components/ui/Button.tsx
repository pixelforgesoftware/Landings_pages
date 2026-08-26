import { Link } from "react-router-dom";
import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * Componente de botón y enlace reutilizable con variantes institucionales.
 */

type Variant = "primary" | "secondary" | "gold" | "white" | "link";
type Size = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-red text-warm-white hover:bg-red-deep active:bg-red-deep shadow-sm border border-red-deep/40",
  secondary:
    "bg-transparent text-blue border border-blue/45 hover:bg-blue hover:text-warm-white active:bg-blue-deep",
  gold: "bg-gold text-blue-deep hover:bg-gold-bright active:bg-gold border border-gold-bright/60 shadow-sm",
  white:
    "bg-warm-white text-red hover:bg-cream active:bg-paper hover:text-red-deep shadow-sm border border-warm-white",
  link: "bg-transparent text-blue hover:text-red underline decoration-gold/70 underline-offset-4 p-0",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem] min-h-[44px]",
  lg: "px-7 py-3.5 text-base min-h-[50px]",
};

export default function Button({
  children,
  href,
  external = false,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-sm font-semibold",
    "transition-colors duration-200 select-none cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
    variant !== "link" && SIZES[size],
    VARIANTS[variant],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}

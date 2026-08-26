/**
 * Iconografía SVG del sistema.
 * Componentes vectoriales nativos optimizados para mantener el bundle ligero.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function IconCross(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v18M6.5 8.5h11" />
    </svg>
  );
}

export function IconImage(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M3.5 17.5 9 13l3.5 3 3-2.5 5 4" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.5-4.4a8.5 8.5 0 1 1 15.5-4.6Z" />
      <path d="M9.3 9.2c.3-.8.7-.8 1-.8l.6.1c.2.1.4.5.5.8l.5 1.1c.1.2 0 .5-.2.7l-.4.5c-.2.2-.2.4 0 .7.5.8 1.3 1.5 2.2 2 .3.2.5.1.7-.1l.4-.5c.2-.3.5-.3.7-.2l1.2.6c.3.1.6.3.6.6 0 .6-.4 1.6-1.7 1.8-2.9.4-6.4-2.3-7.3-5.3-.3-1.2.7-2.1 1.2-2Z" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.2 3.4 5.2 3.4 8.5s-1.1 6.3-3.4 8.5c-2.3-2.2-3.4-5.2-3.4-8.5s1.1-6.3 3.4-8.5Z" />
    </svg>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="9" y="9" width="11" height="11" rx="1.5" />
      <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function IconChurch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5v3M10.5 4h3" />
      <path d="m6 12 6-4.5L18 12v8.5H6Z" />
      <path d="M4 20.5h16M10.5 20.5v-4a1.5 1.5 0 0 1 3 0v4" />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.5.5-8 2Z" />
      <path d="M12 6.5v14" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c.5-3.5 2.8-5.5 5.5-5.5s5 2 5.5 5.5" />
      <path d="M15.5 5.7a3 3 0 1 1 .2 5.7M16.5 14.2c2.2.5 3.6 2.3 4 5.3" />
    </svg>
  );
}

export function IconHeart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20s-7.5-4.7-7.5-10A4.2 4.2 0 0 1 8.8 5.7c1.4 0 2.6.7 3.2 1.8.6-1.1 1.8-1.8 3.2-1.8a4.2 4.2 0 0 1 4.3 4.3c0 5.3-7.5 10-7.5 10Z" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconPlan(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M8 20.5v-6.5H3.5M20.5 8H14V3.5M14 14l3.5 3.5" />
    </svg>
  );
}

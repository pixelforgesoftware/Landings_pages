import Button from "./Button";
import { IconMail, IconWhatsApp } from "./icons";

/**
 * Tarjeta para canales de contacto directo (WhatsApp o correo electrónico).
 */

interface ContactCardProps {
  kind: "whatsapp" | "mail";
  title: string;
  value: string;
  actionLabel: string;
  href: string;
  external?: boolean;
}

export default function ContactCard({
  kind,
  title,
  value,
  actionLabel,
  href,
  external = false,
}: ContactCardProps) {
  const Icon = kind === "whatsapp" ? IconWhatsApp : IconMail;
  return (
    <div className="flex h-full flex-col border border-line bg-cream p-6 transition-shadow hover:shadow-inst sm:p-7">
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold-soft/60 text-gold"
      >
        <Icon size={22} />
      </span>
      <h3 className="mt-4 font-serif text-xl font-bold text-blue-deep">{title}</h3>
      <p className="mt-2 break-all text-lg font-semibold text-ink">{value}</p>
      <div className="mt-auto pt-6">
        <Button href={href} external={external} variant="secondary">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

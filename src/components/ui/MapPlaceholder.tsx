import { useI18n } from "@/i18n";
import { IconMapPin } from "./icons";

/**
 * Componente reservado para la ubicación geográfica y dirección institucional.
 * TODO: Integrar iframe interactivo de Google Maps u OpenStreetMap.
 */

interface MapPlaceholderProps {
  label: string;
  addressLines: readonly string[];
  note: string;
}

export default function MapPlaceholder({ label, addressLines, note }: MapPlaceholderProps) {
  const { t } = useI18n();
  return (
    <div className="pattern-cross border border-line bg-gradient-to-br from-cream to-gold-soft/50">
      <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
        <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold">
          <IconMapPin size={20} />
        </span>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
          {t.common.mapPending}
        </p>
        <p className="font-serif text-sm italic text-ink-soft">{label}</p>
        <p className="mt-2 text-sm text-ink-soft">{note}</p>
      </div>
      <address className="border-t border-line bg-cream/80 px-4 py-3 text-center text-sm not-italic leading-relaxed text-ink">
        {addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
    </div>
  );
}

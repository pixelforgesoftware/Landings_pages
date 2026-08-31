import { useState } from "react";
import { IconMapPin } from "./icons";

/**
 * Componente de mapa interactivo con visor de OpenStreetMap y enlace a Google Maps.
 */

interface MapCardProps {
  label: string;
  addressLines: readonly string[];
  geo: {
    lat: number;
    lng: number;
    query: string;
    bbox: string;
  };
  buttonLabel?: string;
}

export default function MapPlaceholder({
  label,
  addressLines,
  geo,
  buttonLabel = "Ver en Google Maps",
}: MapCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(geo.query)}`;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${geo.bbox}&layer=mapnik&marker=${geo.lat},${geo.lng}`;

  return (
    <div className="overflow-hidden border border-line bg-warm-white shadow-inst transition-shadow hover:shadow-md">
      {/* Mapa interactivo */}
      <div className="relative aspect-[16/10] w-full bg-sand/30 sm:aspect-[16/9]">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-warm-white/90 p-4 text-center">
            <span
              aria-hidden
              className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full border border-gold/60 bg-warm-white text-gold"
            >
              <IconMapPin size={20} />
            </span>
            <p className="font-serif text-xs font-semibold text-blue-deep">Cargando mapa interactivo...</p>
          </div>
        )}
        <iframe
          title={label}
          src={embedUrl}
          loading="lazy"
          className={`h-full w-full border-0 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Información y botón de apertura en Google Maps */}
      <div className="border-t border-line/80 bg-gradient-to-br from-warm-white to-gold-soft/20 p-5 text-center sm:p-6">
        <p className="font-serif text-base font-bold text-blue-deep">{label}</p>
        <address className="mt-2 text-sm not-italic leading-relaxed text-ink-soft">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <div className="mt-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-gold/60 bg-warm-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-deep shadow-xs transition-all hover:border-gold hover:bg-gold-soft/50 hover:text-blue hover:shadow-sm active:translate-y-px"
          >
            <IconMapPin size={15} className="text-gold" />
            {buttonLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

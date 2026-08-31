/**
 * Grilla responsive para visualización de elementos de la galería.
 */

export interface GalleryItem {
  id: string;
  caption: string;
  categoryName: string;
  categoryId: string;
  src?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  if (items.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="group border border-line bg-cream transition-colors hover:border-gold/70 shadow-sm"
        >
          {item.src && (
            <div className="aspect-[4/3] w-full overflow-hidden border-b border-line bg-warm-white">
              <img
                src={item.src}
                alt={item.caption}
                className="h-full w-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex items-start justify-between gap-3 px-4 py-3.5">
            <p className="font-serif text-sm leading-snug text-ink">{item.caption}</p>
          </div>
          <p className="border-t border-line/70 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
            {item.categoryName}
          </p>
        </li>
      ))}
    </ul>
  );
}

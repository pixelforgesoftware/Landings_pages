/**
 * Grilla responsive para visualización de elementos de la galería.
 */

export interface GalleryItem {
  id: string;
  categoryName: string;
  categoryId: string;
  src?: string;
  caption?: string;
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
          className="group overflow-hidden rounded-sm border border-line bg-warm-white transition-all duration-300 hover:border-gold/80 hover:shadow-md"
        >
          {item.src && (
            <div className="aspect-[4/3] w-full overflow-hidden border-b border-line bg-cream">
              <img
                src={item.src}
                alt={item.categoryName}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex items-center justify-between px-4 py-3 bg-cream/40">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
              {item.categoryName}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-gold/50 transition-colors group-hover:bg-[#A50F2D]"
              aria-hidden
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

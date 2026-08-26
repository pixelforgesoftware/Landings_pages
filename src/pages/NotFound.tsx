/**
 * Vista para rutas no encontradas (código HTTP 404).
 */

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-3xl font-black text-blue-deep sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
        La página que buscás no existe o fue movida. Podés volver al inicio del sitio.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-[46px] items-center rounded-sm bg-red px-7 py-3 text-sm font-semibold text-warm-white transition-colors hover:bg-red-deep"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

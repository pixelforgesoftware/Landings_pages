/**
 * Componente raíz de la aplicación con enrutamiento y proveedor de internacionalización.
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { I18nProvider } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Parish from "@/pages/Parish";
import School from "@/pages/School";
import History from "@/pages/History";
import Projects from "@/pages/Projects";
import Gallery from "@/pages/Gallery";
import Collaborate from "@/pages/Collaborate";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* Enlace de accesibilidad para navegación por teclado */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-sm focus:bg-blue-deep focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-warm-white"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parroquia" element={<Parish />} />
            <Route path="/colegio" element={<School />} />
            <Route path="/historia" element={<History />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/colaborar" element={<Collaborate />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </I18nProvider>
  );
}

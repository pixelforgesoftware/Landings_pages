/**
 * Utilidades para manejo de scroll institucional suave y navegación fluida
 * tanto a anclas (#horarios, #niveles) como al inicio superior de cada página.
 */

export function scrollToTop(smooth: boolean = true) {
  if (typeof window === "undefined") return;

  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  } catch {
    window.scrollTo(0, 0);
  }

  if (!smooth) {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

/**
 * Maneja el clic en enlaces de navegación institucional.
 * Si el enlace apunta a la misma página donde el usuario ya se encuentra:
 *  - Si tiene ancla (#seccion), hace scroll suave hasta esa sección.
 *  - Si no tiene ancla, hace scroll suave hasta arriba del todo (top: 0).
 * Siempre ejecuta la función de callback posterior (por ejemplo, cerrar el megamenú).
 */
export function handleNavClick(
  href: string,
  currentPathname: string,
  onAfterClick?: () => void
) {
  if (typeof window === "undefined") return;

  onAfterClick?.();

  // Descomponemos la URL en ruta base y hash (ej: "/parroquia#horarios" -> "/parroquia" y "horarios")
  const [targetPathWithQuery, rawHash] = href.split("#");
  const targetPath = targetPathWithQuery.split("?")[0];

  // Si targetPath está vacío (ej: "#horarios"), la página destino es la actual
  const isSamePath = !targetPath || targetPath === currentPathname;

  if (isSamePath) {
    if (rawHash) {
      setTimeout(() => {
        const targetElement =
          document.getElementById(rawHash) ||
          document.querySelector(`#${CSS.escape(rawHash)}`);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        } else {
          scrollToTop(true);
        }
      }, 50);
    } else {
      scrollToTop(true);
    }
  }
}

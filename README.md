# Parroquia San Francisco de Asís — Sitio Institucional

Sitio web institucional multilingüe (ES / EN / IT) para la comunidad de **Real del Padre, San Rafael, Mendoza, Argentina**, conformada por:

- **Parroquia San Francisco de Asís**
- **Colegio Parroquial 242 Sagrada Familia de Nazareth**
- **Jardín Maternal JP-338 San Francisco de Asís**

---

## 🛠️ Stack Tecnológico

- **Vite + React 19** + **TypeScript**
- **React Router v7** para enrutamiento del lado del cliente
- **Tailwind CSS v4** con tokens de diseño institucional centralizados
- **Sistema de Internacionalización (i18n)** propio en `src/i18n/` (ES / EN / IT) con persistencia en `localStorage`
- **Vite SingleFile Plugin** para generación de bundle autocontenido en producción

---

## 📁 Estructura del Proyecto

```
src/
  components/
    donate/            # Información de transferencias y donaciones IOR
    forms/             # Formulario de contacto y colaboración
    gallery/           # Filtros y grilla de galería
    layout/            # Cabecera (Header) y Pie de página (Footer)
    ui/                # Componentes base (Button, ProjectCard, ImagePlaceholder, etc.)
  data/
    institution.ts     # Datos institucionales centralizados (contacto, horarios, cuentas)
  i18n/                # Diccionarios multilingües (es.ts, en.ts, it.ts) y contexto
  pages/               # Vistas principales (Home, Parish, School, History, Projects, etc.)
  App.tsx              # Configuración de rutas y layout principal
  index.css            # Estilos globales y tokens del tema Tailwind
  main.tsx             # Punto de entrada de la aplicación
```

---

## 📍 Guía de Mantenimiento de Datos

| Información | Archivo fuente | Referencia |
| :--- | :--- | :--- |
| **Teléfonos, correo y direcciones** | `src/data/institution.ts` | Objeto `CONTACT` |
| **Datos bancarios (IOR)** | `src/data/institution.ts` | Objeto `IOR_DONATION` |
| **Horarios de misa y colegio** | `src/data/institution.ts` | `MASS_TIMES` / `SCHOOL_HOURS` |
| **Estadísticas institucionales** | `src/data/institution.ts` | Objeto `STATS` |
| **Textos y traducciones (ES/EN/IT)** | `src/i18n/{es,en,it}.ts` | Diccionarios tipados |
| **Paleta de colores y estilos** | `src/index.css` | Directiva `@theme` |

---

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (SingleFile bundle)
npm run build

# Previsualizar compilación de producción
npm run preview

# Verificación de tipos TypeScript
npm run typecheck
```

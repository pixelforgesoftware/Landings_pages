/**
 * Configuración y datos institucionales centralizados.
 * Contiene información de contacto, horarios canónicos, fechas y cuentas bancarias oficiales.
 */

export const CONTACT = {
  whatsappDisplay: "+54 9 260 4607108",
  whatsappNumber: "5492604607108",
  whatsappMessage:
    "Hola, me comunico desde la página web de la Parroquia San Francisco de Asís y quisiera realizar una consulta.",
  email: "curanicolasortiz@yahoo.com.ar",
  schoolAddress: [
    "Calle Misiones y San Juan",
    "Real del Padre",
    "San Rafael, Mendoza",
    "Argentina",
  ],
  parishAddress: [
    "Malvinas Argentinas s/n",
    "Real del Padre",
    "San Rafael, Mendoza",
    "Argentina",
  ],
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
  CONTACT.whatsappMessage,
)}`;

/** Enlaces oficiales de redes sociales (se asignarán conforme estén disponibles). */
export const SOCIAL = {
  instagram: null as string | null,
  facebook: null as string | null,
  youtube: null as string | null,
} as const;

/** Fechas e hitos fundacionales de la comunidad. */
export const DATES = {
  parishFounded: "1987",
  schoolStarted: "2012",
  gardenStarted: "2012",
  primaryStarted: "2014",
  secondaryStarted: "2021",
} as const;

/** Estadísticas y métricas de alcance institucional. */
export const STATS = {
  parishYear: "1987",
  schoolYear: "2012",
  students: "250+",
  families: "100+",
  levels: "4",
} as const;

/** Horarios de Santa Misa según la temporada. */
export const MASS_TIMES = {
  winter: "19:30",
  summer: "20:00",
} as const;

/** Horarios de cursada por nivel educativo. */
export const SCHOOL_HOURS = {
  garden: "09:00 – 12:00",
  primary: "08:00 – 12:45",
  secondary: "13:30 – 18:30",
} as const;

/** Datos bancarios oficiales para donaciones internacionales a través del IOR. */
export const IOR_DONATION = {
  holder: "Diócesis de San Rafael",
  institution: "Istituto per le Opere di Religione (IOR)",
  account: "21898002-40-085",
  iban: "VA15001000000021898002",
  swift: "IOPRVAVX",
  swiftAlt: "IOPRVAVXXXX",
  concept: "DONACIÓN",
  addressLines: ["Diócesis de San Rafael", "Rivadavia 415, M5600FQA", "Argentina"],
  destinations: [
    "Parroquia San Francisco de Asís – Real del Padre",
    "Colegio Parroquial Sagrada Familia de Nazareth – Real del Padre",
  ],
} as const;

/** Entidades que han acompañado históricamente el desarrollo institucional. */
export const INTERNATIONAL_PARTNERS = [
  "Fondo Populorum Progressio del Dicasterio para el Servicio del Desarrollo Humano Integral",
  "CELAM",
] as const;

/** Nombres canónicos de las entidades que componen la comunidad. */
export const INSTITUTIONS = {
  parish: "Parroquia San Francisco de Asís",
  school: "Colegio Parroquial 242 Sagrada Familia de Nazareth",
  garden: "Jardín Maternal JP-338 San Francisco de Asís",
} as const;

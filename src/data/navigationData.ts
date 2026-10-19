/**
 * Estructura de datos para los desplegables de navegación (megamenú).
 * Defino las 3 instituciones (Parroquia, Jardín Maternal, Colegio)
 * y los acordeones interactivos en español, inglés e italiano (ES / EN / IT).
 */

export type InstitutionId = "parish" | "garden" | "school";

export interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  iconName:
    | "GraduationCap"
    | "Users"
    | "Wrench"
    | "BookOpen"
    | "Heart"
    | "Camera"
    | "Mail"
    | "Clock"
    | "Church"
    | "Baby";
  // Vista en 4 columnas (resumen institucional Quiénes somos)
  overview?: {
    intro: string;
    actionLink: { href: string; label: string };
    vision: { title: string; text: string };
    mision: { title: string; text: string };
    valores: { title: string; items: string[] };
  };
  // Lista de tarjetas o ítems informativos
  items?: Array<{
    title: string;
    desc: string;
  }>;
  actionLink?: { href: string; label: string };
}

export interface InstitutionNavData {
  id: InstitutionId;
  label: string;
  shortLabel: string;
  accordions: AccordionItem[];
}

// ---------------------------------------------------------------------------
// 1. DICCIONARIO EN ESPAÑOL (ES)
// ---------------------------------------------------------------------------
const NAVIGATION_ES: Record<InstitutionId, InstitutionNavData> = {
  school: {
    id: "school",
    label: "Colegio Parroquial Sagrada Familia de Nazareth",
    shortLabel: "Colegio Parroquial",
    accordions: [
      {
        id: "quienes-somos",
        title: "Quiénes somos",
        iconName: "GraduationCap",
        overview: {
          intro:
            "El Colegio Parroquial Sagrada Familia de Nazareth es una obra educativa de la Parroquia, al servicio de las familias de Real del Padre y sus parajes. Formamos integralmente a niños y jóvenes con una educación de calidad, en un clima de fe, familia y compromiso comunitario.",
          actionLink: { href: "/colegio", label: "Ver página del Colegio →" },
          vision: {
            title: "Visión",
            text: "Ser una comunidad educativa referente en la formación integral de personas, abiertas a la verdad, al bien y a la belleza.",
          },
          mision: {
            title: "Misión",
            text: "Brindar una educación humana y cristiana de excelencia que prepare a los estudiantes para servir a Dios, la familia y la sociedad.",
          },
          valores: {
            title: "Valores",
            items: [
              "Fe",
              "Familia",
              "Respeto",
              "Responsabilidad",
              "Solidaridad",
              "Esfuerzo",
              "Servicio",
            ],
          },
        },
      },
      {
        id: "niveles",
        title: "Niveles educativos y horarios",
        subtitle: "Nivel Inicial, Primario y Secundario",
        iconName: "Users",
        items: [
          {
            title: "Nivel Inicial",
            desc: "Salas de 4 y 5 años. Primeros pasos pedagógicos y socialización en un clima de alegría.",
          },
          {
            title: "Nivel Primario",
            desc: "Turno mañana de 08:00 a 12:45 hs. Formación integral, sólida base académica y vivencia de la fe.",
          },
          {
            title: "Nivel Secundario",
            desc: "Turno tarde de 13:30 a 18:30 hs. Jóvenes que se preparan con excelencia para la vida adulta y profesional.",
          },
        ],
        actionLink: { href: "/colegio#niveles", label: "Ver niveles y horarios completos →" },
      },
      {
        id: "propuesta",
        title: "Propuesta formativa y pastoral",
        subtitle: "Ideario católico, virtudes y comunidad",
        iconName: "BookOpen",
        items: [
          {
            title: "Educación católica integral",
            desc: "Unimos el rigor intelectual con la enseñanza cotidiana de las virtudes humanas y cristianas.",
          },
          {
            title: "Vida escolar comunitaria",
            desc: "Celebraciones litúrgicas, catequesis sacramental, actos patrios y talleres formativos con las familias.",
          },
          {
            title: "Deportes, arte y cultura",
            desc: "Proyectos artísticos, eventos deportivos y campamentos que fortalecen lazos de amistad y trabajo en equipo.",
          },
        ],
        actionLink: { href: "/colegio#actividades", label: "Descubrir propuesta formativa →" },
      },
      {
        id: "galeria",
        title: "Galería de fotos",
        subtitle: "Aulas, actos patrios y vida escolar",
        iconName: "Camera",
        items: [
          {
            title: "Instalaciones y Aulas",
            desc: "Aulas equipadas, biblioteca y espacios donde se desarrolla el día a día escolar.",
          },
          {
            title: "Actos y Comunidad",
            desc: "Formación de alumnos, actos patrios, festejos y celebraciones religiosas con las familias.",
          },
        ],
        actionLink: { href: "/galeria?cat=colegio-jardin", label: "Ver fotos del Colegio y Jardín →" },
      },
      {
        id: "proyectos",
        title: "Nuestros proyectos",
        subtitle: "3 Nuevas Aulas, Capilla y Mejoras",
        iconName: "Wrench",
        items: [
          {
            title: "3 Nuevas Aulas y Biblioteca",
            desc: "Ampliación de infraestructura escolar para acompañar el continuo crecimiento de la matrícula.",
          },
          {
            title: "Futura Capilla San José",
            desc: "Espacio de oración y encuentro dentro del predio del colegio, abierto a toda la comunidad parroquial.",
          },
          {
            title: "Mejoras edilicias continuas",
            desc: "Mantenimiento preventivo, equipamiento didáctico y climatización para aulas más confortables.",
          },
        ],
        actionLink: { href: "/proyectos#proyecto-educativo", label: "Conocer proyectos en detalle →" },
      },
      {
        id: "contacto",
        title: "Inscripciones y Contacto",
        subtitle: "Secretaría escolar y atención a familias",
        iconName: "Mail",
        items: [
          {
            title: "Dirección",
            desc: "Calle Misiones y San Juan, Real del Padre, San Rafael, Mendoza, Argentina.",
          },
          {
            title: "WhatsApp institucional",
            desc: "+54 9 260 4607108 (Consultas de secretaría, vacantes e información general).",
          },
          {
            title: "Correo electrónico",
            desc: "curanicolasortiz@yahoo.com.ar",
          },
        ],
        actionLink: { href: "/colegio#contacto", label: "Secretaría escolar y contacto →" },
      },
    ],
  },

  parish: {
    id: "parish",
    label: "Parroquia San Francisco de Asís",
    shortLabel: "Parroquia",
    accordions: [
      {
        id: "quienes-somos",
        title: "Quiénes somos",
        iconName: "Church",
        overview: {
          intro:
            "Erigida canónicamente el 5 de marzo de 1987, la Parroquia San Francisco de Asís es el corazón evangelizador y misionero de Real del Padre, Jaime Prats y parajes rurales vecinos. Guiamos a nuestra comunidad en la fe, la caridad y la esperanza fraterna.",
          actionLink: { href: "/parroquia", label: "Ver página de la Parroquia →" },
          vision: {
            title: "Visión",
            text: "Ser una comunidad de fe viva, misionera y cercana, testimonio de la paz y el bien franciscano.",
          },
          mision: {
            title: "Misión",
            text: "Celebrar los sacramentos, anunciar el Evangelio y acompañar a las familias en cada etapa de la vida.",
          },
          valores: {
            title: "Pilares",
            items: [
              "Fe",
              "Eucaristía",
              "Caridad",
              "Fraternidad",
              "Misión rural",
              "Servicio",
              "Esperanza",
            ],
          },
        },
      },
      {
        id: "celebraciones",
        title: "Horarios de Misa y Sacramentos",
        subtitle: "Misas de temporada y celebraciones",
        iconName: "Clock",
        items: [
          {
            title: "Horario de Invierno",
            desc: "Martes a domingos a las 19:30 hs (desde Pascua hasta la fiesta patronal del 4 de octubre).",
          },
          {
            title: "Horario de Verano",
            desc: "Martes a viernes a las 20:00 hs (hasta Pascua).",
          },
          {
            title: "Sacramentos e Intenciones",
            desc: "Bautismos, Comuniones, Confirmaciones, Matrimonios y solicitud de intenciones de misa.",
          },
        ],
        actionLink: { href: "/parroquia#horarios", label: "Ver horarios de misa completos →" },
      },
      {
        id: "pastoral",
        title: "Vida parroquial y pastoral",
        subtitle: "Misiones rurales, catequesis y caridad",
        iconName: "Heart",
        items: [
          {
            title: "Catequesis Comunitaria",
            desc: "Formación doctrinal y espiritual para niños, jóvenes y adultos en distintos parajes.",
          },
          {
            title: "Misiones Rurales",
            desc: "Atención pastoral constante en capillas de parajes alejados y comunidades rurales vecinas.",
          },
          {
            title: "Obras de Caridad",
            desc: "Asistencia a enfermos, visitas domiciliarias y colaboración solidaria con las familias más postergadas.",
          },
        ],
        actionLink: { href: "/parroquia#vida-parroquial", label: "Conocer la vida parroquial →" },
      },
      {
        id: "galeria",
        title: "Galería de fotos",
        subtitle: "Templo, celebraciones y misiones",
        iconName: "Camera",
        items: [
          {
            title: "Templo y Celebraciones",
            desc: "Fotografías del altar, templo parroquial, santa misa y celebraciones sacramentales.",
          },
          {
            title: "Misiones Rurales y Comunidad",
            desc: "Jornadas comunitarias de trabajo, misiones y capillas de parajes vecinos.",
          },
        ],
        actionLink: { href: "/galeria?cat=parroquia", label: "Ver fotos de la Parroquia →" },
      },
      {
        id: "proyectos",
        title: "Futura Capilla San José",
        subtitle: "El gran templo comunitario",
        iconName: "Wrench",
        items: [
          {
            title: "Casa de Dios y de la Comunidad",
            desc: "Espacio de oración y culto que unirá a la comunidad parroquial y al colegio en un solo corazón.",
          },
          {
            title: "Conservación del Templo",
            desc: "Pintura, iluminación y mejoras en la casa parroquial y salones de catequesis.",
          },
        ],
        actionLink: { href: "/proyectos#capilla-san-jose", label: "Conocer la Capilla San José →" },
      },
      {
        id: "contacto",
        title: "Secretaría y Contacto",
        subtitle: "Atención parroquial y trámites",
        iconName: "Mail",
        items: [
          {
            title: "Sede Parroquial",
            desc: "Malvinas Argentinas s/n, Real del Padre, San Rafael, Mendoza, Argentina.",
          },
          {
            title: "WhatsApp Parroquial",
            desc: "+54 9 260 4607108 (Para intenciones de misa y solicitudes sacramentales).",
          },
          {
            title: "Correo de contacto",
            desc: "curanicolasortiz@yahoo.com.ar",
          },
        ],
        actionLink: { href: "/parroquia#contacto", label: "Secretaría parroquial y horarios →" },
      },
    ],
  },

  garden: {
    id: "garden",
    label: "Jardín Maternal JP-338",
    shortLabel: "Jardín Maternal",
    accordions: [
      {
        id: "quienes-somos",
        title: "Quiénes somos",
        iconName: "Baby",
        overview: {
          intro:
            "El Jardín Maternal JP-338 San Francisco de Asís inició sus actividades el 2 de octubre de 2012 para brindar contención, amor y estimulación temprana a los niños más pequeños de Real del Padre, acompañando a las familias en sus primeros años de crianza.",
          actionLink: { href: "/jardin", label: "Ver página del Jardín Maternal →" },
          vision: {
            title: "Visión",
            text: "Ser un segundo hogar donde cada niño crezca en un entorno cálido, seguro y estimulante.",
          },
          mision: {
            title: "Misión",
            text: "Acompañar el desarrollo motriz, afectivo y social temprano mediante el juego y valores cristianos.",
          },
          valores: {
            title: "Valores",
            items: [
              "Afecto",
              "Ternura",
              "Juego",
              "Seguridad",
              "Familia",
              "Respeto",
              "Cuidado",
            ],
          },
        },
      },
      {
        id: "salas-horarios",
        title: "Salas y Horarios",
        subtitle: "Turno mañana de 09:00 a 12:00 hs",
        iconName: "Clock",
        items: [
          {
            title: "Lactantes y Deambuladores",
            desc: "Atención individualizada, higiene, apego seguro y primeros estímulos psicomotrices.",
          },
          {
            title: "Salas de 2 y 3 Años",
            desc: "Exploración del entorno, lenguaje, rondas de canciones, juego simbólico y hábitos saludables.",
          },
          {
            title: "Turno Mañana (09:00 a 12:00 hs)",
            desc: "Lunes a viernes con comunicación cotidiana en cuaderno de notas y diálogo cercano con las familias.",
          },
        ],
        actionLink: { href: "/jardin#salas-horarios", label: "Ver salas y horarios →" },
      },
      {
        id: "pedagogica",
        title: "Propuesta y estimulación temprana",
        subtitle: "Desarrollo motriz, afectivo y lúdico",
        iconName: "BookOpen",
        items: [
          {
            title: "Estimulación oportuna",
            desc: "Actividades sensoriales, motrices y rítmicas pensadas específicamente para la primera infancia.",
          },
          {
            title: "Socialización y afecto",
            desc: "Aprendizaje de convivencia en un marco de ternura, cuidado y respeto mutuo.",
          },
        ],
        actionLink: { href: "/jardin#propuesta", label: "Ver actividades formativas →" },
      },
      {
        id: "galeria",
        title: "Galería de fotos",
        subtitle: "Salas, juegos y primera infancia",
        iconName: "Camera",
        items: [
          {
            title: "Salas de Primera Infancia",
            desc: "Instalaciones adaptadas para bebés y niños pequeños, con mobiliario seguro y cálido.",
          },
          {
            title: "Juegos y Merienda Compartida",
            desc: "Estimulación sensoriomotriz, nanas, rondas y momentos cotidianos compartidos.",
          },
        ],
        actionLink: { href: "/galeria?cat=colegio-jardin", label: "Ver fotos del Jardín y Colegio →" },
      },
      {
        id: "contacto",
        title: "Inscripciones y Contacto",
        subtitle: "Vacantes y atención a familias",
        iconName: "Mail",
        items: [
          {
            title: "Atención a Familias",
            desc: "Para consultar disponibilidad de vacantes, requisitos y coordinar una visita al establecimiento.",
          },
          {
            title: "WhatsApp directo",
            desc: "+54 9 260 4607108 (Comunícate directamente con la secretaría del jardín).",
          },
        ],
        actionLink: { href: "/jardin#contacto", label: "Inscripciones y atención →" },
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// 2. DICCIONARIO EN INGLÉS (EN)
// ---------------------------------------------------------------------------
const NAVIGATION_EN: Record<InstitutionId, InstitutionNavData> = {
  school: {
    id: "school",
    label: "Holy Family of Nazareth Parish School",
    shortLabel: "Parish School",
    accordions: [
      {
        id: "quienes-somos",
        title: "About us",
        iconName: "GraduationCap",
        overview: {
          intro:
            "Holy Family of Nazareth Parish School is an educational ministry of the Parish, serving the families of Real del Padre and surrounding rural settlements. We offer comprehensive education of excellence, rooted in faith, family values, and community commitment.",
          actionLink: { href: "/colegio", label: "Visit School page →" },
          vision: {
            title: "Vision",
            text: "To be an educational benchmark in the integral formation of individuals open to truth, goodness, and beauty.",
          },
          mision: {
            title: "Mission",
            text: "To provide human and Christian education of excellence that prepares students to serve God, family, and society.",
          },
          valores: {
            title: "Values",
            items: [
              "Faith",
              "Family",
              "Respect",
              "Responsibility",
              "Solidarity",
              "Effort",
              "Service",
            ],
          },
        },
      },
      {
        id: "niveles",
        title: "Educational levels and schedules",
        subtitle: "Kindergarten, Primary and Secondary",
        iconName: "Users",
        items: [
          {
            title: "Kindergarten",
            desc: "Ages 4 and 5. First pedagogical steps and socialization in an atmosphere of joy.",
          },
          {
            title: "Primary School",
            desc: "Morning shift from 08:00 to 12:45. Comprehensive education, solid academic foundation, and living faith.",
          },
          {
            title: "Secondary School",
            desc: "Afternoon shift from 13:30 to 18:30. Preparing young people with excellence for adult and professional life.",
          },
        ],
        actionLink: { href: "/colegio#niveles", label: "View all levels and schedules →" },
      },
      {
        id: "propuesta",
        title: "Educational and pastoral project",
        subtitle: "Catholic identity, virtues and community",
        iconName: "BookOpen",
        items: [
          {
            title: "Integral Catholic education",
            desc: "We unite intellectual rigor with the daily living of human and Christian virtues.",
          },
          {
            title: "School community life",
            desc: "Liturgical celebrations, sacramental catechesis, civic ceremonies, and formation workshops for families.",
          },
          {
            title: "Sports, art and culture",
            desc: "Artistic, cultural, and sports projects fostering friendship, teamwork, and healthy recreation.",
          },
        ],
        actionLink: { href: "/colegio#actividades", label: "Discover educational project →" },
      },
      {
        id: "galeria",
        title: "Photo gallery",
        subtitle: "Classrooms, ceremonies and school life",
        iconName: "Camera",
        items: [
          {
            title: "Facilities & Classrooms",
            desc: "Equipped learning spaces, library, and grounds where daily school life unfolds.",
          },
          {
            title: "Ceremonies & Community",
            desc: "Student gatherings, civic celebrations, and liturgical milestones with families.",
          },
        ],
        actionLink: { href: "/galeria?cat=colegio-jardin", label: "View School & Nursery photos →" },
      },
      {
        id: "proyectos",
        title: "Our projects",
        subtitle: "3 New Classrooms, Chapel and Facilities",
        iconName: "Wrench",
        items: [
          {
            title: "3 New Classrooms & Library",
            desc: "Expansion of school infrastructure to accommodate steady student enrollment growth.",
          },
          {
            title: "Future St. Joseph Chapel",
            desc: "A sacred space for prayer and encounter on school grounds, open to the entire parish community.",
          },
          {
            title: "Ongoing facility improvements",
            desc: "Preventive maintenance, educational technology, and climate control for comfortable learning.",
          },
        ],
        actionLink: { href: "/proyectos#proyecto-educativo", label: "Explore school projects in detail →" },
      },
      {
        id: "contacto",
        title: "Admissions & Contact",
        subtitle: "School office and family assistance",
        iconName: "Mail",
        items: [
          {
            title: "Address",
            desc: "Calle Misiones & San Juan, Real del Padre, San Rafael, Mendoza, Argentina.",
          },
          {
            title: "Institutional WhatsApp",
            desc: "+54 9 260 4607108 (Admissions and general inquiries).",
          },
          {
            title: "Email",
            desc: "curanicolasortiz@yahoo.com.ar",
          },
        ],
        actionLink: { href: "/colegio#contacto", label: "School office and contact →" },
      },
    ],
  },

  parish: {
    id: "parish",
    label: "Parish of St. Francis of Assisi",
    shortLabel: "Parish",
    accordions: [
      {
        id: "quienes-somos",
        title: "About us",
        iconName: "Church",
        overview: {
          intro:
            "Canonically erected on March 5, 1987, the Parish of St. Francis of Assisi is the evangelizing and missionary heart of Real del Padre, Jaime Prats, and neighboring rural communities. We guide our people in faith, charity, and fraternal hope.",
          actionLink: { href: "/parroquia", label: "Visit Parish page →" },
          vision: {
            title: "Vision",
            text: "To be a vibrant, missionary, and welcoming faith community, witnessing to Franciscan peace and goodness.",
          },
          mision: {
            title: "Mission",
            text: "To celebrate the sacraments, proclaim the Gospel, and accompany families through every stage of life.",
          },
          valores: {
            title: "Pillars",
            items: [
              "Faith",
              "Eucharist",
              "Charity",
              "Fraternity",
              "Rural Mission",
              "Service",
              "Hope",
            ],
          },
        },
      },
      {
        id: "celebraciones",
        title: "Mass Times & Sacraments",
        subtitle: "Seasonal schedules and liturgical life",
        iconName: "Clock",
        items: [
          {
            title: "Winter Schedule",
            desc: "Tuesday through Sunday at 19:30 (from Easter until the patronal feast on October 4).",
          },
          {
            title: "Summer Schedule",
            desc: "Tuesday through Friday at 20:00 (until Easter).",
          },
          {
            title: "Sacraments & Intentions",
            desc: "Baptisms, First Communions, Confirmations, Weddings, and Mass intention requests.",
          },
        ],
        actionLink: { href: "/parroquia#horarios", label: "View full Mass schedules →" },
      },
      {
        id: "pastoral",
        title: "Parish life and pastoral care",
        subtitle: "Rural missions, catechesis and charity",
        iconName: "Heart",
        items: [
          {
            title: "Community Catechesis",
            desc: "Doctrinal and spiritual formation for children, youth, and adults across rural chapels.",
          },
          {
            title: "Rural Missions",
            desc: "Continuous pastoral presence in distant rural chapels and neighboring country settlements.",
          },
          {
            title: "Works of Charity",
            desc: "Care for the sick, home visitations, and solidarity assistance for underprivileged families.",
          },
        ],
        actionLink: { href: "/parroquia#vida-parroquial", label: "Discover parish life →" },
      },
      {
        id: "galeria",
        title: "Photo gallery",
        subtitle: "Church, celebrations and outreach",
        iconName: "Camera",
        items: [
          {
            title: "Church & Celebrations",
            desc: "Altar photographs, Sunday masses, and patronal festivities in Real del Padre.",
          },
          {
            title: "Rural Missions & Outreach",
            desc: "Community work days, rural chapels, and charitable outreach in neighboring areas.",
          },
        ],
        actionLink: { href: "/galeria?cat=parroquia", label: "View Parish photos →" },
      },
      {
        id: "proyectos",
        title: "Future St. Joseph Chapel",
        subtitle: "A spiritual sanctuary for our community",
        iconName: "Wrench",
        items: [
          {
            title: "House of God & Community",
            desc: "A sacred home of prayer and worship uniting the parish community and the school as one.",
          },
          {
            title: "Church Preservation",
            desc: "Lighting, painting, and maintenance of the parish church, rectory, and catechetical halls.",
          },
        ],
        actionLink: { href: "/proyectos#capilla-san-jose", label: "Learn about St. Joseph Chapel →" },
      },
      {
        id: "contacto",
        title: "Parish Office & Contact",
        subtitle: "Pastoral assistance and inquiries",
        iconName: "Mail",
        items: [
          {
            title: "Parish Church",
            desc: "Malvinas Argentinas s/n, Real del Padre, San Rafael, Mendoza, Argentina.",
          },
          {
            title: "Parish WhatsApp",
            desc: "+54 9 260 4607108 (For Mass intentions and sacrament registration).",
          },
          {
            title: "Email address",
            desc: "curanicolasortiz@yahoo.com.ar",
          },
        ],
        actionLink: { href: "/parroquia#contacto", label: "Parish office and contact →" },
      },
    ],
  },

  garden: {
    id: "garden",
    label: "Nursery JP-338",
    shortLabel: "Nursery",
    accordions: [
      {
        id: "quienes-somos",
        title: "About us",
        iconName: "Baby",
        overview: {
          intro:
            "St. Francis of Assisi Nursery JP-338 opened on October 2, 2012, to provide loving care, affection, and early stimulation for the youngest children of Real del Padre, supporting families during early parenthood.",
          actionLink: { href: "/jardin", label: "View Nursery page →" },
          vision: {
            title: "Vision",
            text: "To be a second home where every child thrives in a warm, safe, and nurturing environment.",
          },
          mision: {
            title: "Mission",
            text: "To support early psychomotor, emotional, and social development through play and Christian values.",
          },
          valores: {
            title: "Values",
            items: [
              "Affection",
              "Tenderness",
              "Play",
              "Safety",
              "Family",
              "Respect",
              "Care",
            ],
          },
        },
      },
      {
        id: "salas-horarios",
        title: "Rooms & Schedules",
        subtitle: "Morning care from 09:00 to 12:00",
        iconName: "Clock",
        items: [
          {
            title: "Infants & Toddlers",
            desc: "Individualized attention, hygiene, secure attachment, and first psychomotor milestones.",
          },
          {
            title: "2 & 3-Year-Old Rooms",
            desc: "Sensory exploration, language, nursery songs, symbolic play, and healthy routines.",
          },
          {
            title: "Morning Shift (09:00 to 12:00)",
            desc: "Monday through Friday with daily communication logbooks and close dialogue with parents.",
          },
        ],
        actionLink: { href: "/jardin#salas-horarios", label: "View nursery schedules →" },
      },
      {
        id: "pedagogica",
        title: "Early stimulation & play",
        subtitle: "Motor, emotional and social growth",
        iconName: "BookOpen",
        items: [
          {
            title: "Timely stimulation",
            desc: "Sensory, motor, and musical activities designed specifically for early infant development.",
          },
          {
            title: "Socialization and warmth",
            desc: "First experiences in peaceful community living, guided with tenderness and mutual respect.",
          },
        ],
        actionLink: { href: "/jardin#propuesta", label: "View learning activities →" },
      },
      {
        id: "galeria",
        title: "Photo gallery",
        subtitle: "Rooms, play and early childhood",
        iconName: "Camera",
        items: [
          {
            title: "Early Childhood Rooms",
            desc: "Warm and safe environments designed specifically for infants and toddlers.",
          },
          {
            title: "Playtime & Shared Snacks",
            desc: "Sensorimotor stimulation, songs, stories, and shared daily routines.",
          },
        ],
        actionLink: { href: "/galeria?cat=colegio-jardin", label: "View Nursery & School photos →" },
      },
      {
        id: "contacto",
        title: "Admissions & Contact",
        subtitle: "Enrollment and family guidance",
        iconName: "Mail",
        items: [
          {
            title: "Family Assistance",
            desc: "Inquire about enrollment vacancies, guidelines, and schedule an on-site visit.",
          },
          {
            title: "Direct WhatsApp",
            desc: "+54 9 260 4607108 (Contact the nursery secretary directly).",
          },
        ],
        actionLink: { href: "/jardin#contacto", label: "Admissions and contact →" },
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// 3. DICCIONARIO EN ITALIANO (IT)
// ---------------------------------------------------------------------------
const NAVIGATION_IT: Record<InstitutionId, InstitutionNavData> = {
  school: {
    id: "school",
    label: "Collegio Parrocchiale Sacra Famiglia di Nazareth",
    shortLabel: "Collegio Parrocchiale",
    accordions: [
      {
        id: "quienes-somos",
        title: "Chi siamo",
        iconName: "GraduationCap",
        overview: {
          intro:
            "Il Collegio Parrocchiale Sacra Famiglia di Nazareth è un'opera educativa della Parrocchia al servizio delle famiglie di Real del Padre e delle comunità rurali. Formiamo integralmente bambini e giovani con un'istruzione di qualità, in un clima di fede, famiglia e dedizione sociale.",
          actionLink: { href: "/colegio", label: "Vai alla pagina del Collegio →" },
          vision: {
            title: "Visione",
            text: "Essere una comunità educativa di riferimento nella formazione integrale di persone aperte alla verità, al bene e alla bellezza.",
          },
          mision: {
            title: "Missione",
            text: "Offrire un'educazione umana e cristiana di eccellenza che prepari gli studenti a servire Dio, la famiglia e la società.",
          },
          valores: {
            title: "Valori",
            items: [
              "Fede",
              "Famiglia",
              "Rispetto",
              "Responsabilità",
              "Solidarietà",
              "Impegno",
              "Servizio",
            ],
          },
        },
      },
      {
        id: "niveles",
        title: "Livelli educativi e orari",
        subtitle: "Scuola dell'Infanzia, Primaria e Secondaria",
        iconName: "Users",
        items: [
          {
            title: "Scuola dell'Infanzia",
            desc: "Sezioni di 4 e 5 anni. Primi passi educativi e socializzazione in un clima di gioia.",
          },
          {
            title: "Scuola Primaria",
            desc: "Turno mattutino dalle 08:00 alle 12:45. Formazione integrale, solida base didattica e fede vissuta.",
          },
          {
            title: "Scuola Secondaria",
            desc: "Turno pomeridiano dalle 13:30 alle 18:30. Preparazione con eccellenza per la vita adulta e professionale.",
          },
        ],
        actionLink: { href: "/colegio#niveles", label: "Vedi tutti i livelli e orari →" },
      },
      {
        id: "propuesta",
        title: "Progetto educativo e pastorale",
        subtitle: "Identità cattolica, virtù e comunità",
        iconName: "BookOpen",
        items: [
          {
            title: "Educazione cattolica integrale",
            desc: "Uniamo il rigore intellettuale all'insegnamento quotidiano delle virtù umane e cristiane.",
          },
          {
            title: "Vita scolastica comunitaria",
            desc: "Celebrazioni liturgiche, catechesi sacramentale, feste civiche e incontri formativi con le famiglie.",
          },
          {
            title: "Sport, arte e cultura",
            desc: "Progetti artistici e sportivi che rafforzano l'amicizia, la collaborazione e la sana ricreazione.",
          },
        ],
        actionLink: { href: "/colegio#actividades", label: "Scopri il progetto formativo →" },
      },
      {
        id: "galeria",
        title: "Galleria fotografica",
        subtitle: "Aule, cerimonie e vita scolastica",
        iconName: "Camera",
        items: [
          {
            title: "Strutture e Aule",
            desc: "Aule attrezzate, biblioteca e spazi in cui si svolge la vita scolastica quotidiana.",
          },
          {
            title: "Cerimonie e Comunità",
            desc: "Formazione degli alunni, celebrazioni patriottiche e feste religiose con le famiglie.",
          },
        ],
        actionLink: { href: "/galeria?cat=colegio-jardin", label: "Vedi le foto del Collegio e Asilo →" },
      },
      {
        id: "proyectos",
        title: "I nostri progetti",
        subtitle: "3 Nuove Aule, Cappella e Strutture",
        iconName: "Wrench",
        items: [
          {
            title: "3 Nuove Aule e Biblioteca",
            desc: "Ampliamento delle aule scolastiche per accompagnare la costante crescita delle iscrizioni.",
          },
          {
            title: "Futura Cappella San Giuseppe",
            desc: "Spazio di preghiera e incontro nel complesso scolastico, aperto all'intera comunità parrocchiale.",
          },
          {
            title: "Manutenzione e miglioramenti",
            desc: "Manutenzione costante, attrezzature didattiche e climatizzazione per aule più accoglienti.",
          },
        ],
        actionLink: { href: "/proyectos#proyecto-educativo", label: "Scopri i progetti in dettaglio →" },
      },
      {
        id: "contacto",
        title: "Iscrizioni e Contatti",
        subtitle: "Segreteria scolastica e accoglienza",
        iconName: "Mail",
        items: [
          {
            title: "Indirizzo",
            desc: "Calle Misiones e San Juan, Real del Padre, San Rafael, Mendoza, Argentina.",
          },
          {
            title: "WhatsApp istituzionale",
            desc: "+54 9 260 4607108 (Informazioni su iscrizioni e segreteria generale).",
          },
          {
            title: "Posta elettronica",
            desc: "curanicolasortiz@yahoo.com.ar",
          },
        ],
        actionLink: { href: "/colegio#contacto", label: "Segreteria scolastica e contatti →" },
      },
    ],
  },

  parish: {
    id: "parish",
    label: "Parrocchia San Francesco d'Assisi",
    shortLabel: "Parrocchia",
    accordions: [
      {
        id: "quienes-somos",
        title: "Chi siamo",
        iconName: "Church",
        overview: {
          intro:
            "Eretta canonicamente il 5 marzo 1987, la Parrocchia San Francesco d'Assisi è il cuore evangelizzatore e missionario di Real del Padre, Jaime Prats e delle comunità rurali limitrofe. Guidiamo la comunità nella fede, nella carità e nella speranza fraterna.",
          actionLink: { href: "/parroquia", label: "Vai alla pagina della Parrocchia →" },
          vision: {
            title: "Visione",
            text: "Essere una comunità di fede viva, missionaria e accogliente, testimone della pace e del bene francescano.",
          },
          mision: {
            title: "Missione",
            text: "Celebrare i sacramenti, annunciare il Vangelo e accompagnare le famiglie in ogni tappa della vita.",
          },
          valores: {
            title: "Pilastri",
            items: [
              "Fede",
              "Eucaristia",
              "Carità",
              "Fraternità",
              "Missione rurale",
              "Servizio",
              "Speranza",
            ],
          },
        },
      },
      {
        id: "celebraciones",
        title: "Orari delle Messe e Sacramenti",
        subtitle: "Orari stagionali e celebrazioni liturgiche",
        iconName: "Clock",
        items: [
          {
            title: "Orario Invernale",
            desc: "Da martedì a domenica alle 19:30 (da Pasqua fino alla festa patronale del 4 ottobre).",
          },
          {
            title: "Orario Estivo",
            desc: "Da martedì a venerdì alle 20:00 (fino a Pasqua).",
          },
          {
            title: "Sacramenti e Intenzioni",
            desc: "Battesimi, Prime Comunioni, Cresime, Matrimoni e richieste di intenzioni per la Santa Messa.",
          },
        ],
        actionLink: { href: "/parroquia#horarios", label: "Vedi tutti gli orari delle Messe →" },
      },
      {
        id: "pastoral",
        title: "Vita parrocchiale e pastorale",
        subtitle: "Missioni rurali, catechesi e carità",
        iconName: "Heart",
        items: [
          {
            title: "Catechesi Comunitaria",
            desc: "Formazione dottrinale e spirituale per bambini, giovani e adulti nelle diverse cappelle rurali.",
          },
          {
            title: "Missioni Rurali",
            desc: "Presenza pastorale costante nelle cappelle più isolate e nei paraggi rurali circostanti.",
          },
          {
            title: "Opere di Carità",
            desc: "Visite ai malati, vicinanza alle famiglie e solidarietà verso le persone più bisognose.",
          },
        ],
        actionLink: { href: "/parroquia#vida-parroquial", label: "Scopri la vita parrocchiale →" },
      },
      {
        id: "galeria",
        title: "Galleria fotografica",
        subtitle: "Tempio, celebrazioni e missioni",
        iconName: "Camera",
        items: [
          {
            title: "Tempio e Celebrazioni",
            desc: "Fotografie dell'altare, delle messe domenicali e delle feste patronali a Real del Padre.",
          },
          {
            title: "Missioni Rurali e Comunità",
            desc: "Giornate di lavoro comunitario, missioni e cappelle nelle zone rurali vicine.",
          },
        ],
        actionLink: { href: "/galeria?cat=parroquia", label: "Vedi le foto della Parrocchia →" },
      },
      {
        id: "proyectos",
        title: "Futura Cappella San Giuseppe",
        subtitle: "Un luogo sacro per tutta la comunità",
        iconName: "Wrench",
        items: [
          {
            title: "Casa di Dio e della Comunità",
            desc: "Uno spazio sacro di preghiera e comunione che unirà la comunità parrocchiale e la scuola.",
          },
          {
            title: "Restauro e Tutela del Tempio",
            desc: "Illuminazione, tinteggiatura e migliorie nella casa parrocchiale e nei saloni di catechesi.",
          },
        ],
        actionLink: { href: "/proyectos#capilla-san-jose", label: "Scopri la Cappella San Giuseppe →" },
      },
      {
        id: "contacto",
        title: "Segreteria e Contatti",
        subtitle: "Cura pastorale e richieste di sacramenti",
        iconName: "Mail",
        items: [
          {
            title: "Sede Parrocchiale",
            desc: "Malvinas Argentinas s/n, Real del Padre, San Rafael, Mendoza, Argentina.",
          },
          {
            title: "WhatsApp Parrocchiale",
            desc: "+54 9 260 4607108 (Per intenzioni di Messa e informazioni sacramentali).",
          },
          {
            title: "Posta elettronica",
            desc: "curanicolasortiz@yahoo.com.ar",
          },
        ],
        actionLink: { href: "/parroquia#contacto", label: "Segreteria parrocchiale e orari →" },
      },
    ],
  },

  garden: {
    id: "garden",
    label: "Asilo Nido JP-338",
    shortLabel: "Asilo Nido",
    accordions: [
      {
        id: "quienes-somos",
        title: "Chi siamo",
        iconName: "Baby",
        overview: {
          intro:
            "L'Asilo Nido JP-338 San Francesco d'Assisi è nato il 2 ottobre 2012 per offrire cura, amore e stimolazione precoce ai bambini più piccoli di Real del Padre, affiancando le famiglie nella crescita dei figli.",
          actionLink: { href: "/jardin", label: "Vedi pagina dell'Asilo Nido →" },
          vision: {
            title: "Visione",
            text: "Essere una seconda casa dove ogni bambino cresce in un ambiente accogliente, sicuro e stimolante.",
          },
          mision: {
            title: "Missione",
            text: "Accompagnare lo sviluppo psicomotorio, affettivo e sociale precoce attraverso il gioco e i valori cristiani.",
          },
          valores: {
            title: "Valori",
            items: [
              "Affetto",
              "Tenerezza",
              "Gioco",
              "Sicurezza",
              "Famiglia",
              "Rispetto",
              "Cura",
            ],
          },
        },
      },
      {
        id: "salas-horarios",
        title: "Sezioni e Orari",
        subtitle: "Attività dalle 09:00 alle 12:00",
        iconName: "Clock",
        items: [
          {
            title: "Lattanti e Primi Passi",
            desc: "Cura personalizzata, igiene, attaccamento sicuro e primi stimoli psicomotori.",
          },
          {
            title: "Sezioni 2 e 3 Anni",
            desc: "Esplorazione dell'ambiente, linguaggio, canzoncine, gioco simbolico e sane abitudini.",
          },
          {
            title: "Turno Mattutino (09:00 - 12:00)",
            desc: "Dal lunedì al venerdì con comunicazione quotidiana sul diario e dialogo costante con le famiglie.",
          },
        ],
        actionLink: { href: "/jardin#salas-horarios", label: "Vedi sezioni e orari →" },
      },
      {
        id: "pedagogica",
        title: "Stimolazione precoce e gioco",
        subtitle: "Sviluppo motorio, affettivo e sociale",
        iconName: "BookOpen",
        items: [
          {
            title: "Stimolazione mirata",
            desc: "Attività sensoriali, psicomotorie e ritmiche pensate specificamente per la prima infanzia.",
          },
          {
            title: "Socializzazione e affetto",
            desc: "Primi passi nella convivenza serena, guidati con tenerezza, cura e rispetto reciproco.",
          },
        ],
        actionLink: { href: "/jardin#propuesta", label: "Vedi le attività educative →" },
      },
      {
        id: "galeria",
        title: "Galleria fotografica",
        subtitle: "Sezioni, giochi e prima infanzia",
        iconName: "Camera",
        items: [
          {
            title: "Aule della Prima Infanzia",
            desc: "Ambienti accoglienti e sicuri progettati specificamente per neonati e bambini piccoli.",
          },
          {
            title: "Momenti di Gioco e Merenda",
            desc: "Stimolazione psicomotoria, canzoncine, filastrocche e sane abitudini condivise.",
          },
        ],
        actionLink: { href: "/galeria?cat=colegio-jardin", label: "Vedi le foto dell'Asilo e Collegio →" },
      },
      {
        id: "contacto",
        title: "Iscrizioni e Contatti",
        subtitle: "Posti disponibili e accoglienza",
        iconName: "Mail",
        items: [
          {
            title: "Accoglienza Famiglie",
            desc: "Per verificare la disponibilità di posti, i requisiti e concordare una visita alla struttura.",
          },
          {
            title: "WhatsApp diretto",
            desc: "+54 9 260 4607108 (Comunica direttamente con la segreteria dell'asilo).",
          },
        ],
        actionLink: { href: "/jardin#contacto", label: "Iscrizioni e contatti →" },
      },
    ],
  },
};

// Diccionario con los datos según cada idioma
const NAVIGATION_MAP: Record<string, Record<InstitutionId, InstitutionNavData>> = {
  es: NAVIGATION_ES,
  en: NAVIGATION_EN,
  it: NAVIGATION_IT,
};

// Devuelvo los datos de navegación según el idioma actual (si no existe, uso español por defecto)
export function getNavigationData(locale: string = "es"): Record<InstitutionId, InstitutionNavData> {
  return NAVIGATION_MAP[locale] || NAVIGATION_ES;
}

// Datos de los proyectos
const projectsData = {
  1: {
    title: "Sistema de Gestión para Gimnasios",
    tags: ["Web App", "React"],
    description: "Desarrollamos una plataforma completa para la gestión de gimnasios que incluye control de membresías, seguimiento de rutinas personalizadas, gestión de pagos automáticos y análisis de métricas de clientes. El sistema permite a los entrenadores crear planes de entrenamiento personalizados y hacer seguimiento del progreso de cada cliente en tiempo real.",
    client: "FitLife Gym Network",
    date: "2024",
    tech: "React, Node.js, MongoDB, Stripe",
    images: [
      "/assets/banner_contactano.png",
      "/assets/video_header.gif"
    ],
    link: "#"
  },
  2: {
    title: "Tienda Online de Ropa Moderna",
    tags: ["E-commerce", "Full Stack"],
    description: "Creamos una tienda online moderna y elegante con gestión completa de inventario, carrito de compras, pasarela de pagos integrada y panel de administración. La plataforma incluye filtros avanzados, wishlist, sistema de recomendaciones y notificaciones por email. Optimizada para conversiones y experiencia de usuario fluida en todos los dispositivos.",
    client: "Urban Style Fashion",
    date: "2024",
    tech: "Next.js, TypeScript, PostgreSQL, Mercado Pago",
    images: [
      "/assets/Servicio_Tienda_ropa.png",
      "/assets/Bowen.png"
    ],
    link: "#"
  },
  3: {
    title: "Portal de Noticias Digital",
    tags: ["CMS", "WordPress"],
    description: "Desarrollamos un portal de noticias moderno con sistema de gestión de contenido personalizado, categorización automática de artículos, sistema de comentarios moderados y newsletter integrado. Incluye panel de analytics para editores, SEO optimizado y carga instantánea de artículos para mejorar la experiencia del lector.",
    client: "Mendoza Digital News",
    date: "2024",
    tech: "WordPress, PHP, MySQL, Redis",
    images: [
      "/assets/Servicio_noticias.png",
      "/assets/Departamento_sanrafael.png"
    ],
    link: "#"
  },
  4: {
    title: "Web Oficial Municipio de Bowen",
    tags: ["Gobierno", "Institucional"],
    description: "Sitio web institucional para el municipio de Bowen con información turística, trámites online, calendario de eventos y sistema de gestión de reclamos ciudadanos. Incluye sección de noticias municipales, galería de fotos y acceso directo a servicios más utilizados por los ciudadanos.",
    client: "Municipalidad de Bowen",
    date: "2024",
    tech: "HTML5, CSS3, JavaScript, PHP",
    images: [
      "/assets/Bowen.png",
      "/assets/Servicio_gyms.png"
    ],
    link: "#"
  },
  5: {
    title: "Portal Web General Alvear",
    tags: ["Gobierno", "Turismo"],
    description: "Plataforma web integral para el departamento de General Alvear que destaca sus atractivos turísticos, actividades económicas y servicios municipales. Incluye mapa interactivo de la ciudad, directorio comercial, agenda cultural y sistema de reservas para espacios públicos.",
    client: "Municipalidad de General Alvear",
    date: "2024",
    tech: "React, Node.js, MongoDB, Leaflet",
    images: [
      "/assets/Departamento_alvear (1).png",
      "/assets/Departamento_malargue.png"
    ],
    link: "#"
  },
  6: {
    title: "Sitio Web San Rafael",
    tags: ["Turismo", "Responsive"],
    description: "Website enfocado en promover el turismo en San Rafael, destacando sus bodegas, aventuras outdoor y gastronomía. Sistema de reservas integrado para hoteles y excursiones, galería fotográfica inmersiva y blog de viajeros. Optimizado para dispositivos móviles y con múltiples idiomas disponibles.",
    client: "Secretaría de Turismo San Rafael",
    date: "2024",
    tech: "Vue.js, Laravel, MySQL, AWS",
    images: [
      "/assets/Departamento_sanrafael.png",
      "/assets/Servicio_Tienda_ropa.png"
    ],
    link: "#"
  }
};

// Elementos del DOM
const modal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');
const projectCards = document.querySelectorAll('.project-card-mini');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');

// Variables globales para el carrusel de imágenes
let currentProject = null;
let currentImageIndex = 0;

// Función para actualizar la imagen del modal
function updateModalImage() {
  const modalImage = document.getElementById('modalImage');
  const indicators = document.getElementById('imageIndicators');
  
  if (!currentProject || !currentProject.images) return;
  
  // Actualizar imagen
  modalImage.src = currentProject.images[currentImageIndex];
  
  // Actualizar indicadores
  indicators.innerHTML = '';
  currentProject.images.forEach((img, index) => {
    const dot = document.createElement('span');
    dot.className = 'indicator-dot';
    if (index === currentImageIndex) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      currentImageIndex = index;
      updateModalImage();
    });
    indicators.appendChild(dot);
  });
  
  // Mostrar/ocultar botones de navegación si solo hay una imagen
  if (currentProject.images.length <= 1) {
    prevImageBtn.style.display = 'none';
    nextImageBtn.style.display = 'none';
  } else {
    prevImageBtn.style.display = 'block';
    nextImageBtn.style.display = 'block';
  }
}

// Función para abrir el modal con los datos del proyecto
function openModal(projectId) {
  const project = projectsData[projectId];
  
  if (!project) return;
  
  currentProject = project;
  currentImageIndex = 0;
  
  // Actualizar contenido del modal
  updateModalImage();
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalTag1').textContent = project.tags[0];
  document.getElementById('modalTag2').textContent = project.tags[1];
  document.getElementById('modalDescription').textContent = project.description;
  document.getElementById('modalClient').textContent = project.client;
  document.getElementById('modalDate').textContent = project.date;
  document.getElementById('modalTech').textContent = project.tech;
  document.getElementById('modalLink').href = project.link;
  
  // Mostrar modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModalFunction() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  currentProject = null;
  currentImageIndex = 0;
}

// Event listeners para las cards
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.dataset.project;
    openModal(projectId);
  });
});

// Event listener para cerrar el modal
closeModal.addEventListener('click', closeModalFunction);

// Navegación de imágenes
prevImageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!currentProject) return;
  currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
  updateModalImage();
});

nextImageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!currentProject) return;
  currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
  updateModalImage();
});

// Touch events para móvil (mejor soporte)
prevImageBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  if (!currentProject) return;
  currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
  updateModalImage();
});

nextImageBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  if (!currentProject) return;
  currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
  updateModalImage();
});

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalFunction();
  }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModalFunction();
  }
});

// Navegación con teclado (flechas)
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active') || !currentProject) return;
  
  if (e.key === 'ArrowLeft') {
    currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    updateModalImage();
  } else if (e.key === 'ArrowRight') {
    currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
    updateModalImage();
  }
});

// Crear pixeles flotantes
document.addEventListener('DOMContentLoaded', () => {
  const floatingPixelsContainer = document.getElementById('floatingPixels');
  
  if (floatingPixelsContainer) {
      const pixelCount = 12;
      
      for (let i = 0; i < pixelCount; i++) {
          const pixel = document.createElement('div');
          pixel.className = 'pixel';
          
          // Posición horizontal aleatoria
          pixel.style.left = Math.random() * 100 + '%';
          
          // Posición vertical aleatoria inicial
          pixel.style.top = Math.random() * 100 + '%';
          
          // Delay aleatorio para que no todos empiecen juntos
          pixel.style.animationDelay = (Math.random() * 5) + 's';
          
          // Duración aleatoria
          pixel.style.animationDuration = (8 + Math.random() * 6) + 's';
          
          floatingPixelsContainer.appendChild(pixel);
      }
      
      console.log('Pixeles flotantes creados en proyectos:', pixelCount);
  }
});
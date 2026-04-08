'use strict';

// Configuración básica (WhatsApp, etc)
const WA_NUMBER = '5492604041470'; // Número con código de país Argentina (+54)
const WA_MSG = encodeURIComponent('Hola! Vi su catálogo y quería consultar sobre calzado disponible 👟');

// El menú cambia de color al bajar con el scroll
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function setMobileMenu(isOpen) {
  if (!navbar || !navToggle || !mobileMenu) return;

  navbar.classList.toggle('menu-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    setMobileMenu(!navbar.classList.contains('menu-open'));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenu(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      setMobileMenu(false);
    }
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Para que las cosas aparezcan con animación al scrollear
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// Link dinámico para los botones de WhatsApp
function buildWALink(customMsg) {
  const msg = customMsg ? encodeURIComponent(customMsg) : WA_MSG;
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// Set all WA links dynamically
document.querySelectorAll('[data-wa]').forEach(el => {
  const msg = el.dataset.wa;
  el.href = buildWALink(msg !== '' ? msg : null);
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
});

// El visualizador de fotos en grande (Lightbox)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentGallery = [];
let galleryIndex = 0;

function updateLightboxImg() {
  if (currentGallery.length > 0) {
    const data = currentGallery[galleryIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
  }
}

function openLightbox(images, index = 0) {
  currentGallery = images;
  galleryIndex = index;
  updateLightboxImg();
  
  // Show/Hide arrows if only one image
  const nav = document.querySelector('.lightbox-nav');
  if (nav) nav.style.display = currentGallery.length > 1 ? 'flex' : 'none';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  galleryIndex = (galleryIndex > 0) ? galleryIndex - 1 : currentGallery.length - 1;
  updateLightboxImg();
});
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  galleryIndex = (galleryIndex < currentGallery.length - 1) ? galleryIndex + 1 : 0;
  updateLightboxImg();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    setMobileMenu(false);
  }
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  }
});

// Un poquito de movimiento para las fotos del hero
const heroSection = document.getElementById('hero');
const heroImages = document.querySelectorAll('.hero-img-cell img');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const fadeEnd = window.innerHeight * 0.6;

  if (scrolled < fadeEnd) {
    const progress = scrolled / fadeEnd;
    heroImages.forEach((img, i) => {
      const direction = i % 2 === 0 ? -1 : 1;
      img.style.transform = `translateY(${progress * 20 * direction}px)`;
    });
  }
}, { passive: true });

// Para que al tocar un link de navegación baje suavemente
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      setMobileMenu(false);
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Manejo de los carruseles de las categorías (se mueven solos)
document.querySelectorAll('.cat-card').forEach(card => {
  const slides = card.querySelector('.carousel-slides');
  const items = Array.from(slides?.querySelectorAll('img') || []);
  
  if (slides && items.length > 0) {
    let currentIndex = 0;
    const totalItems = items.length;

    // Auto-swipe every 3 seconds
    setInterval(() => {
      currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3500);

    // Open category gallery in lightbox
    card.addEventListener('click', () => {
      const galleryData = items.map(img => ({ src: img.src, alt: img.alt }));
      openLightbox(galleryData, currentIndex);
    });
  }
});

// Galería de fotos del final de la página
document.querySelectorAll('.gal-item').forEach((item, index, allItems) => {
  item.addEventListener('click', () => {
    const galleryData = Array.from(allItems).map(el => {
      const img = el.querySelector('img');
      return { src: img.src, alt: img.alt };
    });
    openLightbox(galleryData, index);
  });
});

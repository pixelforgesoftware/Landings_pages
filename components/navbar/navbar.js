// ── Scroll effect ─────────────────────────────────────────────
const navbar     = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

if (navbar && window.scrollY > 40) navbar.classList.add('scrolled');

// ── Mobile menu toggle ────────────────────────────────────────
function setMobileMenu(isOpen) {
  if (!navbar || !menuToggle || !mobileMenu) return;
  navbar.classList.toggle('menu-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    setMobileMenu(!navbar.classList.contains('menu-open'));
  });

  // Cerrar al hacer clic en cualquier link del menú
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenu(false));
  });

  // Cerrar si se agranda la pantalla
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMobileMenu(false);
  });
}

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMobileMenu(false);
});

// ── Active link highlight ──────────────────────────────────────
(function markActive() {
  const path = window.location.pathname + window.location.hash;
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (path === href || (href !== '/' && path.includes(href)))) {
      a.classList.add('active');
    }
  });
})();

// ── Smooth scroll para anclas ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      setMobileMenu(false);
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════════════════
   PROYECTOS.JS — PixelForge Software
   ═══════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    num: '01',
    title: 'Barberia <span>Bowen</span>',
    topTitle: 'PROYECTO_BOWEN.exe',
    tag: 'Barberia de bowen',
    desc: 'Ayudando a que las peluquerias tengan un mejor control sobre sus clientes, gastos, ingresos, salidas, egresos, etc gracias barberayrton por confiar en nosotros!.',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'Electron', 'Backup'],
    img: '/assets/sistema_ayrton.jpeg',
    link: 'https://www.instagram.com/0800ninja/'
  },
  {
    num: '02',
    title: 'Cabañas <span>Madrigueras</span>',
    topTitle: 'PROYECTO_ALVEAR.exe',
    tag: 'Cabañas madrigueras',
    desc: 'Cabañas madrigueras general alvear decidieron dar un paso a la modernidad con nosotros implementan un crecimiento de clientela gracias a su landing page, gracias por confiar!.',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind', 'Estatics'],
    img: '/assets/cabañas_madri.jpeg',
    link: 'https://complejolasmadrigueras.com/'
  },
  {
    num: '03',
    title: 'Zapateria <span>Paso a Paso</span>',
    topTitle: 'PROYECTO_SANRAFAEL.exe',
    tag: 'E-commerce',
    desc: 'Tienda online para cliente de gemeral alvear con catálogo de productos, integración con medios de pago y panel de administración para gestionar stock y pedidos en whatsapp para ser mas humanos, gracias por confiar!.',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
    img: '/assets/landing_page_lujan2.jpeg',
    link: 'https://zapateriapasoapaso.site/'
  },
  {
    num: '04',
    title: 'Shomer <span>Seguridad</span>',
    topTitle: 'PROYECTO_SEGURIDAD.exe',
    tag: 'Sistema de matriculas',
    desc: 'Sistema de gestión de matricuas para administrar el ingreso al objetivo. Permite a los trabajadores obtener su oblea y a los de seguridad les permite editar esas obleas agregar nuevas o eliminarlas con 2 roles administrativos generados, gracias por la confianza!',
    techs: ['Vue.js', 'Laravel', 'MySQL', 'Twilio'],
    img: '/assets/shomer2.jpeg',
    link: '#'
  },
  {
    num: '05',
    title: 'Gym <span>FitPro</span>',
    topTitle: 'PROYECTO_FITPRO.exe',
    tag: 'Sistema de socios',
    desc: 'Plataforma de gestión completa para gimnasio. Control de socios, vencimientos de cuotas, clases y actividades, acceso con QR y reportes mensuales. El dueño maneja todo desde el celular.',
    techs: ['React', 'Node.js', 'PostgreSQL', 'QR Code'],
    img: '/assets/Servicio_ventas.webp',
    link: '#'
  },
  {
    num: '06',
    title: 'Tienda <span>Ropa</span>',
    topTitle: 'PROYECTO_TIENDA.exe',
    tag: 'E-commerce',
    desc: 'E-commerce de indumentaria con catálogo filtrable por talla, color y categoría. Integración con Instagram Shopping, carrito persistente y proceso de compra simplificado con MercadoPago.',
    techs: ['Next.js', 'Stripe', 'Sanity CMS', 'Vercel'],
    img: '/assets/Servicio_Tienda_ropa.webp',
    link: '#'
  },
  {
    num: '07',
    title: 'Centro <span>Deportivo</span>',
    topTitle: 'PROYECTO_DEPORTIVO.exe',
    tag: 'App de reservas',
    desc: 'Aplicación web para reserva de canchas y actividades en un centro deportivo. Los usuarios ven disponibilidad en tiempo real, reservan y pagan online. El staff gestiona horarios y cancellaciones desde el panel.',
    techs: ['React', 'Firebase', 'Node.js', 'MercadoPago'],
    img: '/assets/Servicio_gyms.webp',
    link: '#'
  },
  {
    num: '08',
    title: 'Tu <span>Proyecto</span>',
    topTitle: 'PROYECTO_TUYO.exe',
    tag: '¿El próximo?',
    desc: '¿Tenés una idea y no sabés por dónde arrancar? Nosotros te ayudamos a definir, diseñar y desarrollar tu sistema a medida. Trabajamos con vos desde el concepto hasta el deploy, con soporte incluido.',
    techs: ['A tu medida', 'Tu stack', 'Tu presupuesto'],
    img: '/assets/software_particular.webp',
    link: '#contacto'
  }
];

(function () {
  const backdrop = document.getElementById('prjModalBackdrop');
  const modal    = document.getElementById('prjModal');
  const closeBtn = document.getElementById('prjModalClose');

  // Referencias a elementos del modal
  const elNum    = document.getElementById('prjModalNum');
  const elTitle  = document.getElementById('prjModalTitle');
  const elDesc   = document.getElementById('prjModalDesc');
  const elImg    = document.getElementById('prjModalImg');
  const elTechs  = document.getElementById('prjModalTechs');
  const elLink   = document.getElementById('prjModalLink');
  const elTopTitle = document.getElementById('prjModalTopTitle');

  // Abrir modal
  function openModal(idx) {
    const p = PROJECTS[idx];
    if (!p) return;

    elNum.textContent      = p.num;
    elTitle.innerHTML      = p.title;
    elDesc.textContent     = p.desc;
    elImg.style.backgroundImage = `url('${p.img}')`;
    elLink.href            = p.link;
    elTopTitle.textContent = p.topTitle;

    // Techs
    elTechs.innerHTML = p.techs
      .map(t => `<span class="prj-modal-tech">${t}</span>`)
      .join('');

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus trap básico
    setTimeout(() => closeBtn.focus(), 50);
  }

  // Cerrar modal
  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Click en cards
  document.querySelectorAll('.prj-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.project, 10);
      openModal(idx);
    });
  });

  // Cerrar con botón
  closeBtn.addEventListener('click', closeModal);

  // Cerrar al hacer click en el backdrop (fuera del modal)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.prj-header, .prj-grid').forEach(el => {
    observer.observe(el);
  });

})();

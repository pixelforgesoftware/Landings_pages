// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Create floating pixels
(function() {
    const container = document.getElementById('floatingPixels');
    if (!container) return;
    const colors = ['rgba(1,128,235,0.25)', 'rgba(0,220,255,0.15)', 'rgba(1,96,192,0.2)'];
    const sizes = [8, 12, 16, 20];
    for (let i = 0; i < 40; i++) {
        const px = document.createElement('div');
        px.className = 'pixel';
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        px.style.cssText = `
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            width:${size}px;
            height:${size}px;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            animation-delay:${Math.random()*6}s;
            animation-duration:${3+Math.random()*5}s;
        `;
        container.appendChild(px);
    }
})();

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .project-card').forEach(card => {
    observer.observe(card);
});

// =============================================================================
// MODALES - Sistema de gestión de modales para todos los servicios
// =============================================================================

// Configuración de modales
const modalsConfig = [
    {
        modalId: 'plansModal',
        closeId: 'closePlansModal',
        triggerClass: 'service-gym'
    },
    {
        modalId: 'cabanasModal',
        closeId: 'closeCabanasModal',
        triggerClass: 'service-cabañas'
    },
    {
        modalId: 'ecommerceModal',
        closeId: 'closeEcommerceModal',
        triggerClass: 'service-ecommerce'
    },
    {
        modalId: 'newsModal',
        closeId: 'closeNewsModal',
        triggerClass: 'service-news'
    },
    {
        modalId: 'personalizadoModal',
        closeId: 'closePersonalizadoModal',
        triggerClass: 'service-personalizado'
    }
];

// Función para abrir modal
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar modal
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Configurar cada modal
modalsConfig.forEach(config => {
    const modal = document.getElementById(config.modalId);
    const closeBtn = document.getElementById(config.closeId);
    const triggerCard = document.querySelector(`.${config.triggerClass}`);

    if (modal && triggerCard) {
        // Abrir modal al hacer click en el servicio
        triggerCard.addEventListener('click', () => {
            openModal(modal);
        });

        // Cerrar modal con el botón X
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }

        // Cerrar modal al hacer click en el overlay (fondo oscuro)
        // pero NO en el contenido del modal
        modal.addEventListener('click', (e) => {
            // Solo cerrar si el click es directamente en el modal (el overlay)
            // y NO en el contenido
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
});

// Cerrar cualquier modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalsConfig.forEach(config => {
            const modal = document.getElementById(config.modalId);
            if (modal && modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    }
});

// Modal de Sistema de Ventas
const ventasCards = document.querySelectorAll('.service-ventas');
const ventasModal = document.getElementById('ventasModal');
const closeVentasModal = document.getElementById('closeVentasModal');

ventasCards.forEach(card => {
    card.addEventListener('click', () => {
        ventasModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeVentasModal?.addEventListener('click', () => {
    ventasModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Cerrar modal de ventas al hacer click fuera
ventasModal?.addEventListener('click', (e) => {
    if (e.target === ventasModal) {
        ventasModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
// =============================================================================
// SELECTOR DE SISTEMAS (pfSelect)
// =============================================================================

const topbarTitles = [
    'PIXELBARBER · v2.1',
    'PIXELSTOCK · v1.4',
    'ORAMGYM · v3.0',
    'RESTAURANTE OS · v2.0',
    'LANDING PAGE · DEPLOY',
    'MARKETPLACE · v1.0',
    'VOZ MARKETING · REDES',
    'SOFTWARE A MEDIDA'
];

function pfSelect(el, idx) {
    document.querySelectorAll('.pf-sys-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.pf-panel').forEach(p => p.classList.remove('visible'));
    document.getElementById('pfPanel' + idx).classList.add('visible');
    document.getElementById('pfTopbarTitle').textContent = topbarTitles[idx];
}

// =============================================================================
// BOTÓN EMOCIONAR
// =============================================================================

const btnEmocionar = document.getElementById('btnEmocionar');
const heroLogo     = document.getElementById('heroLogo');
let played = false;

if (btnEmocionar && heroLogo) {
    btnEmocionar.addEventListener('click', () => {
        window.open('https://wa.me/5492625419121?text=Hola!%20me%20interesa%20saber%20mas%20sobre%20sus%20servicios!', '_blank');
    });
}

// =============================================================================
// MODALES GENERICOS (px-modal)
// =============================================================================

function openPxModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePxModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.px-modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.px-modal.active').forEach(m => {
            m.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});

// =============================================================================
// ACORDEÓN DE SERVICIOS
// =============================================================================

document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const item = trigger.closest('.acc-item');
        const isOpen = item.classList.contains('open');

        // Cerrar todos
        document.querySelectorAll('.acc-item.open').forEach(openItem => {
            openItem.classList.remove('open');
            openItem.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
        });

        // Abrir el clickeado si estaba cerrado
        if (!isOpen) {
            item.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        }
    });
});

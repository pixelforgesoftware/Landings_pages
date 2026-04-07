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
const floatingPixelsContainer = document.getElementById('floatingPixels');
for (let i = 0; i < 6; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.left = Math.random() * 100 + '%';
    pixel.style.top = Math.random() * 100 + '%';
    pixel.style.animationDelay = Math.random() * 2 + 's';
    pixel.style.animationDuration = (3 + Math.random() * 4) + 's';
    floatingPixelsContainer.appendChild(pixel);
}

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
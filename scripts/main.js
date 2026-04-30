document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer para animaciones al hacer scroll (Reemplaza Framer Motion whileInView)
  const sections = document.querySelectorAll('.scroll-anim');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Dejar de observar una vez que ya animó para no repetir (triggerOnce)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // 2. Control del Logo Flotante (Scroll Opacity)
  const floatingLogo = document.getElementById('floating-logo');
  if (floatingLogo) {
    window.addEventListener('scroll', () => {
      // Aparece progresivamente en los primeros 100px de scroll
      const scrollY = window.scrollY;
      let opacity = scrollY / 100;
      if (opacity > 1) opacity = 1;
      floatingLogo.style.opacity = opacity.toString();
    });
  }

  // 3. Cuenta Regresiva (Countdown)
  // Fecha objetivo: 24 de octubre de 2026 a las 19:00 hs
  const targetDate = new Date("2026-10-24T19:00:00").getTime();
  
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (elDays) elDays.innerText = "0";
      if (elHours) elHours.innerText = "0";
      if (elMinutes) elMinutes.innerText = "0";
      if (elSeconds) elSeconds.innerText = "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.innerText = days.toString();
    if (elHours) elHours.innerText = hours.toString();
    if (elMinutes) elMinutes.innerText = minutes.toString();
    if (elSeconds) elSeconds.innerText = seconds.toString();
  }

  // Actualizar cada segundo
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Llamada inicial

  // 4. Simulador del Formulario RSVP
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = rsvpForm.querySelector('button');
      const originalText = btn.innerText;
      btn.innerText = "Enviando...";
      btn.disabled = true;

      // Simular tiempo de carga
      setTimeout(() => {
        rsvpForm.innerHTML = `
          <div style="text-align: center; padding: 40px 0;">
            <h3 class="font-serif" style="font-size: 2rem; color: var(--color-terracota); margin-bottom: 16px;">¡Gracias!</h3>
            <p style="color: var(--color-text-medium);">Tu asistencia fue confirmada. Nos vemos el 24 de octubre.</p>
          </div>
        `;
      }, 1500);
    });
  }

  // 4.5. Lógica del Stepper (Cantidad de Invitados)
  const minusBtn = document.getElementById('minus-btn');
  const plusBtn = document.getElementById('plus-btn');
  const guestInput = document.getElementById('guest-count');

  if (minusBtn && plusBtn && guestInput) {
    minusBtn.addEventListener('click', () => {
      let val = parseInt(guestInput.value);
      if (val > 1) {
        guestInput.value = (val - 1).toString();
      }
      updateStepperButtons();
    });

    plusBtn.addEventListener('click', () => {
      let val = parseInt(guestInput.value);
      if (val < 10) {
        guestInput.value = (val + 1).toString();
      }
      updateStepperButtons();
    });

    function updateStepperButtons() {
      const val = parseInt(guestInput.value);
      minusBtn.disabled = val <= 1;
      plusBtn.disabled = val >= 10;
    }

    updateStepperButtons(); // Estado inicial
  }

  // 5. Sobre Interactivo — Toggle de apertura/cierre
  const envelopeScene = document.getElementById('envelope-scene');
  const invitationCard = document.getElementById('invitation-card');

  if (envelopeScene && invitationCard) {

    function toggleEnvelope() {
      const isOpen = envelopeScene.classList.toggle('is-open');

      if (isOpen) {
        // ── ABRIR ──────────────────────────────────────────────
        // Animar con la altura real del contenido para suavidad
        invitationCard.style.maxHeight = invitationCard.scrollHeight + 'px';
        invitationCard.removeAttribute('aria-hidden');
        envelopeScene.setAttribute('aria-label', 'Invitación abierta, tocá para cerrar');
      } else {
        // ── CERRAR ─────────────────────────────────────────────
        // Colapsar la tarjeta (la transición CSS se encarga de la animación)
        invitationCard.style.maxHeight = '0';
        invitationCard.setAttribute('aria-hidden', 'true');
        envelopeScene.setAttribute('aria-label', 'Sobre de invitación, tocá para abrir');
      }
    }

    // Clic / tap
    envelopeScene.addEventListener('click', toggleEnvelope);

    // Teclado: Enter o Space para accesibilidad
    envelopeScene.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEnvelope();
      }
    });
  }
});

// Función para copiar texto al portapapeles (CBU/Alias)
function copyText(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    // Feedback visual simple
    const btn = event.currentTarget;
    const originalIcon = btn.innerHTML;
    
    // Cambiar a icono de check temporalmente
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    btn.style.color = "#4ADE80"; // Verde
    
    setTimeout(() => {
      btn.innerHTML = originalIcon;
      btn.style.color = ""; // Volver al color original
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar: ', err);
  });
}

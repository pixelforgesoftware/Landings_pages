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
  // Fecha objetivo: 9 de octubre de 2026 a las 19:00 hs
  const targetDate = new Date("2026-10-09T19:00:00").getTime();
  
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

  // 4. Integración Real del Formulario RSVP (Google Sheets)
  const rsvpForm = document.getElementById('rsvp-form');
  // URL de tu Web App desplegada en Apps Script
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEaHCyM98mx4b2mS06-jlkV90YRaV6iy2yWkhwZqcogMFR4aTyEcijkPMjZFJTCXPe/exec';

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = rsvpForm.querySelector('.btn-primary');
      const originalText = btn.innerText;
      btn.innerText = "Enviando...";
      btn.disabled = true;

      // Recolectar datos en formato URLSearchParams (más compatible)
      const formData = new FormData(rsvpForm);
      const params = new URLSearchParams();
      params.append('nombre', formData.get('nombre'));
      params.append('invitados', formData.get('guests'));
      params.append('menu', formData.get('menu'));
      params.append('alergias', formData.get('alergias') || 'Ninguna');

      // Enviar a Google Apps Script
      fetch(SCRIPT_URL + "?action=rsvp", {
        method: 'POST',
        mode: 'no-cors',
        body: params
      })
      .then(() => {
        // Al usar 'no-cors' no podemos leer la respuesta, pero si llega aquí es éxito
        rsvpForm.innerHTML = `
          <div class="animate-fade-in" style="text-align: center; padding: 40px 0;">
            <div style="margin-bottom: 24px;">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#C1765A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 class="font-serif" style="font-size: 2rem; color: var(--color-terracota); margin-bottom: 16px;">¡Confirmado!</h3>
            <p style="color: var(--color-text-medium); font-size: 1.1rem; line-height: 1.6;">
              Muchas gracias por confirmar. <br>
              ¡Nos vemos el 9 de octubre!
            </p>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar tu confirmación. Por favor, reintentá en unos minutos.');
        btn.innerText = originalText;
        btn.disabled = false;
      });
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

  // 6. Lógica de Música de Fondo (Play/Pause)
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('background-music');
  const playIcon = document.getElementById('music-play-icon');
  const pauseIcon = document.getElementById('music-pause-icon');

  if (musicToggle && bgMusic && playIcon && pauseIcon) {
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play()
          .then(() => {
            musicToggle.classList.add('is-playing');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
          })
          .catch(error => {
            console.error("No se pudo iniciar la música:", error);
          });
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('is-playing');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
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

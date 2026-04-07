        // Manejo del formulario
        document.getElementById('contactForm').addEventListener('submit', function(e) {
          e.preventDefault();
          
          const formData = {
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
              subject: document.getElementById('subject').value,
              message: document.getElementById('message').value
          };

          // Aquí puedes agregar la lógica para enviar el formulario
          // Por ejemplo, usando fetch a tu API o enviando por email
          
          alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
          this.reset();
      });
      // Crear pixeles flotantes
document.addEventListener('DOMContentLoaded', () => {
  const floatingPixelsContainer = document.getElementById('floatingPixels');
  
  if (floatingPixelsContainer) {
      // Crear entre 10-15 pixeles
      const pixelCount = 12;
      
      for (let i = 0; i < pixelCount; i++) {
          const pixel = document.createElement('div');
          pixel.className = 'pixel';
          
          // Posición horizontal aleatoria
          pixel.style.left = Math.random() * 100 + '%';
          
          // Delay aleatorio para que no todos empiecen juntos
          pixel.style.animationDelay = (Math.random() * 5) + 's';
          
          // Duración aleatoria
          pixel.style.animationDuration = (8 + Math.random() * 6) + 's';
          
          floatingPixelsContainer.appendChild(pixel);
      }
      
      console.log('Pixeles flotantes creados:', pixelCount);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Create floating pixels
  const floatingPixelsContainer = document.getElementById('floatingPixels');
  
  if (floatingPixelsContainer) {
      for (let i = 0; i < 8; i++) {
          const pixel = document.createElement('div');
          pixel.className = 'pixel';
          pixel.style.left = Math.random() * 100 + '%';
          pixel.style.top = Math.random() * 100 + '%';
          pixel.style.animationDelay = Math.random() * 2 + 's';
          pixel.style.animationDuration = (3 + Math.random() * 4) + 's';
          floatingPixelsContainer.appendChild(pixel);
      }
      console.log('Pixeles flotantes creados');
  }

  // Add animation to team cards on scroll
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

  // Observar las tarjetas del equipo y el formulario
  document.querySelectorAll('.team-card, .feature, .contact-form-container').forEach(card => {
      observer.observe(card);
  });
});
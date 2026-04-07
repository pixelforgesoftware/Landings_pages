// Actualizar año automáticamente en el footer
document.addEventListener('DOMContentLoaded', function() {
  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector('footer p');
  if (footerText) {
      footerText.textContent = `© ${currentYear} PixelForge Software. Todos los derechos reservados.`;
  }
});
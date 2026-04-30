document.addEventListener('DOMContentLoaded', () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEaHCyM98mx4b2mS06-jlkV90YRaV6iy2yWkhwZqcogMFR4aTyEcijkPMjZFJTCXPe/exec';
  const fileInput = document.getElementById('file-input');
  const photoGrid = document.getElementById('photo-grid');
  const emptyState = document.getElementById('empty-state');

  // 1. Cargar fotos al iniciar
  async function loadPhotos() {
    try {
      const response = await fetch(SCRIPT_URL + "?action=getPhotos");
      const photos = await response.json();
      
      if (photos.length > 0) {
        emptyState.style.display = 'none';
        photoGrid.style.display = 'grid';
        photoGrid.innerHTML = ''; // Limpiar
        
        photos.forEach(photo => {
          addPhotoToGrid(photo.url);
        });
      }
    } catch (error) {
      console.error("Error cargando fotos:", error);
    }
  }

  function addPhotoToGrid(url) {
    const item = document.createElement('div');
    item.className = 'photo-item animate-fade-in';
    item.innerHTML = `
      <img src="${url}" alt="Foto de la boda" loading="lazy" onclick="window.open('${url}', '_blank')">
    `;
    photoGrid.prepend(item); // Mostrar las nuevas primero
  }

  // 2. Manejar la subida de fotos
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const files = e.target.files;
      if (files.length === 0) return;

      // Mostrar feedback visual de carga
      const uploadArea = document.querySelector('.upload-area');
      const originalHTML = uploadArea.innerHTML;
      uploadArea.style.pointerEvents = 'none';
      uploadArea.innerHTML = `
        <div class="loader-container">
          <div class="loader"></div>
          <p style="margin-top: 10px; color: var(--color-terracota)">Subiendo tus recuerdos...</p>
        </div>
      `;

      for (let file of files) {
        try {
          const base64Data = await readFileAsBase64(file);
          
          const payload = {
            action: 'upload',
            filename: file.name,
            mimeType: file.type,
            base64: base64Data.split(',')[1]
          };

          await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(payload)
          });


          addPhotoToGrid(base64Data);
          emptyState.style.display = 'none';
          photoGrid.style.display = 'grid';

        } catch (error) {
          console.error("Error subiendo archivo:", error);
          alert("Hubo un error al subir una de las fotos.");
        }
      }

      // Restaurar área de subida
      uploadArea.innerHTML = originalHTML;
      uploadArea.style.pointerEvents = 'auto';
      fileInput.value = ''; // Limpiar input
    });
  }

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Carga inicial
  loadPhotos();
});

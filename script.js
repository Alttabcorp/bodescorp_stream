// Script mínimo para interações: menu mobile, inserir ano e alternância de tema
document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.getElementById('menuToggle');
  if(menuToggle){
    menuToggle.addEventListener('click', ()=>{
      document.body.classList.toggle('nav-open');
      // toggles dark theme for a dramatic forge feel
      document.body.classList.toggle('dark');
    });
  }

  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Watch button micro interaction
  const watchBtn = document.getElementById('watchBtn');
  if(watchBtn){
    watchBtn.addEventListener('click', ()=>{
      window.location.href = '#'; // substituir pelo link do Twitch
    });
  }

  // Modal functions
  window.openStreamModal = function() {
    const modal = document.getElementById('streamModal');
    if(modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeStreamModal = function() {
    const modal = document.getElementById('streamModal');
    if(modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  // Ornn modal functions
  window.openOrnnModal = function() {
    const modal = document.getElementById('ornnModal');
    if(modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeOrnnModal = function() {
    const modal = document.getElementById('ornnModal');
    if(modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  // Skins modal functions
  window.openSkinsModal = function() {
    const modal = document.getElementById('skinsModal');
    if(modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      loadSkinsGallery();
    }
  };

  window.closeSkinsModal = function() {
    const modal = document.getElementById('skinsModal');
    if(modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  // Load skins gallery
  async function loadSkinsGallery() {
    const container = document.getElementById('skinsGallery');
    if (!container) return;

    container.innerHTML = '<div class="loading-gallery">Carregando galeria de skins...</div>';

    try {
      const version = await getLatestVersion();
      const championData = await getChampionDetails(version, 'Ornn');
      container.innerHTML = buildModernSkinsHTML(championData.skins);
    } catch (error) {
      console.error('Erro ao carregar skins:', error);
      container.innerHTML = '<div class="error-gallery">Erro ao carregar galeria. Tente novamente.</div>';
    }
  }

  // Close modals when clicking outside
  document.addEventListener('click', function(event) {
    const streamModal = document.getElementById('streamModal');
    const ornnModal = document.getElementById('ornnModal');
    const skinsModal = document.getElementById('skinsModal');

    if(streamModal && event.target === streamModal) {
      closeStreamModal();
    }
    if(ornnModal && event.target === ornnModal) {
      closeOrnnModal();
    }
    if(skinsModal && event.target === skinsModal) {
      closeSkinsModal();
    }
  });

  // Close modals with ESC key
  document.addEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
      closeStreamModal();
      closeOrnnModal();
      closeSkinsModal();
    }
  });
});

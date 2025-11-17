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

  // Close modals when clicking outside
  document.addEventListener('click', function(event) {
    const streamModal = document.getElementById('streamModal');
    const ornnModal = document.getElementById('ornnModal');

    if(streamModal && event.target === streamModal) {
      closeStreamModal();
    }
    if(ornnModal && event.target === ornnModal) {
      closeOrnnModal();
    }
  });

  // Close modals with ESC key
  document.addEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
      closeStreamModal();
      closeOrnnModal();
    }
  });
});

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
});

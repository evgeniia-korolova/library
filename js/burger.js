document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  burger.addEventListener('click', function () {
    document.querySelector('.header').classList.toggle('open');
    document.getElementById('registration').classList.remove('open-form');
    document.getElementById('profile-popup').classList.remove('open-form');
  });
});

// Закрыть меню при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Действие при клике
    document.querySelector('.header').classList.remove('open');
  }
});

// Закрыть меню при клике вне его
document.getElementById('nav__panel').addEventListener('click', (event) => {
  event._isClickWithInMenu = true;
});
document.getElementById('burger').addEventListener('click', (event) => {
  event._isClickWithInMenu = true;
});
document.body.addEventListener('click', (event) => {
  if (event._isClickWithInMenu) return;
  // Действие при клике
  document.querySelector('.header').classList.remove('open');
});

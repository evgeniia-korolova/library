// new

// document.querySelector('.user-icon').addEventListener('click', (event) => {
//   event.preventDefault();
// //   document.querySelector('profile').classList.remove('open');
//   document.getElementById('profile-popup').classList.add('open-form');
// });

// закрываем pop-up profile
// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('profile-popup').classList.remove('open-form');
  }
});

// Закрыть модальное окно при клике вне его
document
  .querySelector('#profile-popup .drop-profile-content')
  .addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });

document.getElementById('profile-popup').addEventListener('click', (event) => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open-form');
});

// открываем библиотечную карту

document.getElementById('my-profile-btn').addEventListener('click', () => {
  // event.preventDefault();
  document.getElementById('profile-popup').classList.remove('open-form');
  document.querySelector('.profile-form-modal').classList.add('open-form');
});

// закрываем карту пользователя

document
  .querySelector('.profile-modal__close-button')
  .addEventListener('click', () => {
    document.querySelector('.profile-form-modal').classList.remove('open-form');
  });

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('profile-form-modal').classList.remove('open-form');
  }
});

// Закрыть модальное окно при клике вне его
document
  .querySelector('#profile-form-modal .profile-card-content')
  .addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });

document
  .getElementById('profile-form-modal')
  .addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open-form');
  });

// end new

// if (userIcon)

// loginClose.addEventListener('click', () => {
//     document.querySelector('.login-form').classList.remove('login-form');
//      document.querySelector('.login-form').classList.add('closed');
//   document.querySelector('.login-modal-content').reset();
// });

// new

document.querySelector('.user-icon').addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('profile-popup').classList.remove('closed');
  document.getElementById('profile-popup').classList.add('open');
});

// document.querySelector('.my-profile-btn').addEventListener('click', (event) => {
//   event.preventDefault();
// });

// document.querySelector('.log-out-btn').addEventListener('click', (event) => {
//   event.preventDefault();
// });

// end new

// open login modal from pop-up

const dropLoginLogin = document.getElementById('drop-loginLogin');

dropLoginLogin.addEventListener('click', () => {
  document.getElementById('login-form').classList.add('open-form');
  document.getElementById('registration').classList.remove('open');
});

// open login modal from digital card section

const logInBtn = document.getElementById('logInBtn');
logInBtn.addEventListener('click', () => {
  document.querySelector('.login-form').classList.add('open-form');
});

const loginClose = document.querySelector('.login-close');

loginClose.addEventListener('click', () => {
  document.getElementById('login-form').classList.remove('open-form');
});

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('login-form').classList.remove('open-form');
  }
});

// Закрыть модальное окно при клике вне его
document
  .querySelector('#login-form .login-modal-content')
  .addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });
document.getElementById('login-form').addEventListener('click', (event) => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open-form');
});

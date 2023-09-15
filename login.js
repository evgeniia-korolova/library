// refactoring login button
const loginBtnInCard = document.getElementById('loginBtnInCard');

loginBtnInCard.addEventListener('click', () => {
  document.getElementById('login-form').classList.add('open-form');
  //
  document.getElementById('reg-form').classList.remove('open-form');
});

const loginInRegModal = document.getElementById('loginInRegModal');
loginInRegModal.addEventListener('click', () => {
  document.getElementById('login-form').classList.add('open-form');
  document.getElementById('reg-form').classList.remove('open-form');
});

const dropLoginLogin = document.getElementById('drop-loginLogin');
dropLoginLogin.addEventListener('click', () => {
  document.getElementById('login-form').classList.add('open-form');
  document.getElementById('registration').classList.remove('open-form');
});

const registerInLogin = document.getElementById('regInLogModal');
registerInLogin.addEventListener('click', () => {
  document.getElementById('reg-form').classList.add('open-form');
  document.getElementById('login-form').classList.remove('open-form');
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

// // !!!!!!!! delete!!!!!!!закрыть модальное окно reg-form при клике на кнопку sign-up

// закрыть модалку login при клике на кнопку log in

// document.getElementById('sign-up').addEventListener('click', () => {
//   document.getElementById('login-form').classList.remove('open-form');
// });

// 09.09.23


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

// закрыть модальное окно при клике на кнопку sign-up

document.getElementById('sign-up').addEventListener(() => {
  document.getElementById('login-form').classList.remove('open-form');
});




// 09.09.23

  document.querySelector('.user-icon').addEventListener('click', (event) => {
    event.preventDefault();

    let user = localStorage.getItem('loggedInUser');
    if (user) {
      document.getElementById('profile-popup').classList.remove('closed');
      document.getElementById('profile-popup').classList.add('open-form');
    }
  });

  const doLogin = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    let { firstName, lastName } = user;
    let userInitials = firstName[0].toUpperCase() + lastName[0].toUpperCase();
    let fullName = `${firstName} ${lastName}`;

    let logo = document.querySelector('.logo');
    logo.classList.add('closed');

    let userLogo = document.querySelector('.user-icon');
    userLogo.innerHTML = userInitials;
    userLogo.setAttribute('title', fullName);
    userLogo.classList.remove('closed');
};
  
document
  .getElementById('login-modal-content')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    let emailOrCard = document.getElementById('emailorCardLogin').value;
    let password = document.getElementById('passLogin').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let registeredUser = users.find((user) => {
      return (
        user.pass === password &&
        (user.email === emailOrCard || user.card === Number(emailOrCard))
      );
    });

    console.log(registeredUser, users, emailOrCard, password);

    if (registeredUser) {
      doLogin(registeredUser);
    }

    document.querySelector('.login-form').classList.remove('open');
  });
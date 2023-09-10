// drop-down menu non-registered user

const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  document.getElementById('registration').classList.add('open-form');
});

// Закрыть pop-up registration окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('registration').classList.remove('open-form');
  }
});

// Закрыть pop-up registration окно при клике вне его
document
  .querySelector('#registration .drop-registration-content')
  .addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });
document.getElementById('registration').addEventListener('click', (event) => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open-form');
});

// non-registered user : registration

// открываем модалку регистрации

const dropRegisterBtn = document.getElementById('drop-registerBtn');

dropRegisterBtn.addEventListener('click', () => {
  document.getElementById('reg-form').classList.add('open-form');
  document.getElementById('registration').classList.remove('open-form');
});

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('reg-form').classList.remove('open-form');
  }
});

// Закрыть модальное окно при клике вне его
document
  .querySelector('#reg-form .registration-modal-content')
  .addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });
document.getElementById('reg-form').addEventListener('click', (event) => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open-form');
});

//закрываем модалку регистрации по крестику

const regForm = document.querySelector('.reg-form');

const close = document.querySelector('.close');
close.addEventListener('click', () => {
  document.querySelector('.reg-form').classList.remove('open-form');
  document.querySelector('.registration-modal-content').reset();
});

// 09.09.23

const FORM = document.getElementById('registration-modal-content');

FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let exist = users.some((data) => data.email == email);

  if (!exist) {
    let pass = document.getElementById('pass').value;
    let passwordError = document.getElementById('password-error');
    if (pass.length < 8) {
      passwordError.classList.add('open');
      passwordError.classList.remove('closed');
      return;
    } else if (passwordError.classList.contains('open')) {
      passwordError.classList.remove('open');
      passwordError.classList.add('closed');
    }

    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;

    let user = {
      firstName,
      lastName,
      email,
      pass,
      card: getCardNumber(),
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    doLogin(user);

    document.querySelector('.registration-modal-content').reset();
    document.getElementById('first-name').focus();
  } else {
    alert('You are already registered. Please log in');
  }

  document.querySelector('.reg-form').classList.remove('open-form');
});

//

//проверяем кол-во символов пароля
// const PSWD_INPUT = document.getElementById('pass');

// const checkPasswordParameters = () => {
//   if (PSWD_INPUT.value < 8) {
//     return false
//   } else {
//     return true
//  }}

// PSWD_INPUT.addEventListener('change', (event) => {
//   const PSWD = event.target.value;
//   const isValid = checkPasswordParameters();
//   if (!isValid) return;

//   if (PSWD.length < 8) {
//     event.target.classList.add('invalid');

//   } else {
//     event.target.classList.remove('invalid');
//   }
// });

// digital card
// open registration modal
const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', () => {
  document.querySelector('.reg-form').classList.add('open-form');
});

// card number

function getCardNumber(min = 100000000, max = 999999999) {
  return Math.floor(Math.random() * (max - min + 1) + min).toString(16);
}

// checkCardBtn.addEventListener('click', () => {
//   checkCardBtn.classList.remove('open');
//   checkCardBtn.classList.add('closed');
//   cardDetails.classList.remove('closed');
//   cardDetails.classList.add('open-icons');
// })

// digital card

const checkCardBtn = document.querySelector('.check__card__btn');
const cardDetails = document.querySelector('.card__details');

checkCardBtn.addEventListener('click', () => {
  const users = JSON.parse(localStorage.getItem('users'));

  const name = document.getElementById('readerName').value;
  const card = document.getElementById('readerCard').value;

  const user = users.find(
    (u) => u.firstName === name && u.card === Number(card)
  );

  if (user) {
    checkCardBtn.classList.remove('open');
    checkCardBtn.classList.add('closed');
    cardDetails.classList.remove('closed');
    cardDetails.classList.add('open-icons');

    setTimeout(() => {
      // hide statistics and show button
      cardDetails.classList.remove('open-icons');
      checkCardBtn.classList.remove('closed');
      checkCardBtn.classList.add('open');
    }, 10000);
  }
});

const users = JSON.parse(localStorage.getItem('users'));
console.log(users);

// drop-down menu non-registered user

const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  document.getElementById('registration').classList.toggle('open-form');
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

// ----------------


document.querySelector('.user-icon').addEventListener('click', (event) => {
  event.preventDefault();

  let user = localStorage.getItem('loggedInUser');
  if (user) {
    // document.getElementById('profile-popup').classList.remove('closed');
    document.getElementById('profile-popup').classList.toggle('open-form');
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



document.getElementById('login-modal-content')
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

    document.querySelector('.login-form').classList.remove('open-form');
  });

// 09.09.23

const code = document.querySelector('.drop-menu__code');

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

// digital card
// open registration modal
const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', () => {
  document.querySelector('.reg-form').classList.add('open-form');
});

// card number

function getCardNumber() {
  const cardLength = 9;
  const symbols = '1234567890ABCDEFghijklom';
  let result = '';

  for (let i = 0; i < cardLength; i++) {
    const index = Math.floor(Math.random() * symbols.length);
    result += symbols[index];
  }
  return result;
}



// digital card

const checkCardBtn = document.querySelector('.check__card__btn');
const cardDetails = document.querySelector('.card__details');

checkCardBtn.addEventListener('click', () => {
  const users = JSON.parse(localStorage.getItem('users'));

  const name = document.getElementById('readerName').value;
  const card = document.getElementById('readerCard').value;



  const user = users.find(
    (u) => u.firstName === name && u.card === card
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


// -------------------

// const logOut = document.getElementById('log-out-btn');




// window.addEventListener('load', (event) => {
//   logOut.onclick = function () {
//     location.reload(true);
//   };
// });

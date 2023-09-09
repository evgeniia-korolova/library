// drop-down menu non-registered user

const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  document.getElementById('registration').classList.add('open');
});

// не получилось

const popReg = document.getElementById('registration');
popReg.addEventListener('click', (event) => {
  event._isClickWithInPopReg = true;
  // console.log('true');
});

// Закрыть маленькое окно при клике вне его
document.body.addEventListener('click', (event) => {
  // console.log(event);
  if (event._isClickWithInPopReg == true) return;
});

// 

// non-registered user : registration

// первая маленькая форма

const dropRegisterBtn = document.getElementById('drop-registerBtn');

dropRegisterBtn.addEventListener('click', () => {
  document.getElementById('reg-form').classList.add('open-form');
  document.getElementById('registration').classList.remove('open');
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







const regForm = document.querySelector('.reg-form');

const close = document.querySelector('.close');
close.addEventListener('click', () => {
  regForm.classList.remove('open-form');
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
// FORM.addEventListener('submit', (event) => {
//   event.preventDefault();
//   let users = JSON.parse(localStorage.getItem('user')) || [];
//   const email = document.getElementById('email').value;
//   let exist =
//     users.length &&
//     JSON.parse(localStorage.getItem('user')).some(
//       (data) => data.email == email
//     );

//   if (!exist) {
//     let fName = document.getElementById('first-name').value;
//     let lName = document.getElementById('last-name').value;
//     let eMail = document.getElementById('email').value;
//     let passW = document.getElementById('pass').value;
//     users.push({
//       firstName: fName,
//       lastName: lName,
//       email: eMail,
//       pass: passW,
//       card: getCardNumber(),
//     });

//     let logoFirstLetter = fName[0].toUpperCase();
//     let logoSecondLetter = lName[0].toUpperCase();

//     let logo = document.querySelector('.logo');
//     logo.classList.add('closed');

//     // user Logo start

//     let userLogo = document.querySelector('.user-icon');
//     userLogo.innerHTML = `${logoFirstLetter}${logoSecondLetter}`;
//     userLogo.classList.remove('closed');
//     let userAttr = `${fName} ${lName}`;
//     userLogo.setAttribute('title', `${userAttr}`);
//     // user Logo end

//     console.log(fName);

//     localStorage.setItem('user', JSON.stringify(users));
//     console.log(localStorage);

//     let cardNameInput = document.getElementById('readerName');
//     cardNameInput.setAttribute('placeholder', `${fName}`);
//     let cardNumberInput = document.getElementById('card-number');
//     // cardNumberInput.setAttribute('placeholder', `${cardNumberOnInput}`);

//     document.querySelector('.registration-modal-content').reset();

//     document.getElementById('first-name').focus();
//   } else {
//     alert('You are already registered. Please log in');
//   }

//   regForm.classList.remove('open-form');
// });

// <>09.09.23





//проверяем кол-во символов пароля
// const PSWD_INPUT = document.getElementById('pass');

// const checkPasswordParameters = () => {
//   if (PSWD_INPUT.value < 8) {
//     return false;
//   } else {
//     return true;
//   }
// };

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
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// library-card

const checkCardBtn = document.querySelector('.check__card__btn');
const cardDetails = document.querySelector('.card__details');

checkCardBtn.addEventListener('click', () => {
  checkCardBtn.classList.remove('open');
  checkCardBtn.classList.add('closed');
  cardDetails.classList.remove('closed');
  cardDetails.classList.add('open-icons');
});

setTimeout(() => {
  // hide statistics and show button
  cardDetails.classList.remove('open-icons');
  checkCardBtn.classList.remove('closed');
  checkCardBtn.classList.add('open');
  // showReaderInfo();
}, 10000);

// почeму null???????

// const users = JSON.parse(localStorage.getItem('users'));
// console.log(users);

//   const name = document.getElementById('first-name');
//   console.log(name)
//   const card = document.getElementById('card');
//   const user = users.find(
//     (u) => u.name === name.value && u.card === card.value
//   );

//   if (user) {
//     console.log('ура, можно показать данные и спрятать кнопку');
//   }
// })

// regForm.classList.remove('open');

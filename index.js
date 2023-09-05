document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('burger').addEventListener('click', function () {
    document.querySelector('.header').classList.toggle('open');
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

// slider desktop
const track = document.querySelector('.track-dt');
const carouselWidth = document.querySelector(
  '.carousel-container-dt'
).offsetWidth;

document
  .querySelectorAll('.slider-pagination-dt li')
  .forEach(function (indicator, index) {
    indicator.addEventListener('click', function () {
      articleIndex = index;
      document
        .querySelector('.slider-pagination-dt .selected')
        .classList.remove('selected');
      indicator.classList.add('selected');
      track.style.transform = 'translate(' + articleIndex * -20 + '%)';
    });
  });

// slider tablet

const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.slider-pagination ul');
let articleIndex = 0;

rightArrow.addEventListener('click', function () {
  articleIndex = articleIndex < 4 ? articleIndex + 1 : 4;
  document
    .querySelector('.slider-pagination .selected')
    .classList.remove('selected');
  indicatorParents.children[articleIndex].classList.add('selected');
  slider.style.transform = 'translate(' + articleIndex * -20 + '%)';
  // slider.style.transform = 'translate(`${articleIndex} * -20`%)';
});

leftArrow.addEventListener('click', function () {
  articleIndex = articleIndex > 0 ? articleIndex - 1 : 0;
  document
    .querySelector('.slider-pagination .selected')
    .classList.remove('selected');
  indicatorParents.children[articleIndex].classList.add('selected');
  slider.style.transform = 'translate(' + articleIndex * -20 + '%)';
});

document
  .querySelectorAll('.slider-pagination li')
  .forEach(function (indicator, index) {
    indicator.addEventListener('click', function () {
      articleIndex = index;
      document
        .querySelector('.slider-pagination .selected')
        .classList.remove('selected');
      indicator.classList.add('selected');
      slider.style.transform = 'translate(' + articleIndex * -20 + '%)';
    });
  });

// faded books-slider

const controls = document.querySelectorAll('.radio__item');

const fadedSlides = document.querySelectorAll('.season-slide');

let currentSlide = 1;

let manualNav = function (manual) {
  fadedSlides.forEach((slide) => {
    slide.classList.remove('active');

    controls.forEach((control) => {
      control.classList.remove('checked');
    });
  });

  fadedSlides[manual].classList.add('active');
  controls[manual].classList.add('checked');
};

controls.forEach((control, i = 0) => {
  control.addEventListener('click', () => {
    manualNav(i);
    currentSlide = i;
  });
});

// drop-down menu non-registered user

const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  document.getElementById('registration').classList.add('open');
});

// non-registered user : registration

// первая маленькая форма

const dropRegisterBtn = document.getElementById('drop-registerBtn');

dropRegisterBtn.addEventListener('click', () => {
  document.getElementById('reg-form').classList.add('open');
  document.getElementById('registration').classList.remove('open');
});

// закрываем форму регистрации по клику вне формы

const regForm = document.querySelector('.reg-form');


const close = document.querySelector('.close');
close.addEventListener('click', () => {
  document.querySelector('.reg-form').classList.remove('open');
  document.querySelector('.registration-modal-content').reset();
});

// const signUp = document.getElementById('sign-up');
const FORM = document.getElementById('registration-modal-content');

//
FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem('user')) || [];
  const email = document.getElementById('email').value;
  let exist =
    users.length &&
    JSON.parse(localStorage.getItem('user')).some(
      (data) => data.email == email
    );

  if (!exist) {
    let fName = document.getElementById('first-name').value;
    let lName = document.getElementById('last-name').value;
    let eMail = document.getElementById('email').value;
    let passW = document.getElementById('pass').value;
    users.push({
      firstName: fName,
      lastName: lName,
      email: eMail,
      pass: passW,
      card: getCardNumber(),
    });

    let logoFirstLetter = fName[0].toUpperCase();
    let logoSecondLetter = lName[0].toUpperCase();
    console.log(logoFirstLetter);
    console.log(logoSecondLetter);

    let logo = document.querySelector('.logo');
    logo.classList.add('closed');

    let userLogo = document.querySelector('.user-icon');
    userLogo.innerHTML = `${logoFirstLetter}${logoSecondLetter}`;
    userLogo.classList.remove('closed');

    localStorage.setItem('user', JSON.stringify(users));
    document.querySelector('.registration-modal-content').reset();

    document.getElementById('first-name').focus();
  } else {
    alert('You are already registered. Please log in');
  }

  regForm.classList.remove('open');
});


//проверяем кол-во символов пароля
const PSWD_INPUT = document.getElementById('pass');

const checkPasswordParameters = () => {
  if (PSWD_INPUT.value < 8) {
    return false
  } else {
    return true
}}



PSWD_INPUT.addEventListener('change', (event) => {
  const PSWD = event.target.value;
  const isValid = checkPasswordParameters();
  if (!isValid) return;
  
  if (PSWD.length < 8) {
    event.target.classList.add('invalid');
    
  } else {
    event.target.classList.remove('invalid');
  }
});



// digital card
const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', () => {
  document.querySelector('.reg-form').classList.add('open');
});

// card number


function getCardNumber(min = 100000000, max = 999999999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

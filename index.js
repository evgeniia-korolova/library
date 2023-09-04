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
  document.getElementById('registration').style.display = 'block';
});

// non-registered user : registration

// первая маленькая форма

const dropRegister = document.getElementById('drop-register');

dropRegister.addEventListener('click', () => {
  document.querySelector('.reg-form').style.display = 'block';
  document.getElementById('registration').style.display = 'none';
});

// при клике на register drop-down registration основная форма регистрации не появляется

// document.body.addEventListener('click', () => {
//   const regForm = document.querySelector('.reg-form');
//   console.log(regForm);
//   if (regForm.style.display === 'block') {
//     regForm.style.display = 'none';
//     console.log(regForm);
//   }
// });

// digital card
const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', () => {
  document.querySelector('.reg-form').style.display = 'block';
});

const close = document.querySelector('.close');
close.addEventListener('click', () => {
  document.querySelector('.reg-form').style.display = 'none';
  document.querySelector('.registration-modal-content').reset();
});

const signUp = document.getElementById('sign-up');
const FORM = document.getElementById('registration-modal-content');

//
FORM.addEventListener('submit', (event) => {
  event.preventDefault();

  // console.log(event);

  FORM.submit();
});

// const signUp = e => {
//   let user = JSON.parse(localStorage.getItem('user')) || [];
//   let exist = user.length && JSON.parse(localStorage.getItem('user')).some(data => data.email == document.getElementById('email').value
//   );

//   if (!exist) {

//     user.push({
//       firstName: document.getElementById('first-name').value,
//       lastName: document.getElementById('last-name').value,
//       email: document.getElementById('email').value,
//       pass: document.getElementById('pass').value,
//     });
//     localStorage.setItem('user', JSON.stringify(user));
//     document.querySelector('.registration-modal-content').reset();
//     e.preventDefault();
//     document.getElementById('first-name').focus();

//   } else {
//     alert("log in")
//   }
// }

// card number

let maxNumber = 999999999;
const cardNumber = Math.floor(Math.random() * maxNumber + 1);
console.log(cardNumber);

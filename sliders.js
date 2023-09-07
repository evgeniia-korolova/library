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

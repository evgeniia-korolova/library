document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('burger').addEventListener('click', function () {
    document.querySelector('header').classList.toggle('open');
})
} )


// Закрыть меню при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        // Действие при клике
        document.querySelector(".header").classList.remove("open")
    }
});

// Закрыть меню при клике вне его
document.getElementById("nav__panel").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    // Действие при клике
    document.querySelector(".header").classList.remove("open")
});

// slider

const slide = document.querySelectorAll('.slide__about');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const arrow = document.querySelectorAll('.arrow');
let slidesLength = slide.length;
let articleIndex = 0;
let currentIndex = 0;
let newIndex = 0;
const mediaQuery = window.matchMedia('(max-width: 1025px)');
const indicatorParents = document.querySelector('.slider-pagination ul');
let selectorIndex = 0;
let paginationElement = document.querySelectorAll(
  '.pagination-element');


if (mediaQuery.matches) {
  function arrowSlider() {
    if (newIndex === 0) {
      arrow[0].disabled = true;
      arrow[0].classList.add('disabled');
    } else {
      arrow[0].disabled = false;
    }
    if (newIndex === slidesLength - 1) {
      arrow[1].disabled = true;
      arrow[1].classList.add('disabled');
    } else {
      arrow[1].disabled = false;
    }
    slide[newIndex].style.display = 'block';
    slide[currentIndex].style.display = 'none';
    currentIndex = newIndex;
  }

  arrow[0].addEventListener('click', function () {
    newIndex--;
    arrowSlider();
  });

  arrow[1].addEventListener('click', function () {
    newIndex++;
    arrowSlider();
  });

  
    };




// pagination


   



// righttArrow.addEventListener('click', function () {
    
//       articleIndex = articleIndex < 4 ? articleIndex + 1 : 4;
//     //   slider.style.transform = 'translate(' + articleIndex * -20 + '%)';
//     slider.style.transform = `translate(${articleIndex * -100}%)`;
// });

// leftArrow.addEventListener('click', function () {
//     articleIndex = (articleIndex > 0) ? articleIndex - 1 : 0;
//     slider.style.transform = 'translate(' + (articleIndex) * -20 + '%)';
    
// })

// document
//   .querySelectorAll('.slider-pagination li')
//   .forEach(function (indicator, index) {
//     indicator.addEventListener('click', function () {
//       articleIndex = index;
//       document
//         .querySelector('.slider-pagination .selected')
//         .classList.remove('selected');
//       indicator.classList.add('selected');
//       slide.style.transform = 'translate(' + articleIndex * -20 + '%)';
//     });
//   });


// console.log(
//   '1.Вёрстка соответствует макету. Ширина экрана 768px +26\n2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3.На ширине экрана 768рх реализовано адаптивное меню +12 (Рекомендуется сделать появление бургер-меню на ширине 1024px'
// );

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



const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left');
const righttArrow = document.querySelector('.right');
let articleIndex = 0;


righttArrow.addEventListener('click', function () {
    // articleIndex = articleIndex + 1;
      articleIndex = articleIndex < 4 ? articleIndex + 1 : 4;
      slider.style.transform = 'translate(' + articleIndex * -20 + '%)';
    // slider.style.transform = 'translate(`${articleIndex} * -20`%)';
});

leftArrow.addEventListener('click', function () {
    articleIndex = (articleIndex > 0) ? articleIndex - 1 : 0;
    slider.style.transform = 'translate(' + (articleIndex) * -20 + '%)';
    
})


document.querySelectorAll('.controls__pagination .carousel__dot').forEach(function (indicator, index) {
    indicator.addEventListener('click', function () {
        articleIndex = index;
        // document.querySelector('.carousel__item.selected').classList.remove('selected');
        indicator.classList.add('.selected');
     slider.style.transform = 'translate(' + articleIndex * -20 + '%)';
 })   
})

console.log(
  '1.Вёрстка соответствует макету. Ширина экрана 768px +26\n2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3.На ширине экрана 768рх реализовано адаптивное меню +12 (Рекомендуется сделать появление бургер-меню на ширине 1024px'
);

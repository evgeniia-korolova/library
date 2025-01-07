// const buyBook = document.querySelectorAll('.btn.active');

// const buyBook = document.querySelectorAll('.btn.active');
// console.log(buyBook)

const buyBook = document.querySelectorAll('.buy-book');
console.log(buyBook);

buyBook.forEach((i) => {
  i.addEventListener('click', () => {
    let user = localStorage.getItem('loggedInUser');
    if (!user) {
      document.querySelector('.login-form').classList.add('open-form');
    } else {
      document.querySelector('.buy-form').classList.add('open-form');
    }
  });
});

document.querySelector('.close-buy-form').addEventListener('click', () => {
  document.querySelector('.buy-form').classList.remove('open-form');
});

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('buy-form').classList.remove('open-form');
  }
});

// Закрыть модальное окно при клике вне его
document
  .querySelector('#buy-form .buy-content')
  .addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });
document.getElementById('buy-form').addEventListener('click', (event) => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open-form');
});

// Закрыть модальное окно при клике на кнопку buy

document.querySelector('.buy-card-btn').addEventListener('click', () => {
  document.querySelector('.buy-form').classList.remove('open-form');
});

const userIcon = document.querySelector('.user-icon');

// if (userIcon)



// loginClose.addEventListener('click', () => {
//     document.querySelector('.login-form').classList.remove('login-form');
//      document.querySelector('.login-form').classList.add('closed');
//   document.querySelector('.login-modal-content').reset();
// });

const dropLoginLogin = document.getElementById('drop-loginLogin');

dropLoginLogin.addEventListener('click', () => {
    document.getElementById('login-form').classList.add('open');
    document.getElementById('registration').classList.remove('open');
})

const loginClose = document.querySelector('.login-close');

loginClose.addEventListener('click', () => {
    document.getElementById('login-form').classList.remove('open');
    
});

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("login-form").classList.remove("open")
    }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#login-form .login-modal-content").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("login-form").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});
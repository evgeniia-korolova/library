import { handleRegistration } from './registration.js';
import { handleLogin } from './login.js';
import { openModal, addModalEventListeners, closeAllModals, closeAllPopups, handleUserIconClick, closeBurgerMenu, closeOnEscape } from './helpers.js';

export function handleModals() {
	const modalOverlay = document.getElementById('modal-overlay');
	const userBtn = document.getElementById('userIcon');
	const modalContent = document.querySelector('.modal-content');
	const notAuthUserDrop = document.getElementById('notAuthUserDrop');
	const authUserDrop = document.getElementById('authUserDrop');
	const burgerMenu = document.querySelector('.nav__panel');	
	const registerBtn = document.querySelectorAll('.register-btn');
	const loginBtn = document.querySelectorAll('.login-btn');

	
	closeBurgerMenu();

	userBtn.addEventListener('click', () => {
		if (burgerMenu.classList.contains('is-open')) {
			burgerMenu.classList.remove('is-open');
		}		
	});

	window.addEventListener('click', (e) => {
		// Проверяем, клик произошел ли внутри userMenu или по userBtn
		if (
			!e.target.closest('.user-icon') &&
			!e.target.closest('.user-menu') &&
			!userMenu.classList.contains('user-menu-hidden')
		) {
			userMenu.classList.add('user-menu-hidden');
		}
	});

	closeOnEscape();
	

	function addCloseOnClickOutside() {
		modalOverlay.addEventListener('click', (e) => {
			if (e.target === modalOverlay) {
				closeBurgerMenu();
				closeAllModals();
			}
		});

		modalContent.addEventListener('click', (e) => {
			e.stopPropagation();
		});
	}

	addCloseOnClickOutside();

	function createMarkupRegisterModal() {
		openModal(`
        <div class="registration" id="registration">
          <form  class="registration-form" id="registration-form">
            <span class="close">
              <img src="./images/close_btn.svg"  alt="close-button">
            </span>
            <h3 class="form-title">Register</h3>

            <div class="form__field">
              <label for="first-name">First name</label>
              <input type="text" id="first-name" name="first-name" autocomplete="off" required>
            </div>

            <div class="form__field">
              <label for="last-name">Last name</label>
              <input type="text" id="last-name" name="last-name" autocomplete="off" required>
            </div>

            <div class="form__field">
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" autocomplete="off" required>
              <p class="form__field__error closed" id="email-error">Wrong email format</p>
            </div>

            <div class="form__field" style="margin-bottom: 10px">
              <label for="pass">Password</label>
              <input type="password" id="pass" name="pass" required autocomplete="off">
              <p class="form__field__error closed" id="password-error">Should contain at least 8 characters</p>
            </div>

            <button type="submit" class="btn-outlined btn-extra-small btn-right-auto" id="sign-upReg">
              Sign Up
            </button>            
          </form>
          <div class="text-btn__block">
            <p class="text-btn__block--text">Already have an account?</p>
            <button  class="btn-text-underlined" id="login-modal">
                Login
            </button>
          </div> 
        </div>
      `);

		addModalEventListeners('login-modal', createMarkupLoginModal);
		const registerForm = document.getElementById('registration-form');
		handleRegistration(
			registerForm,
			notAuthUserDrop,
			authUserDrop,
			userBtn
		);
	}

	function createMarkupLoginModal() {
		openModal(`
      <div class="login" id="login-form">
        <form  class="login-form" id="login-modal-content">
          <span class="close"><img src="./images/close_btn.svg"     alt="close-button">
          </span>
          <h3 class="form-title">Login</h3>

          <div class="form__field">               
            <label for="email">E-mail or readers card</label>
            <input type="text" id="emailOrCardLogin" name="email" autocomplete="off" required>
          </div>

          <div class="form__field">
            <label for="pass">Password</label>
            <input type="password" id="passLogin" style="margin-bottom: 10px" name="pass" required autocomplete="off">
          </div>

          <button type="submit" class="btn-outlined btn-extra-small btn-right-auto login-btn" id="sign-up">Log in</button>
        </form>
        <div class="text-btn__block">
          <p class="form-p">Don’t have an account?</p>
          <button type="button" class="btn-text-underlined register-btn" id="register-modal">Register</button>
        </div>
      </div>
    `);

		addModalEventListeners('register-modal',createMarkupRegisterModal);
		const loginForm = document.getElementById('login-form');
		handleLogin(
			loginForm,
			notAuthUserDrop,
			authUserDrop,
			userBtn
		);
	}

	function setupButtonListeners(buttons, callback) {
		buttons.forEach((btn) => {
			btn.addEventListener('click', () => {
				callback();
				if (!userMenu.classList.contains('user-menu-hidden')) {
					userMenu.classList.add('user-menu-hidden');
				}
			});
		});
	}

	setupButtonListeners(registerBtn, createMarkupRegisterModal);
	setupButtonListeners(loginBtn, createMarkupLoginModal);

	
}

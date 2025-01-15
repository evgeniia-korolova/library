import { handleRegistration } from '../registration.js';
import { createMarkupLoginModal } from './createMarkupLogin.js';
import { openModal } from '../utils/openCloseService/openModal.js';
import { addModalEventListeners } from '../utils/modalService/modalEventListenerService.js';

export function createMarkupRegisterModal() {
  const notAuthUserDrop = document.getElementById('notAuthUserDrop');
	const authUserDrop = document.getElementById('authUserDrop');
  const userBtn = document.getElementById('userIcon');
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

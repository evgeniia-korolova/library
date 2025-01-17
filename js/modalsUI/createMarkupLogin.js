import { createMarkupRegisterModal } from "./createMarkupRegister.js";
import { handleLogin } from '../login.js';
import { openModal } from "../utils/openCloseService/openModal.js";
import { closeAllPopups } from "../utils/popupService/closeAllPopups.js";
import { addModalEventListeners } from "../utils/modalService/modalEventListenerService.js";
import { closeAllModals } from "../utils/openCloseService/closeModal.js";

export function createMarkupLoginModal() {
  const notAuthUserDrop = document.getElementById('notAuthUserDrop');
	const authUserDrop = document.getElementById('authUserDrop');
  const userBtn = document.getElementById('userIcon');
    openModal(`
      <div class="login" id="login-form">
        <form  class="login-form" id="login-modal-content">
          <span class="close"><img src="./images/close_btn.svg"     alt="close-button">
          </span>
          <h3 class="form-title">Login</h3>

          <div class="form__field">               
            <label for="email">E-mail or readers card</label>
            <input type="text" id="emailOrCardLogin" class="emailOrCardLogin" name="email" autocomplete="off" required>
          </div>

          <div class="form__field">
            <label for="pass">Password</label>
            <input type="password" id="passLogin" class="passLogin" style="margin-bottom: 10px" name="pass" required autocomplete="off">
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
    closeAllPopups();
    const loginForm = document.getElementById('login-form');
    handleLogin(
      loginForm,
      notAuthUserDrop,
      authUserDrop,
      userBtn
    );    
  }
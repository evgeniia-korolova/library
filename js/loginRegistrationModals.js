import { handleRegistration } from './registration.js';
import { handleLogin } from './login.js';
import {closeAllPopups} from './utils/popupService/closeAllPopups.js';
import { addModalEventListeners } from './utils/modalService/modalEventListenerService.js';
import { createMarkupRegisterModal } from './modals/createMarkupRegister.js';
import { createMarkupLoginModal } from './modals/createMarkupLogin.js';
import {  closeOnClickOutsideUserMenu, closeOnEscape, addCloseOnClickOnOverlay } from './utils/openCloseService/closeModal.js';
import { closeBurgerMenu } from './utils/openCloseService/closeBurger.js';


export function handleModals() {	
	const userBtn = document.getElementById('userIcon');	
	const registerBtn = document.querySelectorAll('.register-btn');
	const loginBtn = document.querySelectorAll('.login-btn');
	
	
	userBtn.addEventListener('click', () => {
		closeBurgerMenu();	
	});
	
	// createMarkupRegisterModal();
	// createMarkupLoginModal();
	closeOnClickOutsideUserMenu();
	closeOnEscape();
	addCloseOnClickOnOverlay();
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

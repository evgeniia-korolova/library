// переключение между модальными окнами регистрации и входа

import { createMarkupRegisterModal } from '../../modalsUI/createMarkupRegister.js';
import { createMarkupLoginModal } from '../../modalsUI/createMarkupLogin.js';
import {  closeOnClickOutsideUserMenu, closeOnEscape, addCloseOnClickOnOverlay } from '../openCloseService/closeModal.js';
import { closeBurgerMenu } from '../openCloseService/closeBurger.js';


export function handleModals() {	
	const userBtn = document.getElementById('userIcon');	
	const registerBtn = document.querySelectorAll('.register-btn');
	const loginBtn = document.querySelectorAll('.login-btn');
	
	
	userBtn.addEventListener('click', () => {
		closeBurgerMenu();	
	});	
	
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

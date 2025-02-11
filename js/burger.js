import { closeAllModals } from "./utils/openCloseService/closeModal.js";

export function toggleBurger() {
	const burgerBtn = document.getElementById('burger');
	const menu = document.getElementById('nav__panel');
	const navLinks = document.querySelectorAll('.nav-item');
	const userBtn = document.querySelector('.user-icon');
	const userMenu = document.querySelector('.user-menu');

	burgerBtn.addEventListener('click', () => {
		menu.classList.toggle('is-open');
		document.body.classList.toggle('no-scroll');
		if(!userMenu.classList.contains('user-menu-hidden')) {
			userMenu.classList.add('user-menu-hidden');
		}
		closeAllModals();
	});

	navLinks.forEach((element) => {
		element.addEventListener('click', function () {
			if (menu.classList.contains('is-open')) {
				menu.classList.remove('is-open');
				document.body.classList.toggle('no-scroll');
			}
		});
	});

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {			
			menu.classList.remove('is-open');
		}
	});

	// Закрыть меню при клике вне его
	menu.addEventListener('click', (event) => {
		event._isClickWithInMenu = true;
	});
	burgerBtn.addEventListener('click', (event) => {
		event._isClickWithInMenu = true;
	});
	document.body.addEventListener('click', (event) => {
		if (event._isClickWithInMenu) return;		
		menu.classList.remove('is-open');
	});

		userBtn.addEventListener('click', () => {
			menu.classList.toggle('is-open');
			document.body.classList.remove('no-scroll');
		});
}

import { closeBurgerMenu } from "./closeBurger.js";

export function closeAllModals() {

	const modalOverlay = document.querySelector('.modal-overlay');
	
	if (
		modalOverlay &&
		modalOverlay.classList.contains('open-overlay')
	) {
		modalOverlay.classList.remove('open-overlay');
		document.body.classList.remove('no-scroll');		
	}
}

export function closeOnEscape() {
	const userMenu = document.querySelector('.user-menu');
	const modalOverlay = document.querySelector('.modal-overlay');
	window.addEventListener('keydown', (e) => {
		if (
			(e.key === 'Escape' &&
				!userMenu.classList.contains('user-menu-hidden')) ||
			(e.key === 'Escape' &&
				modalOverlay.classList.contains('open-overlay'))
		) {
			userMenu.classList.add('user-menu-hidden');
			modalOverlay.classList.remove('open-overlay');
			document.body.classList.remove('no-scroll');
		}
	});
}

export function closeOnClickOutsideUserMenu() {
	const userMenu = document.querySelector('.user-menu');
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
}

export function addCloseOnClickOnOverlay() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.querySelector('.modal-content');
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
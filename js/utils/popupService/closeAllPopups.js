export function closeAllPopups() {
	const burgerMenu = document.querySelector('.nav__panel');
	burgerMenu.classList.remove('is-open');
	const modalOverlay = document.querySelector('.modal-overlay');
	const userMenu = document.querySelector('.user-menu');
	if (
		modalOverlay &&
		modalOverlay.classList.contains('open-overlay')
	) {
		userMenu.classList.add('user-menu-hidden');
	}
}
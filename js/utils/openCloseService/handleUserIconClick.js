export function handleUserIconClick() {
	const userBtn = document.getElementById('userIcon');
	const notAuthUserDrop = document.getElementById('notAuthUserDrop');
	const authUserDrop = document.getElementById('authUserDrop');
	const userMenu = document.getElementById('userMenu');

	userBtn.addEventListener('click', () => {
		userMenu.classList.toggle('user-menu-hidden');

		if (
			userMenu.classList.contains('user-menu-hidden') &&
			!userBtn.hasAttribute('data-is-logged')
		) {
			notAuthUserDrop.classList.add('hidden');
		}
		if (
			!userMenu.classList.contains('user-menu-hidden') &&
			!userBtn.hasAttribute('data-is-logged')
		) {
			notAuthUserDrop.classList.remove('hidden');
		}
		if (
			userMenu.classList.contains('user-menu-hidden') &&
			userBtn.hasAttribute('data-is-logged')
		) {
			authUserDrop.classList.add('hidden');
		}
		if (
			!userMenu.classList.contains('user-menu-hidden') &&
			userBtn.hasAttribute('data-is-logged')
		) {
			authUserDrop.classList.remove('hidden');
		}
	});
}
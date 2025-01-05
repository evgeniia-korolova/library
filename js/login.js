import {
	showOverlayMessage,
	setupUserMenu,
	getFromLocalStorage,
	closeAllModals,
	updateDigitalCard,
} from './helpers.js';

export function handleLogin(
	loginForm,
	notAuthUserDrop,
	authUserDrop,
	userIcon
) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault(); // Предотвращаем отправку формы

		// Получаем значения email/cardNumber и password
		const emailOrCard = document
			.getElementById('emailorCardLogin')
			.value.trim();
		const password = document
			.getElementById('passLogin')
			.value.trim();

		// Получаем массив пользователей из localStorage
		const users = getFromLocalStorage('users');

		// Проверяем пользователя
		const existingUser = checkUser(users, emailOrCard, password);

		if (!existingUser) {			
			showOverlayMessage('You are not registered, please register');
			return;
		}
		
		doLogin(existingUser);
	});

	function checkUser(users, emailOrCard, password) {
		return users.find(
			(user) =>
				(user.email === emailOrCard ||
					user.cardNumber === emailOrCard) &&
				user.password === password
		);
	}

	function doLogin(user) {
		// Обновляем интерфейс
		const userBtn = document.querySelector('.user-icon');
		const profileCardNo = document.getElementById(
			'user-menu__card-number'
		);
		userBtn.classList.add('registered');
		userBtn.textContent = `${user.firstName.charAt(
			0
		)}${user.lastName.charAt(0)}`.toUpperCase();
		userBtn.title = `${user.firstName} ${user.lastName}`;
		userBtn.setAttribute('data-email', user.email);
		updateDigitalCard(user); // Сохраняем email в атрибут

		profileCardNo.textContent = `${user.cardNumber}`; // Отображаем номер карты

		notAuthUserDrop.classList.add('hidden');
		authUserDrop.classList.remove('hidden');

		// Настраиваем меню пользователя
		setupUserMenu(userBtn, notAuthUserDrop, authUserDrop);

		// Закрываем модальное окно
		closeAllModals();

		console.log('User logged in successfully!', user);
	}

	
}

import {
	showOverlayMessage,
	getFromLocalStorage,
	updateDigitalCard,
	closeAllModals,
} from './helpers.js';
import { createUserProfileModal } from './userProfileModal.js';

export function handleLogin(
	loginForm,
	notAuthUserDrop,
	authUserDrop,
	userIcon
) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault(); // Предотвращаем отправку формы
		const readerInfoBtn = document.getElementById('readerInfoBtn');

		// Получаем значения email/cardNumber и password
		const emailOrCard = document
			.getElementById('emailOrCardLogin')
			.value.trim();
		const password = document
			.getElementById('passLogin')
			.value.trim();

		// Получаем массив пользователей из localStorage
		const users = getFromLocalStorage('users');

		// Проверяем пользователя
		const existingUser = checkUser(users, emailOrCard, password);

		if (!existingUser) {
			// Если пользователь не найден, выводим сообщение
			showOverlayMessage('You are not registered, please register');
			return;
		}

		// Если пользователь найден, выполняем логин
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
		console.log('User logged in successfully!', user);
		updateDigitalCard(user);
		
		// Обновляем интерфейс
		const userBtn = document.querySelector('.user-icon');
		const profileCardNo = document.getElementById(
			'user-menu__card-number'
		);
		userBtn.classList.add('registered');
		userBtn.setAttribute('data-is-logged', 'true');
		userBtn.textContent = `${user.firstName.charAt(
			0
		)}${user.lastName.charAt(0)}`.toUpperCase();
		userBtn.title = `${user.firstName} ${user.lastName}`;
		profileCardNo.textContent = `${user.cardNumber}`;
		 

		readerInfoBtn.addEventListener('click', () => {
			createUserProfileModal(user);
			console.log('User logged in successfully!', user);
			
		});

		notAuthUserDrop.classList.add('hidden');
		authUserDrop.classList.remove('hidden');
		

		closeAllModals();

		// Закрываем модальное окно
		// const modalOverlay = document.getElementById('modal-overlay');
		// if (modalOverlay) {
		// 	modalOverlay.classList.remove('open-overlay');
		// 	document.body.classList.remove('no-scroll');
			
		// }

		console.log('User logged in successfully!', user);
	}
}

import { closeAllModals } from './utils/openCloseService/closeModal.js';
import { showOverlayMessage } from './utils/openCloseService/showOverlayMessage.js';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from './utils/commonServices/localStorageService.js';
import { createUserProfileModal } from './modalsUI/createMarkupUserProfile.js';
import { handleLogOut } from './handleLogOut.js';
import {
	updateDigitalCard,
	updateDigitalCardInfo,
	resetDigitalCard,
} from './utils/digitalCardService.js';
import { handleUserProfileCard } from './utils/modalService/handleUserProfileCard.js';


export function handleLogin(
	loginForm,
	notAuthUserDrop,
	authUserDrop,
	userIcon
) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		// Получаем значения email/cardNumber и password
		const emailOrCard = document
			.querySelector('.emailOrCardLogin')
			.value.trim();
		const password = document
			.querySelector('.passLogin')
			.value.trim();

		// Получаем массив пользователей из localStorage
		let users = getFromLocalStorage('users') || [] || null;

		// Проверяем пользователя
		const existingUser = checkUser(users, emailOrCard, password);

		if (!existingUser) {
			showOverlayMessage('You are not registered, please register');
			return;
		}

		// Если пользователь найден, выполняем логин
		doLogin(existingUser, users);
		closeAllModals();
		showOverlayMessage('You are logged in successfully!');
		
		handleLogOut();
				
	});

	function checkUser(users, emailOrCard, password) {
		return users.find(
			(user) =>
				(user.email === emailOrCard ||
					user.cardNumber === emailOrCard) &&
				user.password === password
		);
	}

	function doLogin(user, users) {
		console.log('User logged in successfully!', user);
		user.visits = (user.visits || 0) + 1;

		const updatedUser = users.map((u) =>
			u.cardNumber === user.cardNumber ? user : u
		);
		user.isLoggedIn = true;
		saveToLocalStorage('users', updatedUser);
		updateDigitalCard(user);
		updateDigitalCardInfo(user)

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
		handleUserProfileCard(user);		

		notAuthUserDrop.classList.add('hidden');
		authUserDrop.classList.remove('hidden');
		return user;
	}
}

// передаем в createMarkupLogin


import { closeAllModals } from './utils/openCloseService/closeModal.js';
import { showOverlayMessage } from './utils/openCloseService/showOverlayMessage.js';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from './utils/commonServices/localStorageService.js';

import { createUserProfileModal } from './modalsUI/createMarkupUserProfile.js';
import { handleLogOut } from './handleLogOut.js';
import { unsubscribe } from './utils/unsubscribeService/unsubscribe.js';
import {
	updateDigitalCard,
	resetDigitalCard,
} from './utils/digitalCardService.js';
import { initializeTabs } from './book-tabs.js';
import { books } from './data.js';

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
		//! doLogOut(existingUser);
		handleLogOut();

		// usubscribeLoggedInUser(existingUser);
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
			console.log('createdProfileCard', user);
		});

		notAuthUserDrop.classList.add('hidden');
		authUserDrop.classList.remove('hidden');
		return user;
	}

	// function doLogOut(user) {
	// 	const logOutBtn = document.getElementById('logOutBtn');
	// 	const userBtn = document.getElementById('userIcon');
	// 	const userMenu = document.getElementById('userMenu');

	// 	logOutBtn.addEventListener('click', () => {
	// 		let users = getFromLocalStorage('users') || null || [];
	// 		const updatedUser = users.map((u) =>
	// 			u.cardNumber === user.cardNumber
	// 				? { ...u, isLoggedIn: false }
	// 				: u
	// 		);

	// 		user.isLoggedIn = false;
	// 		saveToLocalStorage('users', updatedUser);

	// 		// Обновляем интерфейс
	// 		userMenu.classList.add('user-menu-hidden');
	// 		authUserDrop.classList.add('hidden');
	// 		// notAuthUserDrop.classList.remove('hidden');			
	// 		userBtn.removeAttribute('data-is-logged', 'true');
	// 		userBtn.textContent = '';
	// 		userBtn.innerHTML =
	// 			'<img src="./images/icon_profile.svg" alt="user icon" />';
	// 		// location.reload(true);

	// 		console.log('User successfully logged out!');
	// 	});
	// }
}

// передаем в createMarkupLogin

	// function usubscribeLoggedInUser(user) {
	// 	const unsubscribeBtn = document.querySelector('.js-unsubscribe');

	// 	unsubscribeBtn.addEventListener('click', () => {
	// 		if (confirm('Are you sure you want to unsubscribe?')) {
	// 			unsubscribe(user);
	// 		}
	// 	});

	// 	console.log('User successfully logged out!');
	// }
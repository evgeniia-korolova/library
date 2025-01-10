import {
	showOverlayMessage,
	saveToLocalStorage,
	getFromLocalStorage,
	updateDigitalCard,	
	resetDigitalCard,
	
} from './helpers.js';

import { createUserProfileModal } from './userProfileModal.js';
import { initBuyButtonHandlers } from './buyButtonHandlers.js';

export function handleLogin(
	loginForm,
	notAuthUserDrop,
	authUserDrop,
	userIcon
) 

{
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault(); 
		// Получаем значения email/cardNumber и password
		const emailOrCard = document
			.querySelector('.emailOrCardLogin')
			.value;
		const password = document
			.querySelector('.passLogin')
			.value;

		// Получаем массив пользователей из localStorage
		const users = getFromLocalStorage('users');

		// Проверяем пользователя
		const existingUser = checkUser(users, emailOrCard, password);

		if (!existingUser) {			
			showOverlayMessage('You are not registered, please register');
			return;
		}		

		// Если пользователь найден, выполняем логин
		doLogin(existingUser);
		showOverlayMessage('You are logged in successfully!');				
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
		user.visits = (user.visits || 0) + 1;
		

		const users = getFromLocalStorage('users');
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

		
		initBuyButtonHandlers(user);
		readerInfoBtn.addEventListener('click', () => {	createUserProfileModal(user);
			console.log('User logged in successfully!', user);			
		});

		const logOutBtn = document.getElementById('logOutBtn');
		function logOut() {
			const userBtn = document.getElementById('userIcon');
			const userMenu = document.getElementById('userMenu');
			const users = getFromLocalStorage('users');
			const loggedInUserCardNumber = document.getElementById(
				'user-menu__card-number'
			).textContent;

			if (!users || !loggedInUserCardNumber) {
				console.error(
					'No users found or no logged-in user identified'
				);
				return;
			}

			const updatedUsers = users.filter(
				(user) => user.cardNumber !== loggedInUserCardNumber
			);

			localStorage.setItem('users', JSON.stringify(updatedUsers));

			userMenu.classList.add('user-menu-hidden');
			authUserDrop.classList.add('hidden');
			notAuthUserDrop.classList.remove('hidden');
			userBtn.classList.remove('registered');
			userBtn.removeAttribute('data-is-logged', 'true');
			userBtn.textContent = '';
			userBtn.innerHTML =
				'<img src="./images/icon_profile.svg" alt="user icon" />';
			resetDigitalCard();

			getCurrentUser();

			console.log('User successfully logged out!');
		}

		logOutBtn.addEventListener('click', logOut);

		notAuthUserDrop.classList.add('hidden');
		authUserDrop.classList.remove('hidden');
		

		console.log('User logged out successfully!', user);
		return user;
	}


}

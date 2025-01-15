import { initBuyButtonHandlers } from './buyButtonHandlers.js';
import { unsubscribe } from './utils/unsubscribeService/unsubscribe.js';
import { closeAllModals } from './utils/openCloseService/closeModal.js';
import { showOverlayMessage } from './utils/openCloseService/showOverlayMessage.js';
import { generateCardNumber } from './utils/commonServices/generateCardNumber.js';
import {	getFromLocalStorage,	saveToLocalStorage,
} from './utils/commonServices/localStorageService.js';
import { updateDigitalCard } from './utils/digitalCardService.js';
import { addModalEventListeners } from './utils/modalService/modalEventListenerService.js';

export function handleRegistration(
	registrationForm,
	notAuthUserDrop,
	authUserDrop,
	userIcon
) {
	registrationForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const readerName = document.getElementById('readerName');
		const readerCardNo = document.getElementById('readerCardNo');
		const cardBadges = document.getElementById('card-badges');
		const checkCardBtn = document.querySelector('.check-card--btn');

		// Получаем данные из формы
		const firstName = document
			.getElementById('first-name')
			.value.trim();
		const lastName = document
			.getElementById('last-name')
			.value.trim();
		const email = document.getElementById('email').value.trim();
		const password = document.getElementById('pass').value.trim();

		// Проверяем, что все поля заполнены
		if (!firstName || !lastName || !email || !password) {
			alert('Please fill in all fields.');
			return;
		}

		let users = getFromLocalStorage('users') || [];

		// Проверяем, есть ли пользователь с таким email
		const existingUser = users.find(
			(user) =>
				user.email === email &&
				user.firstName === firstName &&
				user.lastName === lastName
		);
		const existingEmail = users.find(
			(user) =>
				user.email === email &&
				user.firstName !== firstName &&
				user.lastName !== lastName
		);
		if (existingUser) {
			showOverlayMessage('You are already registered, please log in');
			return;
		}
		if (existingEmail) {
			showOverlayMessage('This email is already registered');
			return;
		} else {
			showOverlayMessage(
				'You are successfully registered, please log in'
			);
		}

		const cardNumber = generateCardNumber();

		const newUser = {
			firstName,
			lastName,
			email,
			password,
			cardNumber,
			visits: 1,
			ownedBooks: [],
			activeUser: false,
			isLoggedIn: false,
			isRegistered: true,
		};

		

		users.push(newUser);
		saveToLocalStorage('users', users);
		closeAllModals();

		// change message when clicking on buy book button
		initBuyButtonHandlers();

		// Заменяем иконку user на инициалы
		const userBtn = document.querySelector('.user-icon');
		userBtn.classList.add('registered');
		userBtn.textContent =
			`${firstName[0]}${lastName[0]}`.toUpperCase();
		updateDigitalCard(newUser);

		// addUnsubscribeHandler(newUser);

		setTimeout(() => {
			checkCardBtn.classList.remove('hidden');
			cardBadges.classList.add('card__badges-hidden');
			readerCardNo.value = '';
			readerName.value = '';
		}, 20000);
	});

	function addUnsubscribeHandler(user) {
		const unsubscribeBtn = document.querySelector('.js-unsubscribe');

		if (!unsubscribeBtn) {
			console.warn('Unsubscribe button not found!');
			return;
		}

		unsubscribeBtn.addEventListener('click', () => {
			if (confirm('Are you sure you want to unsubscribe?')) {
				unsubscribe(user);
				// Обновляем интерфейс после удаления пользователя
				const userBtn = document.querySelector('.user-icon');
				const userMenu = document.getElementById('userMenu');
				const profileCardNo = document.getElementById(
					'user-menu__card-number'
				);

				userMenu.classList.add('user-menu-hidden');
				userBtn.classList.remove('registered');
				userBtn.textContent = '';
				userBtn.innerHTML =
					'<img src="./images/icon_profile.svg" alt="user icon" />';
				profileCardNo.textContent = '';
				notAuthUserDrop.classList.remove('hidden');
				authUserDrop.classList.add('hidden');

				console.log(
					'User has been unsubscribed and removed from localStorage!'
				);
			}
		});
	}
}

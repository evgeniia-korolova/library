import { initBuyButtonHandlers } from './buyButtonHandlers.js';
import { unsubscribe } from './utils/unsubscribeService/unsubscribe.js';
import { closeAllModals } from './utils/openCloseService/closeModal.js';
import { showOverlayMessage } from './utils/openCloseService/showOverlayMessage.js';
import { generateCardNumber } from './utils/commonServices/generateCardNumber.js';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from './utils/commonServices/localStorageService.js';
import { updateDigitalCard } from './utils/digitalCardService.js';
import { handleUnsubscribe } from './unsubscriptionHandler.js';

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
		const unsubscribeBtns =
			document.querySelectorAll('.js-unsubscribe');

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
		updateDigitalCard(newUser);
		// change message when clicking on buy book button
		initBuyButtonHandlers();
		handleUnsubscribe(newUser);
		// Заменяем иконку user на инициалы
		const userBtn = document.querySelector('.user-icon');
		userBtn.classList.add('registered');
		userBtn.textContent =
			`${firstName[0]}${lastName[0]}`.toUpperCase();
		unsubscribeBtns.forEach((btn) =>
			btn.classList.remove('disabled')
		);

		
		setTimeout(() => {
			checkCardBtn.classList.remove('hidden');
			cardBadges.classList.add('card__badges-hidden');
			readerCardNo.value = '';
			readerName.value = '';
		}, 20000);
	});
}

import {
	getFromLocalStorage,
	saveToLocalStorage,
	getCurrentUserState,
} from './utils/commonServices/localStorageService.js';
import { resetDigitalCard } from './utils/digitalCardService.js';

function doUnsubscribe(user) {
	const userBtn = document.querySelector('.user-icon');
	const userMenu = document.getElementById('userMenu');
	const profileCardNo = document.getElementById(
		'user-menu__card-number'
	);
	const users = getFromLocalStorage('users') || [];
	const updatedUsers = users.filter(
		(u) => u.cardNumber !== user.cardNumber
	);
	saveToLocalStorage('users', updatedUsers);

	console.log(
		'User has been unsubscribed and removed from localStorage!'
	);

	userMenu.classList.add('user-menu-hidden');
	notAuthUserDrop.classList.remove('hidden');
	authUserDrop.classList.add('hidden');
	userBtn.classList.remove('registered');
	userBtn.removeAttribute('data-is-logged', 'true');
	userBtn.textContent = '';
	userBtn.innerHTML =
		'<img src="../images/icon_profile.svg" alt="user icon" />';
	profileCardNo.textContent = '';

	

	console.log(
		'User has been unsubscribed and removed from localStorage!'
	);
}

export function handleUnsubscribe() {
	const unsubscribeBtns =
		document.querySelectorAll('.js-unsubscribe');

	if (!unsubscribeBtns.length) return;

	unsubscribeBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			const {
				registeredAndLoggedIn,
				activeUser,
				registerNotLoggedIn,
			} = getCurrentUserState();

			if (activeUser) {
				unsubscribeUser(activeUser);
				return;
			} else if (registeredAndLoggedIn) {
				unsubscribeUser(registeredAndLoggedIn);
				return;
			} else if (registerNotLoggedIn) {
				unsubscribeUser(registerNotLoggedIn);
				return;
			} else {
				console.log('No eligible user found for unsubscribe.');
				return;
			}
		});
	});
}

function unsubscribeUser(user) {
	if (!user) return;

	const users = getFromLocalStorage('users') || [];
	const updatedUsers = users.filter(
		(u) => u.cardNumber !== user.cardNumber
	);

	saveToLocalStorage('users', updatedUsers);

	// Обновляем интерфейс
	updateUserInterface();

	console.log(
		`User with card number ${user.cardNumber} has been unsubscribed.`
	);
}

function updateUserInterface() {
	const userBtn = document.getElementById('userIcon');
	const userMenu = document.getElementById('userMenu');
	const authUserDrop = document.getElementById('authUserDrop');
	const notAuthUserDrop = document.getElementById('notAuthUserDrop');
	const unsubscribeBtns =
		document.querySelectorAll('.js-unsubscribe');

	if (!userBtn) return;

	userBtn.title = '';
	userBtn.classList.remove('registered');
	unsubscribeBtns.forEach((btn) => btn.classList.add('disabled'));
	userBtn.textContent = '';
	userBtn.innerHTML =
		'<img src="./images/icon_profile.svg" alt="user icon" />';

	userMenu.classList.add('user-menu-hidden');
	notAuthUserDrop.classList.remove('hidden');
	authUserDrop.classList.add('hidden');
	resetDigitalCard();
}

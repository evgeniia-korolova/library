import { showOverlayMessage } from './helpers.js';
import { openModal, closeAllModals,addModalEventListeners, updateDigitalCard, getFromLocalStorage, saveToLocalStorage, generateCardNumber } from './helpers.js';

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
		const firstName = document.getElementById('first-name').value.trim();
		const lastName = document.getElementById('last-name').value.trim();
		const email = document.getElementById('email').value.trim();
		const password = document.getElementById('pass').value.trim();		

		// Проверяем, что все поля заполнены
		if (!firstName || !lastName || !email || !password) {
			alert('Please fill in all fields.');
			return;
		}

		let users = getFromLocalStorage('users');

		// Проверяем, есть ли пользователь с таким email
		const existingUser = users.find((user) => user.email === email);
		if (existingUser) {
			showOverlayMessage('You are already registered, please log in');			
		}		else {			
			showOverlayMessage('You are successfully registered, please log in');
		}
		
		const cardNumber = generateCardNumber();
		
		const newUser = {
			firstName,
			lastName,
			email,
			password,
			cardNumber,
		};
		
		users.push(newUser);
		saveToLocalStorage('users', users);
		
		

		// Заменяем иконку user на инициалы
		const userBtn = document.querySelector('.user-icon');
		userBtn.classList.add('registered');
		userBtn.innerHTML = `${firstName[0]}${lastName[0]}`.toUpperCase();
		updateDigitalCard(newUser);
		

		
		
		// closeAllModals();

		setTimeout(() => {
			checkCardBtn.classList.remove('hidden');
			cardBadges.classList.add('card__badges-hidden');
			readerCardNo.value = '';
			readerName.value = '';
		}, 30000);
	});
}


import {
	openModal,
	closeAllModals,	
	getFromLocalStorage,
	saveToLocalStorage,
	generateCardNumber,
	showOverlayMessage,
	setupUserMenu,
	updateDigitalCard
} from './helpers.js';



export function handleRegistration(
	registrationForm,
	notAuthUserDrop,
	authUserDrop,	
) {
	registrationForm.addEventListener('submit', (event) => {
		event.preventDefault();
		
		

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
			// showOverlayMessage('You are already registered, please log in');
			openModal('You are already registered, please log in');
			return;
		}

		showOverlayMessage('You are registered, please log in');

		// Генерируем случайный CardNumber в формате 16-ричного числа
		const cardNumber = generateCardNumber();

		// Создаем объект пользователя
		const newUser = {
			firstName,
			lastName,
			email,
			password,
			cardNumber,
		};

		// Сохраняем данные в localStorage
		users.push(newUser);
		saveToLocalStorage('users', users);
		

		// Заменяем иконку user на инициалы
		const userBtn = document.querySelector('.user-icon');
		userBtn.classList.add('registered');
		userBtn.innerHTML = `${firstName[0]}${lastName[0]}`.toUpperCase();

		updateDigitalCard(newUser);

		
			const cardBadges = document.getElementById('card-badges');

			const checkCardBtn = document.querySelector('.check-card--btn');

		

			setTimeout(() => {
				checkCardBtn.classList.remove('hidden');
				cardBadges.classList.add('card__badges-hidden');
				readerCardNo.value = '';
				readerName.value = '';
			}, 30000);

		setupUserMenu(userBtn, notAuthUserDrop, authUserDrop);
		closeAllModals();

		})
}

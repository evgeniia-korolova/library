import { showOverlayMessage } from './helpers.js';

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

		let users = JSON.parse(localStorage.getItem('users')) || [];

		// Проверяем, есть ли пользователь с таким email
		const existingUser = users.find((user) => user.email === email);
		if (existingUser) {
			showOverlayMessage('You are already registered, please log in');
			return;
		}

		showOverlayMessage('You are registered, please log in');

		// Генерируем случайный CardNumber в формате 16-ричного числа
		const cardNumber = Math.floor(Math.random() * 0x1000000000)
			.toString(16)
			.padStart(9, '0');

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
		localStorage.setItem('users', JSON.stringify(users));
		

		// Заменяем иконку user на инициалы
		const userBtn = document.querySelector('.user-icon');
		userBtn.classList.add('registered');
		userBtn.innerHTML = `${firstName[0]}${lastName[0]}`.toUpperCase();

		readerName.value = firstName + ' ' + lastName;
		readerCardNo.value = cardNumber;

		// Добавляем обработчик для клика на userBtn (меню юзера)
	

		const userMenu = document.querySelector('.notAuthUserDrop');
		userBtn.addEventListener('click', () => {
			userMenu.classList.toggle('hidden');
			notAuthUserDrop.classList.toggle('hidden'); // Показать/скрыть меню
		});

		// Закрываем модальное окно
		const modalOverlay = document.getElementById('modal-overlay');
		if (modalOverlay) {
			modalOverlay.classList.remove('open-overlay');
			document.body.classList.remove('no-scroll');
			setTimeout(() => {
				const modalContent = document.querySelector('.modal-content');
				if (modalContent) modalContent.innerHTML = '';
			}, 2000);
		}

		const cardBadges = document.getElementById('card-badges');		

		const checkCardBtn = document.querySelector('.check-card--btn');

		checkCardBtn.classList.add('hidden');
		cardBadges.classList.remove('card__badges-hidden');

		setTimeout(() => {
			checkCardBtn.classList.remove('hidden');
			cardBadges.classList.add('card__badges-hidden');
			readerCardNo.value = '';
			readerName.value = '';
		}, 30000);
	});
}

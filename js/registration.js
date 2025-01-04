import { showOverlayMessage } from './helpers.js';

export function handleRegistration(
	registrationForm,
	notAuthUserDrop,
	authUserDrop,
	userIcon
) {
	registrationForm.addEventListener('submit', (event) => {
		event.preventDefault();

		// Получаем данные из формы
		const firstName = document
			.getElementById('first-name')
			.value.trim();
		const lastName = document
			.getElementById('last-name')
			.value.trim();
		const email = document.getElementById('email').value.trim();
		const password = document.getElementById('pass').value.trim();
		let isAuthenticated = false;

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
		users.push(newUser); // Добавляем пользователя в массив
		localStorage.setItem('users', JSON.stringify(users));
		isAuthenticated = true;

		// Заменяем иконку user на инициалы
		const userBtn = document.querySelector('.user-icon');
		userBtn.classList.add('registered');
		userBtn.innerHTML = `${firstName[0]}${lastName[0]}`.toUpperCase();

		notAuthUserDrop.classList.add('hidden');
		authUserDrop.classList.remove('hidden');

		// Добавляем обработчик для клика на userBtn (меню юзера)
		const userMenu = authUserDrop.querySelector('.user-menu'); // Предполагается, что это выпадающее меню
		userBtn.addEventListener('click', () => {
			userMenu.classList.toggle('hidden'); // Показать/скрыть меню
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
	});
	console.log('registration');
}

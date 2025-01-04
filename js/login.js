import { showOverlayMessage } from './helpers.js';

export function handleLogin(
	loginForm,
	notAuthUserDrop,
	authUserDrop,
	userIcon
) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault(); // Предотвращаем отправку формы

		// Получаем значения email/cardNumber и password
		const emailOrCard = document
			.getElementById('emailorCardLogin')
			.value.trim();
		const password = document
			.getElementById('passLogin')
			.value.trim();

		// Получаем массив пользователей из localStorage
		let users = JSON.parse(localStorage.getItem('users')) || [];

		// Проверяем пользователя
		const existingUser = checkUser(users, emailOrCard, password);

		if (!existingUser) {
			// Если пользователь не найден, выводим сообщение
			showOverlayMessage('You are not registered, please register');
			return;
		}

		// Если пользователь найден, выполняем логин
		doLogin(existingUser);
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
		// Обновляем интерфейс
		const userBtn = document.querySelector('.user-icon');
		const profileCardNo = document.getElementById('user-menu__card-number');
		userBtn.classList.add('registered');
		userBtn.textContent = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
		userBtn.title = `${user.firstName} ${user.lastName}`;
		profileCardNo.textContent = `${user.cardNumber}`; // Отображаем инициалы

		notAuthUserDrop.classList.add('hidden');
		authUserDrop.classList.remove('hidden');

		// Добавляем обработчик для клика на userBtn (открытие/закрытие меню)
		

		const userMenu = document.querySelector('.authUserDrop');
		userBtn.addEventListener('click', () => {
			userMenu.classList.toggle('hidden');
			authUserDrop.classList.toggle('hidden'); 
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

		console.log('User logged in successfully!', user);
	}
}

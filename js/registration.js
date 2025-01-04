import { showOverlayMessage } from './helpers.js';
import { openModal,addModalEventListeners } from './helpers.js';

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
		const readerInfoBtn = document.getElementById('readerInfoBtn');

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

		readerInfoBtn.addEventListener('click', createMarkupReaderInfo);
			
		function createMarkupReaderInfo() {
			openModal(`
			<div class="profile-form-modal" id="profile-form-modal">
				<div class="profile-card-content">
					<span
						class="close"
						id="profile-modal__close-button">
						<img src="../images/close_btn.svg" alt="close-button"/>
					</span>
					<button						
						class="profile-modal__close-button"
						id="profile-modal__close-button">
						<img src="../images/close_btn.svg" alt="close btn" />
					</button>
					<div class="profile__content">
						<div class="profile__sidebar">
							<p class="profile__initials">JD</p>
							<p class="profile__full-name">John Doe</p>
						</div>
					
						<div class="profile__info">
							<h3 class="profile__heading">My profile</h3>
							<ul class="profile__list">
								<li class="profile__item">
									<span class="profile__name">Visits</span>
									<img src="./images/card_icon_visits.svg" alt="visits icon" />
									<span class="profile__quantity">23</span>
								</li>
								<li class="profile__item">
									<span class="profile__name">Bonuses</span>
									<img src="./images/card_icon_star.svg" alt="bonuses icon" />
									<span class="profile__quantity">1240</span>
								</li>
								<li class="profile__item">
									<span class="profile__name">Books</span>
									<img src="./images/card_icon_book.svg" alt="books-icon" />
									<span class="profile__quantity">2</span>
								</li>
							</ul>
							<h3 class="profile__books-heading">Rented books</h3>
							<ul class="profile__books">
								<li class="taken__book">The Last Queen, Clive Irving</li>
								<li class="taken__book">Dominicana, Angie Cruz</li>
							</ul>
							<div class="profile__card">
								<span class="profile__card-heading">Card number</span>
								<span class="profile__number">F00234030</span>
								<span><img src="./images/icon_copy.svg" alt="icon copy" /></span>
							</div>
						</div>
					</div>
				</div>
			</div> 
				`);
				addModalEventListeners(
					'profile-form-modal',
					createMarkupReaderInfo
				);
		}

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

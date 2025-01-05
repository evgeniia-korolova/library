import {createUserProfileModal} from './user-modal.js';

export class BookCard {
	constructor(id, title, author, image, description, parentSelector) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.image = image;
		this.description = description;
        this.parent = document.querySelector(parentSelector);
	}

	renderBookCard() {
		const bookWrapper = document.createElement('div');
		bookWrapper.classList.add('book__wrapper');

		bookWrapper.innerHTML = `
        <div class="book__content__container">
            <div class="book__content">
                <h3 class="staff">Staff Picks</h3>

                <h4 class="book__title">
                    ${this.title}
                </h4>
                <h5 class="book__author">${this.author}</h5>
                <p class="book__description">
                    ${this.description}
                </p>
            </div>

            <button class="btn-outlined btn-small btn-auto">
                Buy
            </button>
        </div>
        <div class="book__photo">
            <img
                src="${this.image}"
                alt="The Book Eaters By Sunyi Dean"
            />
        </div>       
        `;

        this.parent.append(bookWrapper);
	}
}

export function filterData(array, season) {
    return array.filter((book) => book.season === season);
}

export function showOverlayMessage(message) {
	const modalOverlay = document.getElementById('modal-overlay');
	const modalContent = document.querySelector('.modal-content');

	// Отображаем сообщение
	modalContent.innerHTML = `<p class="overlay-message">${message}</p>`;
	modalOverlay.classList.add('open-overlay');

	// Закрываем оверлей через 3 секунды
	setTimeout(() => {
		modalOverlay.classList.remove('open-overlay');
		modalContent.innerHTML = '';
	}, 3000);
}

export function closeAllModals() {
	const modalOverlay = document.querySelector('#modal-overlay');
	if (modalOverlay) {
		modalOverlay.classList.remove('open-overlay');
		document.body.classList.remove('no-scroll');
		setTimeout(() => {
			const modalContent = document.querySelector('.modal-content');
			if (modalContent) modalContent.innerHTML = '';
		}, 2000);
	}
}

export function setupUserMenu(
	userBtn,
	notAuthUserDrop,
	authUserDrop
) {
	const userMenu = document.querySelector('.notAuthUserDrop');

	// Привязываем обработчик клика на иконку пользователя
	userBtn.addEventListener('click', () => {
		userMenu.classList.toggle('hidden');
		notAuthUserDrop.classList.toggle('hidden'); // Показать/скрыть меню
	});

	// Обработчик для кнопки "My Profile"
	const readerInfoBtn = document.getElementById('readerInfoBtn');
	readerInfoBtn.addEventListener('click', () => {
		// Берём email текущего пользователя из localStorage
		const users = getFromLocalStorage('users');
		const emailOrCard = userBtn.getAttribute('data-email'); // Добавляем email или карту как data-атрибут
		const currentUser = users.find(
			(user) =>
				user.email === emailOrCard || user.cardNumber === emailOrCard
		);

		if (currentUser) {
			// Открываем модальное окно профиля
			createUserProfileModal(emailOrCard);

			// Обновляем секцию digital-card
			updateDigitalCard(currentUser);
		} else {
			console.error('User not found for My Profile');
		}
	});
}


export function openModal(content) {
	const modalContent = document.querySelector('.modal-content');
	const modalOverlay = document.querySelector('#modal-overlay');
	if (modalContent && modalOverlay) {
		modalContent.innerHTML = content;
		modalOverlay.classList.add('open-overlay');
		document.body.classList.add('no-scroll');
	}
}

export function addModalEventListeners(modalId, callback) {
	const modal = document.getElementById(modalId);
	if (modal) {
		const closeButton = modal.querySelector('.close');
		if (closeButton) {
			closeButton.addEventListener('click', () => {
				closeAllModals();
				if (callback) callback();
			});
		}
	}
}

export function getFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveToLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

export function generateCardNumber() {
	return Math.floor(Math.random() * 0x1000000000)
		.toString(16)
		.padStart(9, '0');
}

export function updateDigitalCard(user) {
	const readerName = document.getElementById('readerName');
	const readerCardNo = document.getElementById('readerCardNo');
	const cardBadges = document.getElementById('card-badges');
	const checkCardBtn = document.querySelector('.check-card--btn');

	// Показываем данные пользователя
	readerName.value = `${user.firstName} ${user.lastName}`;
	readerCardNo.value = user.cardNumber;

	// Скрываем кнопку и показываем бейджи
	checkCardBtn.classList.add('hidden');
	cardBadges.classList.remove('card__badges-hidden');
}
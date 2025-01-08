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
	
	setTimeout(() => {
		modalOverlay.classList.remove('open-overlay');
		if (document.body.classList.contains('no-scroll')) {
			document.body.classList.remove('no-scroll');
		}
	}, 2000);
}

export function openModal(content) {
	const modalOverlay = document.getElementById('modal-overlay');
	const modalContent = document.querySelector('.modal-content');
	modalContent.innerHTML = content;
	modalOverlay.classList.add('open-overlay');
	document.body.classList.add('no-scroll');
}

export function closeAllModals() {
	const modalOverlay = document.querySelector('.modal-overlay');
	if (
		modalOverlay &&
		modalOverlay.classList.contains('open-overlay')
	) {
		modalOverlay.classList.remove('open-overlay');
		document.body.classList.remove('no-scroll');
	}
}

export function addModalEventListeners(buttonId, callback) {
	document
		.querySelector('.close')
		.addEventListener('click', closeAllModals);
	document
		.getElementById(buttonId)
		.addEventListener('click', callback);
}

export function closeAllPopups() {
	const burgerMenu = document.querySelector('.nav__panel');	
	burgerMenu.classList.remove('is-open');		
	const modalOverlay = document.querySelector('.modal-overlay');
	const userMenu = document.querySelector('.user-menu');
	if (
		modalOverlay &&
		modalOverlay.classList.contains('open-overlay')
	) {
		userMenu.classList.add('user-menu-hidden');
	}
}

export function updateDigitalCard(user) {
	const readerName = document.getElementById('readerName');
	const readerCardNo = document.getElementById('readerCardNo');
	const cardBadges = document.getElementById('card-badges');
	const checkCardBtn = document.querySelector('.check-card--btn');
	const visitsDigital = document.getElementById('visitsDigital')
	
	readerName.value = `${user.firstName} ${user.lastName}`;
	readerCardNo.value = user.cardNumber;
	visitsDigital.textContent = user.visits;
	
	checkCardBtn.classList.add('hidden');
	cardBadges.classList.remove('card__badges-hidden');
}
export function resetDigitalCard() {
	const readerName = document.getElementById('readerName');
	const readerCardNo = document.getElementById('readerCardNo');
	const cardBadges = document.getElementById('card-badges');
	const checkCardBtn = document.querySelector('.check-card--btn');
	
	readerName.value = '';
	readerCardNo.value = '';
	
	checkCardBtn.classList.remove('hidden');
	cardBadges.classList.add('card__badges-hidden');
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


export function handleUserIconClick() {
	const userBtn = document.getElementById('userIcon');
	const notAuthUserDrop = document.getElementById('notAuthUserDrop');
	const authUserDrop = document.getElementById('authUserDrop');
	const userMenu = document.getElementById('userMenu');

	userBtn.addEventListener('click', () => {
		userMenu.classList.toggle('user-menu-hidden');		

		if(userMenu.classList.contains('user-menu-hidden') && !userBtn.hasAttribute('data-is-logged')) {
			notAuthUserDrop.classList.add('hidden');			
		}
		if(!userMenu.classList.contains('user-menu-hidden') && !userBtn.hasAttribute('data-is-logged')) {
			notAuthUserDrop.classList.remove('hidden');			
		}
		if(userMenu.classList.contains('user-menu-hidden') && userBtn.hasAttribute('data-is-logged')) {
			authUserDrop.classList.add('hidden');			
		}
		if(!userMenu.classList.contains('user-menu-hidden') && userBtn.hasAttribute('data-is-logged')) {
			authUserDrop.classList.remove('hidden');			
		}
	})	
}

export function closeBurgerMenu() {
	const burgerMenu = document.querySelector('.nav__panel');
	burgerMenu.classList.remove('is-open');		
}

export function closeOnEscape() {
	const userMenu = document.querySelector('.user-menu');
	const modalOverlay = document.querySelector('.modal-overlay');
	window.addEventListener('keydown', (e) => {
		if (
			e.key === 'Escape' &&
			!userMenu.classList.contains('user-menu-hidden')
			|| e.key === 'Escape' &&
			modalOverlay.classList.contains('open-overlay')
		) {
			userMenu.classList.add('user-menu-hidden');
			modalOverlay.classList.remove('open-overlay');
			document.body.classList.remove('no-scroll');
		}
	});
}




// !commit 07/02/2025-2
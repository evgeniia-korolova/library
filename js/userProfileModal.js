import {
	openModal,	
	closeAllModals,
	closeAllPopups,
	closeBurgerMenu
} from './helpers.js';

export function createUserProfileModal(user) {

	 function addCloseOnClickOutside() {
		const modalContent = document.querySelector('.modal-content');
		const modalOverlay = document.getElementById('modal-overlay');
		modalOverlay.addEventListener('click', (e) => {
			if (e.target === modalOverlay) {
				closeBurgerMenu();
				closeAllModals();
			}
		});

		modalContent.addEventListener('click', (e) => {
			e.stopPropagation();
		});
	}

	addCloseOnClickOutside();

	window.addEventListener('keydown', (e) => {
		if (
			e.key === 'Escape' &&
			!userMenu.classList.contains('user-menu-hidden')
		) {
			userMenu.classList.add('user-menu-hidden');
		}
	});

	// Рендерим модальное окно с данными пользователя
	openModal(`
		<div class="profile-form-modal" id="profile-form-modal">
			<div class="profile-card-content">
				<span class="close" id="close">
					<img src="./images/close_btn.svg" alt="close-button" />
				</span>
				<div class="profile__content">
					<div class="profile__sidebar">
						<p class="profile__initials">${user.firstName.charAt(0)} 
						${user.lastName.charAt(0)}</p>
						<p class="profile__full-name">${user.firstName} ${user.lastName}</p>
					</div>
					<div class="profile__info">
						<h3 class="profile__heading">My profile</h3>
						<ul class="profile__list">
							<li class="profile__item">
								<span class="profile__name">Visits</span>
								<img src="./images/card_icon_visits.svg" alt="visits icon" />
								<span class="profile__quantity">${user.visits || 0}</span>
							</li>
							<li class="profile__item">
								<span class="profile__name">Bonuses</span>
								<img src="./images/card_icon_star.svg" alt="bonuses icon" />
								<span class="profile__quantity">1240</span>
							</li>
							<li class="profile__item">
								<span class="profile__name">Books</span>
								<img src="./images/card_icon_book.svg" alt="books-icon" />
								<span class="profile__quantity user-profile__books-counter">2</span>
							</li>
						</ul>
						<h3 class="profile__books-heading">Rented books</h3>
						<ul class="profile__books user-profile__books-list">
							${(user.ownedBooks || [])
								.map((book) => `<li class="taken__book">${book.title} by ${book.author}</li>`)
								.join('')}
						</ul>
						<div class="profile__card">
							<span class="profile__card-heading">Card number</span>
							<span class="profile__number">${user.cardNumber}</span>
							<span><img src="./images/icon_copy.svg" alt="icon copy" /></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	`);

	document
		.querySelector('.close')
		.addEventListener('click', closeAllModals);
	
	closeAllPopups();
	
}

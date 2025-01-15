import { openModal } from '../utils/openCloseService/openModal.js';
import { addCloseOnClickOnOverlay, closeAllModals, closeOnEscape } from '../utils/openCloseService/closeModal.js';
import { closeAllPopups } from '../utils/popupService/closeAllPopups.js';
import { closeBurgerMenu } from '../utils/openCloseService/closeBurger.js';

export function createUserProfileModal(user) {

	addCloseOnClickOnOverlay();
	closeOnEscape();


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
								<span class="profile__quantity user-profile__books-counter">${
									user.ownedBooks?.length || 0
								}</span>
							</li>
						</ul>
						<h3 class="profile__books-heading">Rented books</h3>
						<ul class="profile__books user-profile__books-list">
							${(user.ownedBooks || [])
								.map(
									(book) =>
										`<li class="taken__book">${book.title}  ${book.author}</li>`
								)
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


// передаем в login
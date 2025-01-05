import { openModal, getFromLocalStorage } from './helpers.js';

export function createUserProfileModal(emailOrCard) {
	const users = getFromLocalStorage('users');
	const user = users.find(
		(u) => u.email === emailOrCard || u.cardNumber === emailOrCard
	);

	if (!user) {
		console.error('User not found');
		return;
	}

	const authUserDrop = document.querySelector('.authUserDrop');
	if (authUserDrop && !authUserDrop.classList.contains('hidden')) {
		authUserDrop.classList.add('hidden');
	}
	// Рендерим модальное окно с данными пользователя
	openModal(`
		<div class="profile-form-modal" id="profile-form-modal">
			<div class="profile-card-content">
				<span class="close" id="close">
					<img src="../images/close_btn.svg" alt="close-button" />
				</span>
				<div class="profile__content">
					<div class="profile__sidebar">
						<p class="profile__initials">${user.firstName[0]}${user.lastName[0]}</p>
						<p class="profile__full-name">${user.firstName} ${user.lastName}</p>
					</div>
					<div class="profile__info">
						<h3 class="profile__heading">My profile</h3>
						<ul class="profile__list">
							<li class="profile__item">
								<span class="profile__name">Visits</span>
								<img src="../images/card_icon_visits.svg" alt="visits icon" />
								<span class="profile__quantity">23</span>
							</li>
							<li class="profile__item">
								<span class="profile__name">Bonuses</span>
								<img src="../images/card_icon_star.svg" alt="bonuses icon" />
								<span class="profile__quantity">1240</span>
							</li>
							<li class="profile__item">
								<span class="profile__name">Books</span>
								<img src="../images/card_icon_book.svg" alt="books-icon" />
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
							<span class="profile__number">${user.cardNumber}</span>
							<span><img src="../images/icon_copy.svg" alt="icon copy" /></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	`);
	addModalEventListeners('close', 'profile-form-modal');

}

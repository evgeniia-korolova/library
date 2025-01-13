export function updateDigitalCard(user) {
	const readerName = document.getElementById('readerName');
	const readerCardNo = document.getElementById('readerCardNo');
	const cardBadges = document.getElementById('card-badges');
	const checkCardBtn = document.querySelector('.check-card--btn');
	const visitsDigital = document.getElementById('visitsDigital');
	// const user =getFromLocalStorage('user');
	// const bookCount = user.ownedBooks ? user.ownedBooks.length : 0;

	// const booksCountElement = document.querySelector(
	// 	'.profile__quantity.books'
	// );
	// if (booksCountElement) {
	// 	booksCountElement.textContent = bookCount;
	// }

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
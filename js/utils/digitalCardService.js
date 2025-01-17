export function updateDigitalCard(user) {
	const readerName = document.getElementById('readerName');
	const readerCardNo = document.getElementById('readerCardNo');
	const cardBadges = document.getElementById('card-badges');
	const checkCardBtn = document.querySelector('.check-card--btn');
	const visitsDigital = document.getElementById('visitsDigital');
	const cardTitle = document.getElementById('card-title');
	

	readerName.value = `${user.firstName} ${user.lastName}`;
	readerCardNo.value = user.cardNumber;
	visitsDigital.textContent = user.visits;
	cardTitle.textContent = 'Your Library card';
	

	checkCardBtn.classList.add('hidden');
	cardBadges.classList.remove('card__badges-hidden');
}

export function updateDigitalCardInfo() {
	const infoTitle = document.getElementById('info-title');
	const inforText = document.getElementById('info-text');
	const cardLoginBtn = document.querySelector('.js-login-btn');
	const cardSignUpBtn = document.querySelector('.js-signup-btn');
	const cardProfileBtn = document.querySelector('.js-profile-btn');

	infoTitle.textContent = 'Visit your profile';
	inforText.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
	cardLoginBtn.classList.add('hidden');
	cardSignUpBtn.classList.add('hidden');
	cardProfileBtn.classList.remove('hidden');

}
export function resetDigitalCard() {
	const readerName = document.getElementById('readerName');
	const readerCardNo = document.getElementById('readerCardNo');
	const cardBadges = document.getElementById('card-badges');
	const checkCardBtn = document.querySelector('.check-card--btn');
	const infoTitle = document.getElementById('info-title');
	const inforText = document.getElementById('info-text');
	const cardLoginBtn = document.querySelector('.js-login-btn');
	const cardSignUpBtn = document.querySelector('.js-signup-btn');
	const cardProfileBtn = document.querySelector('.js-profile-btn');

	readerName.value = '';
	readerCardNo.value = '';
	cardTitle.textContent = 'Find your Library card';
	infoTitle.textContent = 'Get a reader card';
	inforText.textContent = 'You will be able to see a reader card after logging into account or you can register a new account';
	cardLoginBtn.classList.remove('hidden');
	cardSignUpBtn.classList.remove('hidden');
	cardProfileBtn.classList.add('hidden');

	checkCardBtn.classList.remove('hidden');
	cardBadges.classList.add('card__badges-hidden');
}
import { openSubscriptionModal } from './modalsUI/createMarkupSubscription.js';
import { initSubscriptionHandler } from './subscriptionHandlers.js';
import { createMarkupRegisterModal } from './modalsUI/createMarkupRegister.js';
import { createMarkupLoginModal } from './modalsUI/createMarkupLogin.js';
import {
	getFromLocalStorage,
	saveToLocalStorage,
	getCurrentUserState,
} from './utils/commonServices/localStorageService.js';
import { showOverlayMessage } from './utils/openCloseService/showOverlayMessage.js';
import { handleUserProfileCard } from './utils/modalService/handleUserProfileCard.js';


export function initBuyButtonHandlers() {
	const seasonSlide = document.querySelector('.season-slide');

	if (!seasonSlide) {
		console.error('Season slide container not found in the DOM!');
		return;
	}

	// Delegate event handling
	seasonSlide.addEventListener('click', (event) => {
		const button = event.target.closest('.buy-book-btn');
		if (!button) return;

		const {
			registerNotLoggedIn,
			registeredAndLoggedIn,
			activeNotLoggedIn,
			activeUser,
		} = getCurrentUserState();

		// Check subscription or trigger related actions
		handleSubscriptionCheck(button, {
			registerNotLoggedIn,
			registeredAndLoggedIn,
			activeNotLoggedIn,
			activeUser,
		});
	});

	console.log('Buy button handler initialized');
}

function handleSubscriptionCheck(button) {
  
	const {
		registerNotLoggedIn,
		registeredAndLoggedIn,
		activeNotLoggedIn,
		activeUser,
	} = getCurrentUserState();

	// Если пользователь активен и залогинен
	if (activeUser) {
		handleBookPurchase(button, activeUser);
    updateBookButton(button.dataset.bookId);
		//! createUserProfileModal(activeUser); 
		handleUserProfileCard(activeUser);       
	} 
	// Если пользователь залогинен, но без активной подписки
	else if (registeredAndLoggedIn) {
		openSubscriptionModal(); // Открыть модалку для подписки
		initSubscriptionHandler(() => {
			// Активируем подписку
			const users = getFromLocalStorage('users') || [];
			const updatedUsers = users.map((user) => {
				if (user.cardNumber === registeredAndLoggedIn.cardNumber) {
					user.isActive = true; // Делаем пользователя активным
				}
				return user;
			});

			saveToLocalStorage('users', updatedUsers);
			showOverlayMessage('Subscription activated! You can now purchase books.');     
			//! createUserProfileModal(registeredAndLoggedIn);
			handleUserProfileCard(registeredAndLoggedIn);
		});
	} 
	// Если пользователь зарегистрирован, но не залогинен
	else if (registerNotLoggedIn || activeNotLoggedIn) {
		createMarkupLoginModal();
    updateBookButton(button.dataset.bookId);  // Открыть окно логина
	} 
	// Если пользователь не зарегистрирован
	else {
		createMarkupRegisterModal(); // Открыть окно регистрации
	}
}


function handleBookPurchase(button, activeUser) {
	const bookTitle = button.dataset.bookTitle;
	const bookAuthor = button.dataset.bookAuthor;
	const bookId = button.dataset.bookId;

	// Проверяем, есть ли книга у пользователя
	if (activeUser.ownedBooks.some((book) => book.id === bookId)) {		
		return;
	}

	// Добавляем книгу в список пользователя
	activeUser.ownedBooks.push({
		title: bookTitle,
		author: bookAuthor,
		id: bookId,
	});

	// Сохраняем обновленного пользователя
	const users = getFromLocalStorage('users') || [];
	const updatedUsers = users.map((user) =>
		user.cardNumber === activeUser.cardNumber ? activeUser : user
	);

	saveToLocalStorage('users', updatedUsers);

	// Обновляем кнопку
	button.textContent = 'Own';
	button.classList.add('btn__own');
	button.disabled = true;

	showOverlayMessage('Book purchased successfully!');
}

function updateBookButton(bookId) {
  const button = document.querySelector(`button[data-book-id="${bookId}"]`);
  if (!button) return;

  const { activeUser } = getCurrentUserState();
  const isBookOwned = activeUser?.ownedBooks.some(book => book.id === bookId);

  button.className = isBookOwned
      ? 'btn-outlined btn-small btn-auto buy-book-btn btn__own'
      : 'btn-outlined btn-small btn-auto buy-book-btn';

  button.textContent = isBookOwned ? 'Own' : 'Buy';
  button.disabled = isBookOwned;
}

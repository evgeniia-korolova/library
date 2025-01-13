import { openSubscriptionModal } from './subscriptionModal.js';
import { initSubscriptionHandler } from './subscriptionHandlers.js';
import { createMarkupRegisterModal } from './modals/createMarkupRegister.js';
import { createMarkupLoginModal } from './modals/createMarkupLogin.js';
import {getFromLocalStorage,	saveToLocalStorage} from './utils/commonServices/localStorageService.js';
import { showOverlayMessage } from './utils/openCloseService/showOverlayMessage.js';

export function initBuyButtonHandlers(currentUser) {
	const buyButtons = document.querySelectorAll('.buy-book-btn');

	buyButtons.forEach((button) => {
		// Удаляем старые обработчики перед добавлением новых
		const newButton = button.cloneNode(true);
		button.replaceWith(newButton);

		newButton.addEventListener('click', () => {
			// Проверяем текущего пользователя
			if (!currentUser) {
				console.log('User is not logged in or registered');
				// showOverlayMessage('Please register and/or log in to buy a book!');
				createMarkupRegisterModal();
				return;
			}

			if (!currentUser.isLoggedIn && !currentUser.isRegistered) {
				console.log('User is not logged in or registered');
				// showOverlayMessage('Please register and/or log in to buy a book!');
				createMarkupRegisterModal();

				return;
			}
			if (!currentUser.isLoggedIn && currentUser.isRegistered) {
				console.log('User is registered  but not logged in');
				// showOverlayMessage('Please log in to buy a book!');
				createMarkupLoginModal();
				return;
			}

			if (
				currentUser.isLoggedIn &&
				currentUser.isRegistered &&
				!currentUser.activeUser
			) {
				console.log(
					'User is logged in and registered, but not active'
				);
				openSubscriptionModal();
				initSubscriptionHandler();
				return;
			}

			// Если пользователь активен, покупаем книгу
			if (
				currentUser.isLoggedIn &&
				currentUser.activeUser &&
				currentUser.isRegistered
			) {
				const bookTitle = newButton.dataset.bookTitle;
				const bookAuthor = newButton.dataset.bookAuthor;

				// Проверяем, чтобы книга не была уже куплена
				if (
					currentUser.ownedBooks &&
					currentUser.ownedBooks.some(
						(book) =>
							book.title === bookTitle && book.author === bookAuthor
					)
				) {
					showOverlayMessage('You already own this book!');
					return;
				}

				// Добавляем книгу в массив ownedBooks
				currentUser.ownedBooks = currentUser.ownedBooks || [];
				currentUser.ownedBooks.push({
					title: bookTitle,
					author: bookAuthor,
				});

				// Сохраняем обновленные данные пользователя в localStorage
				const users = getFromLocalStorage('users') || [];
				const updatedUsers = users.map((user) =>
					user.cardNumber === currentUser.cardNumber
						? currentUser
						: user
				);
				saveToLocalStorage('users', updatedUsers);

				// Меняем стиль кнопки
				newButton.textContent = 'Own';
				newButton.classList.add('btn__own');
				newButton.disabled = true;

				console.log(
					'Book purchased successfully!',
					currentUser.ownedBooks
				);
				showOverlayMessage('Book purchased successfully!');
			}
		});
	});
}

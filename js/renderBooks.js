import { addBookToOwned, showOverlayMessage, BookCard, filterData } from './helpers.js';
import {openSubscriptionModal} from './subscriptionModal.js';


export function renderBooks(books, parentSelector, user = null) {
	const parent = document.querySelector(parentSelector);
	if (!parent) return;

  const filteredBooks = season ? filterData(books, season) : books;

	parent.innerHTML = ''; 


	filteredBooks.forEach((book) => {
		const bookCard = new BookCard(
			book.id,
			book.title,
			book.author,
			book.image,
			book.description,
			book.owned,
			parentSelector
		);

		bookCard.renderBookCard(user);
	});

	// Добавляем обработчик на кнопки
	// parent.addEventListener('click', (event) => {
	// 	if (event.target.tagName === 'BUTTON' && event.target.dataset.id) {
	// 		const bookId = parseInt(event.target.dataset.id, 10);

  //     if (!user || !user.isLoggedIn) {
	// 			openSubscriptionModal();				
	// 		}

	// 		// Добавляем книгу в коллекцию пользователя
	// 		addBookToOwned(user, bookId);

	// 		// Показываем сообщение пользователю
	// 		showOverlayMessage('Книга добавлена в вашу коллекцию!');

	// 		// Перерисовываем книги, чтобы обновить кнопки
	// 		renderBooks(books, parentSelector, user, season);
	// 	}
	// });
}
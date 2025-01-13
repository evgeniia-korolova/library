import { addBookToOwned, showOverlayMessage, BookCard} from './helpers.js';
import {openSubscriptionModal} from './subscriptionModal.js';
import { filterData } from './utils/BooksService/filterData.js';


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

	
}
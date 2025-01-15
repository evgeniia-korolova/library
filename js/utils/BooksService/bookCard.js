
import { getCurrentUserState, getFromLocalStorage } from './../commonServices/localStorageService.js';

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

        const {activeUser} = getCurrentUserState();
        console.log('activeUser', activeUser);
        
	    const isBookOwned = activeUser?.ownedBooks.some(book => book.id == this.id);
        const buttonClass = isBookOwned
		? 'btn-outlined btn-small btn-auto buy-book-btn btn__own'
		: 'btn-outlined btn-small btn-auto buy-book-btn';

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

            <button class="${buttonClass}" data-book-id="${this.id}" data-book-title="${this.title}" data-book-author="${this.author}"  "type="button"
            ${isBookOwned ? 'disabled' : ''}>
            ${isBookOwned ? 'Own' : 'Buy'}
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

export function reRenderBooks() {
    document.querySelector('.books-container').innerHTML = ''; // Очищаем контейнер
    books.forEach((book) => {
        const bookCard = new BookCard(
            book.id,
            book.title,
            book.author,
            book.image,
            book.description,
            '.books-container'
        );
        bookCard.renderBookCard(); // Рендерим заново
    });
}

// data-active-subscription="false"
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

            <button class="btn-outlined btn-small btn-auto buy-book-btn" data-book-id="${this.id}" data-book-title="${this.title}" data-book-author="${this.author}"type="button">
                Buy
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
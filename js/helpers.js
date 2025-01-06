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

            <button class="btn-outlined btn-small btn-auto">
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

export function filterData(array, season) {
    return array.filter((book) => book.season === season);
}

export function showOverlayMessage(message) {
	const modalOverlay = document.getElementById('modal-overlay');
	const modalContent = document.querySelector('.modal-content');

	// Отображаем сообщение
	modalContent.innerHTML = `<p class="overlay-message">${message}</p>`;
	modalOverlay.classList.add('open-overlay');

	// Закрываем оверлей через 3 секунды
	setTimeout(() => {
		modalOverlay.classList.remove('open-overlay');
		modalContent.innerHTML = '';
	}, 3000);
}

export function closeAllModals() {
	const modalOverlay = document.querySelector('.modal-overlay');
	if (
		modalOverlay &&
		modalOverlay.classList.contains('open-overlay')
	) {
		modalOverlay.classList.remove('open-overlay');
		document.body.classList.remove('no-scroll');
	}
}

export function openModal(content) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.querySelector('.modal-content');
	modalContent.innerHTML = content;
	modalOverlay.classList.add('open-overlay');
	document.body.classList.add('no-scroll');
}

export function addModalEventListeners(buttonId, callback) {
	document
		.querySelector('.close')
		.addEventListener('click', closeAllModals);
	document
		.getElementById(buttonId)
		.addEventListener('click', callback);
}



// export function addModalEventListeners(modalId, callback) {
// 	const modal = document.getElementById(modalId);
// 	if (modal) {
// 		const closeButton = modal.querySelector('.close');
// 		if (closeButton) {
// 			closeButton.addEventListener('click', () => {
// 				closeAllModals();
// 				if (callback) callback();
// 			});
// 		}
// 	}
// }
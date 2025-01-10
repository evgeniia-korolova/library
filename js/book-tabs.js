import { books } from './data.js';
import { BookCard, filterData } from './helpers.js';



const radioBtns = document.querySelectorAll('.radio__item');
export function initializeTabs(array, parentSelector) {
	const initialSeason = 'winter';
	const filteredArray = filterData(books, initialSeason);	


	filteredArray.forEach((book) => {
		const bookCard = new BookCard(
			book.id,
			book.title,
			book.author,
			book.image,
			book.description,
			parentSelector
		);
		bookCard.renderBookCard();
	});
	radioBtns[0].checked = true;
	
}

export function handleSeasons(array, parentSelector) {
	const radioBtns = document.querySelectorAll('.radio__item');
	const seasonSlide = document.querySelector('.season-slide');
	let animationTimeout;

	radioBtns.forEach((radioBtn) => {
		radioBtn.addEventListener('change', () => {
			const season = radioBtn.id;
			const filteredArray = filterData(array, season);

			clearTimeout(animationTimeout);
			seasonSlide.classList.remove('fade-in', 'fade-out');

			seasonSlide.classList.add('fade-out');

			animationTimeout = setTimeout(() => {
				seasonSlide.innerHTML = '';
				filteredArray.forEach((book) => {
					const bookCard = new BookCard(
						book.id,
						book.title,
						book.author,
						book.image,
						book.description,
						parentSelector
					);
					bookCard.renderBookCard();
				});

				seasonSlide.classList.remove('fade-out');
				seasonSlide.classList.add('fade-in');

				animationTimeout = setTimeout(() => {
					seasonSlide.classList.remove('fade-in');
				}, 1000);
			}, 1000);
		});
	});
	
}
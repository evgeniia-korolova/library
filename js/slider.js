export function handleSlider() {
	const sliderTrack = document.querySelector('.slider__track');
	const sliderCards = document.querySelectorAll('.slider__card');
	const indicators = document.querySelectorAll('.slider__pagination-list li');
	const leftArrow = document.querySelector('.arrow-left');
	const rightArrow = document.querySelector('.arrow-right');
	const gap = 25;
	let currentIndex = 0;
	

	const setActiveIndicator = (index) => {
		indicators.forEach((indicator, indicatorIndex) => {
			indicator.classList.remove('selected');
			if (indicatorIndex === index) {
				indicator.classList.add('selected');
			}
		});
	};
	const moveSlider = (index) => {
		const offset = index * (sliderCards[index].offsetWidth + gap);
		sliderTrack.style.transform = `translateX(-${offset}px)`;
		setActiveIndicator(index);

		if (index === 0) {
			leftArrow.classList.add('disabled');
		} else {
			leftArrow.classList.remove('disabled');
		}

		if (index === sliderCards.length - 1) {
			rightArrow.classList.add('disabled');
		} else {
			rightArrow.classList.remove('disabled');
		}
	};

	const handleIndicators = () => {
		indicators.forEach((indicator, index) => {
			indicator.addEventListener('click', () => {
				if (currentIndex !== index) {
					currentIndex = index;
					moveSlider(index);
				}
			});
		});
	};

	const handleArrows = () => {
		leftArrow.addEventListener('click', () => {
			if (currentIndex > 0) {
				currentIndex--;
				moveSlider(currentIndex);
			}
		});

		rightArrow.addEventListener('click', () => {
			if (currentIndex < sliderCards.length - 1) {
				currentIndex++;
				moveSlider(currentIndex);
			}
		});
	};

	handleArrows();
	handleIndicators();
}



function initBuyButtonHandlers2(currentUser) {
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
        currentUser.isLoggedIn && currentUser.activeUser && currentUser.isRegistered) {
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

export function initBuyButtonHandlers() {
	const seasonSlide = document.querySelector('.season-slide');
  

	if (!seasonSlide) {
		console.error('Season slide container not found in the DOM!');
		return;
	}

	// Устанавливаем делегирование события
	seasonSlide.addEventListener('click', (event) => {
    const button = event.target.closest('.buy-book-btn');
    console.log('Handler triggered for button:', button);
		const {
			registerNotLoggedIn,
			registeredAndLoggedIn,
			activeNotLoggedIn,
			activeUser,
		} = getCurrentUserState();
		// Проверяем, что кликнули на кнопку
		if (!button) return;

		// Проверка авторизации пользователя
		if (activeUser) {
			const bookTitle = button.dataset.bookTitle;
			const bookAuthor = button.dataset.bookAuthor;
			const bookId = button.dataset.bookId;
			// Проверяем, чтобы книга не была уже куплена

			// console.log(
			// 	'Checking if book already exists:',
			// 	activeUser.ownedBooks
			// );
			// if (
			// 	activeUser.ownedBooks.some(
			// 		(book) =>
			// 			book.title.trim().toLowerCase() !==
			// 				bookTitle.trim().toLowerCase() &&
			// 			book.author.trim().toLowerCase() !==
			// 				bookAuthor.trim().toLowerCase() || []
			// 	)
			// ) {
				// activeUser.ownedBooks = activeUser.ownedBooks || [];
				activeUser.ownedBooks.push({
					title: bookTitle,
					author: bookAuthor,
					id: bookId,
				});
				console.log('Updated activeUser:', activeUser);
				const users = getFromLocalStorage('users') || [];
				const updatedUsers = users.map((user) =>
					user.cardNumber === activeUser.cardNumber
						? activeUser
						: user
				);

				console.log(
					'Saving updated users to localStorage:',
					updatedUsers
				);
				saveToLocalStorage('users', updatedUsers);
        button.textContent = 'Own';
			button.classList.add('btn__own');
			button.disabled = true;

			console.log(
				'Book purchased successfully!',
				activeUser.ownedBooks
			);
			// }
			// {
			// 	showOverlayMessage('You already own this book!');
			// 	return;
			// }			
			
			return;
			// showOverlayMessage('Book purchased successfully!');
		} else if (registeredAndLoggedIn) {
			openSubscriptionModal(); // Модальное окно абонемента
			initSubscriptionHandler();
			console.log(
				'User is registered  and logged in',
				registeredAndLoggedIn
			);

			return; // Прерываем выполнение
		} else if (registerNotLoggedIn || activeNotLoggedIn) {
			createMarkupLoginModal();
			return;
		} else {
			console.log('User is not logged in or registered');
			createMarkupRegisterModal();
			return;
		}
	});
	console.log('Buy button handler triggered');
	// updateButtonStates(RegisteredLoggedIn);
}

function updateButtonStates(currentUser) {
	const buyButtons = document.querySelectorAll('.buy-book-btn');

	if (!currentUser || !currentUser.ownedBooks) return;

	buyButtons.forEach((button) => {
		const bookTitle = button.dataset.bookTitle;
		const bookAuthor = button.dataset.bookAuthor;

		if (
			currentUser.ownedBooks.some(
				(book) =>
					book.title === bookTitle && book.author === bookAuthor
			)
		) {
			button.textContent = 'Own';
			button.classList.add('btn__own');
			button.disabled = true;
		}
	});
}

// TODO
// renderBookCard() {
// 	const bookWrapper = document.createElement('div');
// 	bookWrapper.classList.add('book__wrapper');

// 	// Проверяем, есть ли книга у текущего активного пользователя
// 	const activeUser = getFromLocalStorage('users')?.find(user => user.activeUser);
// 	const isBookOwned = activeUser?.ownedBooks.some(book => book.id === this.id);

// 	bookWrapper.innerHTML = `
//         <div class="book__content__container">
//             <div class="book__content">
//                 <h3 class="staff">Staff Picks</h3>

//                 <h4 class="book__title">
//                     ${this.title}
//                 </h4>
//                 <h5 class="book__author">${this.author}</h5>
//                 <p class="book__description">
//                     ${this.description}
//                 </p>
//             </div>

//             <button 
//                 class="btn-outlined btn-small btn-auto buy-book-btn ${isBookOwned ? 'btn__own' : ''}" 
//                 data-book-id="${this.id}" 
//                 data-book-title="${this.title}" 
//                 data-book-author="${this.author}" 
//                 type="button"
//                 ${isBookOwned ? 'disabled' : ''}>
//                 ${isBookOwned ? 'Own' : 'Buy'}
//             </button>
//         </div>
//         <div class="book__photo">
//             <img
//                 src="${this.image}"
//                 alt="The Book Eaters By Sunyi Dean"
//             />
//         </div>       
//     `;

// 	this.parent.append(bookWrapper);
// }
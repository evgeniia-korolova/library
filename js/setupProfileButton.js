import { createUserProfileModal } from './user-modal.js';

export function setupProfileButton(authUserDrop, email) {
	const readerInfoBtn = authUserDrop.querySelector('#readerInfoBtn');
	if (readerInfoBtn) {
		// Удаляем предыдущие обработчики (если есть)
		// readerInfoBtn.removeEventListener('click', handleProfileClick);
    

		// Добавляем новый обработчик
		readerInfoBtn.addEventListener('click', handleProfileClick);

		function handleProfileClick() {      
			createUserProfileModal(email);
		}
	}
}

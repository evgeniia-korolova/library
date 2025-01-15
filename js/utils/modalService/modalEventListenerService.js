import { closeAllModals } from "../openCloseService/closeModal.js";

export function addModalEventListeners(buttonId, callback) {
	const closeButton = document.querySelector('.close');
	const actionButton = document.getElementById(buttonId);

	if (closeButton) {
		closeButton.addEventListener('click', (e) => {
			e.stopPropagation(); // Предотврати конфликт с другими событиями
			closeAllModals();
		});
	}

	if (actionButton) {
		actionButton.addEventListener('click', (e) => {
			e.stopPropagation();
			closeAllModals(); // Предотврати конфликт
			callback();
			console.log('addModalEventListeners');
			
		});
	}
}
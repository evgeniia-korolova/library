export function openModal(content) {
	const modalOverlay = document.getElementById('modal-overlay');
	const modalContent = document.querySelector('.modal-content');
	modalContent.innerHTML = content;
	modalOverlay.classList.add('open-overlay');
	document.body.classList.add('no-scroll');	
	console.log('Modal opened');	
}
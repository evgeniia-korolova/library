export function showOverlayMessage(message) {
	const messageOverlay = document.getElementById('message-overlay');
	const messageContent = document.querySelector('.message-content');
	

	// Отображаем сообщение
	messageContent.innerHTML = `<p class="overlay-text">${message}</p>`;	
	messageOverlay.classList.add('open-overlay');
	console.log('showOverlayMessage');
	

	setTimeout(() => {
		messageOverlay.classList.remove('open-overlay');
		messageContent.innerHTML = '';
		console.log('hideOverlayMessage');
		
		if (document.body.classList.contains('no-scroll')) {
			document.body.classList.remove('no-scroll');
		}
	}, 2000);
}
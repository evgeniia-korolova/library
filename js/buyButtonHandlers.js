import { showOverlayMessage } from './helpers.js';
import { openSubscriptionModal } from './subscriptionModal.js';

export function initBuyButtonHandlers(currentUser) {
  const buyButtons = document.querySelectorAll('.buy-book-btn'); 

  buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!currentUser) {
        showOverlayMessage('Please register and/or log in to buy a book!');
      } else if (!currentUser.isLoggedIn) {
        console.log(currentUser);
        
        showOverlayMessage('Please log in to buy a book!');
      } else {
        openSubscriptionModal();
      }
    });
  });
}
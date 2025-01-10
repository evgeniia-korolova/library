import { showOverlayMessage } from './helpers.js';
import { openSubscriptionModal } from './subscriptionModal.js';
import { getCurrentUser } from './helpers.js'; // Предполагается, что эта функция реализована

export function initBuyButtonHandlers() {
  const buyButtons = document.querySelectorAll('.buy-book-btn');
  const currentUser = getCurrentUser(); // Получаем текущего пользователя

  buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!currentUser) {
        showOverlayMessage('Please register and log in to buy a book!');
      } else if (!currentUser.isLoggedIn) {
        showOverlayMessage('Please log in to buy a book!');
      } else {
        openSubscriptionModal();
      }
    });
  });
}
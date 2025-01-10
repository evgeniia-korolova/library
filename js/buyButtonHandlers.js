import { showOverlayMessage } from './helpers.js';
import { openSubscriptionModal } from './subscriptionModal.js';
import { getFromLocalStorage } from './helpers.js';

// export function initBuyButtonHandlers(user) {
//   const buyButtons = document.querySelectorAll('.buy-book-btn'); 
//   const users = getFromLocalStorage('users') || [];
//   const currentUser = users.find(user => user.isLoggedIn) || null;

//   buyButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       if (!currentUser || !currentUser.isRegistered && !currentUser.isLoggedIn) {
//         console.log('User is not logged in or registered');
//         showOverlayMessage('Please register and/or log in to buy a book!');
//         return
//       } 
//       if (!currentUser.isLoggedIn && currentUser.isRegistered) {
//         console.log('User is not logged in');       
//         showOverlayMessage('Please log in to buy a book!');
//         return
//       } 
//       if (currentUser.isLoggedIn && currentUser.isRegistered) {
//         console.log('User is logged in and registered');
//         openSubscriptionModal();
//         return
//       }
//     });
//   });
// }

export function initBuyButtonHandlers(currentUser) {
  const buyButtons = document.querySelectorAll('.buy-book-btn'); 

  buyButtons.forEach((button) => {
    // Удаляем старые обработчики перед добавлением новых
    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);

    newButton.addEventListener('click', () => {
      // Проверяем текущего пользователя
      if (!currentUser) {
        console.log('User is not logged in or registered');
        showOverlayMessage('Please register and/or log in to buy a book!');
        return;
      }

      if (!currentUser.isLoggedIn && !currentUser.isRegistered) {
        console.log('User is not logged in or registered');
        showOverlayMessage('Please register and/or log in to buy a book!');
        return;
      }
      if (!currentUser.isLoggedIn && currentUser.isRegistered) {
        console.log('User is registered  but not logged in');
        showOverlayMessage('Please log in to buy a book!');
        return;
      }
     

      if (currentUser.isLoggedIn && currentUser.isRegistered) {
        console.log('User is logged in and registered');
        openSubscriptionModal();
      }
    });
  });
}
import { closeAllModals } from "./utils/openCloseService/closeModal.js";
import { showOverlayMessage } from "./utils/openCloseService/showOverlayMessage.js";
import {getFromLocalStorage, saveToLocalStorage, getCurrentUserState} from "./utils/commonServices/localStorageService.js";
import { initBuyButtonHandlers } from "./buyButtonHandlers.js";


export function initSubscriptionHandler1() {  
  
  const subscriptionForm = document.getElementById('subscription-form');
  if (!subscriptionForm) {
    console.error('Subscribe button not found in the DOM!');
    return;
  }

  subscriptionForm.addEventListener('submit', (e) => {   
    e.preventDefault();
    // Получаем текущего пользователя
    const users = getFromLocalStorage('users') || [];
    const currentUser = users.find((user) => user.isLoggedIn && user.isRegistered);

    
    // Устанавливаем статус activeUser: true
    currentUser.activeUser = true;

    // Сохраняем изменения в localStorage
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? currentUser : user
    );
    saveToLocalStorage('users', updatedUsers);
    const updatedCurrentUser = getFromLocalStorage('users').find(
      (user) => user.activeUser
    );

    // Показываем сообщение об успешной подписке
    closeAllModals();
    // showOverlayMessage('Subscription purchased successfully!');  
    initBuyButtonHandlers(updatedCurrentUser);
  });
}

export function initSubscriptionHandler() {
  const subscriptionForm = document.getElementById('subscription-form');
  if (!subscriptionForm) {
    console.error('Subscribe button not found in the DOM!');
    return;
  }

  subscriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { registeredAndLoggedIn } = getCurrentUserState();
    if (!registeredAndLoggedIn) {
      console.error('Current user not found or not logged in!');
      return;
    }

    registeredAndLoggedIn.activeUser = true;

    const users = getFromLocalStorage('users') || [];
    const updatedUsers = users.map((user) =>
      user.cardNumber === registeredAndLoggedIn.cardNumber ? registeredAndLoggedIn : user
    );
    saveToLocalStorage('users', updatedUsers);

    closeAllModals();
    showOverlayMessage('Subscription purchased successfully!');
    initBuyButtonHandlers(); // Перезапускаем обработчики
  });
}
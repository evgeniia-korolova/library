import { closeAllModals } from "./utils/openCloseService/closeModal.js";
import { showOverlayMessage } from "./utils/openCloseService/showOverlayMessage.js";
import {getFromLocalStorage, saveToLocalStorage} from "./utils/commonServices/localStorageService.js";



export function initSubscriptionHandler() {
  
  
  const subscribeButton = document.getElementById('subscribe-btn');
  if (!subscribeButton) {
    console.error('Subscribe button not found in the DOM!');
    return;
  }

  subscribeButton.addEventListener('click', (e) => {   
    // Получаем текущего пользователя
    const users = getFromLocalStorage('users');
    const currentUser = users.find((user) => user.isLoggedIn);

    if (!currentUser) {
      showOverlayMessage('No logged-in user found!');
      return;
    }

    // Устанавливаем статус activeUser: true
    currentUser.activeUser = true;

    // Сохраняем изменения в localStorage
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? currentUser : user
    );
    saveToLocalStorage('users', updatedUsers);

    // Показываем сообщение об успешной подписке
    closeAllModals();
    // showOverlayMessage('Subscription purchased successfully!');  
    
  });
}
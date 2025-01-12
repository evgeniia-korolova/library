import { showOverlayMessage,  closeAllModals, getFromLocalStorage, saveToLocalStorage } from "./helpers.js";


export function initSubscriptionHandler() {
  
  
  const subscribeButton = document.getElementById('subscribe-btn');
  if (!subscribeButton) {
    console.error('Subscribe button not found in the DOM!');
    return;
  }

  subscribeButton.addEventListener('click', (e) => {
    console.log(e.target);
    console.log('initSubscriptionHandler');
    
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

    // Обновляем профиль пользователя
    
  });
}
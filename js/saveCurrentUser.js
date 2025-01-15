
import { initBuyButtonHandlers } from "./buyButtonHandlers.js";
import { closeAllModals } from "./utils/openCloseService/closeModal.js";
import { getFromLocalStorage } from './utils/commonServices/localStorageService.js';
export function saveCurrentUser() {
  const users = getFromLocalStorage('users') || [];
  const loggedInUser = users.find((user) => user.isLoggedIn) || null;
  const registeredUser = users.find((user) => user.isRegistered && !user.isLoggedIn) || null;
  const userBtn = document.querySelector('.user-icon');
  closeAllModals();

  if (loggedInUser) {
    console.log('User is already logged in:', loggedInUser);
    updateInterfaceAfterLogin(loggedInUser);
    initBuyButtonHandlers(loggedInUser);
    userBtn.setAttribute('data-is-logged', 'true');
    notAuthUserDrop.classList.add('hidden');
    authUserDrop.classList.remove('hidden');// Обновляем интерфейс для залогиненного пользователя
  } else if (registeredUser) {
    console.log('User is registered but not logged in:', registeredUser);
    updateInterfaceAfterLogin(registeredUser);
    initBuyButtonHandlers(registeredUser);
    notAuthUserDrop.classList.remove('hidden');
    authUserDrop.classList.add('hidden'); // Обновляем интерфейс для зарегистрированного пользователя
  }
  else {
    console.log('No user is logged in');
  }

  function updateInterfaceAfterLogin(user) {
    const userBtn = document.querySelector('.user-icon');
    const profileCardNo = document.getElementById('user-menu__card-number');  
    userBtn.classList.add('registered');
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.add('user-menu-hidden');
    
    userBtn.textContent = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    userBtn.title = `${user.firstName} ${user.lastName}`;
    profileCardNo.textContent = `${user.cardNumber}`;
  
    notAuthUserDrop.classList.add('hidden');
    authUserDrop.classList.remove('hidden');
    
  }
}
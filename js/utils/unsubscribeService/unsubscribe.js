import { getFromLocalStorage, saveToLocalStorage } from '../../utils/commonServices/localStorageService.js';
export function unsubscribe(user) {
  const users = getFromLocalStorage('users') || [];

  // Удаляем пользователя из массива
  const updatedUsers = users.filter((u) => u.cardNumber !== user.cardNumber);

  // Сохраняем обновленный массив в localStorage
  saveToLocalStorage('users', updatedUsers);

  // Обновляем интерфейс
  const userBtn = document.querySelector('.user-icon');
  const userMenu = document.getElementById('userMenu');
  const profileCardNo = document.getElementById('user-menu__card-number');

  userMenu.classList.add('user-menu-hidden');
  notAuthUserDrop.classList.remove('hidden');
  authUserDrop.classList.add('hidden');
  userBtn.classList.remove('registered');
  userBtn.removeAttribute('data-is-logged', 'true');
  userBtn.textContent = '';
  userBtn.innerHTML =
    '<img src="../images/icon_profile.svg" alt="user icon" />';
  profileCardNo.textContent = '';

  console.log('User has been unsubscribed and removed from localStorage!');
}
import { saveToLocalStorage, getFromLocalStorage } from './helpers.js';

export function resetLoggedInStatus() {
  // const users = JSON.parse(localStorage.getItem('users')) || [];
  const users = getFromLocalStorage('users');
  const updatedUsers = users.map((user) => ({
      ...user,
      isLoggedIn: false,
  }));
  // localStorage.setItem('users', JSON.stringify(updatedUsers));
  saveToLocalStorage('users', updatedUsers);
}
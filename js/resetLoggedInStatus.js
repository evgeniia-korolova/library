import {	
  getFromLocalStorage, saveToLocalStorage
} from './helpers.js';


export function resetLoggedInStatus() {
	const users = getFromLocalStorage('users') || [] || null;

  
    const updatedUsers = users.map(user => {
      user.isLoggedIn = false; // Сбрасываем статус логина
      return user;
    });
    saveToLocalStorage('users', updatedUsers);
}

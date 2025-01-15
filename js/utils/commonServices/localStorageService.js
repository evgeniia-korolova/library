export function initializeLocalStorage() {
  const users = getFromLocalStorage('users') || null;
  if (!users) {
    saveToLocalStorage('users', []); // Инициализируем пустой массив пользователей
    console.log('Initialized users array in localStorage.');
  }
}

export function getFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveToLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}


export function getCurrentUserState() {
  const users = getFromLocalStorage('users') || [];	  
  // Поиск текущего пользователя	
  
  const registeredNotLoggedIn = users.find(user => (user.isRegistered && !user.isLoggedIn && !user.activeUser));
  const registeredAndLoggedIn = users.find(user => user.isLoggedIn && user.isRegistered && !user.activeUser);
  const activeNotLoggedIn = users.find(user => (!user.isLoggedIn && user.isRegistered && user.activeUser))
	const activeUser = users.find(user => user.activeUser && user.isLoggedIn && user.isRegistered);

  return {		
   
    registerNotLoggedIn: registeredNotLoggedIn ,
    registeredAndLoggedIn: registeredAndLoggedIn,
    activeNotLoggedIn: activeNotLoggedIn,
		activeUser: activeUser
  };
}
import { getFromLocalStorage, saveToLocalStorage, getCurrentUserState } from "./utils/commonServices/localStorageService.js";

export function handleLogOut() {
  const logOutBtn = document.getElementById('logOutBtn');  
  
  const { registeredAndLoggedIn, activeUser } = getCurrentUserState();
  logOutBtn.addEventListener('click', ()=> {    
    if (registeredAndLoggedIn) {              
        doLogOut(registeredAndLoggedIn);      
    }
  });
  if (activeUser) {
    logOutBtn.addEventListener('click', ()=> {
      doLogOut(activeUser);
    });    
  }
}
function doLogOut(user) { 
    const userBtn = document.getElementById('userIcon');
    const userMenu = document.getElementById('userMenu');

    if (!user) return;
    
      let users = getFromLocalStorage('users') || null || [];
      const updatedUser = users.map((u) =>
        u.cardNumber === user.cardNumber
          ? { ...u, isLoggedIn: false }
          : u
      );

      user.isLoggedIn = false;
      saveToLocalStorage('users', updatedUser);

      // Обновляем интерфейс
      userMenu.classList.add('user-menu-hidden');
      authUserDrop.classList.add('hidden');
      // notAuthUserDrop.classList.remove('hidden');			
      userBtn.removeAttribute('data-is-logged', 'true');
      userBtn.title = '';
      userBtn.classList.remove('registered');
      userBtn.textContent = '';
      userBtn.innerHTML =
        '<img src="./images/icon_profile.svg" alt="user icon" />';
      // location.reload(true);

      console.log('User successfully logged out!');    
  }
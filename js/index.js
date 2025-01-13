import { toggleBurger } from './burger.js';
import { handleSlider } from './slider.js';
import { initializeTabs, handleSeasons } from './book-tabs.js';
import { books } from './data.js';
import { handleModals } from './loginRegistrationModals.js';
import { handleUserIconClick } from './utils/openCloseService/handleUserIconClick.js';
import { initBuyButtonHandlers } from './buyButtonHandlers.js';
import { resetLoggedInStatus } from './resetLoggedInStatus.js';
import { saveCurrentUser } from './saveCurrentUser.js';
import { closeAllPopups } from './utils/popupService/closeAllPopups.js';
import { getFromLocalStorage } from './utils/commonServices/localStorageService.js';



document.addEventListener('DOMContentLoaded', () => {
	const users = getFromLocalStorage('users') || [];
	const loggedInUser = users.find((user) => user.isLoggedIn) || null;

	

	toggleBurger();
	handleSlider();
	closeAllPopups();
	initializeTabs(books, '.season-slide');
	handleSeasons(books, '.season-slide');
	handleUserIconClick();
	handleModals();
	initBuyButtonHandlers(loggedInUser);
	// resetLoggedInStatus();
	// saveCurrentUser();
});

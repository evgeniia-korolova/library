import { toggleBurger } from './burger.js';
import { handleSlider } from './slider.js';
import { initializeTabs, handleSeasons } from './book-tabs.js';
import { books } from './data.js';
import { handleModals } from './utils/modalService/loginRegistrationToggler.js';
import { handleUserIconClick } from './utils/openCloseService/handleUserIconClick.js';
import { initBuyButtonHandlers } from './buyButtonHandlers.js';
import { resetLoggedInStatus } from './resetLoggedInStatus.js';
import { saveCurrentUser } from './saveCurrentUser.js';
import { closeAllPopups } from './utils/popupService/closeAllPopups.js';
import { getFromLocalStorage, initializeLocalStorage, saveToLocalStorage, getCurrentUserState } from './utils/commonServices/localStorageService.js';



document.addEventListener('DOMContentLoaded', () => {	

	toggleBurger();
	handleSlider();	
	closeAllPopups();
	initializeTabs(books, '.season-slide');
	handleSeasons(books, '.season-slide');
	handleUserIconClick();
	handleModals();
	initBuyButtonHandlers();
	resetLoggedInStatus();
	// saveCurrentUser();
});

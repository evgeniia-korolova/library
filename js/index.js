import { toggleBurger } from './burger.js';
import { handleSlider } from './slider.js';
import { initializeTabs, handleSeasons } from './book-tabs.js';
import { books } from './data.js';
import { handleModals } from './modals.js';
import {
	handleUserIconClick,
	closeAllPopups,
	getFromLocalStorage,
} from './helpers.js';
import { initBuyButtonHandlers } from './buyButtonHandlers.js';
import { resetLoggedInStatus } from './resetLoggedInStatus.js';
import { saveCurrentUser } from './saveCurrentUser.js';



document.addEventListener('DOMContentLoaded', () => {
	const users = getFromLocalStorage('users') || [];
	const loggedInUser = users.find((user) => user.isLoggedIn) || null;

	

	toggleBurger();
	handleSlider();
	closeAllPopups();
	initializeTabs(books, '.season-slide');
	handleSeasons(books, '.season-slide');
	handleModals();
	handleUserIconClick();
	resetLoggedInStatus();
	initBuyButtonHandlers(loggedInUser);
	saveCurrentUser();
});

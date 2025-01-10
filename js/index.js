import { toggleBurger } from "./burger.js";
import { handleSlider } from "./slider.js";
import { initializeTabs, handleSeasons } from "./book-tabs.js";
import { books } from './data.js';
import { handleModals } from './modals.js';
import { handleUserIconClick, closeAllPopups,  getFromLocalStorage } from "./helpers.js";
import { initBuyButtonHandlers } from "./buyButtonHandlers.js";


import { resetLoggedInStatus } from "./resetLoggedInStatus.js";

const users = getFromLocalStorage('users') || [];
const loggedInUser = users.find(user => user.isLoggedIn) || null;


window.addEventListener('beforeunload', resetLoggedInStatus);


toggleBurger();
handleSlider();
closeAllPopups();
initializeTabs(books, '.season-slide');
handleSeasons(books, '.season-slide');
handleModals();
handleUserIconClick();
resetLoggedInStatus();
initBuyButtonHandlers(loggedInUser);



import { toggleBurger } from "./burger.js";
import { handleSlider } from "./slider.js";
import { initializeTabs, handleSeasons } from "./book-tabs.js";
import { books } from './data.js';
import { handleModals } from './modals.js';
import { handleUserIconClick, closeAllPopups,  getFromLocalStorage } from "./helpers.js";
import { initBuyButtonHandlers } from './buyButtonHandlers.js';
import { resetLoggedInStatus } from "./resetLoggedInStatus.js";


window.addEventListener('beforeunload', resetLoggedInStatus);
let initialUser = {}

toggleBurger();
handleSlider();
initializeTabs(books, '.season-slide');
handleSeasons(books, '.season-slide');
handleModals();
handleUserIconClick();
closeAllPopups();
initBuyButtonHandlers(initialUser);


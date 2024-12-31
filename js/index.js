import { toggleBurger } from "./burger.js";
import { handleSlider } from "./slider.js";
import { initializeTabs, handleSeasons } from "./book-tabs.js";
import { books } from './data.js';

toggleBurger();
handleSlider();
initializeTabs(books, '.season-slide');
handleSeasons(books, '.season-slide');

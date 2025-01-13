import { books } from '../../data.js';

export function filterData(array, season) {
	return array.filter((book) => book.season === season);
}
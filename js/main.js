import { setSearchFocus } from './searchBar.js';
import { getSearchTerm } from './dataFunctions.js';
import { retrieveSearchResults } from './dataFunctions.js';
import { deleteSearchResults } from './searchResults,js';
import {
  deleteSearchResults,
  buildSearchResults,
  setStatsLine,
  clearStatsLine,
} from './searchResults.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  // set the focus
  setSearchFocus();

  // 3 listeners clear text

  const form = document.getElementById('searchBar');
  form.addEventListener('submit', submitTheSearch);
};

// Procedural "workflow" function
const submitTheSearch = (event) => {
  event.preventDefault();
  // delete search results
  deleteSearchResults();

  // process the search
  processTheSearch();

  // set the focus
  setSearchFocus();
};

// Procedural
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};

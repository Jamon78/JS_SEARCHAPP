import {
  setSearchFocus,
  showClearTextButton,
  clearPushListener,
  clearSearchText,
} from './searchBar.js';
import { getSearchTerm } from './dataFunctions.js';
import { retrieveSearchResults } from './dataFunctions.js';
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

  const search = document.getElementById('search');
  search.addEventListener('input', showClearTextButton);
  const clear = document.getElementById('clear');
  clear.addEventListener('click', clearSearchText);
  clear.addEventListener('keydown', clearPushListener);

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

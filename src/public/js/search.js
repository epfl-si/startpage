const localStorageKey = 'startpage';

function saveLocalStorage(data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}
function getLocalStorage() {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

async function loadSettings(settingFileName = 'default') {
  try {
    const response = await fetch(`/settings/${settingFileName}.json`);
    const data = await response.json();
    removeItem(localStorageKey);
    saveLocalStorage(data);
  } catch (err) {
    console.error(err);
  }
}

loadSettings();
const settings = getLocalStorage();

// Get the select search engine
const setSearchOn = (searchEngine, keepValue = '') => {
  $('#search_on').text(searchEngine);
  $('#dynamic_search').val(keepValue);
};

// Do the redirection to the select search engine with the input terms
const doSearchAction = (terms) => {
  const searchEngine = $('#search_on').text().trim();
  const activeSE = settings.searchEngines.find(
    (se) => se.name === searchEngine
  );
  console.debug(' → redirect to', activeSE.URL + terms);
  window.open(activeSE.URL + terms);
};

const getDefaultSearchEngine = () => {
  return settings.searchEngines.find((se) => se.default);
};

const getSearchEngineOnSearchKeyword = (key) => {
  return settings.searchEngines.find((se) => se.keyword.includes(key));
};

$(function () {
  $('.dropdown-item').click(function () {
    const searchOn = $(this).text();
    setSearchOn(searchOn);
  });

  $('#dynamic_search').bind('keyup', function (e) {
    const terms = $(this).val();
    // backspace is pressed and input is empty
    if (e.keyCode === 8 && !terms) {
      // Choose the default search engine
      setSearchOn(getDefaultSearchEngine().name);
    }
    // space bar is pressed
    if (e.keyCode === 32 && terms.length > 1) {
      const arrayOfTerms = terms.trim().split(' ');
      const activeSE = getSearchEngineOnSearchKeyword(arrayOfTerms[0]);
      if (activeSE.name) {
        setSearchOn(activeSE.name);
      }
    }
    // enter is pressed
    if (e.keyCode === 13 && terms) {
      doSearchAction(terms);
    }
    // escape is pressed
    if (e.keyCode === 27 && terms) {
      $('#dynamic_search').val('');
      $('#dynamic_search').focus();
    }
  });

  // Global escape key
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      $('#dynamic_search').val('');
      $('#dynamic_search').focus();
      // @TODO: open help or something
    }
  });
});

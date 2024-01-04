const setSearchOn = (searchEngine, keepValue = '') => {
  $('#search_on').text(searchEngine);
  $('#dynamic_search').val(keepValue);
};
const doSearchAction = (terms) => {
  const searchEngine = $('#search_on').text().trim();
  if (searchEngine === 'DuckDuckGo') {
    window.open('https://duckduckgo.com/?q=' + terms);
  }
  if (searchEngine === 'EPFL Go') {
    window.open('https://go.epfl.ch/' + terms);
  }
  if (searchEngine === 'Google') {
    window.open('https://www.google.com/search?hl=en&q=' + terms);
  }
  if (searchEngine === 'EPFL') {
    window.open('https://search.epfl.ch/?q=' + terms);
  }
  if (searchEngine === 'EPFL Map') {
    window.open('https://plan.epfl.ch/?room=' + terms);
  }
  if (searchEngine === 'EPFL People') {
    window.open('https://search.epfl.ch/?filter=people&q=' + terms);
  }
  if (searchEngine === 'EPFL Units') {
    window.open('https://search.epfl.ch/?filter=unit&q=' + terms);
  }
  if (searchEngine === 'ServiceNow') {
    window.open(
      // eslint-disable-next-line
      'https://support.epfl.ch/backoffice/$sn_global_search_results.do?sysparm_view=text_search&sysparm_search=' +
        terms
    );
  }
  if (searchEngine === 'Wikipedia') {
    window.open('https://en.wikipedia.org/w/index.php?search=' + terms);
  }
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
      setSearchOn('EPFL');
    }
    // space bar is pressed
    if (e.keyCode === 32 && terms.length > 1) {
      const arrayOfTerms = terms.trim().split(' ');
      switch (arrayOfTerms[0]) {
        case '?':
          setSearchOn('Google');
          break;
        case 'd':
          setSearchOn('DuckDuckGo');
          break;
        case 'g':
        case 'go':
          setSearchOn('EPFL Go', arrayOfTerms[1]);
          break;
        case 'm':
          setSearchOn('EPFL Map');
          break;
        case 'p':
          setSearchOn('EPFL People');
          break;
        case 'sn':
          setSearchOn('ServiceNow');
          break;
        case 'u':
          setSearchOn('EPFL Units');
          break;
        case 'w':
          setSearchOn('Wikipedia');
          break;
        default:
        // do nothing
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

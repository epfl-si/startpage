const setSearchOn = (search_engine, keep_value='') => {
  //console.debug('Setting search engine to', search_engine);
  $('#search_on').html(search_engine);
  $('#dynamic_search').val(keep_value);
}
const doSearchAction = (terms) => {
  //console.debug('Launching a search to', $('#search_on').text());
  let search_engine = $('#search_on').text();
  if (search_engine == 'DuckDuckGo') {
    window.open('https://duckduckgo.com/?q=' + terms);
  }
  if (search_engine == 'EPFL Go') {
    window.open('https://go.epfl.ch/' + terms);
  }
  if (search_engine == 'Google') {
    window.open('https://www.google.com/search?hl=en&q=' + terms);
  }
  if (search_engine == 'EPFL') {
    window.open('https://search.epfl.ch/?q=' + terms);
  }
  if (search_engine == 'EPFL Map') {
    window.open('https://plan.epfl.ch/?room=' + terms);
  }
  if (search_engine == 'EPFL People') {
    window.open('https://search.epfl.ch/?filter=people&q=' + terms);
  }
  if (search_engine == 'EPFL Units') {
    window.open('https://search.epfl.ch/?filter=units&q=' + terms);
  }
  if (search_engine == 'ServiceNow') {
    window.open('https://support.epfl.ch/backoffice/$sn_global_search_results.do?sysparm_view=text_search&sysparm_search=' + terms);
  }
  if (search_engine == 'Wikipedia') {
    window.open('https://en.wikipedia.org/w/index.php?search=' + terms);
  }
}

$('.dropdown-item').click(function() {
  let searchOn = $(this).text();
  //console.debug(searchOn);
  setSearchOn(searchOn);
})

$('#dynamic_search').bind('keyup', function(e) {
  let terms = $(this).val();
  //console.debug(e.keyCode, terms);
  // backspace is pressed and input is empty
  if (e.keyCode == 8 && !terms) {
    //console.debug('RESET');
    setSearchOn('EPFL');
  }
  // space bar is pressed
  if (e.keyCode == 32 && terms.length > 1) {
    let terms_array = terms.trim().split(' ');
    //console.debug(terms_array);
    switch (terms_array[0]) {
      case '?':
        setSearchOn('Google');
        break;
      case 'd':
        setSearchOn('DuckDuckGo');
        break;
      case 'g':
      case 'go':
        //console.debug('terms_Array', terms_array)
        setSearchOn('EPFL Go', terms_array[1]);
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
  if (e.keyCode == 13 && terms) {
    //console.debug('GO!');
    doSearchAction(terms);
  }
  // escape is pressed
  if (e.keyCode == 27 && terms) {
    //console.debug('clear');
    $('#dynamic_search').val('');
    $('#dynamic_search').focus();
  }
});

// Global escape key
$(document).keyup(function(e) {
  if(e.keyCode == 27) {
    $('#dynamic_search').val('');
    $('#dynamic_search').focus();
    // @TODO: open help or something
  }
});

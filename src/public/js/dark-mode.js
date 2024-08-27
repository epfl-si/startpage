$(function () {
  // Set initial state
  const storedDarkMode = localStorage.getItem('darkMode');
  const isDarkMode = storedDarkMode === 'true';
  setDarkMode(isDarkMode);
  $('#switchDarkMode').prop('checked', isDarkMode);

  // Listener
  $('#switchDarkMode').change(function () {
    const isDarkMode = $(this).prop('checked');
    setDarkMode(isDarkMode);
  });
});

function setDarkMode (isDarkMode) {
  $('body').toggleClass('dark-mode', isDarkMode);
  localStorage.setItem('darkMode', isDarkMode);
}

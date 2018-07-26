window.onload = (() => {
  // hacemos funcionalidad del splash
  setTimeout(function hide() { $('#splash').hide('fast');
    document.getElementById('principal').style.display = 'block'; }, 3500);

  initMap();
});


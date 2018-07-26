window.onload = (() => {
  // hacemos funcionalidad del splash
  setTimeout(function hide() { $('#splash').hide('fast');
    document.getElementById('principal').style.display = 'block'; }, 3000);

  initMap();


});

const selectRest = document.getElementById("filtrarRestaurantes");
selectRest.addEventListener('change', ()=> {
 
});





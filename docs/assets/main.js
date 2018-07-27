window.onload = (() => {
  // hacemos funcionalidad del splash
  setTimeout(function hide() {
    $('#splash').hide('fast');
    document.getElementById('principal').style.display = 'block'; 
  }, 3000);

  initMap();
});

const selectRest = document.getElementById('filtrarRestaurantes');
selectRest.addEventListener('change', ()=> {
  openModal();
});


// Modal
// funcionalidad del side Menú
const openModal = (()=> { 
  if (sideMenu.className.indexOf('d-none') >= 0) { 
    openMenu(); 
  } else {
    closeMenu(); 
  }
});

function openMenu() {
  sideMenu.classList.remove('d-none'); // quitando clase display-none 
  const nombreRestInput = document.getElementById('filtrarRestaurantes').value;
  let nombreRest,nombreRestSplit;
  if (nombreRestInput.search(' ★')) {
    nombreRestSplit = nombreRestInput.split(' ★');
    nombreRest = nombreRestSplit[0];
  } else if (nombreRestInput.search(' ')) {
    nombreRestSplit = nombreRestInput.split(' ');
    nombreRest = nombreRestSplit[0];
  }
 
  console.log(nombreRest);
  let results = window.restaurants;
  console.log(results);
  let resultRest, nameRest, adress;
  let foundRest = results.find(item => {
    if (nombreRest === item.name) {
      nameRest = item.name;
      adress = item.formatted_address;
      return resultRest = true;
    } else {
      return resultRest = false;
    }
  });
  if (resultRest) {
    results.forEach(element => {
      const modal = document.getElementById('infoRestaurant');
      modal.innerHTML = `<div id="textModal"><h2>Restaurante:<br>${nameRest}</div>`;
    });
  }
}

function closeMenu() {
  const modal = document.getElementById('infoRestaurant');
  modal.innerHTML = '<div></div>';
  sideMenu.classList.add('d-none'); // añadimos la clase display-none
}

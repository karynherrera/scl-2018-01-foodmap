window.restaurants = [];
window.map;
window.infowindow;

const initMap = (() => {
  // indicamos las coordenadas segun el gps
  navigator.geolocation.getCurrentPosition((pos) => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    let myLatlng = new google.maps.LatLng(lat, lon);

    let mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions,
      {
        center: {lat: lat,
          lng: lon},
        zoom: 16
      });
    
    infowindow = new google.maps.InfoWindow();
    let request = {
      location: myLatlng,
      radius: 1000,
      types: ['restaurant']
    };

    let service = new google.maps.places.PlacesService(map);

    // ahora buscamos los lugares cercanos a las coordenadas de nuestro GPS
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        restaurants = results;

        /* for (let i = 0; i < restaurants.length; i++) {
          console.log(' Restaurantes ' + restaurants[i].name);
        } */
        const selectRestaurant = document.getElementById('filtrarRestaurantes');
        // primero ordenamos los locales cercanos segun mayor a menor rating
        restaurants = restaurants.sort(function(localA, localB) {
          if (localA.rating < localB.rating) {
            return 1;
          }
          if (localA.rating > localB.rating) {
            return -1;
          }
          return 0;
        });

        restaurants.forEach(element =>{
          let optionNode = document.createElement('option');
          let star = document.getElementById('stars');
          let stars = document.createElement('option');
          console.log(element.rating);
          let num = element.rating;
         
          for (let i = 0; i < num; i++) {
            if (num === undefined) {
              stars.innerHTML += ' ';
            } else {
              stars.innerHTML += ' ★';
            }
          }
          if (num === undefined) {
            stars.innerHTML += '<strong> /Sin calificación</strong>';
          } else {
            stars.innerHTML += num + ' Estrellas';
          }
          
          optionNode.text = element.name + ' ';
          optionNode.appendChild(stars);
          selectRestaurant.appendChild(optionNode);
        });

        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i]);
          // console.log(results[i].name);

          // mostramos la info de cada restaurante cercano
          service.getDetails({
            placeId: results[i].place_id
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });
              google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                place.formatted_address + '</div>');
                infowindow.open(map, this);
              });
            }
          });
        }
      }
    }); // fin de nearbySearch
  });
});

const crearMarcador = ((place) => {
  // Creamos un marcador
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', () => {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}); 


const selecRestaurant = (()=>{

});
  
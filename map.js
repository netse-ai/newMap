var map;
var service;
var infoWindow;
var loc;

function initMap() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 19,
      tilt: 45,
      disableDefaultUI: true,
      zoomControl: true,
    });

  infoWindow = new google.maps.InfoWindow();
  updateMap();

}


//updates map with current geolocation positions and query data
function updateMap(){

  //watchPosition is triggered each time the user moves
  navigator.geolocation.watchPosition(watchPositionCallback);
}

function watchPositionCallback(position){
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    var currentLocation = new google.maps.LatLng(pos.lat, pos.lng);

    //intialize a request object to be sent to the nearBySearch query
    //with the currentLocation object as the specified location
    var nearBySearchRequest = {
      location: currentLocation,
      radius: '1000',
      types: ['store']
    };

    // center the map on the currentLocation object
    map.setCenter(currentLocation);

    // initialize a new PlacesService
    placesChurchService = new google.maps.places.PlacesService(map);

    placesChurchService.nearbySearch(nearBySearchRequest, nearbySearchCallback);
}

function nearbySearchCallback(result, status) {
  console.log("Outer Results: ", result);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("Inner Results: ", result);
    for (var i = 0; i < result.length; i++) {
      var place = result[i];
      createNearbySearchMarker(place);
      console.log(place);
    }
  }
}

function createNearbySearchMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

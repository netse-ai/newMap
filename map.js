
//GLOBALS
var map;
var service;
var infoWindow;
var location;
var userMarker;

//request objects
var nearByChurchSearchRequest = {
  location: null,
  radius: '500',
  types: ['church']
};

var nearByStoreSearchRequest = {
  location: null,
  radius: '500',
  types: ['store']
};


/* INITIALIZE MAP */

function initMap() {
  //set intial starting coordinates | doesn't matter wear
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    disableDefaultUI: true,
    zoom: 19,
    maxZoom: 19,
    minZoom: 19,
    tilt: 45,
    draggable: false,
  });

  infoWindow = new google.maps.InfoWindow();
  createUserMarker()
  console.log(userMarker);
  map.setOptions({passiveLogo: true});
  updateMap();

}


/* UPDATE MAP */

function updateMap(){
  //navigator is passed a callback to handle return position
  navigator.geolocation.watchPosition(watchPositionCallback);
  // console.log(userMarker);
}


/* HELPER FUNCTIONS AND CALLBACKS */

// callback for watchPosition() used to handle the returned position data
// as well as run searches
function watchPositionCallback(position){
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  var currentLocation = new google.maps.LatLng(pos.lat, pos.lng);

  //update request objects to be sent to the nearBySearch query
  //with the currentLocation object as the specified location
  nearByChurchSearchRequest.location = currentLocation;
  nearByStoreSearchRequest.location = currentLocation;

  // center the map on the currentLocation object
  map.setCenter(currentLocation);
  userMarker.setPosition(currentLocation);

  // initialize new PlacesServices
  placesChurchService = new google.maps.places.PlacesService(map);
  placesStoreService = new google.maps.places.PlacesService(map);

  // servie methods used to search nearby queries based on the requests
  placesChurchService.nearbySearch(nearByChurchSearchRequest, searchCallback);
  placesStoreService.nearbySearch(nearByStoreSearchRequest, searchCallback);
}

// callback for nearbySearch()
function searchCallback(result, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK){
    for (var i = 0; i < result.length; i++) {
      var place = result[i];
      createNearbySearchMarker(place);
      // pickUpItem(place);
      console.log(place.vicinity);
    }
  }
}

// creates a marker on each place object return by the nearby search
// also adds an infoWindow to each marker
function createNearbySearchMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  console.log(place.geometry.location)


  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

// creates a marker displayed on the user's current coordinates
// also adds an infoWindow to the user marker
function createUserMarker(){
  userMarker = new google.maps.Marker({
    position: map.getCenter(),
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10
    },
    draggable: false,
    map: map
  });

  google.maps.event.addListener(userMarker, 'click', function() {
    infoWindow.setContent("<div>"+"<p>You</p>"+"</div>");
    infoWindow.open(map, this);
  });
  return userMarker;
}

function pickUpItem(place){
  // console.log(place);
}

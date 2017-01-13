var map;
var service;
var infoWindow;
var location;
var userMarker;


function initMap() {

  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 20,
      tilt: 45,
      disableDefaultUI: true,
      zoomControl: true,
    });

  infoWindow = new google.maps.InfoWindow();
  updateMap();
  map.setOptions({passiveLogo: true});

}


//updates map with current geolocation positions and query data
function updateMap(){

  //watchPosition is triggered each time the user moves
  //navigator is passed a callback to handle return position
  navigator.geolocation.watchPosition(watchPositionCallback);


}

// callback for watchPosition used to handle the returned position data
function watchPositionCallback(position){
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    var currentLocation = new google.maps.LatLng(pos.lat, pos.lng);

    //intialize a request object to be sent to the nearBySearch query
    //with the currentLocation object as the specified location
    var nearByChurchSearchRequest = {
      location: currentLocation,
      radius: '1000',
      types: ['church']
    };

    var nearByStoreSearchRequest = {
      location: currentLocation,
      radius: '1000',
      types: ['store']
    };

    // center the map on the currentLocation object
    map.setCenter(currentLocation);
    createUserMarker()
    // initialize new PlacesServices
    placesChurchService = new google.maps.places.PlacesService(map);
    placesStoreService = new google.maps.places.PlacesService(map);
    // servie methods used to search nearby queries based on the requests
    placesChurchService.nearbySearch(nearByChurchSearchRequest, searchCallback);
    placesStoreService.nearbySearch(nearByStoreSearchRequest, searchCallback);

}

function searchCallback(result, status) {
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
}

var app = angular.module("app", []);

app.controller('MapController', function MapController($scope){
  mapboxgl.accessToken = "pk.eyJ1IjoidGVhcjcyOCIsImEiOiJjaXhnb2gzdmswMDNhMnpsYWVzZXF1Y245In0.BUMz1l0PWVXXCpJ75YRong";

  var map = new mapboxgl.Map({
    container: 'map', //container id
    // maxZoom: 28,
    // minZoom: 25,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [0, 0],
    zoom: 17
  });

  $scope.map = map;

  updateCoordinates = function(){
    navigator.geolocation.watchPosition(function(position){
      var coords = {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      }
      // map.getSource('points').setData(coords);
      map.setCenter(coords)
      // src.data.geometry.coordinates = [coords[0], coords[1]]
      // src._data.features[0].geometry.coordinates = [coords.lng, coords.lat];
      // console.log(src._data.features[0].geometry.coordinates)
    }, null, {enableHighAccuracy: true});
  }

  updateCoordinates();

  $scope.updateCoordinates = updateCoordinates;

});

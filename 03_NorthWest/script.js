//GOOGLE MAPS API KEY: AIzaSyAlgUTFIUGD9eXidIJ4zaxHg7d7Le4lw0I

var app = app || {};

app.main = (function() {
  //code starts here

  var map;
  var user = {};
  var northwest = { lat: 40.725716, lng: -73.998069 };
  
  var initMap = function() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: user.lat, lng: user.lng},
      zoom: 12
    });

  };

  var updateLocation = function(position) {
    user = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log("lat: " + user.lat + " lng: " + user.lng);
    initMap();
    map.setCenter(user);
    makeMarkers(user);
  };

  var getLocation = function(){
    navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
  }

  var makeMarkers = function(user){
    var userMarker = new google.maps.Marker({
      position: user,
      map: map,
    });

    // creating an image object to use as icon
    var image = {
      url: 'nwIcon.png',
      size: new google.maps.Size(30, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 17)
    };
    //shape is the clickable area of the icon
    var shape = {
      coords: [1, 1, 1, 30, 25, 30, 25, 1],
      type: 'poly'
    };

    var nwMarker = new google.maps.Marker({
      position: northwest,
      map: map,
      icon: image,
      shape: shape,
    });

    findNW(user, northwest);
  }

  function handleLocationError() {
    console.log("location not found");
  }

  var showDirection = function(angle, coordinates){
    console.log("turning arrow");

    var arrow = $("#arrow");
    arrow.css({
      '-webkit-transform' : 'rotate('+ angle +'deg)',
      '-moz-transform' : 'rotate('+ angle +'deg)',  
      '-ms-transform' : 'rotate('+ angle +'deg)',  
      '-o-transform' : 'rotate('+ angle +'deg)',  
      'transform' : 'rotate('+ angle +'deg)',  
      'zoom' : 1
    });

    var whichWay = document.createElement("p");
    $(whichWay).attr('id', 'coordinates');
    whichWay.innerText = coordinates;
    $('#direction').prepend(whichWay);

  }

  var findNW = function(start, end){

        var radians = getAtan2((end.lng - start.lng), (end.lat - start.lat));

        function getAtan2(y, x) {
            return Math.atan2(y, x);
        };

        var compassReading = radians * (180 / Math.PI);
        console.log("compassReading: " + compassReading);

        var coordNames = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
        var coordIndex = Math.round(compassReading / 22.5);
        if (coordIndex < 0) {
            coordIndex = coordIndex + 16
        };
        console.log(coordNames[coordIndex]);
        showDirection(compassReading, coordNames[coordIndex]);
  }

  var init = function(){
    console.log('initialized');
    getLocation();
  };

  return {
    init: init,
    getLocation: getLocation,
    initMap: initMap,
    findNW: findNW
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);
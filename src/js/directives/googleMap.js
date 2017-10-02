/* global google */

angular
  .module('itineraryApp')
  .directive('googleMap', googleMap);


function googleMap() {

  return {
    restrict: 'E',
    template: '<div class="map">Google map div</div>',
    replace: true,
    scope: {
      center: '=',
      placesResults: '=',
      establishment: '=',
      radius: '=',
      price: '='
    },
    link(scope, element) {
      const map = new google.maps.Map(element[0], {
        center: { lat: 51.52, lng: -0.082 },
        zoom: 12
      });

      // scope.placesResults = [];

      const placesService = new google.maps.places.PlacesService(map);
      let markers = [];

      function removeMarkers() {
        console.log('hola');
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      const marker = new google.maps.Marker({
        map: map
      });

      // Creating circle
      const circle = new google.maps.Circle({
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35,
        draggable: true,
        map: map
      });
      circle.addListener('dragend', () => {
        console.log(circle.getCenter());
        getPlaces(circle.getCenter());
        removeMarkers();
      });

      circle.addListener('radius_changed', () => {
        console.log(circle.getRadius());
        // get the center of the circle
        // call a fuction and pass in latlng
      });

      map.addListener('click', (e) => mapClicked(e));

      function mapClicked(e) {
        if(!e) return false;
        console.log('e', e);
        console.log(scope.establishment);
        getPlaces(e.latLng);
        removeMarkers();
        circle.setCenter(e.latLng); // Creating circle radius - setting center point
        circle.setRadius(scope.radius); // Settig the circle radius
        map.panTo(e.latLng); // Animation pan to location clicked

      }

      function getPlaces(latLng){
        if(!scope.establishment) return false;
        placesService.nearbySearch({ // search places with the filters on the page
          location: latLng,
          radius: scope.radius,
          openNow: true,
          type: scope.establishment,
          maxPriceLevel: scope.price
        }, (results, status) => {
          console.log(status, results);
          populateImages(results);
          markers = results.map(result => { //set markers on the map with the result of the search
            return new google.maps.Marker({
              position: result.geometry.location,
              map: map,
              animation: google.maps.Animation.DROP
            });
          });
        });
      }

      function populateImages(results) { // function to get the image of the objects (places) recieved by using the function getUrl() within the object (place)
        results.forEach((result) => {
          result.imageUrl = result.photos ? result.photos[0].getUrl({maxHeight: 200}) : null; //if the object (place) doesn't have any image it will return NULL
        });

        scope.placesResults = results;
        scope.$apply();
      }



      scope.$watch('center', () => { // get the center when you click
        if(!scope.center) return false;
        map.setCenter(scope.center);
        marker.setPosition(scope.center);
      });
    }
  };
}

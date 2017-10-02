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
      placesResults: '='
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
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      map.addListener('click', (e) => {
        const establishment = document.getElementById('establishment').value;
        const radius = document.getElementById('radius').value;
        const price = document.getElementById('price').value;

        console.log(establishment);
        removeMarkers();

        map.panTo(e.latLng); // Animation pan to location clicked

        placesService.nearbySearch({
          location: e.latLng,
          radius: radius,
          openNow: true,
          type: establishment,
          maxPriceLevel: price
        }, (results, status) => {
          if(status !== 'OK ' && establishment === '') return false;
          populateImages(results);
          console.log(scope);
          markers = results.map(result => {
            return new google.maps.Marker({
              position: result.geometry.location,
              map: map,
              animation: google.maps.Animation.DROP
            });
          });
        });

      });

      const latLng = { lat: location.lat, lng: location.lng};

      const marker = new google.maps.Marker({
        position: latLng,
        map: map
      });

      function populateImages(results) {
        results.forEach((result) => {
          const url = result.photos[0].getUrl({maxHeight: 200});
          result.imageUrl = url;
          
        });

        scope.placesResults = results;
        scope.$apply();
      }



      scope.$watch('center', () => {
        if(!scope.center) return false;
        map.setCenter(scope.center);
        marker.setPosition(scope.center);
      });
    }
  };
}

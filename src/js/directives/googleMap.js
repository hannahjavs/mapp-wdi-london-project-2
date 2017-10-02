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
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      const marker = new google.maps.Marker({
        map: map
      });

      map.addListener('click', (e) => {
        removeMarkers();
        marker.setPosition(e.latLng);
        map.panTo(e.latLng); // Animation pan to location clicked
        if(!scope.establishment) return false;
        placesService.nearbySearch({
          location: e.latLng,
          radius: scope.radius,
          openNow: true,
          type: scope.establishment,
          maxPriceLevel: scope.price
        }, (results, status) => {
          console.log(status, results);
          populateImages(results);
          markers = results.map(result => {
            return new google.maps.Marker({
              position: result.geometry.location,
              map: map,
              animation: google.maps.Animation.DROP
            });
          });
        });

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

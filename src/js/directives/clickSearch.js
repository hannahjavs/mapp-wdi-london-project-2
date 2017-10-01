/* global google */
angular
  .module('itineraryApp')
  .directive('clickSearch', clickSearch);

function clickSearch(){
  return{
    restrict: 'A',
    scope: {
      location: '='
    },
    require: 'ngModel',
    link(scope, element, attrs, ngModel){
      let markers = [];
      function removeMarkers() {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      map.addListener('click', (e) => {

        removeMarkers();

        map.panTo(e.latLng); // Animation pan to location clicked

        placesService.nearbySearch({
          location: e.latLng,
          radius: 2000,
          openNow: true,
          type: 'bar'
        }, (results, status) => {
          if(status !== 'OK') return false;

          markers = results.map(result => {
            return new google.maps.Marker({
              position: result.geometry.location,
              map: map,
              animation: google.maps.Animation.DROP
            });
          });
        });
      });
    }
  };
}

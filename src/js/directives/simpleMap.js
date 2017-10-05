/* global google */

angular
  .module('itineraryApp')
  .directive('simpleMap', simpleMap);

simpleMap.inject = ['$window', 'snazzymap'];
function simpleMap($window, snazzymap) {

  return {
    restrict: 'E',
    template: '<div class="event-map">Google map div</div>',
    replace: true,
    scope: {
      items: '='
    },
    link(scope, element) {

      const bounds = new google.maps.LatLngBounds();

      const map = new google.maps.Map(element[0], {
        center: { lat: 51.52, lng: -0.082 },
        zoom: 13,
        styles: snazzymap
      });

      function addMarkers() {
        scope.items.forEach((item) => {
          new $window.google.maps.Marker({
            position: item.place.location,
            map: map
          });

          bounds.extend(item.place.location);
        });

        map.fitBounds(bounds);
      }

      scope.$watch('items', () => {
        if(scope.items && scope.items.length) addMarkers();
      });

    }
  };

} // Closing google map function

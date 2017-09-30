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
      center: '='
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        center: { lat: 51.52, lng: -0.082 },
        zoom: 10
      });

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
      });
    }
  };
}

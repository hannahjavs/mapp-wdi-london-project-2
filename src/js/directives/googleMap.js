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
      console.log($scope);
      const map = new google.maps.Map($element[0], {
        center: { lat: 51.52, lng: -0.082 },
        zoom: 10
      });

      const latLng = { lat: location.lat, lng: location.lng};
      const marker = new google.maps.Marker({
        position: latLng,
        map: map
      });

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });
    }
  };
}

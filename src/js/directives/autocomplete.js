/* global google */
angular
  .module('itineraryApp')
  .directive('autocomplete', autocomplete);

function autocomplete(){
  return{
    restrict: 'A',
    scope: {
      location: '='
    },
    require: 'ngModel',
    link(scope, element, attrs, ngModel){
      const input = document.querySelector('#place');
      const autocomplete = new google.maps.places.Autocomplete(input,{ types: ['geocode'] });
      autocomplete.addListener('place_changed', () => {
        scope.location = autocomplete.getPlace().geometry.location.toJSON();
        ngModel.$setViewValue(element.val());
        // circle.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        // circle.setRadius(scope.radius);
      });
    }
  };
}

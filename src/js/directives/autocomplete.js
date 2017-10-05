/* global google */
angular
  .module('itineraryApp')
  .directive('autocomplete', autocomplete);

function autocomplete(){
  return{
    restrict: 'A',
    scope: {
      center: '='
    },
    require: 'ngModel',
    link(scope, element, attrs, ngModel){

      const autocomplete = new google.maps.places.Autocomplete(element[0],{ types: ['geocode'] });
      autocomplete.addListener('place_changed', () => {
        console.log('scope:',scope);
        console.log('element:',element);
        console.log('attrs:',attrs);
        console.log('ngModel:',ngModel);
        scope.center = autocomplete.getPlace().geometry.location.toJSON();
        ngModel.$setViewValue(element.val());
      });
    }
  };
}

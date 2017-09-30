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
      const autocomplete = new google.maps.places.Autocomplete(element[0]);
      autocomplete.addListener('place_changed', () => {
        scope.location = autocomplete.getPlace().geometry.location.toJSON();
        ngModel.$setViewValue(element.val());
      });
    }
  };
}

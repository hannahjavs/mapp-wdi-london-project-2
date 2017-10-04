angular
  .module('itineraryApp')
  .directive('date', date);

function date() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$formatters.push(value => new Date(value));
    }
  };
}

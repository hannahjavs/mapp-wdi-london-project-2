angular
  .module('itineraryApp')
  .directive('time', time);

function time() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      date: '=',
      ngModel: '='
    },
    link: function(scope, element, attrs, ngModel) {
      // fix Angular's date input issue, turn date string into date Object
      ngModel.$formatters.push(value => new Date(value));

      // get date from itinerary date in the format YYYY-MM-DD
      const date = scope.date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0];

      // watch for change in date input
      // which will be set by Angular to 1970-01-01 plus the user's time
      scope.$watch(() => ngModel.$modelValue, () => {
        // if there is no time set, or the time is already a string (ie saved in the database)
        // ignore this functionality
        if(!ngModel.$modelValue || typeof ngModel.$modelValue === 'string') return false;

        // if the date is NOT set to 1970-01-01 ignore this functionality
        if(!ngModel.$modelValue.toISOString().match(/1970/)) return false;

        // convert the date object into a string (ISO format YYYY-MM-DDTHH:MM:SS:TZZ)
        // replace the YYYY-MM-DD portion (1970-01-01) with the itinernary's date (eg: 2017-10-10)
        // convert the string back into a date object
        const correctTime = new Date(ngModel.$modelValue.toISOString().replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, date));

        // set ng-model value to be the new updated datetime
        // both lines are needed to make it work see: https://stackoverflow.com/questions/22639485/angularjs-how-to-change-the-value-of-ngmodel-in-custom-directive
        ngModel.$modelValue = correctTime;
        scope.ngModel = correctTime;
      });

    }
  };
}



// We need to add time to the angular time 

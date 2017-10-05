// https://stackoverflow.com/questions/21088845/can-i-debounce-or-throttle-a-watched-input-in-angularjs-using-lodash
// http://benalman.com/projects/jquery-throttle-debounce-plugin/

angular
  .module('itineraryApp')
  .service('debounce', debounce);

function debounce($timeout) {
  return function(callback, interval) {
    let timeout = null;
    return function() {
      $timeout.cancel(timeout);
      const args = arguments;
      timeout = $timeout(() => callback.apply(this, args), interval);
    };
  };
}

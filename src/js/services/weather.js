angular
  .module('itineraryApp')
  .service('weather', weather);

weather.$inject = ['$http'];
function weather($http) {

  function getForecast() {
    return $http
      .get('/api/weather')
      .then((response) => {
        return response.data;
      });
  }
  this.getForecast = getForecast;
}

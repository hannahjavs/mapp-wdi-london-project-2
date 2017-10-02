angular
  .module('itineraryApp')
  .service('weather', weather);

weather.$inject = ['$http', 'API'];
function weather($http, API) {

  function getForecast() {
    return $http
      .get(`${API}/weather`)
      .then((response) => {
        return response.data;
      });
  }
  this.getForecast = getForecast;
}

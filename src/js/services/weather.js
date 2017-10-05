angular
  .module('itineraryApp')
  .service('weather', weather);

weather.$inject = ['$http'];
function weather($http) {

  function getForecast(lat, lng, time) {
    return $http
      .get('/api/weather', { params: { lat, lng, time }})
      .then((response) => {
        return response.data;
      });
  }
  this.getForecast = getForecast;
}

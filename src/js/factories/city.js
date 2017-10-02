angular
  .module('itineraryApp')
  .factory('City', City);

City.$inject = ['$resource'];
function City($resource) {
  return $resource('/api/cities/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}

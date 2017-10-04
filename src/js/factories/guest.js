angular
  .module('itineraryApp')
  .factory('Guest', Guest);

Guest.$inject = ['$resource'];
function Guest($resource) {
  return new $resource('/api/plans/:planId/guests/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

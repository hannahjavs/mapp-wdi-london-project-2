angular
  .module('itineraryApp')
  .factory('Item', Item);

Item.$inject = ['$resource'];
function Item($resource) {
  return new $resource('/api/plans/:planId/items/:id', { id: '@id', planId: '@planId' }, {
    update: { method: 'PUT', 'url': '/api/plans/:planId/items/:id' }
  });
}

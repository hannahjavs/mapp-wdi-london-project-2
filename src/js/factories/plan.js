angular
  .module('itineraryApp')
  .factory('Plan', Plan);

Plan.$inject = ['$resource'];
function Plan($resource) {
  return new $resource('/api/plans/:id', { id: '@id' }, {
    update: { method: 'PUT' },
    sendInvites: { method: 'POST', url: '/api/plans/:id/send'}
  });
}

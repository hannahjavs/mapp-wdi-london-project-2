angular
  .module('itineraryApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;

    if(err.status === 401 && vm.pageName !== 'login') {
      $state.go('login');
    }
  });

  function getUserId() {
    return $auth.getPayload().userId;
  }

  vm.getUserId = getUserId;
}

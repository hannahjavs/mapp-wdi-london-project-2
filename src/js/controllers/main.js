angular
  .module('itineraryApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  function logout() {
    console.log('hello');
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
}

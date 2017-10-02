angular
  .module('itineraryApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'weather'];
function MainCtrl($rootScope, $state, $auth, weather) {
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

  weather.getForecast()
    .then(data => vm.weather = data);

  function getUserId() {
    return $auth.getPayload().userId;
  }

  vm.getUserId = getUserId;
}

angular
  .module('itineraryApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'Plan'];
function MainCtrl($rootScope, $state, $auth, Plan) {
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

  vm.create = plansCreate;

  function plansCreate() {
    console.log(vm.plan);
    Plan
      .save(vm.plan)
      .$promise
      .then(plan => {
        $state.go('plansEdit', { id: plan.id });
      });
  }
}

angular
  .module('itineraryApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersShowCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($state.params);

  function usersUpdate() {
    User
      .update({ id: vm.user.id }, vm.user)
      .$promise
      .then((user) => {
        vm.user = user;
      });
  }

  vm.update = usersUpdate;
}

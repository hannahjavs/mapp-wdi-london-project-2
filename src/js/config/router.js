angular
  .module('itineraryApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('placesIndex', {
      url: '/places',
      templateUrl: 'js/views/places/index.html',
      controller: 'PlacesIndexCtrl as placesIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('plan', {
      url: '/plan',
      templateUrl: 'js/views/plans/plan.html',
      controller: 'PlanIndexCtrl as plan'
    });

  $urlRouterProvider.otherwise('/');
}

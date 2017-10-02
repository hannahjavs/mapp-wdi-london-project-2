angular
  .module('itineraryApp')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: '1868792136671709'
  });

  console.log('fb hello');
}

var app = angular.module('constella', [
	'ngRoute',
  'wu.masonry'
]);

app.config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    // $locationProvider.hashPrefix('!;

    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html'
      })
      .when('/account', {
        templateUrl: 'partials/account.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
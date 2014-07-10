var app,
    services =    angular.module('constella.services',    []),
    directives =  angular.module('constella.directives',  []),
    filters =     angular.module('constella.filters',     []),
    controllers = angular.module('constella.controllers', []);

app = angular.module('constella', ['constella.services',
                                   'constella.directives',
                                   'constella.filters',
                                   'constella.controllers',
                                   'ngRoute',
                                   'wu.masonry']);

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
// Include Browserify stuff here

// Start main logic
var app,
  services = angular.module('constella.services', []),
  directives = angular.module('constella.directives', []),
  filters = angular.module('constella.filters', []),
  controllers = angular.module('constella.controllers', []);

app = angular.module('constella', ['constella.services',
  'constella.directives',
  'constella.filters',
  'constella.controllers',
  'ui.router',
  'ngAnimate'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      page: 'main',
      controller: 'mainCtrl',
      templateUrl: 'templates/main.html'
    });
});
app.constant('loggedIn', 'true');
app.value('mobile', false);

// include all other internals here (i think)
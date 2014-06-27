directives.directive('repo', function($sce, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'templates/repo.html',
        scope: {
            // asset: '='
        },
        link: function($scope, $element) {

        }
    };
}); 
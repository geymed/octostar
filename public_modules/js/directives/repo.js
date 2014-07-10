directives.directive('repo', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/repo.html',
        scope: {
        },
        link: function (scope, element, attrs) {
        	scope.expanded = false;
        }
    };
});
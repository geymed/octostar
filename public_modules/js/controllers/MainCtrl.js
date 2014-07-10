controllers.controller('MainCtrl', ['$scope', 'Stars', function ($scope, Stars) {

  'use strict';

  // controller things
  $scope.searchTerm = '';
  $scope.tagTerm = '';
  function _updateData(){
  	$scope.repos = Stars.repos;
		$scope.lastSynced = Stars.lastSynced;
		$scope.langs = Stars.langs;
  }
  Stars.get(_updateData);
  $scope.triggerSync = function(){
  	Stars.get(_updateData, true);
  };
}]);
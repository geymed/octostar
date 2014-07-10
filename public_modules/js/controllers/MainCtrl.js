controllers.controller('MainCtrl', ['$scope', 'Stars', '$timeout', function ($scope, Stars, $timeout) {

  'use strict';

  // controller things
  $scope.searchTerm = '';
  $scope.tagTerm = '';
  $scope.repos = {remote:[], local:[]};
  $scope.lastSynced = '';
  $scope.langs = [];
  $scope.reposLoaded = false; 

  function _updateData(){
  	$scope.repos = Stars.repos;
		$scope.lastSynced = Stars.lastSynced;
		$scope.langs = Stars.langs;
    
    /* THIS NEEDS TO BE REWRITTEN THE ANGULAR WAY */
    $timeout(function(){
      jQuery('[masonry]').masonry('reloadItems');
      jQuery('[masonry]').masonry('layout');
    }, 0);
  }
  Stars.get(_updateData);
  $scope.triggerSync = function(){
  	Stars.get(_updateData, true);
  };
}]);
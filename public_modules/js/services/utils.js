services.service('Utils', ['$rootScope', function ($rootScope) {
	var self = this;
	var Utils = {};
	Utils.swap = function(ref, replacement, input) {
	  return (ref === input) ? replacement : input;
	}
	return Utils;
}]);
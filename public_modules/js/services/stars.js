services.service('Stars', 
	['$rootScope', 
	 '$http', 
	 'Utils', 
	 function ($rootScope, $http, Utils) {
	var self = this;
	var Stars = {};

	Stars.repos = {};
	Stars.lastSynced = '';
	Stars.langs = [];

	_sync = function(cb, failcb, force){
		var url = force ? '/api/account/sync?force=true' : '/api/account/sync';
		$http({method: 'GET', url: url}).
    success(function(data, status, headers, config) {
      cb(data, status, headers, config)
    }).
    error(function(data, status, headers, config) {
      failcb(data, status, headers, config);
    });
	}
	Stars.get = function(cb, force){
		_sync(function(data, status, headers, config){
			Stars.repos = data.repos;
      var s = new Date(data.lastSynced).toISOString();
      dateString = moment(s).fromNow();
      Stars.lastSynced = dateString;
      var langs = _.pluck(data.repos.remote, 'language');
      langs = _.uniq(langs);
      langs = _.map(langs, _.partial(Utils.swap, null, 'Unknown'));
      Stars.languages = langs;
      cb();
		},
		function(data, status, headers, config){ //error catch
			console.error(data, status, headers, config);
		}, force);
	}
	return Stars;
}]);
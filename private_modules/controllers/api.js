// Global Modules
var _ = require('underscore');
var curl = require('curlrequest');
var async = require('async');

// Local Modules
var requirePrivate = require('require-private');
var secrets = requirePrivate('config/secrets');
var User = requirePrivate('models/User');


// Account-based API calls

exports.account = {

	starSync: function(req,res){
		res.json('hello');
	},
	getStars: function(req,res){
		var getKeys = function(obj){
			var keys = [];
			for(var key in obj){
				keys.push(key);
			}
			return keys;
		}
		var userid = req.user.github;
		var token = req.user.tokens[0].accessToken;
		var page = 1;
		var starPage = 'https://api.github.com/user/'+userid+'/starred?access_token='+token+'&per_page=100&page=';
		var funcArray = []
		function createRequestFunction(pageIndex) {
			 return function(callback) {
				var options = {
					url:starPage + pageIndex,
					headers: 'Accept: application/json'
				}
						curl.request(starPage + pageIndex, callback)
			 }
		}

		for (var i = 1; i <= 10; i++) {
			 funcArray.push(createRequestFunction(i))
		}

		async.parallel(funcArray, function(err, results) {
			var allStars = [];
			for (var i = results.length-1; i >= 0; i--){
				results[i][0] = results[i][0].replace(/\n/g, '');
				results[i][0] = JSON.parse(results[i][0]);
				if(results[i][0].length === 0){
					results.splice(i,1);
				}
				else{
					var allStars = results[i][0].concat(allStars);
				}
			}
			 res.json(allStars);
		});
	}
}

/*
(11:09:47 AM) Scott Hillman: https://github.com/caolan/async
(11:14:03 AM) Scott Hillman: starPage = "jkfldsjklfds.com?page=";


funcArray = []

createRequestFunction(pageIndex) {
	return function(callback) {
		request.get(starPage + pageIndex)
	}
}

for (var i = 0; i <= 10; i++) {
	funcArray.push(createRequestFuncion(i))
}

async.parallel(funcArray, function(err, results) {
	
});

*/
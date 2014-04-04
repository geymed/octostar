// Global Modules
var _ = require('underscore');
var curl = require('curlrequest');
var async = require('async');

// Local Modules
var requirePrivate = require('require-private');
var secrets = requirePrivate('config/secrets');
var User = requirePrivate('models/User');
var Repo = requirePrivate('models/Repo');


// Account-based API calls

exports.account = {

	starSync: function(req,res){
		// ObjectId("533dd0446a4de07336824ed4")
		var userid = req.user.github;
		var token = req.user.tokens[0].accessToken;

		var starPage = 'https://api.github.com/user/'+userid+'/starred?access_token='+token+'&per_page=100&page=';
		Repo.find({ id: req.user.github }, function(err, data) {
			if (err) { 
				res.json(err);
			}
			else{
				data = data[0];
				console.log(' ');

				/*get stars*/
				var page = 1;
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
					data.repos.remote = allStars;
					console.log(' ');
					data.save(function(err) {
						if (err) return res.json({'error':err});
						res.json('success');
					});
				});
			}
		});
	},
	getStars: function(req,res){
		Repo.find({ id: req.user.github }, function(err, data) {
			if (err) { 
				res.json(err);
			}
			else{
				data = data[0];
				console.log(' ');
				res.json(data.repos.remote);
			}
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
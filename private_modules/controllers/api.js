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
		console.log(req.query);
		var starPage = 'https://api.github.com/user/'+userid+'/starred?access_token='+token+'&per_page=100&page=';
		Repo.find({ id: req.user.github }, function(err, data) {
			if (err) { 
				res.json(err);
			}
			else{
				data = data[0];
				console.log('sync');
				var thisd = new Date()
				thisd = thisd.getTime();
				if (data.lastSynced > thisd + 43200000 || !data.lastSynced || req.query.force){
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
					// TODO: curl the profile page and return number of repos
					// pagenum = repos / 100;
					for (var i = 1; i <= 10; i++) {
						 funcArray.push(createRequestFunction(i))
					}
					console.log('hitting here 1')
					async.parallel(funcArray, function(err, results) {
						var allStars = [];
						for (var i = results.length-1; i >= 0; i--){
							if (results[i][0]){
								results[i][0] = results[i][0].replace(/\n/g, '');
								results[i][0] = JSON.parse(results[i][0]);
								if(results[i][0].length === 0){
									results.splice(i,1);
								}
								else{
									var allStars = results[i][0].concat(allStars);
								}
							}
						}
						data.repos.remote = allStars;
						var d = new Date()
						data.lastSynced = d.getTime();
						data.save(function(err) {
							if (err) return res.json({'error':err});
							res.json('success');
						});
					});
				}
				else{
					res.json('already synced');
				}
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
				var response = {
					repos: data.repos,
					lastSynced: data.lastSynced
				}
				res.json(response);
			}
		});
	}
}
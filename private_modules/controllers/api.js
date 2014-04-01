// Global Modules
var _ = require('underscore');
var curl = require('curlrequest')

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
		console.log(getKeys(req.user.github));
		console.log(req.user.github);
		var userid = req.user.github;
		var page = 1;
		var url = 'https://api.github.com/user/'+userid+'/starred?page='+page;
		var options = {
			url:url,
			headers: 'Accept:application/json'
		};
		curl.request(options, function (err, data) {
			data = data.replace(/\n/g, '');
			data = JSON.parse(data);
			console.log(data);
			res.json(data);
		});
	}
}
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
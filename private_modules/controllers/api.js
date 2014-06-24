// Global Modules
var _ = require('underscore');
var https = require("https");
var async = require('async');

// Local Modules
var requirePrivate = require('require-private');
var secrets = requirePrivate('config/secrets');
var User = requirePrivate('models/User');
var Repo = requirePrivate('models/Repo');


// Account-based API calls

exports.account = {

  starSync: function(req, res) {

    var userid = req.user.github;
    var token = req.user.tokens[0].accessToken;

    Repo.find({
      id: req.user.github
    }, function(err, data) {
      if (err) {
        res.json(err);
      } else {
        data = data[0];
        var thisd = new Date();
        thisd = thisd.getTime();
        if (data.lastSynced > thisd + 43200000 || !data.lastSynced || req.query.force) {
          var page = 1;
          var funcArray = [];
          function createRequestFunction(pageIndex) { 
            return function(callback) {
              var options = {
                hostname: 'api.github.com',
                path: '/user/' + userid + '/starred?access_token=' + token + '&per_page=100&page='+pageIndex,
                headers: {
                  'User-Agent': 'Octostar',
                  'Accept': 'application/json'
                }
              };
              var request = https.request(options, function(response) {
                console.log('response');
                var buffer = "";
                var data;
                response.on("data", function(chunk) {
                  buffer += chunk;
                });
                response.on("end", function(err) {
                  data = JSON.parse(buffer);
                  callback(false, data)
                });
              });
              request.on('error', function(err) {
                callback(true, err)
              });
              request.end();
            }
          }
          for (var i = 1; i <= 10; i++) { 
            funcArray.push(createRequestFunction(i))
          }
          async.parallel(funcArray, function(err, results) {
            if (err){
              res.json({'error':results})
            }
            var allStars = [];
            for (var i = results.length - 1; i >= 0; i--) {
              if (results[i][0]) {
                if (results[i][0].length === 0) {
                  results.splice(i, 1);
                } else {
                  var allStars = results[i].concat(allStars);
                }
              }
            }
            data.repos.remote = allStars;
            var d = new Date()
            data.lastSynced = d.getTime();
            data.save(function(err) {
              if (err) return res.json({
                'error': err
              });
              res.json('success');
            });
          });
        } else {
          res.json('already synced');
        }
      }
    });
  },
  getStars: function(req, res) {
    Repo.find({
      id: req.user.github
    }, function(err, data) {
      if (err) {
        res.json(err);
      } else {
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
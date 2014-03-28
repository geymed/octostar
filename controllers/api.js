var secrets = require('../config/secrets');
var User = require('../models/User');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var _ = require('underscore');
var graph = require('fbgraph');
var Github = require('github-api');
var curl = require('curlrequest');

/**
 * GET /api
 * List of API examples.
 */

exports.getApi = function(req, res) {
	res.render('api/index', {
		title: 'API Browser'
	});
};

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = function(req, res) {
	var token = _.findWhere(req.user.tokens, { kind: 'github' });
	var github = new Github({ token: token.accessToken });
	var repo = github.getRepo('sahat', 'requirejs-library');
	repo.show(function(err, repo) {
		res.render('api/github', {
			title: 'GitHub API',
			repo: repo
		});
	});
};

exports.githubStars = function(req,res){
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
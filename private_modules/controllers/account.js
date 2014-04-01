// Global Modules 
var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var requirePrivate = require('require-private');

var User = requirePrivate('models/User');
var secrets = requirePrivate('config/secrets');

// Local Modules 


// Rendered Pages

// * GET /account
// * Profile page.

exports.getAccount = function(req, res) {
  res.render('account/profile', {
    title: 'Account Management'
  });
};

// * GET /logout
// * Log out.

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};



// Non-API POST Endpoints

 // * POST /account/profile
 // * Update profile information.

exports.postUpdateProfile = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Profile information updated.' });
      res.redirect('/account');
    });
  });
};

 // * POST /account/delete
 // * Delete user account.
 // * @param id - User ObjectId

exports.postDeleteAccount = function(req, res, next) {
  User.remove({ _id: req.user.id }, function(err) {
    if (err) return next(err);
    req.logout();
    res.redirect('/');
  });
};


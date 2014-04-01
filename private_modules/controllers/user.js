var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var requirePrivate = require('require-private');

var User = requirePrivate('models/User');
var secrets = requirePrivate('config/secrets');





// Global Dependencies

var express = require('express');
var MongoStore = require('connect-mongo')(express);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');
var requirePrivate = require('require-private');

// Local Dependencies

var homeCtrl = requirePrivate('controllers/home');
var apiCtrl = requirePrivate('controllers/api');
var accountCtrl = requirePrivate('controllers/account');

// Config Dependencies

var secrets = requirePrivate('config/secrets');
var passportConf = requirePrivate('config/passport');

// * Create Express server.

var app = express();

// * Mongoose configuration.

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

// * Express configuration.

var hour = 3600000;
var day = (hour * 24);
var month = (day * 30);

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ip_address', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(connectAssets({
  paths: ['build/css', 'build/js', 'build/components'],
  helperContext: app.locals
}));

app.use(express.compress());
app.use(express.favicon("build/favicon.ico")); 
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.session({
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));
app.use(express.csrf());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.token = req.csrfToken();
  res.locals.secrets = secrets;
  next();
});
app.use(flash());
app.use(express.static(path.join(__dirname, 'build'), { maxAge: month }));
app.use(function(req, res, next) {
  // Keep track of previous URL
  if (req.method !== 'GET') return next();
  var path = req.path.split('/')[1];
  if (/(auth|login|logout|signup)$/.test(path)) return next();
  req.session.returnTo = req.path;
  next();
});
app.use(app.router);
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});
app.use(express.errorHandler());

// * Application routes.

app.get('/', homeCtrl.index);
app.get('/login', function(req, res){
  res.redirect('/');
});

app.get('/logout', accountCtrl.logout);

app.get('/account', passportConf.isAuthenticated, accountCtrl.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, accountCtrl.postUpdateProfile);
app.post('/account/delete', passportConf.isAuthenticated, accountCtrl.postDeleteAccount);

// * OAuth routes for sign-in.

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

// Routes requiring login

app.get('/api/account/sync', passportConf.isAuthenticated, apiCtrl.account.starSync);
app.get('/api/account/stars', passportConf.isAuthenticated, apiCtrl.account.getStars);

// * Start Express server.

app.listen(app.get('port'), app.get('ip_address'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

module.exports = app;

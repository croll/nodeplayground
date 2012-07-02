var fs = require('fs');
var log4js = require('log4js');
var async = require('async');
var express = require('express');
var mongoose = require('mongoose');
var stylus = require('stylus');
var Schema = mongoose.Schema;
var captain = {};
captain.i18n = require('i18n');
captain.formidable = require('formidable');

// Config
var configFile = __dirname+'/config/config.json';
if (!fs.existsSync(configFile)) {
	console.error('Config file /config/config.json not found. Please create it from config.js.distfile');
	process.exit(1);
} else {
	try {
		captain.config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
	} catch (e) {
		console.error('Malformed config file: '+e.message);
		process.exit(1);
	}
}

// Express server
captain.app = express();

// routes 
var routes = require(__dirname+'/lib/routes.js');
routes.init(captain.app);
routes.add(require(__dirname+'/config/routes.js').routes);

// Log
log4js.configure('config/log4js.json', {});
captain.logger = log4js.getLogger('error-log');
captain.logger.setLevel(captain.config.log.level);

// i18n
captain.i18n.configure({
	locales:['en', 'fr']
});

captain.app.locals.use(function(req, res) {
	res.locals.__t = captain.i18n.__;
	res.locals.__n = captain.i18n.__n;
});

// Template engine
captain.app.set('views', __dirname+'/views');
captain.app.set('view engine', 'jade');

// Express server configuration
captain.app.configure(function() {
	captain.app.use(express.bodyParser());
	captain.app.use(express.methodOverride());
	captain.app.use(express.cookieParser(captain.config.secret));
	captain.app.use(log4js.connectLogger(log4js.getLogger('error-log'), { level: captain.config.log.level }));
	captain.app.use(express.static(__dirname + '/public'));
	captain.app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  captain.app.use(captain.i18n.init);
	captain.app.use(captain.app.router);
	captain.app.use(stylus.middleware({
		src: __dirname + '/views',
		dest: __dirname + '/public'
	}));
});

// Start server
captain.app.listen(captain.config.server.port);
console.log('Server ready');

'use strict';

var express = require('express'),
	http = require('http'),
	path = require('path'),
	h5bp = require('h5bp');

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 8000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	app.use(h5bp({
		root: path.join(__dirname, 'dist'),
		www: false,
		cors: true
	}));

	app.use(express.compress());

	app.use(function (req, res, next) {
		if (req.path === '/designit') {
			res.redirect('/designit/');
		}
		next();
	});
	app.use('/designit/', express.static(path.join(__dirname, 'designit/dist')));
});

app.get('/favicon.ico', function (req, res) {
	res.sendfile('dist/favicon.ico');
});

app.get('/robots.txt', function (req, res) {
	res.sendfile('dist/robots.txt');
});



app.get('*', function (req, res) {
	res.sendfile('master/404.html');
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
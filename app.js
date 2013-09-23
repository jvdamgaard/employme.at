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
	app.use('/styles/', express.static(path.join(__dirname, 'dist/styles')));
	app.use('/scripts/', express.static(path.join(__dirname, 'dist/scripts')));
	app.use('/images/', express.static(path.join(__dirname, 'dist/images')));
	app.use('/bower_components/', express.static(path.join(__dirname, 'dist/bower_components')));
});

app.get('/favicon.ico', function (req, res) {
	res.sendfile('dist/favicon.ico');
});

app.get('/robots.txt', function (req, res) {
	res.sendfile('dist/robots.txt');
});

app.get('/designit', function (req, res) {
	res.sendfile('dist/index.html');
});

app.get('*', function (req, res) {
	res.sendfile('dist/404.html');
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
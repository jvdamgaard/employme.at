var h5bp = require('h5bp'),
	express = require('express');

var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(h5bp({
	root: __dirname + '/dist',
	www: false,
	cors: true
}));
app.use(express.compress());
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
	res.render('index', {
		title: 'employme.at/designit',
		development: (process.env.NODE_ENV === 'development')
	});
});

app.listen(9000);

console.log('App running on http://localhost:' + process.env.PORT);
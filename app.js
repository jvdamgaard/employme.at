var h5bp = require('h5bp');

var app = h5bp.createServer({
	root: __dirname + '/dist',
	www: false,
	cors: true
});
app.listen(8000);

console.log('App running on http://localhost:8000...');
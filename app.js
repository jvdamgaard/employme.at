var h5bp = require('h5bp'),
    express = require('express');

var isDevelopment = (process.env.NODE_ENV === 'development');

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

// Include source maps in development
if (isDevelopment) {
    app.use('/app', express.static(__dirname + '/app'));
}

app.get('/', function (req, res) {
    res.render('index', {
        title: 'employme.at/designit',
        development: isDevelopment
    });
});

app.listen(9000);

console.log('App running on http://localhost:' + process.env.PORT);

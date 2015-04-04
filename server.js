/**
 * Main server file
 */
var express = require('express');
var bp = require('body-parser');

var app = express();

//configures a module that automatically serve data in /public
app.use(express.static(__dirname + '/public'));
//app.use('/scripts', express.static(__dirname + '/node_modules/'));
//configures a module to populate prop request's body
app.use(bp());

//configures Jade template engine to work with Express
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

//sets primary route
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

app.get('/dashboard', function(req, res) {
	var data = {
		user: {
			name: 'John Doe',
			interests: ['cooking'],
			dateups: []
		}
	};
	res.render('dashboard', data);
});

app.listen(8069);
console.log('server listening on port 8069...');
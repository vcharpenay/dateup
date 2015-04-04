/**
 * Main server file
 */
var express = require('express');
var bp = require('body-parser');
var app = express();

var db = require('./db.js');

//configures a module that automatically serve data in /public
app.use(express.static(__dirname + '/public'));
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
	var id = req.query.id;
	var cb = function(data, events) {
		return function(event, params, ret) {
			switch (event) {
				case 'info':
					data.user.name = ret.firstname + ' ' + ret.lastname;
					data.user.age = ret.age;
					break;
				case 'interests':
					data.user.interests = ret;
					break;
				case 'dateups':
					data.user.dateups = ret;
					break;
			}
			events[event] = true;
			var completed = true;
			for (k in events) {
				completed &= events[k];
			}
			if (completed) {
				res.render('dashboard', data);
				console.log(JSON.stringify(data));
			}
		};
	};
	var data = {
		user: {}	
	};
	var events = {
		'info': false,
		'interests': false,
		'dateups': false
	}
	db.info(id, cb(data, events));
	db.interests(id, cb(data, events));
	db.dateups(id, cb(data, events));
});

app.listen(8069);
console.log('server listening on port 8069...');
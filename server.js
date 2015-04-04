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
    //fake data for testing
	var data = {
		user: {
			name: 'Jaime Lannister',
			interests: ['cooking','kill','sword fight'],
            profilepic: 'http://graph.facebook.com/10152655669951297/picture?type=large&height=100&width=100',
			dateups: [
              { date: "2015-04-15", //
                interest: "cooking",
                partner:{
                  name: "Cersei Lannister",
                  profilepic: 'http://graph.facebook.com/10153274755912193/picture?type=large&height=100&width=100',
                  interests: ["cooking", "manipulate", "conspire"]
                },

              },{ date: "2015-04-16", //
                interest: "sword fight",
                partner:{
                  name: "Arya Stark",
                  profilepic: 'http://graph.facebook.com/1018929571470220/picture?type=large&height=100&width=100',
                  interests: ["sword fight", "manipulate", "conspire"]
                },

              },{ date: "2015-04-17", //
                interest: "kill",
                partner:{
                  name: "Ygritte",
                  profilepic: 'http://graph.facebook.com/1040227932673094/picture?type=large&height=100&width=100',
                  interests: ["kill", "manipulate", "conspire"]
                },

              },{ date: "2015-04-18", //
                interest: "cooking",
                partner:{
                  name: "Hodor",
                  profilepic: 'http://graph.facebook.com/949685595062548/picture?type=large&height=100&width=100',
                  interests: ["cooking", "manipulate", "conspire"]
                },
              },{ date: "2015-04-18", //
                interest: "cooking",
                partner:{
                  name: "Tyrion",
                  profilepic: 'http://graph.facebook.com/10202863700633898/picture?type=large&height=100&width=100',
                  interests: ["cooking", "manipulate", "conspire"]
                },
              }
            ]
		}
	};
	res.render('dashboard', data);
});

app.listen(8069);
console.log('server listening on port 8069...');
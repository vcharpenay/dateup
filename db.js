/**
 * Database access
 */
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('dateup_db');

function interests() {
	db.serialize(function() {
		db.all('SELECT * FROM table WHERE something', function(err, rows) {
			if (err) {
				console.error('error: ' + err);
			} else {
				// process data
			}
		});
	});
}

/**
 * module interface
 */
exports.interests = interests;
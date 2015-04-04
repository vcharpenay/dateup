/**
 * Database access
 */
var sqlite3 = require('sqlite3');
var events = require('events');

var db = new sqlite3.Database('dateup_db');
var emitter = new events.EventEmitter();

/**
 * 
 * @param userID
 * @param cb cb('info', [id], {firstname, lastname, age})
 */
function info(userID, cb) {
	query('SELECT firstname, lastname, age FROM person WHERE id=?', [userID], cb, 'info', [userID]);
}

/**
 * 
 * @param userID
 * @param cb cb('interests', [id], ["interest1", "interest2", ...])
 */
function interests(userID, cb) {
	queryall('SELECT i.label AS label FROM interest AS i, person_interest AS pi WHERE i.id=pi.interest_id AND pi.person_id=?', [userID], cb, 'interests', [userID]);
}

/**
 * 
 * @param userID
 * @param cb cb('dateups', [id], [{interest, date}, ...])
 */
function dateups(userID, cb) {
	queryall('SELECT i.label AS label, d.date AS date FROM interest AS i, dateup as d WHERE i.id=d.interest AND (d.person_a=? OR d.person_b=?)', [userID, userID], cb, 'dateups', [userID]);
}

function process(cb, event, params) {
	return function(err, result) {
		if (err) {
			console.error('[db.js] - ' + err);
			cb(event, params, null);
		} else {
			cb(event, params, result);
		}
	}
}

function query(sql, params, callback, event, params) {
	db.get(sql, params, process(callback, event, params));
}

function queryall(sql, params, callback, event, params) {
	db.all(sql, params, process(callback, event, params));
}

/**
 * module interface
 */
exports.interests = interests;
exports.info = info;
exports.dateups = dateups;
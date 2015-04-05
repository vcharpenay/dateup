/**
 * Main server file
 */
var dpd = require('deployd');

var options = {
	port: 8069,
	db: {
		port: 27017,
		host: 'localhost',
		name: 'dateup'
	},
	env: 'development'
};

var server = dpd(options);

server.listen();
server.on('listening', function() {
	console.log('listening on port ' + server.options.port + '...');
});
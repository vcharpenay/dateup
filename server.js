/**
 * Main server file
 */
var dpd = require('deployd');

var config = require('./config.js');

var server = dpd(config);

server.listen();
server.on('listening', function() {
	console.log('listening on port ' + server.options.port + '...');
});

/**
 * Deployment configuration
 * TODO list:
 *  - create non-admin user
 *  - catch signals
 *  - env production instead of dev
 */
var config = {
	host : process.env.OPENSHIFT_NODEJS_IP || 'localhost',
	port : process.env.OPENSHIFT_NODEJS_PORT || 8069,
	db : {
		host : process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
		port : process.env.OPENSHIFT_MONGODB_DB_PORT || 27017,
		name : 'dateup'
	},
	env : 'development'
}
module.exports = config;
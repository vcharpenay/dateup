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
		host : process.env.OPENSHIFT_MONGODB_DB_HOST,
		port : process.env.OPENSHIFT_MONGODB_DB_PORT,
		name : 'dateup',
		credentials : {
			username : 'admin',
			password : 'ahwKm_NvX3Ws'
		}
	},
	env : 'development'
}
module.exports = config;
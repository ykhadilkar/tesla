var Path = require('path');
var db_host = process.env.MONGO_ENV_TUTUM_SERVICE_HOSTNAME;
module.exports = {
	dogwaterOptions : {
		connections : {
			mongoConnection: {
				adapter: 'mongo',
				username: '<dbusername>',
				password: '<dbpassword>',
				url: 'mongodb://'+db_host+':27017/API',
				database: 'API'
			}
		},
		adapters : {mongo: 'sails-mongo' },
		models : require('./models/dogwater.model.definitions.js')
	},
    fizzOptions: {

    },
	server: {
        address: "0.0.0.0",
		port: 3000
	},
	serverOptions: {
		cors: {
			headers :['Authorization', 'Content-Type', 'If-None-Match','If-Modified-Since']
		}
	},
	logOptions : {
        opsInterval: 1000,
        reporters: [{
            reporter: require('good-console'),
            events: { log: '*', response: '*' }
        }]
    }
};
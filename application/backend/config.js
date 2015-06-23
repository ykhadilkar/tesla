var Path = require('path');
var db_host = process.env.MONGO_ENV_TUTUM_SERVICE_HOSTNAME;
module.exports = {
	mongo: {
		username: '<dbusername>',
		password: '<dbpassword>',
		url: 'mongodb://localhost:27017',
		database: 'API'
	},	
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
	server: {
        address: "127.0.0.1",
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
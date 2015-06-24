var Path = require('path');

module.exports = {
	dogwaterOptions : {
		connections : {
			mongoConnection: {
				adapter: 'mongo',
				username: '<dbusername>',
				password: '<dbpassword>',
				url: 'mongodb://' + (process.env.MONGO_ENV_TUTUM_SERVICE_HOSTNAME || 'localhost') +':27017',
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
var Path = require('path');

module.exports = {
	mongo: {
		username: '<dbusername>',
		password: '<dbpassword>',
		url: 'mongodb_1:27017',
		database: 'API'
	},	
	dogwaterOptions : {
		connections : {
			mongoConnection: {
				adapter: 'mongo',
				username: '<dbusername>',
				password: '<dbpassword>',
				url: 'mongodb://mongodb_1:27017/API',
				database: 'API'
			}
		},
		adapters : {mongo: 'sails-mongo' },
		models : require('./models/dogwater.model.definitions.js') 		
	},
	server: {
		port: 3000
	},
	serverOptions: {
		cors: {
			headers :['Authorization', 'Content-Type', 'If-None-Match','If-Modified-Since']
		}
	},
	logOptions: {
		subscribers: {
        'console': ['request', 'log', 'error']
        }
	}	
};
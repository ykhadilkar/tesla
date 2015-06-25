var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');
var GoodWinston = require('good-winston');
var logger = require('./utils/logger');

var server = new Hapi.Server();

server.connection({ host: Config.server.address, port: Config.server.port, routes:Config.serverOptions });

server.register([
    {
        register: require('good'),
        options: {
            opsInterval: 300000,
            reporters: [
                new GoodWinston({
                    ops: '*',
                    request: '*',
                    response: '*',
                    log: '*',
                    error: '*'
                }, logger)
            ]
        }
    }
], function (err) {
    if (err) {
        return server.log(['error'], 'good load error: ' + err);
    }
});

server.route(Routes.endpoints);
server.start(function () {
    server.log('info','Server running at: ' + server.info.uri);
});

module.exports = server;
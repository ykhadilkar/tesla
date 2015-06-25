var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');
var Good = require('good');

var server = new Hapi.Server();
server.connection({ host: Config.server.address, port: Config.server.port, routes:Config.serverOptions });
server.register([
    {
        register: Good,
        options: Config.logOptions
    }
], function (err) {
    if (err) {
        throw err;
    }
});

server.route(Routes.endpoints);
server.start(function () {
    console.info('Server running at: ' + server.info.uri);
});

module.exports = server;
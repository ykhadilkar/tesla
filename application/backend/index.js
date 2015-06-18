var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');
var Good = require('good');
var DogWater = require('dogwater');
var bedwetter = require('bedwetter');

var server = new Hapi.Server(Config.server.port,Config.serverOptions );

server.pack.register([
	{plugin: Good,options: Config.logOptions},
    {plugin: DogWater, options: Config.dogwaterOptions},
    {plugin: bedwetter}
	], function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
        console.log('error loading plugin');
    }

 	server.route(Routes.endpoints);
    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
}); 
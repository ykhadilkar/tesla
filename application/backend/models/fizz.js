var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

var Fizz = function ( storage, logger ) {
    this.storage = storage;
    this.logger = logger;

    var provider = 'google';
    var adapter = 'http';

    var options = {
        //apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
        //formatter: null         // 'gpx', 'string', ...
    };

    this._geocoder = require('node-geocoder')(provider, adapter, options);

};


var Fizz = {};



module.exports = Fizz;
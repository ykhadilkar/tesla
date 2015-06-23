var elasticsearch = require('elasticsearch');

var Fizz = function () {
    this.client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
};


Fizz.prototype.search = function search(query) {
};

module.exports = Fizz;
var elasticsearch = require('elasticsearch');

var Fizz = function () {
    this.client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'error'
    });
};


Fizz.prototype.search = function search(query) {
    return this.client.search({
        index: 'medical',
        type: 'symptom',
        body: {
            query: {
                term: {
                    symptom: query.toUpperCase()
                }
            }
        }
    }).then(function (resp) {
        //console.log(resp);
        return resp.hits;
    }, function (err) {
        //console.trace(err.message);
        return null;
    });
};

module.exports = new Fizz();
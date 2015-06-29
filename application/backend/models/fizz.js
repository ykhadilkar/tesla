'use strict';

var elasticsearch = require('elasticsearch');
var logger = require('../utils/logger');


var Fizz = function () {
    this.client = new elasticsearch.Client({
        host: (process.env.TEXTDB_1_ENV_TUTUM_SERVICE_HOSTNAME || '127.0.0.1' ) + ':9200',
        log: {
            type: 'file',
            level: 'error',
            path: './logs/elasticsearch.log'
        }
    });
};

Fizz.prototype.search = function search(query) {
    return this.client.search({
        index: 'medical',
        type: 'synonym',
        body: {
            query: {
                term: {
                    synonym: query.toUpperCase()
                }
            }
        }
    }).then(function (resp) {
        var result = [];
        for (var i = 0, count = resp.hits.hits.length; i < count; i++) {
            result.push(resp.hits.hits[i]._source.term);
        }
        return result;
    }, function (err) {
        logger.error(err);
        return null;
    });
};

Fizz.prototype.autocomplete = function autocomplete(query) {
    return this.client.search({
        index: 'medical',
        type: 'synonym',
        body: {
            query: {
                prefix: {
                    synonym: query.toUpperCase()
                }
            }
        }
    }).then(function (resp) {
        var result = [];
        for (var i = 0, count = resp.hits.hits.length; i < count; i++) {
            result.push(resp.hits.hits[i]._source.synonym);
        }
        return result;
    }, function (err) {
        logger.error(err);
        return null;
    });
};

module.exports = new Fizz();

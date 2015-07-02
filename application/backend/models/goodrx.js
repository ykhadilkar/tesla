"use strict";

var Q = require('q');
var Wreck = require('wreck');
var Hashes = require('jshashes');

var GoodRX = function () {
    this.provider = 'https://api.goodrx.com/';
    this.apiKey = '569006e8b5';
    this.secretKey = process.env.GOOD_RX_SECRET;

    this.entities = [
        'fair-price',
        'low-price',
        'compare-price',
        'drug-info',
        'drug-search'
    ];

    this.generateSignature = function (queryString) {
        //  http://www.goodrx.com/developer/documentation
        return new Hashes.SHA256().b64_hmac(this.secretKey, queryString).replace(/[+\/]/g, '_');
    };
};

GoodRX.prototype.search = function search(entity, name) {
    var deferred = Q.defer();

    if (this.entities.indexOf(entity) < 0) {
        deferred.reject(new Error('Invalid GoodRX Api entity: ' + entity));
    }

    var queryString = 'name=' + name + '&api_key=' + this.apiKey;
    var signature = this.generateSignature(queryString);
    var uri = this.provider + entity + '?' + queryString + '&sig=' + signature;

    Wreck.get(uri, function (err, res, payload) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(payload);
        }
    });

    return deferred.promise;
};


module.exports = new GoodRX();

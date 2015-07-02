"use strict";

var Q = require('q');
var Qs = require('qs');
var Wreck = require('wreck');
var Hashes = require('jshashes');

var GoodRX = function () {
    this.provider = 'https://api.goodrx.com/';
    this.apiKey = '569006e8b5';
    this.secretKey = process.env.GOOD_RX_SECRET;

    this.entities = {
        'fair-price': ['name', 'form', 'dosage', 'manufacturer', 'ndc'],
        'low-price': ['name', 'form', 'dosage', 'quantity', 'manufacturer', 'ndc'],
        'compare-price': ['name', 'form', 'dosage', 'quantity', 'manufacturer', 'ndc'],
        'drug-info': ['name'],
        'drug-search': ['query']
    };

    this.generateSignature = function (queryString) {
        //  http://www.goodrx.com/developer/documentation
        return new Hashes.SHA256().b64_hmac(this.secretKey, queryString).replace(/[+\/]/g, '_');
    };
};

GoodRX.prototype.search = function search(entity, queryObj) {
    var deferred = Q.defer();

    if (!(entity in this.entities)) {
        deferred.reject(new Error('Invalid GoodRX Api entity: ' + entity));
        return deferred.promise;
    }

    for (var param in queryObj) {
        if (this.entities[entity].indexOf(param) < 0) {
            deferred.reject(new Error('Invalid param `' + param + '` for GoodRX Api entity: ' + entity));
            return deferred.promise;
        }
    }

    var queryString = Qs.stringify(queryObj) + '&api_key=' + this.apiKey;
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

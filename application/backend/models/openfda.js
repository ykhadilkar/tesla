"use strict";

var Q = require('q');
var Wreck = require('wreck');

var OpenFda = function () {
    this.provider = 'https://api.fda.gov/';
    this.apiKey = 'E4ZOf76Q248IRnZ2107BhDYK0GrvPUCxFbL9BHvU';
};

OpenFda.prototype.search = function search(entity, relationship, search, count, limit, skip ) {
    var deferred = Q.defer();

    if ( entity !== 'drug' && entity !== 'device' && entity !== 'food' ) {
        deferred.reject(new Error('Invalid OpenFda Api entity: '+entity));
    }

    if ( entity === 'drug' && (relationship !== 'event' && relationship !== 'label' && relationship !== 'enforcement') ) {
        deferred.reject(new Error('Invalid OpenFda Api entity drug relationship'));
    }

    if ( entity === 'device' && (relationship !== 'event' && relationship !== 'enforcement') ) {
        deferred.reject(new Error('Invalid OpenFda Api entity device relationship'));
    }

    if ( entity === 'food' && relationship !== 'enforcement' ) {
        deferred.reject(new Error('Invalid OpenFda Api entity food relationship'));
    }

    var uri = this.provider + entity + '/' + relationship + '.json?api_key=' + this.apiKey;

    if ( search ) {
        uri += '&search='+search;
    }

    if ( count ) {
        uri += '&count='+count;
    }

    if ( limit ) {
        uri += '&limit='+limit;
    }

    if ( skip ) {
        uri += '&skip='+skip;
    }

    Wreck.get(uri, function (err, res, payload) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(payload);
        }
    });

    return deferred.promise;
};


module.exports = new OpenFda();
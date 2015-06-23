"use strict";

var Q = require('q');
var Wreck = require('wreck');

var OpenFda = function () {
    this.provider = 'https://api.fda.gov/drug/';
    this.apiKey = 'E4ZOf76Q248IRnZ2107BhDYK0GrvPUCxFbL9BHvU';
};

OpenFda.prototype.search = function search(entity, relationship,  query) {
    var deferred = Q.defer();

    if ( entity !== 'drug' || entity !== 'device' || entity !== 'food' ) {
        deferred.reject(new Error('Invalid OpenFda Api entity'));
    }

    if ( relationship === 'drug' && (relationship !== 'event' || relationship !== 'label' || relationship !== 'enforcement') ) {
        deferred.reject(new Error('Invalid OpenFda Api entity drug relationship'));
    }

    if ( relationship === 'device' && (relationship !== 'event' || relationship !== 'enforcement') ) {
        deferred.reject(new Error('Invalid OpenFda Api entity device relationship'));
    }

    if ( relationship === 'food' && relationship !== 'enforcement' ) {
        deferred.reject(new Error('Invalid OpenFda Api entity food relationship'));
    }

    Wreck.get(this.provider + entity + '/' + relationship + '.json?api_key=' + this.apiKey + '&search' + query, function (err, res, payload) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(payload);
        }
    });

    return deferred.promise;
};


module.exports = new OpenFda();
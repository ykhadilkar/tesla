"use strict";

var Q = require('q');
var Wreck = require('wreck');

var PillBox = function () {
    this.provider = 'http://pillbox.nlm.nih.gov/PHP/pillboxAPIService.php';
    this.apiKey = 'C9I5SFZSE0';
};

PillBox.prototype.search = function search(prodcode) {
    var deferred = Q.defer();

    var uri = this.provider + '?key=' + this.apiKey;

    if (prodcode) {
        uri += '&prodcode=' + prodcode;
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

module.exports = new PillBox();
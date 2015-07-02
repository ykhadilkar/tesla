'use strict';

var GoodRX = require('../models/goodrx');

var GoodRXController = function () {

};

GoodRXController.prototype.fairprice = function (request, reply) {
    reply(GoodRX.search('fair-price', request.url.query.name));
};

GoodRXController.prototype.lowprice = function (request, reply) {
    reply(GoodRX.search('low-price', request.url.query.name));
};

GoodRXController.prototype.compareprice = function (request, reply) {
    reply(GoodRX.search('compare-price', request.url.query.name));
};

GoodRXController.prototype.druginfo = function (request, reply) {
    reply(GoodRX.search('drug-info', request.url.query.name));
};

GoodRXController.prototype.drugsearch = function (request, reply) {
    reply(GoodRX.search('drug-search', request.url.query.name));
};

module.exports = new GoodRXController();
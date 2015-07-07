'use strict';

var OpenFDA = require('../models/openfda');

var FoodController = function () {

};

FoodController.prototype.enforcement = function enforcement(request, reply) {
    reply(OpenFDA.search('food', 'enforcement', request.url.query.search));
};

module.exports = new FoodController();
